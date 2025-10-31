// public/widget.js

(function () {
  const siteId = document.currentScript.getAttribute("data-site-id");

  // Create the chat button
  const button = document.createElement("div");
  button.innerHTML = "💬";
  button.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #2563eb;
    color: white;
    border-radius: 50%;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
  `;
  document.body.appendChild(button);

  // Create iframe but hidden initially
  const iframe = document.createElement("iframe");
  iframe.src = `https://bisxxal-ai-bot.vercel.app/chatbot?siteId=${siteId}`;
  iframe.style = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 400px;
    height: 500px;
    border: none;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    display: none;
    z-index: 9999;
  `;
  document.body.appendChild(iframe);

  // Toggle open/close
  button.addEventListener("click", () => {
    iframe.style.display = iframe.style.display === "none" ? "block" : "none";
  });
})();


<script
  src="https://bisxxal-ai-bot.vercel.app/widget.js"
  data-site-id="my-awesome-react-site"
  defer
></script>
