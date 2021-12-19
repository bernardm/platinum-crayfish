const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

router.use(express.json());

let decks = {
  1: {
    id: '1',
    name: 'Deutsche Bundesländer - Federal States of Germany',
  },
  2: {
    id: '2',
    name: 'German 7000 Intermediate/Advanced Sentences w/ Audio [1/2]',
  },
  3: {
    id: '3',
    name: 'Сильные немецкие глаголы и их перевод на русский',
  },
  4: {
    id: '4',
    name: 'Deutsch(German) → Japanisch(Japanese)【最強のドイツ語単語カードを目指して】',
  },
};
let deckKey = Object.keys(decks).length;

router.get('/decks', (req, res) => {
  return res.status(200).send(Object.values(decks));
});

// create deck
router.post('/decks', (req, res) => {
  const id = ++deckKey;
  const deck = { id, name: req.body['name'] };
  decks[id] = deck;
  return res.status(201).send(deck);
});

// read deck
router.get('/decks/:deckId', (req, res) => {
  const id = req.params.deckId;
  let deck, responseCode;

  if (id in decks) {
    deck = decks[id]
    responseCode = 200;
  } else {
    deck = null;
    responseCode = 404;
  }
  return res.status(responseCode).send(deck);
});

// update deck
router.put('/decks/:deckId', (req, res) => {
  const id = req.params.deckId;
  let deck, responseCode;

  if (id in decks) {
    deck = { id, name: req.body['name'] };
    responseCode = 200;
    decks[id] = deck;
  } else {
    deck = null;
    responseCode = 404;
  }
  return res.status(responseCode).send(deck);
});

// delete deck
router.delete('/decks/:deckId', (req, res) => {
  const {
    [req.params.deckId]: deck,
    ...otherDecks
  } = decks;
  decks = otherDecks;
  const responseCode = (typeof deck === 'undefined') ? 404 : 200;
  return res.status(responseCode).send(deck);
});

module.exports = router;
