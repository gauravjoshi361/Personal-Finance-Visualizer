import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
	'#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
	'#82CA9D', '#FF6B6B', '#6A7FDB', '#F7C59F', '#2E4057',
	'#F25F5C', '#247BA0'
];

const CategoryPieChart = ({ data = [] }) => {
	return (
		<div className="mt-4 p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
			{data.length === 0 ? (
				<p className="text-gray-500">No data available.</p>
			) : (
				<div className="w-full h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={80}
								fill="#8884d8"
								dataKey="value"
								nameKey="name"
								label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
};

export default CategoryPieChart;