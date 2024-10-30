
# Backend Test

  

## Prerequisites

  

Prerequisite to run this application locally

  

- install **Node.js**, for developing this app I'm using v18.17

- install **npm** (Node Package Manager), usually comes with Node.js, for developing im using v10.9

- install **MongoDB**

- install **Redis**

  

## Installation

  

1.  **Clone the Repository:**

  

```bash

git clone https://github.com/shafaalafghany/shafa-betest.git

cd shafa-betest
```
2. **Install Dependencies**
```bash
npm install
```
3. **Environment Setup** <br>
Create a `.env` file in the root directory of your project and add the following environment variables:
```bash
PORT=
MONGO_URI=
REDIS_TYPE=  #uri OR local
REDIS_URL=
TOKEN_KEY=
TOKEN_AGE=
```

## Running the Application
1. **Start MongoDB and Redis**
2. **Run the Application**
```bash
npm start
```
This command will start the server, and you should see a message indicating the server already running, such as:
```bash
server is running on port {YOUR-PORT}
database connected
```
3. **Access the Application** <br>
Once the server is running, you can access the API locally at `http://localhost:{YOUR-PORT}`

## API Documentation
For detailed information on the API Endpoints, refer to the Postman Documentation [here] (https://documenter.getpostman.com/view/20871338/2sAY4vg32f).
