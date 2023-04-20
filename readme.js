const openaiApiKey = "process.env.OPENAI_API_KEY";

// Set the URL for the OpenAI API endpoint
const openaiApiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

// Create the chat window element
const chatWindow = document.createElement("iframe");

// Set the attributes for the chat window
chatWindow.setAttribute("src", "https://cdn.jsdelivr.net/gh/mediapulseJake/chatbot-html/index.html");
chatWindow.setAttribute("id", "chat-window");
chatWindow.setAttribute("frameborder", "0");
chatWindow.setAttribute("scrolling", "no");
chatWindow.setAttribute("allowfullscreen", "true");
chatWindow.style.cssText = "position: absolute; bottom: 0; right: 0; width: 100%; height: 100%; z-index: 999999;";

// Append the chat window to the chat container element
const chatContainer = document.getElementById("chat-container");
chatContainer.appendChild(chatWindow);

// Send a message to the chat window
function sendMessage(message) {
  chatWindow.contentWindow.postMessage(message, "*");
}

// Receive a message from the chat window
window.addEventListener("message", async (event) => {
  if (event.data.type === "message") {
    const message = event.data.message;
    const prompt = `${message}\nAI:`;
    const requestBody = JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.5,
      n: 1,
      stop: ["\n"]
    });
    const response = await fetch(openaiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: requestBody
    });
    const data = await response.json();
    const completion = data.choices[0].text.trim();
    sendMessage(completion);
  }
});
