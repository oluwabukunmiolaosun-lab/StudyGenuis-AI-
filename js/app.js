document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menu-btn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function () {
            nav.classList.toggle("show");
        });
    }

});
// AI Tutor Demo

const sendBtn = document.getElementById("send-question");
const userInput = document.getElementById("user-question");
const chatBox = document.getElementById("chat-box");

if(sendBtn && userInput && chatBox){

sendBtn.addEventListener("click",function(){

const text=userInput.value.trim();

if(text==="") return;

chatBox.innerHTML+=`
<div class="user-message">${text}</div>
<div class="ai-message">
🤖 AI responses will be available when we connect Google Gemini API.
</div>
`;

userInput.value="";

chatBox.scrollTop=chatBox.scrollHeight;

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
