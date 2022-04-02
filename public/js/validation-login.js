const log = console.log;
window.addEventListener("load", function(){
   let emailError = document.querySelector('div.text-danger-email')
   let email = document.querySelector('input.email'); 
   let error_email = undefined;
   email.addEventListener('blur',function(e){
       if(email.value == "") {
           error_email = ('Debe completar este campo')
       }else { 
           error_email = "";
       }
       if(error_email != undefined){
           emailError.innerHTML = "<p>" + error_email + "</p>";
           log('Entre en email')
       }

      // emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
   // if (emailRegex.test(email.value)) {
      
    //} else {
      //emailError.innerText = "Ingrese un correo valido";
    //}
   });

   let passError = document.querySelector('div.text-danger-password');
   let password = document.querySelector("input.password");
   let err = undefined;
   password.addEventListener("blur", function(e){ 
      if(password.value == ""){ 
         err = "Debes escribir una contraseña";
      }else if(password.value.length < 6){ 
         err = "Debes escribir al menos 6 caracteres";
      }else err ="";
      if(err != undefined) { 
         passError.innerHTML = "<p>" + err + "</p>";
         log("Password")
      }
   });
})