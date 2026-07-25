import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const signupBtn = document.getElementById("signup-btn");

signupBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    try{

        await createUserWithEmailAndPassword(auth, email, password);

        alert("Account created successfully!");

        window.location.href = "login.html";

    }catch(error){

        alert(error.message);

    }

});
