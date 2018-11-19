var five = require("johnny-five");
var firebase = require("firebase");
var board = new five.Board();
var controller = process.argv[2] || "GP2Y0A02YK0F";
board.on("ready", function() {

  var servo = new five.Servos([7,9, 10]);
  // Add servo to REPL (optional)
  this.repl.inject({
    servo: servo
  });
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);
var database = firebase.database();
database.ref().on('child_changed',function(snapshot) {
  console.log(snapshot.val());


  // Servo alternate constructor with options
    var proximity = new five.Proximity({
    controller: controller,
    pin: "A0"
  });
    var unlocked=false;
var pill1Count=0,pill1=snapshot.val();
  proximity.on("data", function() {
    //console.log("inches: ", this.inches);
    var cmmm=this.cm;
    //console.log(cmmm)
    if(cmmm!="Infinity"){
      if(cmmm>100){
      if(!unlocked){
      console.log("");
      pill1Count++;
      console.log("pill1Count  = ",pill1Count," and pill1 = ",pill1);
      console.log("");

      if(pill1Count==pill1){
        servo[1].stop();
      }
      console.log("Proximity : ", cmmm);
      console.log("Lock!!");
      console.log("");
unlocked=true;
}
// request('http://www.google.com', function (error, response, body) {
//   //console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   //console.log('body:', body); // Print the HTML for the Google homepage.
// });
}
else{
  if(unlocked && cmmm>6 && cmmm<100){
  console.log("Unlock : ",cmmm);
  unlocked=false;

   //servo[1].sweep();
}
}
}
   // }
  })
  
 servo[0].sweep();
  servo[1].sweep();
   servo[2].sweep();
  // Servo API

  // min()
  //
  // set the servo to the minimum degrees
  // defaults to 0
  //
  // eg. servo.min();

  // max()
  //
  // set the servo to the maximum degrees
  // defaults to 180
  //
  // eg. servo.max();

  // center()
  //
  // centers the servo to 90°
  //
  // servo.center();

  // servo.to( 0 )
  //
  // Moves the servo to position by degrees
  //
  // servo.to( 90 );
  //  servo.to( 180 );
  //   servo.to( 270 );
  
     //servo.to( 90 );
     
  // step( deg )
  //
  // step all servos by deg
  //
  // eg. array.step( -20 );
  let i=0;
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
 // var servo = new five.Servo(10);
// var servo = new five.Servo({
//     id: "MyServo",     // User defined id
//     pin: [9,10],           // Which pin is it attached to?
//     type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
//     range: [0,180],    // Default: 0-180
//     fps: 1,          // Used to calculate rate of movement between positions
//     invert: true,     // Invert all specified positions
//     startAt: 180,       // Immediately move to a degree
//     center: false,      // overrides startAt if true and moves the servo to the center of the range
//   });
  

// setInterval(function(){
//   // servo.center();
//   i++;
//   if(i==2)
//     servo.stop();
//   // servo.to( 90 );
//   // servo.sweep(90);
// },800);
//servo.step(20);
 
  //  this.wait(5000, function() {
  //   servo.stop();
  // });
});
