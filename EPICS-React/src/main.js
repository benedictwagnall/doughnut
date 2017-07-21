import React from 'react'
import ReactDOM from 'react-dom'
import signalComponent from './SignalComponent'

class App extends React.Component{
  render(){
    return(
      <div>
        <SignalComponent signalVal={this.props.signal} />
      </div>
    )
  }

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(

    <App/>,
    document.getELementById('mount')

  )
})


}
