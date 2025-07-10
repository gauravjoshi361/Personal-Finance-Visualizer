import React, { useState, useEffect } from 'react';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import BudgetComparisonChart from '../components/BudgetComparisonChart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [categoryExpenses, setCategoryExpenses] = useState({});

  useEffect(() => {
    fetchBudgets();
    fetchCategoryExpenses();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/budgets');
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const fetchCategoryExpenses = async () => {
    try {
      const response = await fetch('/api/category-expenses');
      const data = await response.json();
      setCategoryExpenses(data);
    } catch (error) {
      console.error('Error fetching category expenses:', error);
    }
  };

  const handleSaveBudget = async (data) => {
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        fetchBudgets();
      }
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      const response = await fetch(`/api/budgets?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchBudgets();
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" passHref>
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="mr-2" size={16} />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Budget Management</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <BudgetForm onSave={handleSaveBudget} />
        </div>
        <div className="md:col-span-2">
          <BudgetList 
            budgets={budgets} 
            expenses={categoryExpenses} 
            onDelete={handleDeleteBudget} 
          />
        </div>
      </div>
      
      <div className="mt-6">
        <BudgetComparisonChart 
          budgets={budgets} 
          expenses={categoryExpenses} 
        />
      </div>
    </div>
  );
}