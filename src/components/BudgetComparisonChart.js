import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetComparisonChart = ({ budgets, expenses }) => {
  // Prepare data for the chart
  const prepareChartData = () => {
    return budgets.map(budget => {
      const spent = expenses[budget.month]?.[budget.category] || 0;
      return {
        name: budget.category,
        Budget: budget.amount,
        Spent: spent
      };
    });
  };

  const chartData = prepareChartData();

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Budget vs. Actual Spending</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-500">No budget data available.</p>
      ) : (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, '']} />
              <Legend />
              <Bar dataKey="Budget" fill="#8884d8" />
              <Bar dataKey="Spent" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BudgetComparisonChart;