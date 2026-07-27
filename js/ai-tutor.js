const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/gemini", async (req, res) => {

  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          contents:[
            {
              parts:[
                {text:message}
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json({
      reply:data.candidates[0].content.parts[0].text
    });

  } catch(error){
    res.status(500).json({
      error:error.message
    });
  }

});


app.listen(3000, ()=>{
 console.log("Server running");
});
