
# Algo_Wars Online Judge

Algo_Wars is a high-performance Online Judge platform designed to evaluate and execute code submissions for competitive programming. The platform supports multiple programming languages and provides real-time feedback to users. It ensures secure, isolated execution environments using containerization.

## Features

- **Real-time Code Execution Feedback**: Users receive instant feedback on their code submissions, including detailed reports on errors, execution time, and memory usage.
- **Secure Execution Environment**: The platform utilizes Docker containers to isolate code execution, ensuring a secure and consistent environment.
- **JWT-based Authentication**: The website is secured using JWT tokens, providing robust and scalable authentication mechanisms.
- **User-friendly Interface**: Modern front-end design with intuitive navigation and responsive layout for an enhanced user experience.
- **Scalable Backend**: Built with scalability in mind, capable of handling a large number of concurrent submissions efficiently.

## Technology Stack

- **Frontend**: HTML/CSS/JavaScript, React.js
- **Backend**: Express.js, Node.js, Docker
- **Database**: MongoDB
- **Authentication**: JWT-based authentication for secure access.
- **Code Execution**: Containerized backend using Docker with isolated environments for running user code.
- **Compiler Implementation**: Leveraged child processes to run and evaluate code submissions securely.

## Installation

To set up the Algo_Wars platform locally, follow these steps:

### Prerequisites

- Node.js (v14 or above)
- Docker
- MongoDB

### Steps

1. **Clone the Repository:**

  ```bash
   git clone https://github.com/yourusername/algowars.git
   cd algowars
   ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Docker Containers:**

   Ensure Docker is installed and running. Then, build and start the containers:

   ```bash
   docker-compose up --build
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the root directory and specify the necessary environment variables:

   ```bash
   MONGO_URI=mongodb:(URL of your MongoDB database,It can either be you local database or you can you MongoDB Atlas)
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
   

5. **Start the Backend Server:**

   ```bash
   cd backend
   npm run dev
   ```
6. **Start the Frontend Server:**

   ```bash
   cd ../frontend
   npm run dev
   ```

   The frontend should now be running at `http://localhost:5173`.
   The frontend should now be running at `http://localhost:5000`.




## Usage

1. **Register/Login**: Create an account or log in with existing credentials.
2. **Submit Code**: Navigate to the problem statement and submit your code.
3. **View Results**: Get real-time feedback on your submission, including compile errors, runtime errors, execution time, and memory usage.
4. **Admin Control**: If you want to acess the admin controls, manually change the user status in database.

## Screenshots

Here are some screenshots of the platform:


### Landing Page

![Screenshot 2024-08-15 200753](https://github.com/user-attachments/assets/8998cdff-06b8-4c7d-befc-b2c6425c1d91)


### Problem Statement Page

![Screenshot 2024-08-15 200104](https://github.com/user-attachments/assets/7669a100-9d8a-4cbe-80eb-a988595bd37f)


### Code Submission Pages

1.**All Submissions**:

![Screenshot 2024-08-15 200406](https://github.com/user-attachments/assets/1ecf31af-adae-4bd8-b8ef-30bd4a02a8cb)

2.**Specific Submission**:

![Screenshot 2024-08-15 200437](https://github.com/user-attachments/assets/0d300b5b-fc94-4036-9cd2-f14137c66e3c)

### Profile Page

![Screenshot 2024-08-15 195945](https://github.com/user-attachments/assets/d96f8547-795e-41e7-9db7-03b1e3b4a4c8)
![Screenshot 2024-08-15 200014](https://github.com/user-attachments/assets/fcc4b3c8-0282-4207-aec7-18a0cea30c1e)

### Admin Control Page

![Screenshot 2024-08-15 195849](https://github.com/user-attachments/assets/20326a20-d3d9-4264-a13c-e7a887728cbf)

The admin also get a lot more extra features than the normal user profile such as adding more questions, editing a question , deleting a question etc. 
For the first time you have to manually make a profile admin by directly manipulating the database, after which it can directly be done through the
admin dashboard .




