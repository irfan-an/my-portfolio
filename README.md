# Irfan Ansari | Personal Portfolio

A responsive personal portfolio website that showcases my skills, projects, education and certificates. It includes a login page and an AI-style chatbot that answers questions about me.

**Live Demo:** [Add your deployed link here](#)

## Features

- Responsive layout with a clean light theme
- Animated typing text in the hero section (Typed.js)
- Sections for About, Skills, Projects, Education, Certificates and Contact
- Login / Sign up page with a Guest option (frontend demo using `localStorage`)
- Portfolio chatbot that answers questions about skills, projects, education and contact details
- Sticky navbar that changes style on scroll
- Downloadable resume

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Libraries | Typed.js, Google Fonts (Poppins) |
| Tools | Git, GitHub, VS Code |

## Project Structure

```
my-portfolio/
├── index.html          # Main portfolio page
├── style.css           # Styles for the portfolio and chatbot
├── script.js           # Typing effect and navbar scroll behaviour
├── chatbot.js          # Portfolio chatbot logic
├── login.html          # Login / Sign up page
├── login.css           # Login page styles
├── login.js            # Login and sign up logic
├── auth-guard.js       # Redirects to login if the user is not logged in
├── images/             # Images and logos
├── certificate/        # Certificate PDFs
└── resume.pdf          # Resume
```

## Projects Featured

1. **Portfolio Website:** Responsive personal website built with HTML, CSS and JavaScript.

## Run Locally

```bash
# Clone the repository
git clone https://github.com/irfan-an/my-portfolio.git

# Go into the folder
cd my-portfolio
```

Then open the folder in VS Code and start it with the **Live Server** extension, or open `login.html` in your browser.

## Note on Login

The login system is a frontend-only demo. Accounts are stored in the browser's `localStorage`, so it is not meant for real security. For production use, a backend such as Spring Boot with Spring Security, or Firebase Authentication, is recommended.

## About Me

I am a B.Tech Computer Science and Engineering student (2024-2028) at Technocrats Institute of Technology (Excellence), Bhopal. I build responsive websites and Java applications, and I am currently improving my Data Structures & Algorithms, OOP and Salesforce skills.

## Contact

- Email: a.irfan8235@gmail.com
- GitHub: [irfan-an](https://github.com/irfan-an)
- LinkedIn: [Irfan Ansari](https://www.linkedin.com/in/irfan-ansari-66294a341/)
- Location: Bhopal, Madhya Pradesh, India

## License

This project is open source and free to use for learning purposes.
