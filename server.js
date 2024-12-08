const express = require('express');
const g4f = require('g4f');
const app = express();
const port = 3000;
app.use(express.json());
async function processQuestion(text) {
    try {
        const response = await g4f.ask({
            text: text,
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 2000
        });
        return response.text;
    } catch (error) {
        console.error("Error processing the question:", error);
        return "Error processing the question. Please try again.";
    }
}
app.post('/process-question', async (req, res) => {
    const { encryptedText } = req.body;
    if (!encryptedText) {
        return res.status(400).json({ error: "No encrypted text provided" });
    }
    const cleanedQuestion = await processQuestion(encryptedText);
    res.json({ cleanedQuestion });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
