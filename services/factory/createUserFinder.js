import { AppError } from '../../utils/Errors.js';

const createUserFinder = (dbService, metaKey) => {
  return async (value) => {
    try {
      const user = await dbService(value);

      if (!user) {
        throw new AppError('User not found', {
          status: 404,
          type: 'UserServiceError',
          meta: { [metaKey]: value },
        });
      }

      return user;
    } catch (error) {
      throw new AppError(`Failed while retrieving user by ${metaKey}`, {
        status: 500,
        type: 'DatabaseError',
        meta: { [metaKey]: value },
        cause: error,
      });
    }
  };
};

export default createUserFinder;
