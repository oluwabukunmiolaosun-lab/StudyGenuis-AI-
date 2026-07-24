
const input = document.getElementById("question");
const send = document.getElementById("send");
const chat = document.getElementById("chat");

send.addEventListener("click", () => {

    const text = input.value.trim();

    if(text === "") return;

    chat.innerHTML += `
        <div class="message user">${text}</div>
    `;

    chat.innerHTML += `
        <div class="message ai">
            AI integration is coming soon.<br><br>
            Your question was:<br>
            <strong>${text}</strong>
        </div>
    `;

    input.value="";

    chat.scrollTop = chat.scrollHeight;

});
