const db = require('../../models/index');

const { sequelize } = db;

const searchQuestion = async (body) => {
  const { searchQuery } = body;
  const [questions] = await sequelize.query(`SELECT * FROM questions  WHERE MATCH(title) AGAINST('${searchQuery}' IN NATURAL LANGUAGE MODE);`);

  return {
    questions,
    message: 'success'
  };
};

module.exports = searchQuestion;
