const clients = require("../data/clients");

const handleClients = (req, res) => {
  if (!clients) {
    return res.status(500).json({ message: "Internal error" });
  }

  res.status(200).json(clients);
};

module.exports = handleClients;
