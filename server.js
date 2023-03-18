import express from "express"
import axios from "axios";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.post('/weather', async (req, res) => {
  const { lat, lon } = req.body;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('I am running lol!');
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
