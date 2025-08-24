# TracNghiemPro

A web-based multiple-choice quiz application built with Node.js and React.

## Features

- User authentication and registration
- Take quizzes by topic
- View answers and detailed results
- Countdown timer for each quiz
- Pagination for topics and quizzes
- User profile management
- Responsive and user-friendly interface

## Project Structure

```
TracNghiemPro/
  database/         # Backend database and server files
    db.json         # Sample data for quizzes, users, etc.
    package.json    # Backend dependencies
    server.js       # Express server for API
  trac-nghiem-pro/  # Frontend React application
    public/         # Static assets
    src/            # Source code (components, pages, services, etc.)
    package.json    # Frontend dependencies
```

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/HungNguyen2503/TracNghiemPro.git
cd TracNghiemPro
```

### 2. Install backend dependencies

```sh
cd database
npm install
```

### 3. Start backend server

```sh
node server.js
```
The backend will run at [http://localhost:5000](http://localhost:5000) (default).

### 4. Install frontend dependencies

```sh
cd ../trac-nghiem-pro
npm install
```

### 5. Start frontend development server

```sh
npm start
```
The frontend will run at [http://localhost:3000](http://localhost:3000) (default).

## Configuration

- Backend API endpoints are defined in `database/server.js`.
- Frontend API calls are managed in `src/services/` and `src/utils/requests.js`.
- If you need to change the backend URL, update the relevant service or utility files in the frontend.

## Testing

- Run `npm test` in the frontend directory to execute available tests.

## Contribution

Feel free to open issues or submit pull requests for improvements or bug fixes.

---

**Author:**  
- Nguyen Phi Hung