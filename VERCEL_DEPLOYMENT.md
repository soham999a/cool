# Vercel Deployment Instructions

This document provides instructions for deploying the Cool Member Management application to Vercel.

## Environment Variables

You need to set the following environment variables in your Vercel project settings:

```
VITE_FIREBASE_API_KEY=AIzaSyAXj8Z_6zK63HzbT2zhmdEoO3rYwq7ZwLg
VITE_FIREBASE_AUTH_DOMAIN=cool-7955f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cool-7955f
VITE_FIREBASE_STORAGE_BUCKET=cool-7955f.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=352883500489
VITE_FIREBASE_APP_ID=1:352883500489:web:3276b4d4cf50172527b418
VITE_FIREBASE_MEASUREMENT_ID=G-7E7ERF9MNZ
VITE_FIREBASE_DATABASE_URL=https://cool-7955f-default-rtdb.firebaseio.com
```

## Steps to Deploy

1. **Connect your GitHub repository to Vercel**:
   - Go to [Vercel](https://vercel.com/) and sign in
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Vercel will automatically detect that it's a Vite project

2. **Configure the project**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**:
   - In the project settings, go to the "Environment Variables" tab
   - Add all the environment variables listed above
   - Make sure to add them to all environments (Production, Preview, and Development)

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

## Troubleshooting

If you encounter any issues during deployment, check the following:

1. **Build Errors**:
   - Check the build logs for any errors
   - Make sure all dependencies are installed correctly

2. **Environment Variables**:
   - Verify that all environment variables are set correctly
   - Check for any typos in the variable names

3. **Routing Issues**:
   - If you encounter 404 errors when navigating to routes directly, make sure the `vercel.json` file is correctly configured with the rewrites rule.

## Updating the Deployment

Any changes pushed to the main branch will automatically trigger a new deployment on Vercel.
