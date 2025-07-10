import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('personal_finance');

	try {
		const result = await db.collection('transactions').aggregate([
			{
				$addFields: {
					dateObj: { $dateFromString: { dateString: "$date" } }
				}
			},
			{
				$group: {
					_id: {
						year: { $year: "$dateObj" },
						month: { $month: "$dateObj" }
					},
					total: { $sum: "$amount" }
				}
			},
			{ $sort: { "_id.year": 1, "_id.month": 1 } }
		]).toArray();

		const months = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];

		const formattedResult = result.map(item => ({
			name: `${months[item._id.month - 1]} ${item._id.year}`,
			total: parseFloat(item.total.toFixed(2))
		}));

		res.status(200).json(formattedResult);
	} catch (error) {
		console.error('Error fetching monthly expenses:', error);
		res.status(500).json({ error: 'Failed to fetch monthly expenses', message: error.message });
	}
}