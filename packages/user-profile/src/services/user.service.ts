/**
 * This is just example code. All the services of the app go in here
 */

import { User } from '../models/user.model';

const mockDB: User[] = []; // delete this ofc, when you actually connect to a database

export const getUserById = async (id: string) => {
  const user = mockDB.find(u => u.id === id);
  if (!user) throw new Error('User not found');
  return user;
};

export const createUser = async (data: Partial<User>) => {
  const newUser = {
    id: Date.now().toString(),
    name: data.name || 'Anonymous',
    email: data.email || '',
  };
  mockDB.push(newUser);
  return newUser;
};