const sendBtn = document.getElementById("send-question");
const input = document.getElementById("user-question");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", async () => {

    const question = input.value.trim();

    if (question === "") {
        alert("Please enter a question.");
        return;
    }

    // Show user's message
    chatBox.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;

    input.value = "";

    // Show thinking message
    chatBox.innerHTML += `
        <div class="ai-message" id="thinking">
            Thinking...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: question
            })
        });

        const data = await response.json();

        document.getElementById("thinking").remove();

        chatBox.innerHTML += `
            <div class="ai-message">
                ${data.reply}
            </div>
        `;

    } catch (error) {

        document.getElementById("thinking").remove();

        chatBox.innerHTML += `
            <div class="ai-message">
                Sorry, something went wrong.
            </div>
        `;
    }

    chatBox.scrollTop = chatBox.scrollHeight;

});
