# Portfolio MERN Project 🚀

Welcome to the Portfolio project! This project is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, and Node.js) stack. It allows you to manage user profiles, timelines, projects, and contact messages for your portfolio website.

## Backend API Endpoints 🛠️

The backend server provides the following API endpoints:

- `POST /api/create`: Creates a user profile. Requires authentication (protect middleware). Accepts the profile data in the request body.

- `GET /api/:userId`: Retrieves a user's profile based on the provided `userId`.

- `PUT /api/update`: Updates a user's profile. Requires authentication (protect middleware). Accepts the updated profile data in the request body.

- `POST /api/register`: Registers a new user. Accepts the user data (name, email, password) in the request body.

- `GET /api`: Retrieves all users. Requires authentication (protect middleware).

- `POST /api/login`: Logs in a user by validating the email and password provided. Returns a token for authentication.

Please note that routes `create`, `update`, and `login` require authentication using the `protect` middleware.

## Frontend Routes 🌐

The frontend application provides the following routes:

- `/`: The homepage route, rendered by the `Homepage` component.

- `/create-profile`: The route to create a new user profile, rendered by the `NewProfilePage` component.

- `/chats`: The route to view and edit user profiles, rendered by the `EditProfilePage` component.

These routes are implemented using React Router's `Routes` and `Route` components. The corresponding components for each route are mentioned above.

## Frontend Components

The frontend for this project consists of the following components:

1. **SignupForm**: Renders the signup form where users can register with their name, email, password, and confirm password.
2. **LoginForm**: Renders the login form where users can log in with their email and password.
3. **ProfilePage**: Displays and allows users to update their profile information, such as name, age, gender, date of birth, mobile number, etc.

These components can be organized in a dedicated `components` directory in your project structure.

## Technologies Used 🛠️

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT (JSON Web Tokens)

- Frontend:
  - React.js
  - React Router (for routing)

## Getting Started 🚀

To get started with the Portfolio MERN project, follow these steps:

1. Clone the repository: `git clone https://github.com/SakshamTolani/profiler.git`
2. Navigate to the backend directory: `cd profiler`
3. Install backend dependencies: `npm install`
4. Set up environment variables by creating a `.env` file and adding the necessary variables.
5. Start the backend server: `npm start`
6. The server will be running on `http://localhost:3000`.
7. Navigate to the frontend directory: `cd frontend`
8. Install frontend dependencies: `npm install`
9. Start the frontend application: `npm start`
10. The application will be running on `http://localhost:3000`.

Make sure you have MongoDB installed and running locally or provide the appropriate MongoDB connection string in the `.env` file.

## Contribution Guidelines 🤝

Contributions are welcome! If you spot any issues or want to add new features, create a pull request with your changes. Please make sure to follow the existing code style and add appropriate tests for your changes.

## License 📝

This project is licensed under the MIT License. Feel free to modify and use it in your own projects.

## Contact Me 📧

For any inquiries or suggestions, feel free to reach out to me at [sakshamtolani@gmail.com](mailto:sakshamtolani@gmail.com).

## Credits

This project was developed by [Saksham Tolani](https://github.com/SakshamTolani). Feel free to connect with me on GitHub for any questions or collaborations.

---

🌟 Star this repository if you found it helpful! Happy coding! 🚀✨
