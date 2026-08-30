
<div align="center" class="text-center">
  <h1>FasionDB - Server</h1>
  <p><em># FasionDB buy product</em></p>

  <!-- GitHub Repo Badges -->
  <img alt="last-commit" src="https://img.shields.io/github/last-commit/Joy43/Fasion-DB-Server?style=flat&logo=git&logoColor=white&color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/Joy43/Fasion-DB-Server?style=flat&color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="repo-language-count" src="https://img.shields.io/github/languages/count/Joy43/Fasion-DB-Server?style=flat&color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">

  <p><em>Built with the tools and technologies:</em></p>

  <!-- Tech Stack Badges -->
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000.svg?style=flat&logo=express&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="JSON" src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Markdown" src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933.svg?style=flat&logo=node.js&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Yarn" src="https://img.shields.io/badge/Yarn-2C8EBB.svg?style=flat&logo=Yarn&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-880000.svg?style=flat&logo=mongoose&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  
  <img alt="Multer" src="https://img.shields.io/badge/Multer-1B1F23.svg?style=flat&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>


<br>
# FasionDB - Server

FasionDB is a robust and scalable backend solution for an e-commerce platform. It handles user authentication, product management, order processing, payment integration, and more. Built with Node.js, Express.js, and MongoDB, this project is designed for high performance and flexibility.

---

## Features

- **User Authentication**: Secure login, registration, and password reset using JWT.
- **Product Management**: CRUD operations for products.
- **Order Management**: Seamless order placement and processing.
- **Payment Integration**: Integrated with SSLCommerz for secure payment processing.
- **Cloudinary Integration**: Efficient image storage and retrieval.
- **Email Notifications**: Automated email services for various actions.

---

## Installation Guide

Follow the steps below to set up and run the project locally:

### Prerequisites

- Node.js (v20+)
- MongoDB (Local or Atlas)
- Yarn or npm

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Joy43/Fasion-DB-Server
   cd NextMert-Server
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Create a `.env` file in the root directory and configure the environment variables as shown below.

4. Run the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. Access the application on `http://localhost:3001`.

---

## Environment Variables

The following `.env` configuration is required to run the project:

```dotenv
# Environment
NODE_ENV=development

# Port
PORT=3001

# Database URL
DB_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<db_name>?retryWrites=true&w=majority"

# Bcrypt Salt Rounds
BCRYPT_SALT_ROUNDS=12

# JWT Secrets and Expiry
JWT_ACCESS_SECRET="<your_access_secret>"
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET="<your_refresh_secret>"
JWT_REFRESH_EXPIRES_IN=1y
JWT_OTP_SECRET="<your_otp_secret>"
JWT_PASS_RESET_SECRET="<your_pass_reset_secret>"
JWT_PASS_RESET_EXPIRES_IN=15m

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME="<your_cloudinary_cloud_name>"
CLOUDINARY_API_KEY="<your_cloudinary_api_key>"
CLOUDINARY_API_SECRET="<your_cloudinary_api_secret>"

# Email Configuration
SENDER_EMAIL="<your_email>"
SENDER_APP_PASS="<your_app_password>"

# SSLCommerz Payment Info
STORE_NAME="teststore"
PAYMENT_API="https://sandbox.sslcommerz.com/gwprocess/v3/api.php"
VALIDATION_API="https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
STORE_ID="<your_store_id>"
STORE_PASSWORD="<your_store_password>"
VALIDATION_URL="<your_validation_url>"
SUCCESS_URL="<your_success_url>"
FAILED_URL="<your_failed_url>"
CANCEL_URL="<your_cancel_url>"
```

---

## Scripts

- **Start Development Server**: 
  ```bash
  yarn dev
  ```
- **Build Production**: 
  ```bash
  yarn build
  ```
- **Run in Production Mode**: 
  ```bash
  yarn start
  ```

---

## API Documentation

<!-- [https://documenter.getpostman.com/view/28371413/2sAYQXpCyd](https://documenter.getpostman.com/view/28371413/2sAYQXpCyd) -->

**FasionDB** is a single-vendor e-commerce platform. This repository contains the server-side implementation, providing robust backend services and APIs to power the platform.

