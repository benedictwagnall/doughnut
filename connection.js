//Start everything on window load
window.onload = function () {

  //Open the websocket connection
  var malcolmSocket = new WebSocket('ws://localhost:8080/ws')

  //Get page elements to manipulate
  var socketStatus = document.getElementById('status')
  var getterButton = document.getElementById('buttonGet')
  var displayArea = document.getElementById('textUpdate')

  //Create request JSON
  var signalRequest = JSON.stringify
  (
    {
      "typeid": "malcolm:core/Get:1.0",
      "id": 1,
      "path": ["HELLO","signal"]
    }
  )

  //When the socket is opened, update the status div
  malcolmSocket.onopen = function(event){
    socketStatus.innerHTML = 'Connected to: '+ event.currentTarget.url
  }

  //Error handling and reporting
  malcolmSocket.onerror = function(error){
    socketStatus.innerHTML = 'WebSocket Connection Error'
  }

  //Attach event handler to the button. When fired - send JSON to Malcolm
  getterButton.addEventListener("click", function(){
    malcolmSocket.send(signalRequest)
 })

  //When we get a response, pick out what we want and slap it in the div
  malcolmSocket.onmessage = function(event){
    var response = JSON.parse(event.data)
    displayArea.innerHTML = response.value.meta.label+": "+response.value.value
  }
}
