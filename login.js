/* ===== Login page logic (frontend-only demo auth) ===== */
const USERS_KEY = "portfolio_users";
const SESSION_KEY = "portfolio_session";

// Agar pehle se login hai to seedha portfolio kholo
if (localStorage.getItem(SESSION_KEY)) {
    window.location.replace("index.html");
}

const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const form = document.getElementById("auth-form");
const nameField = document.getElementById("name-field");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const pwInput = document.getElementById("password");
const errorEl = document.getElementById("error");
const submitBtn = document.getElementById("submit-btn");
const subText = document.getElementById("auth-sub");
const togglePw = document.getElementById("toggle-pw");
const guestBtn = document.getElementById("guest-btn");

let mode = "login";

function setMode(newMode) {
    mode = newMode;
    const isSignup = mode === "signup";
    tabLogin.classList.toggle("active", !isSignup);
    tabSignup.classList.toggle("active", isSignup);
    nameField.classList.toggle("hidden", !isSignup);
    submitBtn.textContent = isSignup ? "Create account" : "Login";
    subText.textContent = isSignup
        ? "Naya account banao aur portfolio dekho"
        : "Login karke portfolio dekhein";
    pwInput.autocomplete = isSignup ? "new-password" : "current-password";
    errorEl.textContent = "";
}

tabLogin.addEventListener("click", () => setMode("login"));
tabSignup.addEventListener("click", () => setMode("signup"));

togglePw.addEventListener("click", () => {
    const show = pwInput.type === "password";
    pwInput.type = show ? "text" : "password";
    togglePw.textContent = show ? "Hide" : "Show";
});

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch {
        return {};
    }
}

// Password plain text store nahi karte; SHA-256 hash use karte hain
async function hashPassword(pw) {
    if (window.crypto && crypto.subtle) {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    return btoa(pw); // fallback (jab page file:// se khula ho)
}

function startSession(name, email) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email, at: Date.now() }));
    window.location.replace("index.html");
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const email = emailInput.value.trim().toLowerCase();
    const password = pwInput.value;
    const name = nameInput.value.trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorEl.textContent = "Valid email daalo.";
        return;
    }
    if (password.length < 6) {
        errorEl.textContent = "Password kam se kam 6 characters ka hona chahiye.";
        return;
    }

    const users = getUsers();
    const hash = await hashPassword(password);

    if (mode === "signup") {
        if (!name) {
            errorEl.textContent = "Apna name daalo.";
            return;
        }
        if (users[email]) {
            errorEl.textContent = "Ye email pehle se registered hai. Login karo.";
            return;
        }
        users[email] = { name, hash };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        startSession(name, email);
    } else {
        const user = users[email];
        if (!user || user.hash !== hash) {
            errorEl.textContent = "Email ya password galat hai.";
            return;
        }
        startSession(user.name, email);
    }
});

guestBtn.addEventListener("click", () => startSession("Guest", "guest"));