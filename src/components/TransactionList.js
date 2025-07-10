import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const getCategoryColor = (category) => {
	const colors = {
		"Food": "bg-orange-100 text-orange-800",
		"Housing": "bg-blue-100 text-blue-800",
		"Transportation": "bg-green-100 text-green-800",
		"Entertainment": "bg-purple-100 text-purple-800",
		"Healthcare": "bg-red-100 text-red-800",
		"Education": "bg-yellow-100 text-yellow-800",
		"Shopping": "bg-pink-100 text-pink-800",
		"Utilities": "bg-indigo-100 text-indigo-800",
		"Travel": "bg-teal-100 text-teal-800",
		"Income": "bg-emerald-100 text-emerald-800",
		"Savings": "bg-cyan-100 text-cyan-800",
		"Other": "bg-gray-100 text-gray-800"
	};
	return colors[category] || colors["Other"];
};

const TransactionList = ({ transactions, onEdit, onDelete, limit }) => {
	const displayTransactions = limit ? transactions.slice(0, limit) : transactions;
	
	return (
		<div className="mt-4 p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-semibold mb-4">
				{limit ? 'Recent Transactions' : 'Transactions'}
			</h2>
			{displayTransactions.length === 0 ? (
				<p className="text-gray-500">No transactions found.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
								{!limit && (
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
								)}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{displayTransactions.map((tx) => (
								<tr key={tx._id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
										{tx.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
										{tx.description}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<Badge className={getCategoryColor(tx.category || 'Other')}>
											{tx.category || 'Other'}
										</Badge>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
										₹ {parseFloat(tx.amount).toFixed(2)}
									</td>
									{!limit && (
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<Button
												onClick={() => onEdit(tx)}
												variant="outline"
												size="sm"
												className="mr-2 text-blue-600 hover:text-blue-800"
											>
												Edit
											</Button>
											<Button
												onClick={() => onDelete(tx._id)}
												variant="outline"
												size="sm"
												className="text-red-600 hover:text-red-800"
											>
												Delete
											</Button>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default TransactionList;