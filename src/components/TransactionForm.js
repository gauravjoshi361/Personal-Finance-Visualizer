import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
	"Food", "Housing", "Transportation", "Entertainment", 
	"Healthcare", "Education", "Shopping", "Utilities", 
	"Travel", "Income", "Savings", "Grocery", "Other"
];

const TransactionForm = ({ transactionToEdit, onSave }) => {
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('Other');

	useEffect(() => {
		if (transactionToEdit) {
			setAmount(transactionToEdit.amount.toString());
			setDate(transactionToEdit.date);
			setDescription(transactionToEdit.description);
			setCategory(transactionToEdit.category || 'Other');
		} else {
			resetForm();
		}
	}, [transactionToEdit]);

	const resetForm = () => {
		setAmount('');
		setDate('');
		setDescription('');
		setCategory('Other');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!amount || !date || !description) return;
		const data = { 
			amount: parseFloat(amount), 
			date, 
			description,
			category
		};
		onSave(data);
		
		// Reset form after submission if not editing
		if (!transactionToEdit) {
			resetForm();
		}
	};

	return (
		<form id="transactionForm" onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-lg font-semibold">{transactionToEdit ? 'Edit' : 'Add'} Transaction</h2>
			<div className="space-y-2">
				<Label htmlFor="transaction-amount" className="text-sm font-medium text-gray-700">Amount</Label>
				<Input
					id="transaction-amount"
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
					min="0"
					step="0.01"
					placeholder="Amount"
					className="w-full"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="transaction-date" className="text-sm font-medium text-gray-700">Date</Label>
				<Input
					id="transaction-date"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
					className="w-full"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="transaction-description" className="text-sm font-medium text-gray-700">Description</Label>
				<Input
					id="transaction-description"
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
					placeholder="Description"
					className="w-full"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
				<Select value={category} onValueChange={setCategory}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						{CATEGORIES.map((cat) => (
							<SelectItem key={cat} value={cat}>{cat}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Button type="submit" className="w-full">{transactionToEdit ? 'Update' : 'Add'} Transaction</Button>
		</form>
	);
};

export default TransactionForm;