const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

router.use(express.json());

router.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

router.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

router.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

router.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

const decks = ['Deck One', 'Deck Two', 'Deck Three'];

const arrayHasIndex = (array, index) => Array.isArray(array) && array.hasOwnProperty(index);
function getDeck(id) {
  const index = parseInt(id)
  if (typeof id === 'undefined') {
    return decks.map((name, id) => ({ name, id }));
  } else if (arrayHasIndex(decks, index)) {
    return ({ id: index, name: decks[index] })
  } else {
    return -1
  }
}

router.get("/decks", (req, res) => {
  return res.status(200).json(getDeck());
});

router.get("/decks/:id", (req, res) => {
  const data = getDeck(req.params.id);
  if (data === -1) {
    const msg = `There is no deck with id ${req.params.id}.`;
    console.error(msg);
    return res
      .status(400)
      .send({ error: msg });
  } else {
    return res.status(200).json(data);
  }
});

router.post("/decks", (req, res) => {
  const id = decks.length;
  const name = req.body['name'];
  decks.push(name);
  return res.status(200).send({ id, name });
});

router.put("/decks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body['name'];
  decks[id] = name;
  return res.status(200).send({ id, name });
});

router.delete("/decks/:id", (req, res) => {
  return res.status(400).send({ error: "not implemented" });
});

/*
+ GET     /api/v1/decks         get all decks
+ GET     /api/v1/decks/:id     get specific deck by id
+ POST    /api/v1/decks         create a new deck
+ PATCH   /api/v1/decks/:id     edit specific deck by id
DELETE  /api/v1/decks/:id     delete specific deck by id
*/

module.exports = router;
