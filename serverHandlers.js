const { clients } = require("./data/clients");

const handleUserRequest = (req, res) => {
  console.log("req.body: ", req.body);
  const { userId } = req.body;

  let requestedUser = clients.find((user) => user.id === userId);

  if (requestedUser) {
    res.status(200).send({ status: "success", user: requestedUser });
  } else {
    res.status(400).send({ status: "error", error: "not found" });
  }
};

const handleRandomWordRequest = (req, res) => {
  let randomIndex = Math.floor(
    Math.random() * Math.floor(wordObjectsArray.length)
  );
  let word = wordObjectsArray[randomIndex];

  if (!word) {
    res.status(500).send({ status: "error", error: "word doesn't exist" });
  }

  res.status(200).send({ id: word.id, letterCount: word.letterCount });
};

const handleAdminWord = (req, res) => {
  const { key, wordId } = req.params;
  const word = wordObjectsArray[wordId];

  if (!word) {
    res.status(404).send({ status: "error", error: "invalid wordId" });
    return;
  }
  if (key === masterKey) {
    res.status(200).send({ word });
  } else {
    res.status(400).send({ error: "not authorised" });
  }
};

const handlePlayerGuess = (req, res) => {
  const { wordId, letter } = req.params;

  const secretWord = wordObjectsArray.find(
    (item) => item.id === Number(wordId)
  );

  if (!secretWord) {
    res.status(404).send({ status: "error", error: "invalid wordId" });
    return;
  }
  const wordArray = secretWord.word.split("");
  const letterPosition = wordArray.map((item) => {
    return item === letter;
  });
  //console.log(letter);
  if (secretWord.word.includes(letter)) {
    res
      .status(200)
      .send({ status: "included", letterPosition: letterPosition });
  } else {
    res
      .status(200)
      .send({ status: "not included", letterPosition: letterPosition });
  }
};

module.exports = {
  handleUserRequest,
  handleRandomWordRequest,
  handleAdminWord,
  handlePlayerGuess,
};
