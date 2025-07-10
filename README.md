
# Personal Finance Visualizer

A web application for tracking and visualizing personal finances built with Next.js and MongoDB.

## Features

### Stage 1: Basic Transaction Tracking
- Track income and expenses with detailed transaction records
- Visualize monthly spending patterns with interactive charts
- Edit and delete transaction records
- Responsive design for desktop and mobile devices

### Stage 2: Categories and Dashboard
- Predefined categories for transactions (Food, Housing, Transportation, etc.)
- Category-wise pie chart for expense breakdown
- Dashboard with summary cards showing:
  - Total expenses
  - Total income
  - Average transaction amount
  - Transaction count
- Recent transactions view on the dashboard
- Tabbed interface for easy navigation between dashboard, transactions, and charts

### Stage 3: Budgeting
- Set monthly category budgets
- Visual progress bars showing budget utilization
- Budget vs actual comparison chart
- Simple budget management interface
- Track spending against budget limits

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui components, Recharts
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 14.x or later
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/personal-finance-visualizer.git
cd personal-finance-visualizer
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
Add transactions using the form on the left side
View your transaction history in the list below the form
Edit or delete transactions as needed
View monthly spending patterns in the chart on the right side
Set and manage budgets for different spending categories
Track your spending against budget limits with visual indicators

## Project Structure
/src/components - React components
/src/pages - Next.js pages and API routes
/src/lib - Utility functions and database connection
/src/styles - Global CSS styles

## API Endpoints
GET /api/transactions - Get all transactions
POST /api/transactions - Create a new transaction
PUT /api/transactions - Update an existing transaction
DELETE /api/transactions?id=<id> - Delete a transaction
GET /api/monthly-expenses - Get monthly expense data for charts
POST /api/budgets - Create or update a budget
DELETE /api/budgets?id=
- Delete a budget
GET /api/category-expenses - Get expenses grouped by month and category


## Acknowledgments
Next.js
MongoDB
Tailwind CSS
shadcn/ui
Recharts