import * as express from 'express';
import { changeState, getConfig, setConfig } from './app/gpio/raspi-api';
import * as cors from 'cors';
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

// app.get('/api/gpio', async (req, res) => {
//   const gpios = await getGpios();
//   res.send(gpios);
// });

// app.get('/api/gpio/:pin', async (req, res) => {
//   if (!req.params.pin) {
//     res.sendStatus(404);
//     return;
//   }

//   const pin = parseInt(req.params.pin);
//   const gpio = await getGpio(pin);

//   if (!gpio) {
//     res.sendStatus(404);
//     return;
//   }

//   res.send(gpio);
// });

app.post('/api/config', async (req, res) => {
  const json = req.body as { trigger: number; relay: number };

  await setConfig(json.relay, json.trigger);

  res.sendStatus(202);
});

app.post('/api/on', async (_, res) => {
  const config = await getConfig();
  if (!config) {
    res.sendStatus(400);
    return;
  }

  await changeState(0);

  res.sendStatus(202);
});

app.post('/api/off', async (_, res) => {
  const config = await getConfig();
  if (!config) {
    res.sendStatus(400);
    return;
  }

  await changeState(1);

  res.sendStatus(202);
});

// app.post('/api/gpio/:pin', async (req, res) => {
//   try {
//     if (!req.params.pin) {
//       res.sendStatus(404);
//       return;
//     }

//     const pin = parseInt(req.params.pin);
//     const gpio = await getGpio(pin);

//     if (!gpio) {
//       res.sendStatus(404);
//       return;
//     }

//     const json = req.body;
//     const updated = await setGpio(pin, json.value, json.direction, json.edge);

//     res.send(updated);
//   } catch (err) {
//     console.error('Failed to write to GPIO', err);
//     res.sendStatus(500);
//   }
// });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
