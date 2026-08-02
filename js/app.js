import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  // Mobile Menu
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // AI Elements
  const sendBtn = document.getElementById("send-question");
  const userInput = document.getElementById("user-question");
  const chatBox = document.getElementById("chat-box");

  let currentUser = null;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
    } else {
      currentUser = null;
    }
  });

  if (sendBtn && userInput && chatBox) {

    sendBtn.addEventListener("click", async () => {

      if (!currentUser) {
        alert("Please login first.");
        return;
      }

      const text = userInput.value.trim();

      if (text === "") return;

      chatBox.innerHTML += `
      <div class="user-message">
        ${text}
      </div>
      `;

      userInput.value = "";

      chatBox.innerHTML += `
      <div class="ai-message" id="thinking">
        Thinking...
      </div>
      `;

      chatBox.scrollTop = chatBox.scrollHeight;

const userRef = doc(db, "users", currentUser.uid);
const userSnap = await getDoc(userRef);

if (!userSnap.exists()) {
    document.getElementById("thinking").remove();

    chatBox.innerHTML += `
    <div class="ai-message">
        User profile not found.
    </div>
    `;

    return;
}

const userData = userSnap.data();

if (!userData.isPremium && userData.questionsUsed >= 10) {

    document.getElementById("thinking").remove();

    chatBox.innerHTML += `
    <div class="ai-message">
        🚀 You have reached your free limit of 10 questions.
        <br><br>

        <a href="https://paystack.shop/pay/khkeydf4d0"
           target="_blank"
           class="premium-btn">
           Upgrade to Premium
        </a>

    </div>
    `;

    return;
}

try {

    const response = await fetch(
        "https://studygenuis-ai.onrender.com/api/gemini",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        }
    );

    const data = await response.json();

    document.getElementById("thinking").remove();

    chatBox.innerHTML += `
    <div class="ai-message">
        ${data.reply}
    </div>
    `;

    if (!userData.isPremium) {

        await updateDoc(userRef, {
            questionsUsed: increment(1)
        });

    }

} catch (error) {

    document.getElementById("thinking").remove();

    chatBox.innerHTML += `
    <div class="ai-message">
        Something went wrong.
    </div>
    `;

    console.log(error);

}

chatBox.scrollTop = chatBox.scrollHeight;
    });

  }

});
// =========================
// Image Solver
// =========================

const imageUpload = document.getElementById("image-upload");
const solveBtn = document.getElementById("solve-image");
const imageResult = document.getElementById("image-result");

if (imageUpload && solveBtn && imageResult) {

    solveBtn.addEventListener("click", () => {

        if (imageUpload.files.length === 0) {

            imageResult.innerHTML = `
            ⚠️ Please choose an image first.
            `;

            return;

        }

        imageResult.innerHTML = `
        ✅ <strong>Image received successfully!</strong>
        <br><br>
        🤖 AI Image Solver will be available after connecting the AI vision model.
        `;

    });

}
