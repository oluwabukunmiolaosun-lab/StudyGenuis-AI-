import { auth, db } from "./firebase.js";

import {
  doc,
  updateDoc,
  increment,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;

    if (user) {
        console.log("User logged in:", user.uid);
    } else {
        console.log("No user logged in");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function () {
            nav.classList.toggle("show");
        });
    }

const sendBtn = document.getElementById("send-question");
const userInput = document.getElementById("user-question");
const chatBox = document.getElementById("chat-box");
    
const DAILY_LIMIT = 10;

let questionsAsked = Number(localStorage.getItem("questionsAsked")) || 0;
    
if (sendBtn && userInput && chatBox) {

  sendBtn.addEventListener("click", async function () {

    const text = userInput.value.trim();

if (text === "") return;

if (questionsAsked >= DAILY_LIMIT) {
    chatBox.innerHTML += `
    <div class="ai-message">
        🚀 You have reached your free limit of 10 questions.<br><br>
        <a href="https://paystack.shop/pay/khkeydf4d0" target="_blank" class="premium-btn">
            Upgrade to Premium
        </a>
    </div>`;
    return;
}

chatBox.innerHTML += `<div class="user-message">${text}</div>`;

    userInput.value = "";

    chatBox.innerHTML += `<div class="ai-message" id="thinking">Thinking...</div>`;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

   const user = currentUser;

if (!user) {
    document.getElementById("thinking").remove();
    alert("Please log in first.");
    return;
}

    const response = await fetch("https://studygenuis-ai.onrender.com/api/gemini", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: text,
            uid: user.uid
        })
    });

    const data = await response.json();

document.getElementById("thinking").remove();

if (data.premium) {

    chatBox.innerHTML += `
    <div class="ai-message">
        ${data.reply}
        <br><br>
        <a href="https://paystack.shop/pay/khkeydf4d0"
           target="_blank"
           class="premium-btn">
           🚀 Upgrade to Premium
        </a>
    </div>
    `;

} else {

    chatBox.innerHTML += `
    <div class="ai-message">
        ${data.reply}
    </div>
    `;

}
questionsAsked++;
localStorage.setItem("questionsAsked", questionsAsked);

const userRef = doc(db, "users", user.uid);
const snap = await getDoc(userRef);

console.log(snap.data());
    await updateDoc(userRef, {
        questionsUsed: increment(1)
    });

}
    } catch (error) {

      document.getElementById("thinking").remove();

      chatBox.innerHTML += `<div class="ai-message">Something went wrong.</div>`;

    }

    chatBox.scrollTop = chatBox.scrollHeight;

  });

}
// Image Solver Demo

const imageUpload = document.getElementById("image-upload");
const solveBtn = document.getElementById("solve-image");
const imageResult = document.getElementById("image-result");

if(imageUpload && solveBtn && imageResult){

    solveBtn.addEventListener("click", function(){

        if(imageUpload.files.length === 0){

            imageResult.innerHTML =
            "⚠️ Please choose an image first.";

            return;

        }

        imageResult.innerHTML = `
        ✅ <strong>Image received successfully!</strong><br><br>
        🤖 AI image solving will be available after we connect Google Gemini AI.
        `;

    });

}
// Smart Notes Generator Demo

const notesBtn = document.getElementById("generate-notes");
const notesTopic = document.getElementById("notes-topic");
const notesResult = document.getElementById("notes-result");

if (notesBtn && notesTopic && notesResult) {

    notesBtn.addEventListener("click", function () {

        const topic = notesTopic.value.trim();

        if (topic === "") {
            notesResult.innerHTML = "⚠️ Please enter a topic.";
            return;
        }

        notesResult.innerHTML = `
        <strong>📚 Topic:</strong> ${topic}<br><br>
        ✅ AI-generated study notes will appear here after we connect Google Gemini AI.
        `;
    });

}
// AI Quiz Generator Demo

const quizBtn = document.getElementById("generate-quiz");
const quizSubject = document.getElementById("quiz-subject");
const quizResult = document.getElementById("quiz-result");

if (quizBtn && quizSubject && quizResult) {

    quizBtn.addEventListener("click", function () {

        const subject = quizSubject.value;

        quizResult.innerHTML = `
        <h3>🧠 ${subject} Quiz</h3>

        <p><strong>1.</strong> Sample AI-generated question for ${subject}.</p>

        <p>A. Option One</p>
        <p>B. Option Two</p>
        <p>C. Option Three</p>
        <p>D. Option Four</p>

        <br>

        <p>🤖 Full AI-generated quizzes will be available after connecting Google Gemini AI.</p>
        `;

    });

}
