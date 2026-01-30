import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(), 
      mode === "development" && componentTagger(),
      // Custom plugin to handle /api/protocols in development
      {
        name: 'notion-api-dev',
        configureServer(server: any) {
          server.middlewares.use(async (req: any, res: any, next: any) => {
            if (req.url === '/api/protocols') {
              try {
                // Dynamically import the Notion service
                const { fetchProtocolsFromNotion } = await import('./src/lib/notionService.ts');
                
                const apiKey = env.NOTION_API_KEY;
                const databaseId = env.NOTION_DATABASE_ID;
                
                if (!apiKey || !databaseId) {
                  console.error('Missing credentials:', { hasKey: !!apiKey, hasDb: !!databaseId });
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Missing Notion credentials' }));
                  return;
                }
                
                const protocols = await fetchProtocolsFromNotion(apiKey, databaseId);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(protocols));
              } catch (error: any) {
                console.error('Error in /api/protocols:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  error: 'Failed to fetch protocols',
                  message: error.message 
                }));
              }
            } else {
              next();
            }
          });
        }
      }
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
