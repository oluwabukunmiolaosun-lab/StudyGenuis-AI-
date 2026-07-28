const sendBtn = document.getElementById("send-question");
const input = document.getElementById("user-question");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", askAI);

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        askAI();
    }
});


async function askAI() {

    const question = input.value.trim();

    if (question === "") {
        alert("Please enter a question.");
        return;
    }


    // Show user question
    chatBox.innerHTML += `
        <div class="user-message">
            <strong>You:</strong><br>
            ${question}
        </div>
    `;


    input.value = "";


    // Show loading message
    const loadingId = "loading-" + Date.now();

    chatBox.innerHTML += `
        <div class="ai-message" id="${loadingId}">
            <strong>StudyGenius AI:</strong><br>
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


        document.getElementById(loadingId).remove();


        if (data.reply) {

            chatBox.innerHTML += `
                <div class="ai-message">
                    <strong>StudyGenius AI:</strong><br>
                    ${data.reply}
                </div>
            `;

        } else {

            chatBox.innerHTML += `
                <div class="ai-message">
                    <strong>StudyGenius AI:</strong><br>
                    Sorry, I could not generate an answer.
                </div>
            `;

        }


    } catch (error) {


        document.getElementById(loadingId)?.remove();


        chatBox.innerHTML += `
            <div class="ai-message">
                <strong>StudyGenius AI:</strong><br>
                Unable to connect to the AI server.
            </div>
        `;


        console.log(error);

    }


    chatBox.scrollTop = chatBox.scrollHeight;

}
