# Members Only

Self-learning project aimed at gaining experience with Passport.js, session management, and protected routes.

![preview](https://github.com/user-attachments/assets/a00bd8b5-101e-4238-9f92-f10491b1f726)

## Tech Stack:
1. Express
2. PostgreSQL
3. Passportjs

### Authentication
- **Sign Up**: Users can create an account with a username and password.
- **Sign In**: Users can log in with their credentials.
- **Logout**: Users can log out of their account.
- **Admin Authentication**: Protected route with message deletion privileges for admins.

### Membership
- **Join Club**: Users can join the club by entering a secret phrase.
- **Membership Status**: Membership status is displayed on the user's dashboard.

### Messaging
- **Post Messages**: Members can post messages to the message board.
- **Delete Messages**: Admins can delete any message from the message board.
- **Rate Limiting**: Limits the number of messages a user can post within a time frame.

### Validation
- **Input Validation**: Validates user inputs for sign-up, login, and message posting.
- **Error Handling**: Displays validation errors and alerts to users.

### Security
- **Helmet Middleware**: Adds security headers to HTTP responses.
- **Session Management**: Manages user sessions with secure cookies.
- **Rate Limiting**: Protects against brute force attacks on login and sign-up.

### Database
- **PostgreSQL**: Uses PostgreSQL for data storage.
- **Database Initialization**: Initializes database tables and inserts default data.

### Logging
- **Winston Logger**: Logs application events and errors.
- **Daily Rotate File**: Rotates log files daily.

### Views
- **EJS Templates**: Uses EJS for server-side rendering of views.
- **Shoelace Components**: Utilizes Shoelace web components for UI elements.
