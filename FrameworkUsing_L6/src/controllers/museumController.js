const museumService = require('../services/museumService');

exports.getExhibits = (req, res) => {
  const exhibits = museumService.getAllExhibits();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(exhibits));
};

exports.getExhibit = (req, res) => {
  const exhibit = museumService.getExhibitById(req.params.id);
  if (exhibit) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(exhibit));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Экспонат не найден' }));
  }
};

exports.addExhibit = (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    const newExhibit = JSON.parse(body);
    const addedExhibit = museumService.addExhibit(newExhibit);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(addedExhibit));
  });
};
