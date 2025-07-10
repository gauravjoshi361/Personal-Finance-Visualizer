import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('personal_finance');
    const { id } = req.query;
    const { method } = req;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid transaction ID format' });
    }

    switch (method) {
        case 'GET':
            try {
                const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
                if (!transaction) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                res.status(200).json(transaction);
            } catch (error) {
                console.error('Error fetching transaction:', error);
                res.status(500).json({ error: 'Failed to fetch transaction' });
            }
            break;
        case 'PUT':
            try {
                const { amount, date, description } = req.body;
                if (!amount || !date || !description) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                
                if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
                    return res.status(400).json({ error: 'Invalid amount' });
                }

                const result = await db.collection('transactions').updateOne(
                    { _id: new ObjectId(id) }, 
                    { $set: { amount: parseFloat(amount), date, description } }
                );
                
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                
                res.status(200).json({ message: 'Transaction updated', id });
            } catch (error) {
                console.error('Error updating transaction:', error);
                res.status(500).json({ error: 'Failed to update transaction' });
            }
            break;
        case 'DELETE':
            try {
                const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                res.status(200).json({ message: 'Transaction deleted', id });
            } catch (error) {
                console.error('Error deleting transaction:', error);
                res.status(500).json({ error: 'Failed to delete transaction' });
            }
            break;
        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
}