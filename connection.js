//

//Start everything on window load
window.onload = function () {

//Open the websocket connection
var malcolmSocket = new WebSocket('ws://localhost:8080/ws');

//Initialise the page elements we want to manipulate
var socketStatus = document.getElementById('status');
var displayArea = document.getElementById('textUpdate');
var getterButton = document.getElementById('buttonGet');

//Make a JSON to send to Malcolm
var requestJSON = 
  {

    "typeid": "malcolm:core/Get:1.0",
    "id" : 1,
    "path": ["HELLO","signal"]

  };

//Make the JSON into a string so that Malcolm can parse.
var  stringyJSON = JSON.stringify(requestJSON);

//When the socket is opened, update the status div
malcolmSocket.onopen = function(event){
  socketStatus.innerHTML = 'Connected to: '+ event.currentTarget.URL;
  socketStatus.className = 'open';
};


//Error handling and reporting
malcolmSocket.onerror = function(error){
  socketStatus.innerHTML = 'WebSocket Error (check log)';
  console.log('ws error: ' +  error)
};


//Attach event handler to the button. When fired - send JSON to Malcolm
getterButton.addEventListener("click", function(){
  console.log("Button Click");
  malcolmSocket.send(stringyJSON);
});

//When we get response, displays malcolms reply
malcolmSocket.onmessage = function(event){


//  var parsedMalcolmMessage = JSON.parse(event.data);
//  displayArea.innerHTML = "Malcolm's response: " + JSON.stringify(parsedMalcolmMessage.Signal); 
//  var parsedMalcolmMessage = JSON.parse(this.malcolmMessage);

    var malcolmMessage = (event.data);
    displayArea.innerHTML = "Malcolm's response: " + malcolmMessage;

  };

};
