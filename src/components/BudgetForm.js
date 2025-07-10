import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  "Food", "Housing", "Transportation", "Entertainment", 
  "Healthcare", "Education", "Shopping", "Utilities", 
  "Travel", "Savings", "Other"
];

const BudgetForm = ({ onSave }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    // Set current month as default
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setMonth(currentMonth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount || !month) return;

    onSave({
      category,
      amount: parseFloat(amount),
      month
    });

    // Reset form
    setCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Set Monthly Budget</h2>
      
      <div className="space-y-2">
        <Label htmlFor="budget-month">Month</Label>
        <Input
          id="budget-month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="budget-category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="budget-category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="budget-amount">Budget Amount</Label>
        <Input
          id="budget-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
          placeholder="Budget Amount"
        />
      </div>
      
      <Button type="submit" className="w-full">Set Budget</Button>
    </form>
  );
};

export default BudgetForm;