const db = require('../../models/index');

const { sequelize } = db;

const searchQuestion = async (req) => {
  const { searchQuery } = req.body;
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 10;
  const offset = page * limit;
  const [questions] = await sequelize.query(`SELECT * FROM questions  WHERE MATCH(title) AGAINST('${searchQuery}' IN NATURAL LANGUAGE MODE) LIMIT ${limit} OFFSET ${offset}`);

  return {
    questions,
    message: 'success'
  };
};

module.exports = searchQuestion;
