/**
 * Implementation of setInterval using setTimeout
 * 
 * @param {Function} callback - Function to execute repeatedly
 * @param {number} delay - Time between executions in milliseconds
 * @return {Object} Object with a clear method to stop execution
 */
function mySetInterval(callback, delay) {
  // Counter to track number of executions
  let count = 0;
  // To store the timeout ID
  let timer;

  // Function that will run repeatedly
  function repeat(){
    if (count < 15){
        callback();
        count++;
        timer = setTimeout(repeat, delay);
    } else {
        console.log("Executed 15 times, end of the program!");
    }
  }
  
  // Start the first execution
  timer = setTimeout(repeat, delay);

}

// Test code
console.log("Starting test...");

// Simple test function, it will print running! plus the date with seconds to see the waiting
function testFunction() {
  console.log("Running!", new Date().toLocaleTimeString());
}

mySetInterval(testFunction, 1000);