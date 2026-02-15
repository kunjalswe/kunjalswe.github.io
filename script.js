const btn = document.getElementById("certificateBtn");
const img = document.getElementById("certificateImg");
const statusText = document.getElementById("statusText");

let visible = false;

// Certificate URL
const certURL = "https://api2.sololearn.com/v2/certificates/CC-8ELLRKZ2/image/png?t=639061928920042590";

// Button click: toggle certificate
btn.addEventListener("click", async () => {
    visible = !visible;

    if (visible) {
        try {
            statusText.textContent = "Loading certificate...";
            
            // Fetch image as blob
            const response = await fetch(certURL);
            const blob = await response.blob();
            
            // Convert blob to object URL
            img.src = URL.createObjectURL(blob);

            // Show image with animation
            img.classList.add("show");
            btn.textContent = "Hide Certificate";
            statusText.textContent = "Certificate loaded successfully ✅";
        } catch (err) {
            statusText.textContent = "Failed to load certificate ❌";
            console.error("Certificate fetch error:", err);
        }
    } else {
        // Hide image
        img.classList.remove("show");
        btn.textContent = "View My Certificate";
        statusText.textContent = "Certificate hidden";
    }

    // Ripple effect
    createRipple(btn);
});

// Ripple animation function
function createRipple(element) {
    const ripple = document.createElement("span");

    ripple.style.position = "absolute";
    ripple.style.width = ripple.style.height = "180px";
    ripple.style.background = "rgba(255,255,255,0.25)";
    ripple.style.borderRadius = "50%";
    ripple.style.left = "50%";
    ripple.style.top = "50%";
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "ripple 0.6s ease-out";

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple keyframes dynamically
const style = document.createElement("style");
style.innerHTML = `
@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(2.8);
        opacity: 0;
    }
}`;
document.head.appendChild(style);

// Initial welcome message
window.addEventListener("load", () => {
    statusText.textContent = "Welcome to my portfolio ✨";
});
