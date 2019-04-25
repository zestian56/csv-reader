const parseHeaders = headers => {
  let newData = headers.reduce((start, key, index) => {
    return {
      ...start,
      [index]: {
        category: key
      }
    };
  });
  return newData;
};
const parseQuestions = (questions,data) => {
  let newData = questions.reduce((start, key, index) => {
    if (index <= 3) return start;
    return {
      ...start,
      [index]: {
        ...data[index],
        value: index,
        label: key,
        type: "result-json",
        data: {}
      }
    };
  }, {});
  return newData;
};
const parseAnswers = (answers, data) => {
  let newData = { ...data };
  for (let index = 4; index < answers.length; index++) {
    const answer = answers[index];
    const oldAnswer = newData[index].data[answer];
    const newAnswer = {
      ...oldAnswer,
      label: answer,
      count: Boolean(oldAnswer) ? oldAnswer.count + 1 : 1
    };
    newData[index].data = {
      ...newData[index].data,
      [answer]: newAnswer
    };
  }
  return newData;
};
module.exports = Object.assign(
  {},
  {
    parseQuestions,
    parseAnswers,
    parseHeaders
  }
);
