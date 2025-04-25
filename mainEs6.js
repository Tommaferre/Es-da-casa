/**
 * Calculates the date n days ago from the given date
 * @param {Date} date - The reference date
 * @param {number} days - The number of days to subtract
 * @returns {number} The day of the month n days ago
 */
function getDateAgo(date, days) {

    // Make a copy of the date to avoid modifying the original date
    // This passage in this case isn't necessary but it's good practice to avoid side effects(check the wrong execution below)
    let resultDate = new Date(date); // Create a new Date object to not modify the original
    
    
    //example of an wrong execution
    //let today = new Date();
    //let copiedDate = today;
    //copiedDate.setDate(copiedDate.getDate() - 2); modify the day in copiedDate
    //console.log(today); the date of today is changed, although i didn't touched it! 


    // Use setDate to change the day of the month
    resultDate.setDate(resultDate.getDate() - days); //if the number is negative -(-n) = + n so it goes ahead

    // Return the day of the month
    return resultDate.getDate();
}
  
  // main
  console.log(getDateAgo(new Date(), 1)); // Return yesterday's day
  console.log(getDateAgo(new Date(), 2)); // Return two days ago
  console.log(getDateAgo(new Date(), -2)); // If the number is negative, the function returns the n days ahead
  