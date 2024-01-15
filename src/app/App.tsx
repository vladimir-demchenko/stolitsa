import { MainPage } from 'pages/MainPage'
import { Suspense } from 'react'

import './styles/index.scss';

const App = () => {
  return (
    <div className='app'>
      <Suspense fallback="">
        <MainPage />
      </Suspense>
    </div>
  )
}

export default App;