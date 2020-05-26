class Timer {
  //called automatically when we create a new instance of timer
  //references to DOM elements
  //call backs optional argument
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }
  //solving the this problem inside of a class with arrow func
  start = () => {
    //start a timer
    //calling the tick funciton once every second
    //first checking if there is an onstart callback
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick(); // this will start the timer immedietly instead of waiting for the set interval to begin
    this.intervalId = setInterval(this.tick, 20); // capturing the setInterval id so that we can stop it and assiging it to an instanced variable using this so we can share it with the pause func
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    //stopping at 0
    if (this.timeRemaining <= 0) {
      this.pause();
      //checks to see if the onCOmplete callback was included
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      //update the timeRemaining minus 1 second
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };
  //getter method allows us to retrevie a variable inside of our class
  // and we dont need to call a method
  get timeRemaining() {
    //returning the string value out of the input and passing it to
    //parseFloat which converts it to a string if the number
    // as a decimal
    return parseFloat(this.durationInput.value);
  }
  // setter to change the value inside the input
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
