# User Management API

A Node.js API for user management with password security using Express and MongoDB.

## Features

- User creation with strong password rules.
- User details update (full name and password).
- User deletion by email.
- Retrieval of user data (full name, email, and password).

## Getting Started

### Prerequisites

- Node.js
- MongoDB (or MongoDB Compass)
- Express

### Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Start the server with `npm start` or `npm app.js` 

Your Node.js API should now be running on port 3000.

## Usage

- Test the API using an API testing tool like Postman.
- Use the provided endpoints to create, update, delete, and retrieve user data.

## API Endpoints

- **User Creation**: `POST /user/create`
- **User Update**: `PUT /user/edit`
- **User Deletion**: `DELETE /user/delete`
- **Get All Users**: `GET /user/getAll`

## License

This project is licensed under the MIT License.
