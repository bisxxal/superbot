(function () {
  window.addEventListener("load", () => {
    const scriptEl = document.getElementById("superbot-widget");
    const siteId = scriptEl?.getAttribute("data-site-id")  ;
    const uniqueid = scriptEl?.getAttribute("data-unique-id")  ;
    const welcomeMessage = scriptEl?.getAttribute("data-welcome-message") || "Hello! How can I assist you today?";
    // Create chat button
    const button = document.createElement("div");
    button.innerHTML = "💬";
    Object.assign(button.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      backgroundColor: "#2563eb",
      color: "white",
      borderRadius: "50%",
      fontSize: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: "9999",
    });
    document.body.appendChild(button);

    // Create iframe (hidden initially)
    const iframe = document.createElement("iframe");
    iframe.src = `https://super-bot-x.vercel.app/embed?siteId=${siteId}&id=${uniqueid}&welcomeMessage=${welcomeMessage}`;
    Object.assign(iframe.style, {
      position: "fixed",
      bottom: "90px",
      right: "20px",
      width: "400px",
      height: "500px",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.2)",
      display: "none",
      zIndex: "9999",
    });
    document.body.appendChild(iframe);
 
    button.addEventListener("click", () => {
      iframe.style.display =
        iframe.style.display === "none" ? "block" : "none";
    });
  });
})();

 