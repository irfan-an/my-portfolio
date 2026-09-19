/* =========================================================
   AI CHATBOT — chatbot.js
   ========================================================= */

// ---- 1. knowledge based ----
const IRFAN_INFO = {
    name: "Irfan Ansari",
    greeting: "Hi! I'm Irfan's portfolio assistant 🤖 Ask me about his skills, projects, education, or how to contact him.",
    skills: "Irfan works with Java, HTML, CSS, JavaScript, GitHub, and Salesforce. He's currently sharpening his Data Structures & Algorithms and OOP skills.",
    projects: "Irfan has built a Portfolio Website (HTML/CSS/JS), a Attendance Management System (Based on Full-Stack), and a Weather App (JavaScript + Weather API). Scroll to the Projects section to see them live!",
    education: "Irfan is a B.Tech CSE student (2024–2028),CGPA 6.57(2nd year) at Technocrats Institute of Technology (Excellence), Bhopal.",
    contact: "You can reach Irfan at a.irfan8235@gmail.com or +91 8235676717. He's based in Bhopal, Madhya Pradesh.",
    resume: "You can download Irfan's resume using the 'Download Resume' button at the top of the page.",
    github: "Check out Irfan's GitHub: https://github.com/irfan-an",
    linkedin: "Connect with Irfan on LinkedIn: https://www.linkedin.com/in/irfan-ansari-66294a341/",
    certificates: "Irfan has completed a Java Programming certification (Infosys Springboard) and Salesforce Administrator/Flow modules on Trailhead.",
    thanks: "You're welcome! 😊 Anything else you'd like to know about Irfan?",
    bye: "Thanks for stopping by! Don't forget to check out the Projects section or drop a message in the Contact form. 👋",
    howAreYou: "I'm doing great, just here to talk about Irfan all day! 😄 What would you like to know?",
    fallback: "I'm not totally sure about that one 🤔 — try asking about his skills, projects, education, certificates, or contact info!"
};

// Rotate through a few phrasings so replies feel less robotic
const THANKS_REPLIES = [
    IRFAN_INFO.thanks,
    "Anytime! Let me know if you want to know more. 🙌",
    "No problem at all! Happy to help. 😊"
];

// ---- 2. Keyword rules mapped to knowledge base keys ----
const RULES = [
    { key: "skills", patterns: ["skill", "tech", "stack", "language", "know", "good at"] },
    { key: "projects", patterns: ["project", "built", "work", "portfolio site", "app"] },
    { key: "education", patterns: ["education", "college", "study", "degree", "btech", "cgpa", "university"] },
    { key: "contact", patterns: ["contact", "email", "phone", "reach", "number", "location", "where"] },
    { key: "resume", patterns: ["resume", "cv"] },
    { key: "github", patterns: ["github", "code", "repo"] },
    { key: "linkedin", patterns: ["linkedin"] },
    { key: "certificates", patterns: ["certificate", "certification", "course"] },
    { key: "thanks", patterns: ["thank", "thanks", "thx", "appreciate", "great help", "helpful"] },
    { key: "bye", patterns: ["bye", "goodbye", "see you", "later", "gtg"] },
    { key: "howAreYou", patterns: ["how are you", "how r u", "how's it going", "whats up", "what's up"] },
    { key: "greeting", patterns: ["hi", "hello", "hey", "yo", "sup"] }
];

function getBotReply(userText) {
    const text = userText.toLowerCase();
    for (const rule of RULES) {
        if (rule.patterns.some(p => text.includes(p))) {
            if (rule.key === "thanks") {
                return THANKS_REPLIES[Math.floor(Math.random() * THANKS_REPLIES.length)];
            }
            return IRFAN_INFO[rule.key];
        }
    }
    return IRFAN_INFO.fallback;
}

const USE_REAL_AI = false;
const BACKEND_URL = "https://your-backend.example.com/api/chat";

async function getBotReplyAI(userText) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userText,
                context: IRFAN_INFO // send your info so the AI answers grounded in facts
            })
        });
        const data = await response.json();
        return data.reply || IRFAN_INFO.fallback;
    } catch (err) {
        console.error("AI backend error:", err);
        return "Hmm, I couldn't reach my AI brain right now. Try again in a bit!";
    }
}

// ---- 3. UI wiring ----
const toggleBtn = document.getElementById("chatbot-toggle");
const chatWindow = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("chatbot-close");
const messagesEl = document.getElementById("chatbot-messages");
const form = document.getElementById("chatbot-form");
const input = document.getElementById("chatbot-input");
const quickReplies = document.querySelectorAll(".quick-reply");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("chat-msg", sender);
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
}

function showTyping() {
    const typing = document.createElement("div");
    typing.classList.add("chat-msg", "bot", "typing");
    typing.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return typing;
}

let greeted = false;
const badge = document.getElementById("chatbot-badge");

toggleBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    badge.style.display = "none";
    if (!greeted) {
        addMessage(IRFAN_INFO.greeting, "bot");
        greeted = true;
    }
});

closeBtn.addEventListener("click", () => {
    chatWindow.classList.remove("open");
});

async function handleUserMessage(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    input.value = "";

    const typingEl = showTyping();
    const reply = USE_REAL_AI ? await getBotReplyAI(text) : getBotReply(text);

    // tiny delay makes it feel less instant/robotic
    setTimeout(() => {
        typingEl.remove();
        addMessage(reply, "bot");
    }, 500);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
});

quickReplies.forEach(btn => {
    btn.addEventListener("click", () => handleUserMessage(btn.textContent));
});