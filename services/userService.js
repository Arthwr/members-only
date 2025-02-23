import DatabaseHandler from '../database/services/DatabaseHandler.js';
import createUserFinder from './factory/createUserFinder.js';

const findUserById = createUserFinder(DatabaseHandler.getUserById, 'requestId');
const findUserByUsername = createUserFinder(
  DatabaseHandler.getUserByUsername,
  'requestUsername',
);

export default {
  findUserById,
  findUserByUsername,
};
