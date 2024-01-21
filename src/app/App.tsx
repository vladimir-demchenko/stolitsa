import { MainPage } from 'pages/MainPage'
import { Suspense } from 'react'

import './styles/index.scss';
import { PersonalPage } from 'pages/PersonalPage';

const App = () => {
  return (
    <div className='app'>
      <Suspense fallback="">
        {/* <MainPage /> */}
        <PersonalPage />
      </Suspense>
    </div>
  )
}

export default App;