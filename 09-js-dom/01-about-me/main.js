/**
 * main.js - Simple script to modify the About Me page
 * This script performs the following tasks:
 * 1. Changes the body font
 * 2. Replaces span content with personal information
 * 3. Updates list item classes
 * 4. Adds an image to the page
 * 5. Creates and applies an external CSS file after 4 seconds
 */

// Change the body's font style
document.body.style.fontFamily = "Times New Roman, Serif";

// Replace span contents with personal info
document.getElementById("nickname").textContent = "Tommaso Ferrero";
document.getElementById("favorites").textContent = "Coding, Pizza, Beer";
document.getElementById("hometown").textContent = "Turin";

// Change class of all <li> elements to "list-item"
const listItems = document.getElementsByTagName("li");
for (let i = 0; i < listItems.length; i++) {
  listItems[i].className = "list-item";
}

// Create a new image element
const myImage = document.createElement("img");
myImage.src = "fototessera.jpg";
myImage.alt = "Profile picture";
myImage.style.marginTop = "10px";
myImage.style.width = "150px";
myImage.style.height = "150px";

// Append the image to the body
document.body.appendChild(myImage);

// Load external CSS after 4 seconds
setTimeout(() => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "styles.css";
  document.head.appendChild(link);
}, 4000);