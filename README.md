# birthday-notification
Birthday notification based on client's timezone

# How to install:
- npm install
- npx sequelze db:create -> creates the database
- npx sequelize db:migrate -> migrate database tables
- npx sequelize db:seed:all -> seed the database

# Usage
API URL : localhost/api/v1.0/admin/user

Format for create/update user:

body: 
- first_name (string)
- last_name (string)
- birthdate (date format: YYYY-MM-DD)
- timezone (eg. Asia/Jakarta)
