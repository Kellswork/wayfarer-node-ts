# Wayfarer

![CI Test](https://github.com/Kellswork/wayfarer-node-ts/actions/workflows/ci.yml/badge.svg)

WayFarer is a public bus transportation booking API server.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

Main API features Implemented
- User can sign up
- User can log in


## Technologies

### Language

- TypeScript
- Node v18

### Framework

- Express

### Debugging

- nodemon
- ts-node

### Database

- PostgreSQL

### Logging ( TO-DO )

- (Add logging library used)

### Linting and Code formatting

- ESLint
- Prettier
- Airbnb style guide

### Security

- Authentication
- Authorization
- Prevents DOS attacks (TO-DO)
    - Limit body payload
    - Express rate limit dependency (`express-rate-limit`)
- Prevents XSS attacks (TO-DO)
    - Appropriate headers (`helmet`)
    - Data Sanitization against XSS (`xss-clean`)

### Testing

- Jest with SuperTest
- unit testing

### Continuous Integration

- GitHub Actions

### Deployment

- Compiler (Babel)
- Containerization (Docker)

### API Documentation

- Swagger (Todo)

## Installation and Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Make sure you have docker installed.
4. Create a .env file with the info shown below
5. Run docker-compose build to build the application
6. Run docker-compose up to start the application
7. To run migrations for the tables; use `docker exec wayfarer-node-ts-server-1 npm run migrate up`

## Testing

To Run the Test;

- You need to provide a DB URL link in the .env file in order to run the test successfully.
- Next Run migrations on the DB to create tables; run `DB_URL=<test-db-connection string> npm run migrate up`
- Run `npm run test`




# Wayfarer

![CI Test](https://github.com/Kellswork/wayfarer-node-ts/actions/workflows/ci.yml/badge.svg)

WayFarer is a public bus transportation booking API server.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)

## Features

### Implemented:

#### User functionality:
- User can sign up
- User can log in

### Planned

#### Admin functionality:
- Create a trip
- Cancel a trip
- View all trips
- View bookings for all trips

#### User functionality:
- Book a seat on a trip
- View bookings
- Delete their bookings
- Filter trips by origin
- Filter trips by destination
- Specify seat numbers when making a booking

## Technologies

### Language

- TypeScript
- Node v18

### Framework

- Express

### Debugging

- nodemon
- ts-node

### Database

- PostgreSQL

### Logging ( TO-DO )


### Linting and Code formatting

- ESLint
- Prettier
- Airbnb style guide

### Security

- Authentication
- Authorization
- Prevents DOS attacks (TO-DO)
    - Limit body payload
    - Express rate limit dependency (`express-rate-limit`)
- Prevents XSS attacks (TO-DO)
    - Appropriate headers (`helmet`)
    - Data Sanitization against XSS (`xss-clean`)

### Testing

- Jest with SuperTest
- Unit testing

### Continuous Integration

- GitHub Actions

### Deployment

- Compiler (Babel)
- Containerization (Docker)


### CI/CD

- GitHub Actions

## Usage

### Installation and Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Make sure you have Docker installed.
4. Create a `.env` file with the required configurations.
5. Run `docker-compose build` to build the application.
6. Run `docker-compose up` to start the application.
7. To run migrations for the tables, use `docker exec wayfarer-node-ts-server-1 npm run migrate up`.

### API Documentation

- Swagger (Todo)


## Testing

To run the tests:

1. Provide a DB URL link in the `.env` file.
2. Run migrations on the DB to create tables: `DB_URL=<test-db-connection string> npm run migrate up`.
3. Run `npm run test`.

## License

This project is licensed under the [MIT License](LICENSE).


