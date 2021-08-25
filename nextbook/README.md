# Nextbook

Nextbook is an application designed for use in a demo at Google Cloud Next '21: Applying Kubernetes Best Development Practices. 

---

## Sample contents

Nextbook contains a **skaffold.yaml** and Kubernetes manifest yamls for each service. When you deploy the app with Cloud Code, it uses [skaffold](https://skaffold.dev/docs/) to build an image and deploy the project's Kubernetes manifests.

- **skaffold.yaml** configures how to build the app
- **/kubernetes-manifests** contains the Kubernetes yaml manifests

### [frontend](./src/frontend)

The frontend service creates a standard webpage using Node.js and Pug.

- **app.js** starts an HTTP server and handles requests
- **/views** contains the following views:
  - **home.pug** the main display page
  - **input.pug** contains a form for users to enter and submit input
  - **output.pug** displays rendered content from the database
- **/public** contains two folders:
    - **/assets**: contains image files
    - **/css**: contains a single **style.css** file

### [backend](./src/backend)

The backend service uses a Python Flask app to manage requests to a MongoDB database.

- **back.py** starts an HTTP server and connects to the database

---
