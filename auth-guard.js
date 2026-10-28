/* ===== Portfolio page guard: login nahi hai to login.html pe bhejo ===== */
(function () {
    const session = localStorage.getItem("portfolio_session");
    if (!session) {
        window.location.replace("login.html");
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
        let user = {};
        try { user = JSON.parse(session) || {}; } catch { }

        const navList = document.querySelector("nav ul");
        if (!navList) return;

        const li = document.createElement("li");
        li.innerHTML = '<a href="#" id="logout-link">Logout (' +
            (user.name || "User").replace(/[<>&"]/g, "") + ")</a>";
        navList.appendChild(li);

        document.getElementById("logout-link").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("portfolio_session");
            window.location.replace("login.html");
        });
    });
})();