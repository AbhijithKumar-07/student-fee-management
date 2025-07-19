# Student Fee Management System

A modern web application for managing student fee payments with real-time updates.

## Features

- User authentication (Sign Up, Login)
- View all students and their fee status
- Profile management
- Fee payment with simulated payment modal
- Real-time updates using Socket.io
- Responsive UI built with Next.js, Tailwind CSS, and Radix UI components

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- MongoDB (via Mongoose)
- Socket.io
- Radix UI
- React Hook Form
- JWT Authentication

## 🗺️ ERD Diagram

View the interactive ERD:  
👉 [Click to view on dbdiagram.io](https://dbdiagram.io/d/Student-Fee-Management-687b3d31f413ba3508a4c9f0)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/AbhijithKumar-07/student-fee-management.git
   cd student-fee-management
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Set up environment variables:

   Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

4. Start the development server:

   ```sh
   pnpm dev
   ```

5. (Optional) Start the Socket.io backend if needed:

   > The frontend expects a Socket.io server at `NEXT_PUBLIC_SOCKET_URL`.  
   > You may need to run a compatible backend for real-time updates.

## Project Structure

- `app/` — Next.js app directory (pages, API routes)
- `components/` — React components (UI, forms, modals)
- `contexts/` — React context providers (Auth, Socket)
- `models/` — Mongoose models
- `hooks/` — Custom React hooks
- `public/` — Static assets
- `styles/` — Global CSS and Tailwind config

## Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server

## License

This project is licensed under the MIT License.

---

## 👤 Author

- **Abhijith Kumar**
- GitHub: AbhijithKumar-07
- Feel free to open issues or pull requests!

## Note:
This project uses [Radix UI](https://www.radix-ui.com/) for accessible UI primitives and [Tailwind CSS](https://tailwindcss.com/) for styling.  
Real-time updates require a running Socket.io backend.