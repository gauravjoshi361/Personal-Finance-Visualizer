import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('personal_finance');
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const budgets = await db.collection('budgets').find({}).sort({ month: -1 }).toArray();
        res.status(200).json(budgets);
      } catch (error) {
        console.error('Error in GET /api/budgets:', error);
        res.status(500).json({ error: 'Failed to fetch budgets' });
      }
      break;

    case 'POST':
      try {
        const { category, amount, month } = req.body;
        
        if (!category || !amount || !month) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Check if budget for this category and month already exists
        const existingBudget = await db.collection('budgets').findOne({ category, month });
        
        if (existingBudget) {
          // Update existing budget
          await db.collection('budgets').updateOne(
            { _id: existingBudget._id },
            { $set: { amount: parseFloat(amount) } }
          );
          
          return res.status(200).json({ 
            message: 'Budget updated', 
            id: existingBudget._id 
          });
        }

        // Create new budget
        const result = await db.collection('budgets').insertOne({
          category,
          amount: parseFloat(amount),
          month
        });

        const newBudget = await db.collection('budgets').findOne({ _id: result.insertedId });
        res.status(201).json(newBudget);
      } catch (error) {
        console.error('Error in POST /api/budgets:', error);
        res.status(500).json({ error: 'Failed to add budget' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        
        if (!id) {
          return res.status(400).json({ error: 'Missing budget ID' });
        }

        const result = await db.collection('budgets').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Budget not found' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error in DELETE /api/budgets:', error);
        res.status(500).json({ error: 'Failed to delete budget' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}