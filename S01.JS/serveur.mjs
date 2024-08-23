import { createServer } from 'node:http'; //using ou #include

const premierServeur = createServer((request, response) => {
    console.log('Nous sommes dans le code du serveur');
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Mon premier serveur');
});


premierServeur.listen(3000, '127.0.0.1', () => {
    console.log('Le serveur est en fonction');
});