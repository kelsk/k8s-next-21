// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// #XXX: This comment causes the container structure test to fail.

const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')

const NEXTBOOK_API_ADDR = process.env.NEXTBOOK_API_ADDR

const BACKEND_URI = `http://${NEXTBOOK_API_ADDR}/db`

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

const router = express.Router()
app.use(router)

app.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: false }))

// Application will fail if environment variables are not set
if(!process.env.PORT) {
  const errMsg = "PORT environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

if(!process.env.NEXTBOOK_API_ADDR) {
  const errMsg = "NEXTBOOK_API_ADDR environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

// Starts an http server on the $PORT environment variable
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// Handles GET request to /
router.get("/", (req, res) => {
    // retrieve collection of database entries from the backend
    // render the HTML template with the resulting collection
    axios.get(BACKEND_URI)
      .then(response => {
        console.log(`response from ${BACKEND_URI}: ${response.status}`)
        res.render("home", {data: response.data})
      }).catch(error => {
        console.error(`error: ${error}`)
    })
});

// Handles POST request to /post
router.post('/post', (req, res) => {
  console.log(`received request: ${req.method} ${req.url}`)

  // validate request
  const data = req.body.data
  console.log(data)

  if (!data || data.length == 0) {
    res.status(400).send("data is not specified")
    return
  }

  // send the new body to the backend and redirect to the homepage
  console.log(`posting to ${BACKEND_URI}- body: ${data}`)
  axios.post(BACKEND_URI, {
    body: data
  }).then(response => {
      console.log(`response from ${BACKEND_URI}: ${response.status}`)
      res.redirect('/')
  }).catch(error => {
      console.error(`error: ${error}`)
  })
});
