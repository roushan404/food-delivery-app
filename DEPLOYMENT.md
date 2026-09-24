# Vercel deployment

This repository contains three independent applications. Create a separate Vercel project for each directory:

- `frontend` — customer website; build command: `npm run build`; output directory: `dist`
- `admin` — admin dashboard; build command: `npm run build`; output directory: `dist`
- `backend` — Express serverless API; leave the output directory unset

Set each Vite project's `VITE_BACKEND_URL` environment variable to the deployed backend URL, without a trailing slash. Set the backend's `FRONTEND_URL` to the deployed customer-site URL, also without a trailing slash.

The backend also requires `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Add them in Vercel's Environment Variables for Production, Preview, and Development as appropriate.

Deploy the frontend and admin projects with their respective directories configured as the Vercel Root Directory. The included `vercel.json` files route direct visits to client-side routes such as `/cart` and `/orders` back to their React applications.
