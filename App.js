import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HeroCanvas from './components/HeroCanvas';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const District = React.lazy(() => import('./views/Districts/district'));
const Districts = React.lazy(() => import('./views/Districts'));
const States = React.lazy(() => import('./views/States'));

export const Context = React.createContext({})

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  objToArr = (obj) => {
    const arr = []

    const stateKeys = Object.keys(obj)

    for (let i=1; i<stateKeys.length; i++) {
      const state = stateKeys[i]
      arr.push({ [state]: obj[state] })
    }

    arr.push({ [stateKeys[0]]: obj[stateKeys[0]] })

    this.setState({ data: arr })
  }

  componentDidMount() {
    fetch('https://data.covid19india.org/state_district_wise.json')
      .then(response => response.json())
      .then(data => this.objToArr(data))
      .catch(err => console.log(err))
  }

  render() { 

    const {
      state: {
        data
      }
    } = this;

    return (
      <div className="App">
        <Context.Provider value={{ data }} >
          <React.Suspense fallback={<HeroCanvas heroText="Loading..." />}>
            <Routes>
              <Route path="*" element={<HeroCanvas heroText="404! Not Found!" showHome />} />
              <Route path="/not-found" element={<HeroCanvas heroText="404! Not Found!" showHome />} />
              <Route path="/:stateCode/:district" element={<District />} />
              <Route path="/:stateCode" element={<Districts />} />
              <Route exact path="/" element={<States />} />
            </Routes>
          </React.Suspense>
        </Context.Provider>
      </div>
    )
  }
}
 
export default App;