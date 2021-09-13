This application calculates the rental price of a car from the parameters passed.
It is also possible to create a rental session and display a report from the database.
For the application to work correctly, you need to install the following products:

- PostgresSQL
- npm
- NodeJS
- NestJS

To run the app, you need:

1. Create new db.
2. Copy the content of db.dll and run this query in pg terminal or any postgres client.
3. Fill the tables: cars, discounts and tariffs.
4. Create .env file and fill it based on .env.example with yours connection data.
5. Run the command 'npm install' in terminal, to install all dependencies.
6. Run the command 'npm run start' in terminal.
