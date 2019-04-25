const csvFilePath = __dirname + "/assets/test.csv";
const csv = require("fast-csv");
const util = require("util");
const { parseQuestions,parseAnswers,parseHeaders } = require("./utils/csv");

const main = async () => {
  const resultData = await readCsv(csvFilePath);
  console.log(util.inspect(resultData, { showHidden: false, depth: null }));
};

const readCsv = path => {
  return new Promise((resolve, reject) => {
    let newData;
    let i = 0;
    csv
      .fromPath(path)
      .on("data", function(data) {
        if (i === 0) {
          newData= parseHeaders(data);
        }
        else if ( i === 1){
          newData = parseQuestions(data,newData);
        }
        else {
          newData = parseAnswers(data,newData);
        }
        i++;
      })
      .on("end", function() {
        return resolve({ data: newData, total: i - 1 });
      });
  });
};
main();
