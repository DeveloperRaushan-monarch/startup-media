# StartupMedia 🚀

A high-retention, "anti-gravity" storytelling platform for startup founders. Built with **Next.js 15**, **React**, and **Vanilla CSS** with a custom "Noir" design system.

## ✨ Features
- **Antigravity Motion**: Experience floating UI elements and smooth scroll-reveal effects.
- **Noir Design System**: A premium, dark-themed interface with vibrant orange accents (`#FF6B00`).
- **Fully Responsive**: Optimized for seamless viewing on phones, tablets, and desktops.
- **Dynamic Content**: Articles are pulled dynamically from a local JSON database.

## 📂 Project Structure
This app contains two main experiences:
1.  **User Website**: The public-facing storytelling platform.
    -   **Homepage**: `/`
    -   **Articles**: `/article/[slug]`
2.  **Admin Dashboard**: The internal tool for managing stories.
    -   **Dashboard**: `/admin/dashboard`
    -   **Editor**: `/admin/editor`

## 🛠️ Local Development

1.  **Clone and Install**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) for the user site.
    Open [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard) for the admin site.

## 🚀 Deployment
This project is ready to be deployed on **Vercel**:
1.  Push this code to GitHub.
2.  Connect the repository to Vercel.
3.  Vercel will automatically build and provide a public URL for both the User and Admin sections.

---

*Built with ❤️ by StartupMedia Editorial Team.*
