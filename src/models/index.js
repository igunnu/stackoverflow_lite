const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  operatorsAliases: 0,
  logging: false
});
const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
authenticateDB();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
db.questions = require('./questionModel')(sequelize, DataTypes);
db.answers = require('./answerModel')(sequelize, DataTypes);
db.votes = require('./voteModel')(sequelize, DataTypes);
db.comments = require('./commentModel')(sequelize, DataTypes);

// Associations
db.users.hasMany(db.questions);
db.users.hasMany(db.answers);
db.users.hasMany(db.comments);
db.questions.belongsTo(db.users, { as: 'author', foreignKey: 'userId' });
db.answers.belongsTo(db.users, { as: 'author', foreignKey: 'userId' });
db.comments.belongsTo(db.users, { as: 'author', foreignKey: 'userId' });
db.questions.hasMany(db.answers, { onDelete: 'cascade', allowNull: false });
db.answers.hasMany(db.comments, { onDelete: 'cascade', allowNull: false });
db.answers.hasMany(db.votes, { foreignKey: 'answerId' });

// db.sequelize.sync({ force: true, match: /_test$/ }).then(() => {
//   console.log('yes re-sync done');
// });

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done');
  });
}

module.exports = db;
