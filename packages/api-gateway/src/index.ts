import express from 'express';
import cors from 'cors';
import { setupProxies } from './proxy';
import { PORT } from './config';

const app = express();

app.use(cors());
app.use(express.json());

// Inject all reverse proxies
setupProxies(app);

// Health check
app.get('/', (_, res) => res.send('Gateway running ✅'));

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
