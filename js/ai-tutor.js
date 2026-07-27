const sendBtn = document.getElementById("send-question");
const input = document.getElementById("user-question");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", async () => {

    const question = input.value.trim();

    if (!question) {
        alert("Please enter a question.");
        return;
    }

    chatBox.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;

    input.value = "";

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


        if (!response.ok) {
            throw new Error("API failed");
        }


        const data = await response.json();


        const thinking = document.getElementById("thinking");

        if (thinking) {
            thinking.remove();
        }


        chatBox.innerHTML += `
            <div class="ai-message">
                ${data.reply || "No answer found."}
            </div>
        `;


    } catch (error) {

        const thinking = document.getElementById("thinking");

        if (thinking) {
            thinking.remove();
        }


        chatBox.innerHTML += `
            <div class="ai-message">
                Sorry, I cannot connect to the AI right now.
            </div>
        `;

        console.log(error);
    }


    chatBox.scrollTop = chatBox.scrollHeight;

});
