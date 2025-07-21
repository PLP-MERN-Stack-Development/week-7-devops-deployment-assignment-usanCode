[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19954906&assignment_repo_type=AssignmentRepo)
# Deployment and DevOps for MERN Applications

This assignment focuses on deploying a full MERN stack application to production, implementing CI/CD pipelines, and setting up monitoring for your application.

## Assignment Overview

You will:
1. Prepare your MERN application for production deployment
2. Deploy the backend to a cloud platform
3. Deploy the frontend to a static hosting service
4. Set up CI/CD pipelines with GitHub Actions
5. Implement monitoring and maintenance strategies

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week7-Assignment.md` file
4. Use the provided templates and configuration files as a starting point

## Files Included

- `Week7-Assignment.md`: Detailed assignment instructions
- `.github/workflows/`: GitHub Actions workflow templates
- `deployment/`: Deployment configuration files and scripts
- `.env.example`: Example environment variable templates
- `monitoring/`: Monitoring configuration examples

## Requirements

- A completed MERN stack application from previous weeks
- Accounts on the following services:
  - GitHub
  - MongoDB Atlas
  - Render, Railway, or Heroku (for backend)
  - Vercel, Netlify, or GitHub Pages (for frontend)
- Basic understanding of CI/CD concepts

## Deployment Platforms

### Backend Deployment Options
- **Render**: Easy to use, free tier available
- **Railway**: Developer-friendly, generous free tier
- **Heroku**: Well-established, extensive documentation

### Frontend Deployment Options
- **Vercel**: Optimized for React apps, easy integration
- **Netlify**: Great for static sites, good CI/CD
- **GitHub Pages**: Free, integrated with GitHub

## CI/CD Pipeline

The assignment includes templates for setting up GitHub Actions workflows:
- `frontend-ci.yml`: Tests and builds the React application
- `backend-ci.yml`: Tests the Express.js backend
- `frontend-cd.yml`: Deploys the frontend to your chosen platform
- `backend-cd.yml`: Deploys the backend to your chosen platform

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all deployment tasks
2. Set up CI/CD pipelines with GitHub Actions
3. Deploy both frontend and backend to production
4. Document your deployment process in the README.md
5. Include screenshots of your CI/CD pipeline in action
6. Add URLs to your deployed applications

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/) 


For this assignment, I have used the week-5-web-socket-assignment in order to deploy it on Render (for the backend)and Vercel (for the frontend)

[LIVE DEMO]([https://usanase-chat-app.vercel.app/)

## 🚀 Features

I have to remind the application was built:
-for the backend: Express, Mongodb,socket-io,cors,dotenv dependencies
-for the backend: React/Vite,Axios,TailwindCSS , socket-io-client dependencies

## 🛠️ Project Structure
<pre><code>
chatapp
|__ .github/
    |__ workflows/
        |__ backend.yml
        |__ frontend.yml
├── client/  
└── server/
|__ .gitignore
|__ package.json
|__ README.md
|__ Week7-Assignment.md
</code></pre>



## Deploying the Backend on Render 

- Created a new Web Service on Render

* Connected to the GitHub repo.

+ Configured:

      - Build Command: pnpm add

      * Start Command: node server.js

      + Environment variables (MONGO_URI, NODE_ENV, PORT)

- Render generated a live backend URL 

## Deploying the Frontend on Vercel

  - Created a project on Vercel

  * Connected to GitHub and selected the client/ folder.

  + Configured environment variables 

  - Vercel deployed the frontend with a live URL 

## Testing the Live App

  - Opened the Vercel frontend URL.

  *  Connected successfully to the Render backend.

## Future Improvements

  - OAuth login with Google, GitHub, Facebook, Instagram

  *  User authentication and sessions

  + Chat history and database persistence

  - UI/UX improvements

# Special Thanks
Thanks to ChatGPT for real-time guidance throughout setup, deployment, and debugging. 🙏


