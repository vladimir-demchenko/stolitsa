import App from 'app/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
)