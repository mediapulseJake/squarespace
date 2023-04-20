# squarespace
Media Pulse Chat GPT for Squarespace
 // Replace API_KEY with your actual API key
const API_KEY = 'process.env.OPENAI_API_KEY4';
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Replace the text here with the prompt you want to generate completion for
const prompt = “Give me 5 reasons to use an ethical marketing company”;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

const data = {
  prompt: prompt,
  max_tokens: 50,
  temperature: 0.7,
  n: 1,
  stop: '\n'
};

const response = await fetch(API_URL, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
});

const result = await response.json();
const completion = result.choices[0].text.trim();

console.log(completion);
