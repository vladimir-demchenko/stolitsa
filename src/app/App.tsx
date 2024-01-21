import { MainPage } from 'pages/MainPage'
import { Suspense } from 'react'

import './styles/index.scss';
import { PersonalPage } from 'pages/PersonalPage';
import { FormPage } from 'pages/FormPage';

const App = () => {
  return (
    <div className='app'>
      <Suspense fallback="">
        {/* <MainPage /> */}
        {/* <PersonalPage /> */}
        <FormPage />
      </Suspense>
    </div>
  )
}

export default App;