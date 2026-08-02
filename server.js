const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/api/gemini", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();

    console.log(data);

    const reply =
      data.choices?.[0]?.message?.content ||
      "No response received.";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`StudyGenius AI running on port ${PORT}`);
});
