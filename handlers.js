const { clients } = require('./data/clients.js');

const handlerClientsData = (req, res) => {
  console.log('query', req.params[0], Object.keys(req.query).length);
  if (
    (req.params[0] == '' || req.params[0] == '/') &&
    Object.keys(req.query).length === 0
  ) {
    res.status(200).send(clients);
  } else {
    const QUERY = req.params[0].split('/');
    const QUERY_KEY = QUERY[1];
    const KEYS = Object.keys(clients[0]);
    if (KEYS.includes(QUERY_KEY)) {
      res.status(200).send(query(QUERY_KEY));
    }
  }
};

function query(key) {
  return clients.map((element) => {
    response = { name: element.name, key: element[key] };
  });
  let two = clients.map(
    (inventor) => (ob = { name: inventor.name, age: inventor.age })
  );
}

module.exports = {
  handlerClientsData,
};
