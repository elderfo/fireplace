import * as express from 'express';
import { getGpio, getGpios, setGpio } from './app/gpio/raspi-api';
import * as cors from 'cors';
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.get('/api/gpio', async (req, res) => {
  const gpios = await getGpios();
  res.send(gpios);
});

app.get('/api/gpio/:pin', async (req, res) => {
  if (!req.params.pin) {
    res.sendStatus(404);
    return;
  }

  const pin = parseInt(req.params.pin);
  const gpio = await getGpio(pin);

  if (!gpio) {
    res.sendStatus(404);
    return;
  }

  res.send(gpio);
});

app.post('/api/gpio/:pin', async (req, res) => {
  if (!req.params.pin) {
    res.sendStatus(404);
    return;
  }

  const pin = parseInt(req.params.pin);
  const gpio = await getGpio(pin);

  if (!gpio) {
    res.sendStatus(404);
    return;
  }

  const json = req.body;
  await setGpio(pin, json.value, json.direction, json.edge);

  res.sendStatus(200);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
