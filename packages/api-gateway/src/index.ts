import express from 'express';
import cors from 'cors';
import { setupProxies } from './proxy';

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 4000;

app.use(cors());
app.use(express.json());

// Inject all reverse proxies
setupProxies(app);

// Health check
app.get('/', (_, res) => res.send('Gateway running ✅'));

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
