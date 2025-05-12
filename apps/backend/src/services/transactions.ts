/**
 * Transactions Service
 *
 * Handles all database operations for transactions using Supabase.
 * All methods are type-safe and include error handling.
 */

import { supabase } from '../lib/supabase.js';
import type { Database } from '../types/database.js';

type Transaction = Database['public']['Tables']['transactions']['Row'];
type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

export class TransactionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TransactionError';
  }
}

export const TransactionsService = {
  /**
   * Create a new transaction
   * @throws {TransactionError} If creation fails
   */
  async create(
    userId: string,
    data: Omit<TransactionInsert, 'user_id'>,
  ): Promise<Transaction> {

    console.log("Args recibidos en create...........................................................................:", userId, data);
    console.log("Data...........................................................................:",  {data});
    console.log('types of data properties:', {
      description: typeof data.description,
      amount: typeof data.amount,
      date: typeof data.date,
      category: typeof data.category,
      type: typeof data.type,
    })

    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        ...data,
        user_id: userId,
      })
      .select()
      .single();

    console.log("Transaction...........................................................................:", transaction);
    console.log("Error...........................................................................:", error);

    if (error) {
      throw new TransactionError(error.message);
    }

    return transaction;
  },

  /**
   * Get all transactions for a user
   * @throws {TransactionError} If fetch fails
   */
  async list(userId: string): Promise<Transaction[]> {
    console.log("Args recibidos en list:", userId);
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      throw new TransactionError(error.message);
    }

    return transactions;
  },

  /**
   * Get a single transaction by ID
   * @throws {TransactionError} If fetch fails or transaction not found
   */
  async get(userId: string, id: string): Promise<Transaction> {
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('id', id)
      .single();

    if (error) {
      throw new TransactionError(
        error.code === 'PGRST116' ? 'Transaction not found' : error.message,
      );
    }

    return transaction;
  },

  /**
   * Update a transaction
   * @throws {TransactionError} If update fails or transaction not found
   */
  async update(
    userId: string,
    id: string,
    data: TransactionUpdate,
  ): Promise<Transaction> {
    const { data: transaction, error } = await supabase
      .from('transactions')
      .update(data)
      .eq('user_id', userId)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new TransactionError(
        error.code === 'PGRST116' ? 'Transaction not found' : error.message,
      );
    }

    return transaction;
  },

  /**
   * Delete a transaction
   * @throws {TransactionError} If deletion fails
   */
  async delete(userId: string, id: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) {
      throw new TransactionError(error.message);
    }
  },

  /**
   * Delete all transactions for a user
   * @throws {TransactionError} If deletion fails
   */
  async deleteAll(userId: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('user_id', userId);

    if (error) {
      throw new TransactionError(error.message);
    }
  },
};
