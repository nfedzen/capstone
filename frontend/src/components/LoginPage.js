// import React, { Component } from 'react'


// class LoginPage extends Component {
  
  
  
  //   render(){
    //     return (
      //       <section>
      //         <div className='action-bar'>
      //         </div>
      //         <div className='form'>
      //             <h1>Welcome to The Pregame</h1>
      //           <PlayerForm history={this.props.history} addPlayer={this.props.addPlayer} />
      //         </div>
      //       </section>
      //     );
      //   }
      // }
      
      // export default LoginPage;


import React, {useState} from 'react'
      
import PlayerForm from './PlayerForm'

export default function LoginPage({history, addPlayer}) {

  return(
    <section>
        <div className='action-bar'>
        </div>
        <div className='form'>
            <h1>Welcome to The Pregame</h1>
          <PlayerForm history={history} addPlayer={addPlayer} />
        </div>
      </section>
  )
}