## File Overview

### 1. `src/main.jsx`
- **Purpose:** App bootstrap
- **Details:** Renders `<App/>` inside `<BrowserRouter>` and `<GoalProvider>`. Imports global CSS.

### 2. `src/index.css`
- **Purpose:** Global & utility styles
- **Details:** Imports Tailwind base/components/utilities. Defines `.neumorphic` and `.glass` helper classes for neumorphism and glassmorphism effects.

### 3. `src/api/api.js`
- **Purpose:** HTTP layer for `json-server`
- **Details:** Exports functions: `fetchGoals()`, `addGoal()`, `updateGoal()`, `deleteGoal()`, `fetchDeposits()`, `addDeposit()`. Wraps `fetch()` and normalizes responses.

### 4. `src/App.jsx` & `src/App.css`
- **App.jsx:** Assembles layout with `<LeftNav/>`, `<TopBar/>`, `<Routes>` (Overview, Goals, Deposits, Settings), plus `<AddEditGoalModal/>` and `<DepositDrawer/>` portals.
- **App.css:** Holds non-Tailwind tweaks (e.g., margin resets).

### 5. `src/contexts/GoalContext.jsx`
- **Purpose:** Global state, undo/redo, UI flags
- **Details:** Uses `useReducer` for `{ past, present: { goals, deposits, ui }, future }`. `ui` tracks modal/drawer states and editing IDs. Handles actions: LOAD, OPEN_ADD_MODAL, OPEN_EDIT_MODAL, CLOSE_MODAL, OPEN_DEPOSIT_DRAWER, CLOSE_DEPOSIT_DRAWER, ADD_GOAL, UPDATE_GOAL, DELETE_GOAL, ADD_DEPOSIT, UNDO, REDO. Exposes API-backed actions.

### 6. `src/components/`
- **AddEditGoalModal.jsx:** Modal for creating/editing goals. Prefills from state, validates, calls add/update actions.
- **LeftNav.jsx:** Gradient sidebar with icons, active/highlight styles. Uses React Router for active state.
- **TopBar.jsx:** Shows total saved, active goals count, daily quote, Undo/Redo buttons.
- **GoalCard.jsx:** Displays goal info: name, category, progress, days left, status. Edit and deposit actions. Confetti on completion.
- **DepositDrawer.jsx:** Bottom sheet for deposits. Select goal, enter/quick-add amount, calls addDeposit, closes after.
- **DonutChart.jsx:** Pie chart (Recharts) for saved vs remaining.
- **BarChart.jsx:** Bar chart (Recharts) for saved amounts by category.
- **HeatMap.jsx:** Calendar heatmap of deposit frequency (react-calendar-heatmap).
- **GoalHealthTable.jsx:** Table view: days left, status, next recommended deposit per goal.

### 7. `src/pages/`
- **Overview.jsx:** Grid of widgets: Donut, Bar, HeatMap, GoalHealthTable.
- **Goals.jsx:** Search bar, "New Goal" button, grid of `<GoalCard/>`.
- **Deposits.jsx:** List of deposits, CSV export (react-csv).
- **Settings.jsx:** Dark mode toggle (localStorage), accessible settings panel.

### 8. `src/__tests__/`
- **api.test.js:** Mocks fetch, asserts `fetchGoals()` returns correctly.
- **reducer.test.js:** Unit tests for context reducer actions, ensures correct state transitions, ≥ 80% coverage.
