const db = require('../db/db');

exports.getAllExhibits = () => {
  return db.getAll('exhibits');
};

exports.getExhibitById = (id) => {
  return db.getById('exhibits', id);
};

exports.addExhibit = (exhibit) => {
  return db.add('exhibits', exhibit);
};
