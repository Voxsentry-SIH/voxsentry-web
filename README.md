This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Architecture & Local Development Setup

VoxSentry operates on a **two-server architecture** utilizing a Next.js frontend and a FastAPI backend for Machine Learning inferences. 

To run the application locally, you **must** start both servers.

### 1. Start the FastAPI Backend
Open your first terminal, navigate to the backend directory, and start the python server:
```bash
cd ../voxsentry-backend
# Activate your virtual environment if you have one
uvicorn app.main:app --reload --port 8000
```
*(The backend will run on `http://localhost:8000`)*

### 2. Start the Next.js Frontend
Open a second terminal, navigate to this frontend directory, ensure `.env.local` is configured, and start the development server:
```bash
cd voxsentry-web
npm run dev
```
*(The frontend will run on `http://localhost:3000`)*

> **Note**: Your `voxsentry-web/.env.local` file must contain `BACKEND_API_URL=http://localhost:8000` for the frontend to proxy requests correctly.

---

## Getting Started

First, run the development server:

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
