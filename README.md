Shopping Assistant (Chrome Extension + Backend)

A simple Chrome extension that lets you type in what you’re shopping for (e.g., “white t-shirt mens medium”) and instantly get clickable product results (title, price, image, and link). Built with a lightweight Chrome Extension (Manifest V3) frontend and a Node.js + Express backend powered by the SerpAPI
 Google Shopping API.

📂 Project Structure

shopping-backend/ → Node.js backend (Express API, SerpAPI calls)

shopping-extension/ → Chrome extension frontend (popup UI)

🚀 Getting Started
1. Clone the repo
git clone https://github.com/your-username/shopping-assistant.git
cd shopping-assistant

2. Backend Setup

Go into backend folder:
cd shopping-backend

Install dependencies:
npm install

Create a .env file with:

SERPAPI_KEY=your_serpapi_key_here
PORT=5050


Start the backend:
npm start
→ Backend will run on http://localhost:5050

3. Chrome Extension Setup

Open Chrome and go to chrome://extensions

Enable Developer mode

Click Load unpacked

Select the shopping-extension/ folder

Click the extension icon, type a query (e.g., white t-shirt mens medium), and see results 🎉

⚙️ How It Works

User enters a query in the Chrome extension popup

Extension sends query → backend (/search?q=...)

Backend calls SerpAPI Google Shopping → extracts results → sends JSON back

Extension displays products in a grid with title, image, price, and link

🔑 Environment Variables

The backend uses a .env file:

SERPAPI_KEY=your_serpapi_api_key
PORT=5050


⚠️ Never commit .env to GitHub. This repo includes a .gitignore to hide it. If you accidentally push it, revoke the key and generate a new one.

🛠️ Tech Stack

Backend: Node.js, Express, SerpAPI

Frontend: Chrome Extension (Manifest V3), HTML/CSS/JS

Data: Google Shopping results via SerpAPI

🗺️ Roadmap

 Add filters (price, size, brand)

 Integrate Amazon/eBay APIs for affiliate links

 Improve relevance using AI query rewriting

 Deploy backend on Vercel/Render for easy access
