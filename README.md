# express-tower-api
an api example in nodeJS


### Steps to Run The Project
##### 1. Clone the Repo
##### 2. Run the Command
`cd express-tower-api`
`npm install`

##### 3. Create .env file in root directory
```
PORT=3000
DSN=postgres://username:password@localhost:5432/dbname
GOOGLE_APPLICATION_CREDENTIALS= {{PATH to Current Project}}/config/tower-api-project-0c7f12a6ce78.json
TEMP_TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4MGU0NW
```
`TEMP_TOKEN` is for the firbase JWT token
`{{PATH to Current Project}}` should be changed to absolute project path

##### 4. Run Postgres and run the following command in psql
`ALTER USER username WITH PASSWORD 'new_password';`
`CREATE DATABASE dbname WITH OWNER username`
change username and new_password with dbname in DSN (.env file)  and 'config/config.json' file

##### 5. Run following commands at project root location
`npx sequelize-cli db:migrate`
`npx sequelize-cli db:seed:all`
These commands will create tables and sample data into that

##### 5. Start Project
`nodemon npm start`

##### 6. Run tests
`npm run test`



Note: Curretly `config` directory has `tower-api-project-0c7f12a6ce78.json`  and `firebaseConfig.js` for running the project but need to remove these in future due to security concern.

### Postman Collection:
Postman Collection: [Collection File](docs/Towers-API.postman_collection.json)

Postman Environment: [Environment File](docs/Local.postman_environment.json)
