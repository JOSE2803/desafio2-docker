const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'mydb'
});


app.get('/', (req, res) => {

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados MySQL.');
  });

  const queryInsert = "INSERT INTO people (name) VALUES ('Desafio 2')";
  const querySelect = "SELECT name FROM people";

  connection.query(queryInsert, (err, result) => {

    if (err) {

      console.error('Erro ao inserir registro:', err);
      res.status(500).send('Erro ao inserir registro.');
      return;

    }

  });

  connection.query(querySelect, (err, result) => {

    if (err) {

      console.error('Erro ao consultar registros:', err);
      res.status(500).send('Erro ao consultar registros.');
      return;

    }

    const html = `
      <html>
        <head>
          <title>Lista de Pessoas - Desafio Full Cycle - Docker</title>
        </head>
        <body>
        <h1>Full Cycle Rocks!</h1>
          <ul>
            ${result.map(people => `<li>${people.name}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    res.send(html);

  });


});

app.listen(3000, () => {
  console.log('Servidor Express iniciado na porta 3000.');
});
