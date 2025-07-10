import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyChart = ({ data = [] }) => {
	return (
		<div className="mt-4 p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
			{data.length === 0 ? (
				<p className="text-gray-500">No data available.</p>
			) : (
				<div className="w-full h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
							<Legend />
							<Bar dataKey="total" fill="#8884d8" name="Total Expenses" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
};

export default MonthlyChart;