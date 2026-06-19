import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth';
import contentRoutes from './routes/content';
import progressRoutes from './routes/progress';
import parentRoutes from './routes/parent';
import teacherRoutes from './routes/teacher';
import adminRoutes from './routes/admin';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

const corsSetting = process.env.CORS_ORIGIN?.trim();
const allowAllOrigins = corsSetting === '*';
const corsOrigins = corsSetting && !allowAllOrigins
  ? corsSetting.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(
  cors(
    allowAllOrigins
      ? { origin: true }
      : { origin: corsOrigins, credentials: true }
  )
);
app.use(express.json({ limit: '10mb' }));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Sains Tahun 1-6 Bijak API',
    version: '1.0.0',
    docs: '/api/health',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Sains Tahun 1-6 Bijak API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Laluan tidak dijumpai' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Ralat pelayan dalaman' });
});

const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Sains Bijak API berjalan di http://${HOST}:${PORT}`);
  console.log(`📚 Kesihatan: http://${HOST}:${PORT}/api/health`);
});

export default app;