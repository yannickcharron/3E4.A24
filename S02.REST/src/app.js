import express from 'express';
import dayjs from 'dayjs';

const app = express();

//Route: /status
app.get('/status', (req, res) => {
  res.status(200).end();
});

//Route: /
app.get('/', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'text/html');
  res.send('<h1>Première route vcfsdf</h1>');
});

app.get('/date', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(dayjs());
});

//Route: /math/somme
app.get('/math/:operation', (req, res) => {
  //endpoint : /math/somme
  console.log(req.query);
  const a = parseInt(req.query.a, 10);
  const b = parseInt(req.query.b, 10);

  const operation = req.params.operation;

  // 1. Le status de la réponse
  res.status(200);
  // 2. Type de réponse
  res.set('Content-Type', 'text/plain');

  let result = 0;
  switch (operation) {
    case 'somme':
      result = a + b;
      break;
    case 'difference':
      result = a - b;
      break;
    case 'produit':
      result = a * b;
      break;
    case 'quotient':
      result = a / b;
      break;
    case 'reste':
      result = a % b;
      break;
    default:
      res.status(400).end();
      return;
  }
  //3. Envoi de la réponse
  res.send(result.toString());
});

export default app;
