# Getting Started with the Stock-Monitor App by Bhavesh Mukheja

**Important Note:** It is very likely that the Alpha Vantage API key might have been exhausted since it is of a free account. In that case, you may use your own API key by visiting the site [Alpha Vantage](https://www.alphavantage.co/support/#api-key) and pasting your key in the .env file under REACT_APP_API_KEY.

## SETUP INSTRUCTIONS FOR LOCAL DEPLOYMENT

**STEP 1:** Clone the [Project's Github Repository](https://github.com/BhaveshMukheja/stock-monitor) on your PC. You may refer to the [Github Docs](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop) to know how to clone a Github repo.

**STEP 2:** Open the Windows Powershell in the project folder on your PC. Alternatively, you may choose to open VS code and proceed with the further steps.

**STEP 3:** Install the necessary modules. Run: `npm install`

**STEP 4:** After the installation, run: `npm run start` It will start the backend of the project and will be running on port localhost:5555.

**STEP 5:** Then open another terminal in the folder and run: `npm run dev` It will start the frontend of the project and will be running on port localhost:3000.

Now you can go to the browser of your choice and enjoy stock monitoring.

## Backend Documentation

### Overview
The backend of Stock-Monitor is responsible for managing user authentication, user data, and interaction with the database. It is built using Node.js with Express.js, and it integrates Prisma ORM for seamless database operations.

### Technologies Used
- Node.js
- Express.js
- Prisma ORM
- JWT for authentication
- bcrypt hashing for improving security
- MongoDB Atlas for database management

### Endpoints

1. **User Authentication**
   - `/signup` - POST: Endpoint for user registration.
   - `/signin` - POST: Endpoint for user login.
   - `/logout` - GET: Endpoint for user logout.

2. **Wishlist Management**
   - `/add/:id` - PUT: Endpoint to add a stock to the user's wishlist.
   - `/remove/:id` - PUT: Endpoint to remove a stock from the user's wishlist.

3. **User Data**
   - `/user/:id` - POST: Endpoint to fetch user data.

### Middlewares
- `isLoggedIn`: Middleware to check if the user is authenticated using JWT token.

### Helpers
- `getJwtToken`: To generate the JWT token for the user.

### Utilities
- `cookieToken`: Function to generate JWT token and set it as a cookie upon user authentication.

## Frontend Documentation

### Overview
The frontend of Stock-Monitor provides an intuitive user interface for users to monitor their stock portfolios. It is built using React.js and Tailwind CSS, providing a responsive and visually appealing experience.

### Technologies Used
- React.js
- Tailwind CSS
- Material-UI for UI components
- Axios for HTTP requests

### Components

1. **Theme Icon**
   - Functionality: Allows users to switch between light and dark themes.

2. **Wishlist Component**
   - Functionality: Displays the user's wishlist of stocks with options to add/remove stocks and view detailed information.

3. **Card Component**
   - Functionality: Renders a card layout for displaying stock information.

### Contexts
- `ThemeContext`: Manages the theme state for the application.
- `UserIdContext`: Provides the user ID throughout the application.
- `StockContext`: Manages the stock symbol state.

### APIs
- `stockApi`: API module for fetching stock data from the Alpha Vantage Stock API.

### Routes
- `/signup`: Route for user registration.
- `/`: Route for user login.
- `/dashboard`: Route for viewing and managing the user's wishlist.

## About the Project 

Stock-Monitor is a comprehensive full-stack (MERN) web application for Intra day tracking and managing stock portfolios, built using React and Material-UI on the frontend and Node.js, Express, and Prisma on the backend. It features dynamic theming, interactive stock tables, advance filtering options, and secure user authentication with JWT and bcrypt. The application utilizes MongoDB Atlas for its database and demonstrates robust error handling and state management using React Context API. Overall, Stock-Monitor exemplifies modern web development practices, providing a seamless and responsive user experience.
