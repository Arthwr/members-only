import capitalizeString from '../utils/capitalizeString.js';

export default {
  auth: {
    loginFailed: {
      variant: 'danger',
      message: 'Login Failed',
      detail: 'Invalid credentials.',
    },
    signUpFailed: {
      variant: 'warning',
      message: 'The username is unavailable or invalid.',
      detail: 'Please select another.',
    },
    signUpSuccess: (username) => ({
      variant: 'success',
      message: `Thanks for joining us, ${capitalizeString(username)}!`,
      detail: 'You can now safely log in with your credentials.',
    }),
  },
};
