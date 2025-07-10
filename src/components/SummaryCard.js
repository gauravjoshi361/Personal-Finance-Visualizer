import React from 'react';

const SummaryCard = ({ title, value, icon, color }) => {
	return (
		<div className={`p-4 bg-white shadow-md rounded-lg border-l-4 ${color}`}>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-sm font-medium text-gray-500">{title}</h3>
					<p className="text-2xl font-semibold mt-1">{value}</p>
				</div>
				<div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} text-${color.replace('border-', '')}`}>
					{icon}
				</div>
			</div>
		</div>
	);
};

export default SummaryCard;