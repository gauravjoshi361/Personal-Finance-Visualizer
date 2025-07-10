import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('personal_finance');
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const transactions = await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
                res.status(200).json(transactions);
            } catch (error) {
                console.error('Error in GET /api/transactions:', error);
                res.status(500).json({ error: 'Failed to fetch transactions' });
            }
            break;

        case 'POST':
            try {
                const { amount, date, description, category } = req.body;
                if (!amount || !date || !description) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
                    return res.status(400).json({ error: 'Invalid amount' });
                }

                const result = await db.collection('transactions').insertOne({
                    amount: parseFloat(amount),
                    date,
                    description,
                    category: category || 'Other'
                });

                const newTransaction = await db.collection('transactions').findOne({ _id: result.insertedId });
                res.status(201).json(newTransaction);
            } catch (error) {
                console.error('Error in POST /api/transactions:', error);
                res.status(500).json({ error: 'Failed to add transaction' });
            }
            break;

        case 'PUT':
            try {
                const { id, amount, date, description, category } = req.body;
                if (!id || !amount || !date || !description) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
                    return res.status(400).json({ error: 'Invalid amount' });
                }

                const result = await db.collection('transactions').updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { 
                        amount: parseFloat(amount), 
                        date, 
                        description,
                        category: category || 'Other'
                    }}
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }

                res.status(200).json({ success: true, id });
            } catch (error) {
                console.error('Error in PUT /api/transactions:', error);
                res.status(500).json({ error: 'Failed to update transaction' });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({ error: 'Missing transaction ID' });
                }

                const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });

                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }

                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error in DELETE /api/transactions:', error);
                res.status(500).json({ error: 'Failed to delete transaction' });
            }
            break;

        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
}