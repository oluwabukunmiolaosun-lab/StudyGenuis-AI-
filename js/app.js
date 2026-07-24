
// StudyGenius AI JavaScript

console.log("StudyGenius AI Loaded!");

const askButton = document.querySelector(".search-box button");
const questionInput = document.querySelector(".search-box input");

askButton.addEventListener("click", () => {
    const question = questionInput.value.trim();

    if(question === ""){
        alert("Please enter a question.");
        return;
    }

    alert("AI feature coming soon!\n\nYou asked:\n" + question);
});
