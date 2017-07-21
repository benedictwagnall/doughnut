import React from 'react-with-addons'

var SignalComponent = React.createClass({

  getInitialState: function() {
    return {
      signal:''
    }
  }


  var signalJSON =
       {
         "typeid": "malcolm:core/Get:1.0",
         "id": 1,
         "path": ["HELLO","signal","value"]
       }
  var signalRequest = JSON.stringify(signalJSON)


  componentDidMount(){
    var  malcConnection = new WebSocket('wss://localhost:8080/ws'); 

    window.setInterval(
      function(){ {malcConnection.send(signalRequest)} }, 1500 )
  }


  malcConnection.onmessage function(event){
    var malcResponse = JSON.parse(event.data)
    handleUpdate(malcResponse)
  }


  handleUpdate: function(newSignal){
    this.setState({
      signal: newSignal.target.value
    })
  }

  render:function(){
    <div> 
      //This isnt right.....
      Signal: {this.state.handleChange}
    </div>
  }


})
