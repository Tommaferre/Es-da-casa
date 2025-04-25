/**
 * Returns the weekday of the given date in short format.
 * 
 * @param {Date} date - The date to get the weekday from
 * @param {string} [language='en'] - The language code ('en' for English, 'it' for Italian)
 * @returns {string} The weekday in short format ('MO', 'TU', etc. for English or 'LU', 'MA', etc. for Italian)
 */
function getWeekDay(date, language = 'en') {
    // Array of weekdays in English short format
    const englishDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    
    // Array of weekdays in Italian short format
    const italianDays = ['DO', 'LU', 'MA', 'ME', 'GI', 'VE', 'SA'];
    
    // Get the day index (0 = Sunday, 1 = Monday, etc.)
    const dayIndex = date.getDay();
    
    // Return the appropriate day based on language
    if (language === 'it') {
        return italianDays[dayIndex];
    } else {
        // Default to English
        return englishDays[dayIndex];
    }
}

//main
const today = new Date();
console.log(getWeekDay(today)); // Output: Day in English
console.log(getWeekDay(today, 'it')); // Output: Day in Italian