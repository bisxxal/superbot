(function () {
  window.addEventListener("load", () => {
    // const currentScript = document.currentScript;
    // const siteId = currentScript?.getAttribute("data-site-id") ;
    
    const scriptEl = document.getElementById("superbot-widget");
    const siteId = scriptEl?.getAttribute("data-site-id")  ;
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
    iframe.src = `https://super-bot-x.vercel.app/embed?siteId=${siteId}`;
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

 