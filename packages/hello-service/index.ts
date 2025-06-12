import express from 'express';

const app = express();
const port = process.env.PORT || 4001;

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the Hello Service!' });
});

app.listen(port, () => {
  console.log(`Hello Service running on http://localhost:${port}`);
});