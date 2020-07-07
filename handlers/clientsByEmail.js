const clients = require("../data/clients");

const handleClientsByEmail = (req, res) => {
  const theRequestedEmail = req.params.email;
  if (!clients) {
    return res.status(500).json({ message: "Internal error" });
  }

  const foundEmail = clients.clients.find(
    (client) => client.email === theRequestedEmail
  );

  if (!foundEmail) {
    return res.status(401).json({ message: "Not existing client email" });
  }

  res.status(200).json(foundEmail);
};

module.exports = handleClientsByEmail;
