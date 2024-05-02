# TCGMart

## Contributors

- [@Ribo](https://www.github.com/8maaan)
- [@Sabejon](https://github.com/NifaNii)

## Tech Stack / Tools
**Client:** React, MUI

**Server:** Express, Spring boot, MySQL

![Java](https://skillicons.dev/icons?i=html,css,javascript,react,spring,express,mysql) 

## Project Description

The TCGMart website enables users to sell Pokémon cards through a user-friendly interface. Key features include the ability to list cards for sale, view detailed card listings, search for a card, conduct transactions, view transaction history and current card listings, manage user profiles, upload card images, and utilize Stripe for payment processing.

![Landing Page](https://i.imgur.com/1rBoNND.png "TCGMart Landing Page")

## Installation Instructions (Run Locally)

### Prerequisites
1. **Node v10+ and npm**: Ensure Node.js and npm are installed on your system. You can download and install them from [here](https://nodejs.org/).

2. **MySQL Database**: Ensure MySQL is installed on your system. You can download and install it from [here](https://www.mysql.com/products/workbench/).

3. **Java/Spring Boot**: Ensure Java is set up and configured on your system. You can find installation instructions [here](https://www.oracle.com/ph/java/technologies/downloads/) or check the backend repository [here](https://github.com/8maaan/TCGMart).

### Steps to Install and Run the Project
1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/8maaan/TCGMart-FrontEnd.git

2. **Navigate to the Project Directory**: 
   ```bash
   cd <project-directory>

3. **Install Dependencies**: 
   ```bash
   npm install

4. **Start the Development Server**: 
   ```bash
   npm start

5. **Ensure the Stripe API keys are configured in .env in the server directory**: 
   ```bash
   # Stripe API keys - see https://stripe.com/docs/development/quickstart#api-keys
    STRIPE_PUBLISHABLE_KEY=pk_test...
    STRIPE_SECRET_KEY=sk_test...

6. **Start the Stripe Payment Server**: 
   ```bash
   cd server
   npm start
