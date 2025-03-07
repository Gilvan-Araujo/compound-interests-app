# compound-interests-app

Compound Interests calculator app for Cannabinote interview

## Overview

This project is a full-stack compound interest calculator application. It's designed to calculate compound interest based on user inputs.

## Technologies Used

* **Frontend:**
  * React Router
  * Vite
  * TypeScript
* **Backend:**
  * NestJS
  * JWT
  * Prisma
  * TypeScript

## Features

* Authentication using JWT with Prisma for persistence
* Calculates compound interest.
* User-friendly interface.

## Setup

### Backend

1. Navigate to the `backend` directory.
2. Run `yarn` to install dependencies.
3. Copy and paste the `.env.example` renaming it to `.env` and add the appropriate data.
4. Run `yarn start:dev` to start the development server.

### Frontend

1. Navigate to the `frontend` directory.
2. Modify the `.env` with the URL from the backend command.
3. Run `yarn` to install dependencies.
4. Run `yarn dev` to start the development server.

## Usage

1. Access the frontend application in your browser.
2. Register a new user, with email and password, then login.
3. Enter the principal amount, interest rate, and time period.
4. Select if there will be monthly contributions, and add the amount, if there will be.
5. View the calculated interest and total amount.
