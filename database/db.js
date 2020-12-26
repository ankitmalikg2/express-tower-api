'use strict'

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DSN);

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.towers = require('../models/tower.js')(sequelize, Sequelize);

module.exports = db;
