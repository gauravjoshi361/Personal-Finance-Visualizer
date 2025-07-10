import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyChart from '../components/MonthlyChart';
import Dashboard from '../components/Dashboard';
import CategoryPieChart from '../components/CategoryPieChart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      generateMonthlyData();
    }
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const generateMonthlyData = () => {
    const monthlyTotals = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = format(date, 'MMM yyyy');
      
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }
      
      // Only count expenses, not income
      if (transaction.category !== 'Income') {
        monthlyTotals[monthYear] += parseFloat(transaction.amount);
      }
    });

    const chartData = Object.keys(monthlyTotals).map(month => ({
      name: month,
      total: monthlyTotals[month]
    }));

    // Sort by date
    chartData.sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA - dateB;
    });

    setMonthlyData(chartData);
  };

  const handleSaveTransaction = async (data) => {
    try {
      if (transactionToEdit) {
        // Update existing transaction
        const response = await fetch('/api/transactions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: transactionToEdit._id, ...data })
        });

        if (response.ok) {
          setTransactionToEdit(null);
          fetchTransactions();
        }
      } else {
        // Add new transaction
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          fetchTransactions();
        }
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
    setActiveTab("transactions");
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Personal Finance Visualizer</h1>
      
      <div className="flex justify-center mb-6">
        <Link href="/budget" passHref>
          <Button>Budget Management</Button>
        </Link>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <Dashboard transactions={transactions} />
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <TransactionForm 
                transactionToEdit={transactionToEdit} 
                onSave={handleSaveTransaction} 
              />
            </div>
            <div className="md:col-span-2">
              <TransactionList 
                transactions={transactions} 
                onEdit={handleEditTransaction} 
                onDelete={handleDeleteTransaction} 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="charts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MonthlyChart data={monthlyData} />
            <div className="h-[300px]">
              {/* We'll reuse the CategoryPieChart component here */}
              <CategoryPieChart 
                data={transactions
                  .filter(tx => tx.category !== 'Income')
                  .reduce((acc, tx) => {
                    const category = tx.category || 'Other';
                    const existingCategory = acc.find(item => item.name === category);
                    if (existingCategory) {
                      existingCategory.value += parseFloat(tx.amount);
                    } else {
                      acc.push({ name: category, value: parseFloat(tx.amount) });
                    }
                    return acc;
                  }, [])
                }
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}