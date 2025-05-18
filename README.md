# MisterFi - Holistic Personal Finance Oversight

[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?logo=nextdotjs)](https://nextjs.org/)
[![React Query](https://img.shields.io/badge/React_Query-latest-FF4154.svg?logo=reactquery)](https://tanstack.com/query/latest)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-latest-764ABC.svg?logo=redux)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-latest-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-latest-38B2AC.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-latest-black.svg)](https://www.radix-ui.com/)
[![Clerk](https://img.shields.io/badge/Clerk-latest-blueviolet.svg?logo=clerk)](https://clerk.com/)

[![Express.js](https://img.shields.io/badge/Express.js-latest-000000.svg?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791.svg?logo=postgresql)](https://supabase.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-latest-orange.svg?logo=turborepo)](https://turbo.build/)
[![pnpm](https://img.shields.io/badge/pnpm-latest-F69220.svg?logo=pnpm)](https://pnpm.io/)

MisterFi is an advanced, full-stack application for personal finance management, crafted to provide clarity for your financial journey. Engineered with contemporary technologies and adhering to industry best practices, it delivers a smooth experience for monitoring, categorizing, and scrutinizing your financial activities. The platform offers a comprehensive overview of your financial standing, empowering you to make well-informed monetary decisions through in-depth visualizations and practical insights.


## 🚀 Live Demonstration

🌐 Live Demo: [https://misterfi-finance.vercel.app/](https://misterfi-finance.vercel.app/)

## ✨ Core Functionalities

- 📊 **Insightful Transaction Handling:** Effortlessly log, classify, and retrieve your financial dealings.
- 🤖 **Automated Expense Classification:** Intelligent systems that automatically assign your expenditures to the correct categories.
- 📈 **Thorough Financial Overviews:** Visual representations of your expenditure trends and fiscal habits.
- 🎯 **Budget Monitoring:** Define and track budgets to aid in achieving your financial objectives.
- 🖥️ **User-Friendly Dashboard:** Gain a complete snapshot of your financial well-being instantly.
- 🔒 **Robust Authentication:** Ensure your financial information remains private and safeguarded with Clerk.
- 🌓 **Light/Dark Theme:** Select your preferred visual interface, with automatic system preference detection.
- 📱 **Adaptive Interface:** Consistent user experience across desktop, tablet, and mobile platforms.
- 🔄 **Live Data Synchronization:** Witness your financial figures update instantaneously.
- 📦 **Bulk Transaction Management:** Efficiently handle numerous transactions simultaneously.
- 🔍 **Sophisticated Filtering:** Search and refine transactions by date, value, category, and more.

## 🏗️ System Architecture

MisterFi is organized as a monorepo utilizing Turborepo for streamlined build processes and dependency oversight:
```
misterfi/
├── apps/
│   ├── frontend/     # Next.js web client
│   └── backend/      # Express API service
├── packages/         # Common modules (types, utilities, etc.)
└── turbo.json        # Turborepo settings
```
## 🛠️ Technologies Employed

### Frontend (apps/frontend)

- **Framework:** Next.js 15 (employing App Router)
- **Language:** TypeScript
- **State Management:**
    - Redux Toolkit for application-wide state
    - React Query for server-side state
- **Styling:**
    - Tailwind CSS
    - Radix UI components
    - Bespoke UI elements
- **Authentication:** Clerk
- **Features:** Dark/Light mode functionality, Responsive layout, Contemporary UI with animations, Real-time data refreshes, Progressive Web App (PWA) features

### Backend (apps/backend)

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (facilitated by Supabase)
- **Authentication:** Clerk JWT validation
- **Features:** RESTful API architecture, Type-safe database interactions, Secure authentication layer, Rate limiting and CORS safeguards

### Infrastructure & Developer Tools

- **Frontend Deployment:** Vercel ([misterfi-finance.vercel.app](https://misterfi-finance.vercel.app/))
- **Backend Deployment:** Neon
- **Database Service:** Supabase
- **Authentication Provider:** Clerk
- **Package Manager:** pnpm
- **Monorepo Orchestration:** Turborepo
- **Code Integrity:** ESLint & Prettier
- **Type System:** TypeScript

## 🚀 Local Setup Guide

Execute these commands to configure and operate the project on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/misterfi.git
cd misterfi

# 2. Install dependencies
pnpm install

# 3. Configure environment variables:
# Generate .env.local within apps/frontend/ using the template below
# Generate .env within apps/backend/ using the template below
```

### Frontend (`apps/frontend/.env.local`)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key_frontend
# Note: CLERK_SECRET_KEY is typically needed only on the backend; confirm if required for frontend compilation
NEXT_PUBLIC_API_URL=http://localhost:3000 # Or your backend service URL
```

### Backend (`apps/backend/.env`)

```
CLERK_SECRET_KEY=your_clerk_secret_key_backend
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key # If utilized for administrative functions
DATABASE_URL="postgresql://user:password@host:port/database" # For direct database link if necessary
```

```bash
# 4. Initiate the development servers:
pnpm dev

# This launches both the frontend and backend in development mode.

# 5. Open the application
# Frontend: http://localhost:3000 (or your configured port)
# Backend: http://localhost:3001 (or your configured port)
```

> **Note:** Verify that Node.js (version 18+ suggested) and pnpm (version 8+ suggested) are installed.
> For local backend work that needs a PostgreSQL instance, confirm it is operational and reachable.



---

## 📱 Progressive Web Application

MisterFi is set up as a Progressive Web App (PWA) featuring:

* Basic offline functionality (can be improved)
* Installation prompts on compatible browsers
* An app-like user experience
* Rapid loading performance


---

## 🔒 Security Measures

* **Authentication:** JWT-based sign-in managed by Clerk
* **Data Safeguarding:**  Strong security protocols to shield your financial details
* **CORS Management:**  Implemented on the backend to block unauthorized cross-origin access
* **Rate Control:**  Active on the backend to deter misuse
* **Secure Environment Variable Practices:** Utilizing .env files and environment-specific settings
* **XSS Defense:**  Employs React's inherent protections against XSS
* **Type-Safe Database Interactions:** Minimizes SQL injection risks and upholds data consistency

---

## Deployment Setup

* **Frontend**: Deployed on Vercel
* **Backend**: Deployed on Neon
* **Database**: PostgreSQL instance managed on Supabase
* **Authentication**: Clerk production instance

---
## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
