# SKY AI Chat 🚀

### Production-Grade Conversational AI Workspace with Independent Frontend and Backend Deployment

---

## 🌐 Live Deployment

* **Frontend:** https://sky-ai-chat.vercel.app
* **Backend API:** https://sky-ai-chat.onrender.com

---

## 📌 Overview

SKY AI Chat is a full-stack conversational AI workspace designed with a production-first mindset, combining a modern client experience with independently deployed backend services.

The project was built to simulate real deployment conditions where frontend and backend systems operate on separate hosting platforms, requiring environment-aware API integration, production build stability, and deployment-safe configuration.

Beyond interface design, the implementation focused heavily on solving practical engineering concerns such as dependency alignment, build compatibility, deployment branching, runtime debugging, and cross-platform consistency.

---

## ✨ Core Capabilities

* Real-time conversational chat interface
* Markdown-based response rendering
* Syntax-highlighted code block display
* Voice-assisted input support
* Notes workspace integration
* Responsive layout for multiple screen sizes
* Production API communication between independent services
* Stable deployment pipeline across separate platforms

---

## 🧠 Engineering Considerations

This project includes several practical engineering decisions typically encountered in real deployment workflows:

* Frontend hosted independently from backend infrastructure
* Production endpoint migration from local development to deployed API
* Tailwind/PostCSS build compatibility correction for cloud deployment
* Vite production build troubleshooting under deployment constraints
* Branch alignment and deployment source correction across environments
* Render runtime startup debugging with production path resolution
* Stable dependency locking for reproducible builds

---

## 🛠 Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React
* React Markdown
* Syntax Highlighter

### Backend

* Node.js
* Express
* CORS

### Deployment Infrastructure

* Vercel (Frontend Delivery)
* Render (Backend Runtime)

---

## 📁 Repository Structure

```bash id="8nk4l3"
server/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── index.js
├── package.json
└── memory/
```

---

## ⚙️ Local Development

### Frontend

```bash id="91qu08"
cd frontend
npm install
npm run dev
```

### Backend

```bash id="9r0hgc"
npm install
node index.js
```

---

## 🔗 API Contract

### POST /chat

```json id="e4id9m"
{
  "message": "Hello AI"
}
```

---

## 🚀 Deployment Strategy

### Frontend Deployment

Hosted on Vercel using Vite production build output.

```bash id="6ouh4o"
npm run build
```

Output directory:

```bash id="ht4sj8"
dist
```

---

### Backend Deployment

Hosted on Render with direct Node runtime startup.

```bash id="fr4c7m"
node index.js
```

---

## 📈 Current Status

* Frontend deployed and live
* Backend deployed and connected
* Production API integration completed
* Stable deployment pipeline established

---

## 💼 Development Focus

This project reflects practical work in:

* Production deployment
* Frontend/backend separation
* Build debugging
* Dependency resolution
* Deployment troubleshooting

---

## 👨‍💻 Author

**Aditi Raj**
