import express from 'express';

const app = express()

app.get('/', (req, res) => {
  res.send('alright alright yes I\'m here')
})

export default app;
