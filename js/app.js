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
