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

      // Firestore question limit and AI request
      // will be added in Part 2

    });

  }

});
