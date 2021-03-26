import React, { Component } from 'react'
import KingsCup from './components/KingsCup'
import LoginPage from './components/LoginPage'



class App extends Component {

  

  
  render(){
    return (
      <section>
        <div className="App">
          {/* <KingsCup /> */}
          <LoginPage />
        </div>
      </section>
      
    );
  }
}

export default App;
