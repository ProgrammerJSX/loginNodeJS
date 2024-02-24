//register.js
const mensajeError = document.getElementsByClassName("error")[0];

// Espera a que el documento esté completamente cargado
        document.addEventListener("DOMContentLoaded", function(){
            // Añade el evento 'submit' al formulario con el ID 'register-form'
            document.getElementById("register-form").addEventListener("submit", async(e)=>{
                // Previene el comportamiento por defecto del formulario, evitando que se envíe
                e.preventDefault();
                // Consologuea el evento para verificar que funciona correctamente
                console.log(e);
                console.log(e.target.children.user.value);
                const res = await fetch("http://localhost:4000/api/register",{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: e.target.children.user.value,
                        email: e.target.children.email.value,
                        password: e.target.children.password.value
                    })
                });
                if(!res.ok) return mensajeError.classList.toggle("escondido", false);
                const resJson = await res.json();
                if(resJson.redirect){
                    window.location.href = resJson.redirect;
                }
            });
        
        });















/*
        // e representa el evento del formulario, en este caso al hacer clic en el boton type: submit
document.getElementById("register-form").addEventListener("submit", (e)=>{
    e.preventDefault();
console.log(e)
})
*/