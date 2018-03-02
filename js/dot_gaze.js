var url = "ws://localhost:4649/Echo";
var output;
var cali_offset_X = 250;
var cali_offset_Y = 350;
var reso_4K_X = 3840;
var reso_4K_Y = 2160;
var dot_size = 675;

function init () {
  output = document.getElementById ("output");
  setInterval(function(){ doWebSocket (); }, 450);
  
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

// function createDot(x, y){
//     var elem = document.createElement("div");
//     elem.setAttribute("class", "small_dot");
//     elem.setAttribute("style", "left:"+x+"px;top:"+y+"px;");
//     document.getElementsByTagName("body")[0].appendChild(elem);
//     return elem;
// }

// var Count_Num_Of_Dots = 0;

// function Add_Dot(){

//         if(Count_Num_Of_Dots < 50){

//             createDot(Math.floor(Math.random()*reso_4K_X-50), Math.floor(Math.random()*reso_4K_Y-50));
//             Count_Num_Of_Dots ++;
//             document.getElementById('num_of_dots').value ++;

//         }else{// stop timer

//             clearInterval(My_Timer_Var);

//         }
// }
// //

// // Timer
// var My_Timer_Var = setInterval(function(){ Add_Dot() }, .05);

function gazeDiv(x_pos, y_pos) {
  var d = document.getElementById('gaze');
  d.style.position = "absolute";
  d.style.left = clamp(x_pos,dot_size/2,reso_4K_X-dot_size*2/3)-cali_offset_X+'px';
  d.style.top = clamp(y_pos,dot_size/2,reso_4K_Y-dot_size/2)-cali_offset_Y+'px';
  var f = document.getElementById('words');
  f.innerHTML = "I know where you looking at!<br>"+
  "<span style=' position: relative; top: 50px; font-weight: 150%; font-size: 20px !important; color: #aaa;'>X "+x_pos+" Y "+y_pos+"</span>";
}

function doWebSocket () {
  websocket = new WebSocket (url);

  websocket.onopen = function (e) {
    onOpen (e);
  };

  websocket.onmessage = function (e) {
    onMessage (e);
  };

  // websocket.onerror = function (e) {
  //   onError (e);
  // };

  // websocket.onclose = function (e) {
  //   onClose (e);
  // };
}

function onOpen (event) {
  // writeToScreen ("CONNECTED");
  send ("connected");
}

function onMessage (event) {
  gazeDiv(event.data.split(":")[0],event.data.split(":")[1]);
  //writeToScreen ('<span style="color: blue;">RESPONSE: ' + event.data + '</span>');
  // websocket.close ();
}

function onError (event) {
  writeToScreen ('<span style="color: red;">ERROR: ' + event.data + '</span>');
}

function onClose (event) {
  writeToScreen ("DISCONNECTED");
}

function send (message) {
  // writeToScreen ("SENT: " + message);
  websocket.send (message);
}

function writeToScreen (message) {
  var pre = document.createElement ("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  // output.innerHTML += message+"<br>";
  // output.appendChild(pre);
}

window.addEventListener ("load", init, false);