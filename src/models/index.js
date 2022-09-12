const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  operatorsAliases: false
});

sequelize.authenticate().then(
  console.log(`Database connect to ${dbConfig.DB} on ${dbConfig.HOST}`)
).catch((err) => {
  console.error(`Error: ${err.message}`);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
db.questions = require('./questionModel')(sequelize, DataTypes);
db.answers = require('./answerModel')(sequelize, DataTypes);
db.comments = require('./commentModel')(sequelize, DataTypes);

// Associations
db.users.hasMany(db.questions);
db.users.hasMany(db.answers);
db.users.hasMany(db.comments);
db.questions.hasMany(db.answers, { onDelete: 'cascade', allowNull: false });
db.answers.hasMany(db.comments, { onDelete: 'cascade', allowNull: false });

db.sequelize.sync({ force: true }).then(() => {
  console.log('yes re-sync done');
});

module.exports = db;
