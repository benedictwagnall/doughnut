//

//Start everything on window load
window.onload = function () {

//Open the websocket connection
var malcolmSocket = new WebSocket('ws://localhost:8080/ws')



//Initialise the page elements we want to manipulate:
//
//WebSocket connection status div
var socketStatus = document.getElementById('status')
//The request button
var getterButton = document.getElementById('buttonGet')
//The response display div
var displayArea = document.getElementById('textUpdate')



//Make a JSON to send to Malcolm
var signalRequest =
  {
    "typeid": "malcolm:core/Get:1.0",
    "id": 1,
    "path": ["HELLO","signal","value"]
  };
//Make the JSON into a string so that Malcolm can parse.
var  stringySignalRequest = JSON.stringify(signalRequest)



var labelRequest = 
  {
    "typeid": "malcolm:core/Get:1.0",
    "id": 2,
    "path": ["HELLO","signal","meta","label"]
  }
var  stringyLabelRequest = JSON.stringify(labelRequest)







//When the socket is opened, update the status div
malcolmSocket.onopen = function(event){
  socketStatus.innerHTML = 'Connected to: '+ event.currentTarget.URL
  socketStatus.className = 'open'
};



//Error handling and reporting
malcolmSocket.onerror = function(error){
  socketStatus.innerHTML = 'WebSocket Error (check log)'
  console.log('ws error: ' +  error)
};



//Attach event handler to the button. When fired - send JSON to Malcolm
getterButton.addEventListener("click", function(){
  console.log("Button Click")
  malcolmSocket.send(stringyLabelRequest)
  malcolmSocket.send(stringySignalRequest)
});




//When we get a response, display malcolms reply in the display div
malcolmSocket.onmessage = function(event){
  var malcolmResponse = JSON.parse(event.data)
  handleResponse(malcolmResponse)
};


//Create an array to hold the Malcolm responses
var responseArray = [];
//Function to Add responses to an array.
var handleResponse = function(response){
  responseArray.push(response)

  //When array is created, pass it to the display handler
  displayMalcolmResponse(responseArray)
};




//Function to pick out the desired attributes of the objects in the response
//array.
var displayMalcolmResponse = function(responseArray){

//Empty string to start
  var displayString =""


    for(i=0 ; i<responseArray.length ; i++){
      //Add the value field of each object to the display string
      displayString += responseArray[i].value + " "
    }

    //Update the div with the array
    displayArea.innerHTML = displayString
};
};
