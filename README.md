# Smart Goal

[![Vite](https://img.shields.io/badge/Vite-4.5.14-blue)]()
[![React](https://img.shields.io/badge/React-18.3.1-blue)]()
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.17-green)]()

A savings goal manager with:

- **CRUD** Goals (Create, Read, Update, Delete)  
- **Optimistic** Deposits (+ server‑patch to persist)   
- **Visualizations**: Donut, Bar, HeatMap, Health Table  
- **CSV Export** of transactions    
- **Neumorphism & Glassmorphism** UI  
- **Unit & Integration Tests** (≥ 80 % coverage)  
- **Linting & CI**: ESLint, Prettier, Husky, GitHub Actions

## Tech Stack

- **Framework:** React 18 + Vite + React Router v6  
- **Styling:** Tailwind CSS + DaisyUI, custom gradients & shadows  
- **Charts:** Recharts + react-calendar-heatmap + react-confetti  
- **State:** React Context + useReducer (with undo/redo)  
- **Mock API:** json‑server (`db.json`)  
- **Testing:** Vitest, React Testing Library  
- **CI/CD:** GitHub Actions  

## Folder Structure

```bash
src/
├── api/api.js             # HTTP helpers for json-server
├── assets/react.svg       # sample asset
├── components/
│   ├── AddEditGoalModal.jsx
│   ├── BarChart.jsx
│   ├── DepositDrawer.jsx
│   ├── DonutChart.jsx
│   ├── GoalCard.jsx
│   ├── GoalHealthTable.jsx
│   ├── HeatMap.jsx
│   ├── LeftNav.jsx
│   └── TopBar.jsx
├── contexts/GoalContext.jsx
├── index.css               # global + utility styles
├── main.jsx                # app entry point
├── pages/
│   ├── Deposits.jsx
│   ├── Goals.jsx
│   ├── Overview.jsx
│   └── Settings.jsx
└── __tests__/              # unit & integration tests

```

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your computer
- VS Code or any code editor

## Installation

Follow these steps to set up the Smart Goal Planner on your local machine:

1. Clone the repository:
    ```bash
    git clone https://github.com/Rubil-Mogere-94/smart-goal.git
    cd smart-goal-planner
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Start mock api:
    ```bash
   pnpm run serve:api
    ```

4. Start server api:
    ```bash
   pnpm run dev
    ```

5. Open the application in your browser:
    ```
    http://localhost:5173
    ```

## Author
Mogere Rubil
