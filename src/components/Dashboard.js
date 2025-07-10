import React from 'react';
import SummaryCard from './SummaryCard';
import TransactionList from './TransactionList';
import CategoryPieChart from './CategoryPieChart';
import { BadgeIndianRupee, CreditCard, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = ({ transactions }) => {
	// Calculate total expenses
	const totalExpenses = transactions
		.filter(tx => tx.category !== 'Income')
		.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
	
	// Calculate total income
	const totalIncome = transactions
		.filter(tx => tx.category === 'Income')
		.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
	
	// Calculate category data for pie chart
	const categoryData = getCategoryData(transactions);
	
	// Get recent transactions
	const recentTransactions = [...transactions]
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.slice(0, 5);
	
	// Calculate average transaction amount
	const avgTransaction = transactions.length > 0 
		? (transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0) / transactions.length)
		: 0;
	
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Dashboard</h2>
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<SummaryCard 
					title="Total Expenses" 
					value={`₹${totalExpenses.toFixed(2)}`} 
					icon={<CreditCard size={24} />}
					color="border-red-500"
				/>
				<SummaryCard 
					title="Total Income" 
					value={`₹${totalIncome.toFixed(2)}`} 
					icon={<BadgeIndianRupee size={24} />}
					color="border-green-500"
				/>
				<SummaryCard 
					title="Average Transaction" 
					value={`₹${avgTransaction.toFixed(2)}`} 
					icon={<TrendingUp size={24} />}
					color="border-blue-500"
				/>
				<SummaryCard 
					title="Transaction Count" 
					value={transactions.length} 
					icon={<Calendar size={24} />}
					color="border-purple-500"
				/>
			</div>
			
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<CategoryPieChart data={categoryData} />
				<TransactionList 
					transactions={recentTransactions} 
					limit={5}
				/>
			</div>
		</div>
	);
};

// Helper function to prepare data for the pie chart
function getCategoryData(transactions) {
	const categoryMap = {};
	
	transactions.forEach(tx => {
		if (tx.category !== 'Income') {  // Exclude income from expense categories
			const category = tx.category || 'Other';
			if (!categoryMap[category]) {
				categoryMap[category] = 0;
			}
			categoryMap[category] += parseFloat(tx.amount);
		}
	});
	
	return Object.keys(categoryMap).map(category => ({
		name: category,
		value: categoryMap[category]
	}));
}

export default Dashboard;