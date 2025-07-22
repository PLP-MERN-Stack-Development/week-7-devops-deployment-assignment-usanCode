[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19954906&assignment_repo_type=AssignmentRepo)
# Deployment and DevOps for MERN Applications


For this assignment, I have used the week-5-web-socket-assignment in order to deploy it on Render (for the backend)and Vercel (for the frontend).

[LIVE DEMO](https://usanase-chat-app.vercel.app/) 


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

# Trigger test run 

# Special Thanks
Thanks to ChatGPT for real-time guidance throughout setup, deployment, and debugging. 🙏


