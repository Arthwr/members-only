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
    accountDoesntExist: {
      variant: 'danger',
      message: 'Failed to find this account.',
      detail: 'Please try again later.',
    },
    signUpSuccess: (username) => ({
      variant: 'success',
      message: `Thanks for joining us, ${capitalizeString(username)}!`,
      detail: 'You can now safely log in with your credentials.',
    }),
  },
  posts: {
    unknownPostMessageError: {
      variant: 'warning',
      message: 'Something went wrong.',
      detail: 'Please try again later.',
    },
    userFailedToPost: {
      variant: 'danger',
      message: 'Failed to send message.',
      detail: 'Please try again later',
    },
    userSuccessfullPost: {
      variant: 'success',
      message: 'Message sent successfully!',
    },
    adminCouldntDeletePost: {
      variant: 'warning',
      message: 'Post not found or already deleted.',
    },
    adminDeletePostSuccess: {
      variant: 'success',
      message: 'Post deleted successfully.',
    },
  },
  membership: {
    wrongSecret: {
      variant: 'warning',
      message: 'Wrong secret phrase!',
      detail: 'Hint: favourite animal with 3 letters.',
    },
  },
};
