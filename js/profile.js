import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const nameElement = document.getElementById("profile-name");
const emailElement = document.getElementById("profile-email");
const dateElement = document.getElementById("profile-date");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            nameElement.textContent = data.name || "Not available";
            emailElement.textContent = data.email || "Not available";

            if (data.createdAt) {
                dateElement.textContent =
                    data.createdAt.toDate().toLocaleDateString();
            } else {
                dateElement.textContent = "Not available";
            }

        } else {

            nameElement.textContent = "No profile found";
            emailElement.textContent = user.email;
            dateElement.textContent = "-";

        }

    } catch (error) {

        console.error(error);
        alert("Failed to load profile.");

    }

});
