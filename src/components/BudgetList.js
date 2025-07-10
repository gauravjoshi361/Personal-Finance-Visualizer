import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BudgetList = ({ budgets, expenses, onDelete }) => {
  // Function to get month name from YYYY-MM format
  const getMonthName = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Calculate spending percentage for each budget
  const calculateProgress = (budget) => {
    const spent = expenses[budget.month]?.[budget.category] || 0;
    const percentage = (spent / budget.amount) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Monthly Budgets</h2>
      {budgets.length === 0 ? (
        <p className="text-gray-500">No budgets set. Use the form to set a budget.</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => {
            const progress = calculateProgress(budget);
            const spent = expenses[budget.month]?.[budget.category] || 0;
            
            return (
              <div key={`${budget.month}-${budget.category}`} className="p-3 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium">{budget.category}</h3>
                    <p className="text-sm text-gray-500">{getMonthName(budget.month)}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDelete(budget._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
                
                <div className="mb-2">
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>₹ {spent.toFixed(2)} of ₹ {budget.amount.toFixed(2)}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetList;