const db = require('../../models/index');

const { sequelize } = db;
const topQuestion = async () => {
  const [question] = await sequelize.query(`SELECT 
                                            questions.id, 
                                            questions.title, 
                                            questions.body, 
                                            questions.acceptedAnswer, 
                                            questions.createdAt, 
                                            questions.updatedAt, 
                                            users.username as author 
                                          FROM questions 
                                          JOIN 
                                            answers 
                                            ON 
                                              answers.questionId = questions.id 
                                          JOIN users 
                                            ON 
                                              questions.userId = users.id 
                                          GROUP BY 
                                            questions.id 
                                          ORDER BY 
                                            COUNT(answers.id) 
                                          DESC
                                          LIMIT 1;`);
  return {
    question,
    message: 'success'
  };
};

module.exports = topQuestion;
