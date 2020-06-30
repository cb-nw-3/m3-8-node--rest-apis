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
        res.status(200).send(query(QUERY_KEY));
      } else {
        console.log(req.query);
        res
          .status(200)
          .send(clients.filter((elem) => (elem[QUERY_KEY] = req.query.key)));
      }
    }
  }
};

function query(key) {
  return clients.map(function (elem) {
    ob = {};
    ob.name = elem.name;
    ob[key] = elem[key];
    return ob;
  });
}

module.exports = {
  handlerClientsData,
};
