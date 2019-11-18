import 'bootstrap/dist/css/bootstrap.css'

import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './game/store'
import { MainView } from './components/MainView'

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <MainView />
    </div>
  </Provider>
)

export default App
