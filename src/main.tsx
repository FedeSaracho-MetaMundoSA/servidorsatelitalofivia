import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error telemetry to diagnose blank screens in sandboxed preview iframe
const errorLogs: string[] = [];
const renderCrashOverlay = (errorMsg: string, stack?: string) => {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="background-color: #0B0E14; color: #f8fafc; font-family: 'JetBrains Mono', monospace; padding: 2rem; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border: 2px solid #ef4444;">
        <div style="background-color: #1e1b4b; border: 1px solid #f97316; padding: 2rem; border-radius: 1rem; max-width: 600px; box-shadow: 0 0 30px rgba(249,115,22,0.25);">
          <span style="color: #f97316; font-size: 0.75rem; font-weight: bold; letter-spacing: 0.1em; background-color: rgba(249,115,22,0.1); padding: 0.5rem 1rem; border-radius: 9999px;">SISTEMA ERROR CRÍTICO</span>
          <h2 style="color: #ffffff; margin-top: 1.5rem; margin-bottom: 1rem; font-size: 1.25rem; font-weight: bold;">DIAGNÓSTICO DE PREVISUALIZACIÓN</h2>
          <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.5rem;">
            Ocurrió un error al inicializar el motor de renderizado de la aplicación. 
            Esto suele suceder en previsualizaciones de iFrame que restringen el contexto WebGL.
          </p>
          <div style="background-color: #020617; border: 1px solid rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem; text-align: left; font-size: 0.75rem; color: #ef4444; max-height: 200px; overflow-y: auto; white-space: pre-wrap;">${errorMsg}${stack ? '\n\n' + stack : ''}</div>
          <button onclick="window.location.reload()" style="margin-top: 1.5rem; background-color: #FF5665; color: #ffffff; border: none; padding: 0.75rem 1.5rem; font-weight: bold; border-radius: 0.5rem; cursor: pointer; transition: background-color 0.2s;">
            REINICIAR MOTOR DE ARRANQUE
          </button>
        </div>
      </div>
    `;
  }
};

window.addEventListener('error', (event) => {
  console.error("Uncaught runtime error logged by main.tsx:", event.error);
  const msg = event.error?.message || event.message || "Unknown runtime error";
  const stack = event.error?.stack || "";
  errorLogs.push(`${msg}\n${stack}`);
  // Log inside console only and let React's ErrorBoundary handle component crashes elegantly.
  // This prevents browser extension errors and 3rd-party scripts from triggering full-site blockages.
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn("Unhandled promise rejection caught by main.tsx (log only):", event.reason);
  const msg = event.reason?.message || String(event.reason) || "Unhandled promise rejection";
  const stack = event.reason?.stack || "";
  errorLogs.push(`${msg}\n${stack}`);
  // Log asynchronously to console so developers can find it, but do not interrupt/crash the UI
});

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error: any) {
  console.error("Render catch error inside main.tsx:", error);
  renderCrashOverlay(error?.message || "Render compilation error", error?.stack);
}
