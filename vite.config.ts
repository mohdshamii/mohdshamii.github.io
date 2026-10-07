import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lab: resolve(__dirname, 'lab/index.html'),
      },
    },
    chunkSizeWarningLimit: 800,
  },
  plugins: [
    {
      name: 'resume-dist-support',
      closeBundle() {
        const distResumeDir = resolve(__dirname, 'dist', 'dist');
        const resumeFile = resolve(__dirname, 'dist', 'resume.pdf');
        if (fs.existsSync(resumeFile)) {
          if (!fs.existsSync(distResumeDir)) {
            fs.mkdirSync(distResumeDir, { recursive: true });
          }
          fs.copyFileSync(resumeFile, resolve(distResumeDir, 'resume.pdf'));
        }
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url === '/dist/resume.pdf' || req.url.startsWith('/dist/resume.pdf?'))) {
            const resumePath = resolve(__dirname, 'dist', 'resume.pdf');
            if (fs.existsSync(resumePath)) {
              res.setHeader('Content-Type', 'application/pdf');
              fs.createReadStream(resumePath).pipe(res);
              return;
            }
          }
          next();
        });
      },
    },
  ],
});