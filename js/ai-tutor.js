const sendBtn = document.getElementById("send-question");
const input = document.getElementById("user-question");
const chatBox = document.getElementById("chat-box");


sendBtn.addEventListener("click", async () => {

    const question = input.value.trim();

    if(question === ""){
        alert("Please enter a question.");
        return;
    }


    // Show user's question
    chatBox.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;


    input.value = "";


    // Temporary AI response
    chatBox.innerHTML += `
        <div class="ai-message">
            Thinking... AI response will appear here.
        </div>
    `;


    chatBox.scrollTop = chatBox.scrollHeight;

});
