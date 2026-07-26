import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log("Logged in:", user.email);
    } else {
        window.location.href = "login.html";
    }

});
