/**
 * Performs sequential operations on a number with 3-second delays between operations:
 * 1. Divides the number by 2
 * 2. Squares it
 * 3. Calculates the area of a circle with it as radius
 * 4. Calculates what percentage the original number is of the area
 * 
 * @param {number} num - The starting number for calculations
 */
function timedCalculate(num) {
    console.log("Starting sequential calculations with 3-second delays...");

    // First operation: divide by 2 (performed immediately)
    const half = num / 2;
    console.log(`Half of ${num} is ${half}`);
    
    // Second operation: square the number (after 3 seconds)
    setTimeout(() => {
      const squared = num * num;
      console.log(`The square of ${num} is ${squared}`);
      
      // Third operation: calculate area of circle (after another 3 seconds)
      setTimeout(() => {
        const area = Math.PI * num * num;
        // Round to 2 decimal places for cleaner output
        const roundedArea = Math.round(area * 100) / 100;
        console.log(`The area of a circle with radius ${num} is ${roundedArea}`);
        
        // Fourth operation: calculate percentage (after another 3 seconds)
        setTimeout(() => {
          const percentage = (num / area) * 100;
          // Round to 2 decimal places for cleaner output
          const roundedPercentage = Math.round(percentage * 100) / 100;
          console.log(`${num} is ${roundedPercentage}% of ${roundedArea}`);
          console.log("All calculations completed!");
        }, 3000);
      }, 3000);
    }, 3000);
  }
  
  // main
  timedCalculate(10);