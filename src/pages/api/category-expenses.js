import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('personal_finance');

  try {
    const transactions = await db.collection('transactions').find({}).toArray();
    
    // Group expenses by month and category
    const expensesByMonthAndCategory = {};
    
    transactions.forEach(transaction => {
      if (transaction.category === 'Income') return; // Skip income transactions
      
      const date = new Date(transaction.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const category = transaction.category || 'Other';
      
      if (!expensesByMonthAndCategory[month]) {
        expensesByMonthAndCategory[month] = {};
      }
      
      if (!expensesByMonthAndCategory[month][category]) {
        expensesByMonthAndCategory[month][category] = 0;
      }
      
      expensesByMonthAndCategory[month][category] += parseFloat(transaction.amount);
    });
    
    res.status(200).json(expensesByMonthAndCategory);
  } catch (error) {
    console.error('Error fetching category expenses:', error);
    res.status(500).json({ error: 'Failed to fetch category expenses' });
  }
}