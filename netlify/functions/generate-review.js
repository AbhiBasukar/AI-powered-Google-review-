const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { stars } = JSON.parse(event.body);
    const API_KEY = process.env.OPENAI_API_KEY; // This key is stored securely in Netlify, not your code

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Write a short, unique, authentic Google review for a sports club based on ${stars} stars. Tone: enthusiastic.` }]
        })
    });

    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify({ review: data.choices[0].message.content }) };
};
