const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the prompt and record power usage
app.post('/api/prompt-with-power', async (req, res) => {
    const { prompt } = req.body;
    const powerUsageData = [];

    // Start a function to continuously record power usage
    let recording = true;
    async function recordPowerUsage() {
        while (recording) {
            try {
                const response = await fetch('http://localhost:3050/power_usage');
                if (response.ok) {
                    const data = await response.json();
                    const timestamp = Date.now();
                    powerUsageData.push({
                        timestamp: timestamp,
                        joules_per_ms: data.power_usage_W / 1000  // Convert W to J/ms
                    });
                }
            } catch (error) {
                console.error('Error recording power usage:', error.message);
            }
        }
    }

    // Start recording power usage
    recordPowerUsage();

    try {
        // Send the prompt to the Ollama API
        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3',
                prompt: prompt,
                stream: false
            })
        });

        // Stop recording when the response from Ollama API is received
        recording = false;

        // Process the response from Ollama
        if (ollamaResponse.ok) {
            const data = await ollamaResponse.json();
            res.json({
                ollamaResponse: data,
                powerUsageData: powerUsageData  // Include power usage data in the response
            });
        } else {
            res.status(ollamaResponse.status).json({ error: ollamaResponse.statusText });
        }
    } catch (error) {
        recording = false;
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
