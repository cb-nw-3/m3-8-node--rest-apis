const { clients } = require('./data/clients.js');

const handlerClientsData = (req, res) => {
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
      if (req.query.key != undefined) {
        console.log('here I am', req.query.key);
        filteredClients = clients.filter(
          (elem) => elem[QUERY_KEY] === req.query.key
        );
        res.status(200).send(query(QUERY_KEY, filteredClients));
      } else {
        res.status(200).send(query(QUERY_KEY, clients));
      }
    }
  }
};

function query(key, array) {
  return array.map(function (elem) {
    ob = {};
    ob.name = elem.name;
    ob[key] = elem[key];
    return ob;
  });
}

module.exports = {
  handlerClientsData,
};
