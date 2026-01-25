import express from 'express';

const app = express();
const PORT = 3001;
app.use(express.json());

let ntwData = []
let nextId = 1

app.post('/ntws', (req, res) => {
  const { name, description } = req.body
  const newNtw = { id: nextId++, name, description }
  ntwData.push(newNtw)
  res.status(201).send(newNtw)
})

// Gather full list of ntws
app.get('/ntws', (req, res) => {
  res.status(200).send(ntwData)
})

// Get a specific ntw by id
app.get('/ntws/:id', (req, res) => {
  const ntw = ntwData.find(n => n.id === parseInt(req.params.id, 10))
  if (ntw) {
    res.status(200).send(ntw)
  } else {
    res.status(404).send({ error: 'There exists no such ntw' })
  }
})

// update a particular ntw
app.put('/ntws/:id', (req, res) => {
  const ntw = ntwData.find(n => n.id === parseInt(req.params.id, 10))
  if (ntw) {
    const { name, description } = req.body
    ntw.name = name
    ntw.description = description
    res.status(200).send(ntw)
  } else {
    res.status(404).send({ error: 'There exists no such ntw' })
  }
})

// delete a particular ntw

app.delete('/ntws/:id', (req, res) => {
  const ntwIndex = ntwData.findIndex(n => n.id === parseInt(req.params.id, 10))
  if (ntwIndex !== -1) {
    ntwData.splice(ntwIndex, 1)
    res.status(200).send("ntw deleted :(")
  } else {
    res.status(404).send({ error: 'There exists no such ntw' })
  }
})

// app.get('/', (_req, res) => {
//   res.send('Oh boy! It\'s me, friends, your old pal Express server!');
// })
// app.get('/about', (_req, res) => {
//   res.send('This is all about me and my adventures!.');
// })

// app.get('/contact', (_req, res) => {
//   res.send('Tell me about your emotions');
// })

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`)
})
