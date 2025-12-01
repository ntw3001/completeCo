import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
  path: './.env'
});

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('alright alright')
})

app.get('/instagram', (req, res) => {
  res.send('In stag ram? What?')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
