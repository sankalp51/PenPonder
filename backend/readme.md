# Blog REST API

This is a backend server for a blog application built using the MERN stack. It allows users to create posts, like posts, and comment on posts.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/your-username/your-repo.git
    ```
2. Navigate to the project directory:
    ```
    cd your-repo
    ```
3. Install the dependencies:
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables:
    ```
    DATABASE_URL=your-mongodb-connection-string
    PORT=3000
    JWT_SECRET=your-jwt-secret
    ```

### Running the Server

To start the server in development mode, run:
    ```
    npm run dev
    ```
    or
    ```
    yarn dev
    ```

The server will start on the port specified in the `.env` file.

### API Endpoints

- **Root Routes:**
    - `GET /` or `GET /index.html` - Serve the root page.
- **User Authentication Routes:**
    - `POST /users/auth/register` - Register a new user.
    - `POST /users/auth/login` - Login a user.
- **Refresh Token Route:**
    - `POST /refresh` - Refresh JWT token.
- **Blog API Routes:**
    - `GET /api/posts` - Get all posts.
    - `POST /api/posts` - Create a new post (requires JWT and Admin or User role).
    - `GET /api/posts/:id` - Get a post by ID.
    - `PUT /api/posts/:id` - Update a post by ID (requires JWT and Admin or User role).
    - `DELETE /api/posts/:id` - Delete a post by ID (requires JWT and Admin or User role).

### Middleware

- **credentials:** Handles CORS credentials.
- **errorHandler:** Global error handler.
- **verifyJwt:** Verifies the JWT token.
- **verifyRoles:** Verifies user roles for protected routes.

### Error Handling

If a route is not found, a 404 error will be returned:
    - HTML: `404.html`
    - JSON: `{ message: "404 Not found" }`
    - Plain text: `404 not found`

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWT implementation for Node.js
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - Library to hash passwords
- [dotenv](https://github.com/motdotla/dotenv) - Module to load environment variables from a .env file
- [Multer](https://github.com/expressjs/multer) - Middleware for handling `multipart/form-data`, primarily used for uploading files
- [Sharp](https://github.com/lovell/sharp) - High-performance image processing library

## Author

- **Your Name** - *Initial work* - [Your GitHub](https://github.com/your-username)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
