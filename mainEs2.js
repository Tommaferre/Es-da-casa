/**
 * Does something very useful, i swear!
 * @returns {void}
 */
function useful() {
    console.log("This is useful");
  }
  
  /**
   * Cancels a scheduled function
   * @param {number} timeoutId - The ID of the timeout to cancel
   * @returns {void}
   */
  function cancelFunction(timeoutId) {
    clearTimeout(timeoutId);
    console.log("function cancelled");
  }
  
  // Schedule the useful function to run after 10 seconds. 
  // This doesn't stop the execution of the code, 
  // it starts a counter in the "background" and continue with the code.
  // It return a numeric ID that we store in the const timeoutId for a later reuse.
  const timeoutId = setTimeout(useful, 10000);
  
  // Cancel the scheduled function after 5 seconds
  setTimeout(() => {
    cancelFunction(timeoutId);
  }, 5000);

  // The function useful() so desn't print nothing because it will be cancelled before the time
  // goes out.