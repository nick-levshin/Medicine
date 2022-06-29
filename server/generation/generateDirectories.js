const { shuffle } = require('../utils/random');
const fs = require('fs');

module.exports = async function (directories) {
  directories.forEach(async (directory, dataPath) => {
    const count = await directory.count();
    if (count) {
      return;
    }

    const json = fs.readFileSync(dataPath);
    const data = JSON.parse(json);

    shuffle(data);

    data.forEach(async (element) => {
      await directory.create({ name: element });
    });
  });
};
