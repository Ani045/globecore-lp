import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

// Serve static files from dist directory under /test-lp path
app.use('/test-lp', express.static(path.join(__dirname, 'dist')));

// Handle React Router routes - redirect all /test-lp routes to index.html
app.get('/test-lp/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Optional: Redirect root to test-lp
app.get('/', (req, res) => {
  res.redirect('/test-lp');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/test-lp`);
  console.log(`📋 Quiz available at: http://localhost:${PORT}/test-lp`);
  console.log(`📊 Results page: http://localhost:${PORT}/test-lp/results`);
});