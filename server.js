const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("."));


app.post("/api/gemini", async (req, res) => {

  const { message } = req.body;

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );


    const data = await response.json();

console.log("Gemini response:", JSON.stringify(data, null, 2));

if (!response.ok) {
  return res.status(response.status).json(data);
}

const reply =
  data.candidates?.[0]?.content?.parts?.[0]?.text ||
  "No response received.";

res.json({ reply });


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`StudyGenius AI running on port ${PORT}`);
});
