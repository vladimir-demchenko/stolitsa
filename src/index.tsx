import App from 'app/App';
import { StoreProvider } from 'app/providers/StoreProvider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </>
)