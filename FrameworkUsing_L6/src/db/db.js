const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

exports.getAll = (collection) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  return data[collection];
};

exports.getById = (collection, id) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  return data[collection].find(item => item.id === id);
};

exports.add = (collection, item) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  data[collection].push(item);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  return item;
};
