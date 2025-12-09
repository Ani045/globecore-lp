import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

// Serve static files from dist directory under /depression-quiz path
app.use('/depression-quiz', express.static(path.join(__dirname, 'dist')));

// Handle React Router routes - redirect all /depression-quiz routes to index.html
app.get('/depression-quiz/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Optional: Redirect root to depression-quiz
app.get('/', (req, res) => {
  res.redirect('/depression-quiz');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/depression-quiz`);
  console.log(`📋 Quiz available at: http://localhost:${PORT}/depression-quiz`);
  console.log(`📊 Results page: http://localhost:${PORT}/depression-quiz/results`);
});