/**
 * This script holds a book list with title, author, and cover image.
 * It styles books differently depending on whether they have been read.
 * It also loads an external CSS file after 5 seconds.
 */

// Array of book objects with title, author, read status and cover image
const books = [
  {
    title: 'Percy Jackson and the olympians',
    author: 'Rick Riordan',
    alreadyRead: true,
    url: 'percy_Jackson.jpg'
  },
  {
    title: 'Harry potter and the prisoner of azkaban',
    author: 'J.K. Rowling',
    alreadyRead: true,
    url: 'harry_potter.jpg'
  },
  {
    title: '1984',
    author: 'George Orwell',
    alreadyRead: false,
    url: '1984.jpeg'
  },
  {
    title: 'La Divina Commedia',
    author: 'Dante Alighieri',
    alreadyRead: false,
    url: 'divinaCommedia.jpeg'
  }
];

// Create a <ul> to hold the list of books
const ul = document.createElement('ul');

// Loop through each book in the array
books.forEach(book => {
  // Create <li> for each book
  const li = document.createElement('li');

  // Create a text node with book title and author
  const bookText = document.createTextNode(`${book.title} by ${book.author}`);
  li.appendChild(bookText);

  // Create an image element for the book cover
  const img = document.createElement('img');
  img.src = book.url;
  img.alt = `Cover of ${book.title}`;
  img.style.display = "block";
  img.style.marginTop = "8px";
  img.style.width = "100px";
  img.style.height = "150px";
  img.style.marginBottom= "8px";
  li.appendChild(img);

  // Style the book depending on read status
  if (book.alreadyRead) {
    li.style.color = "green";
  } else {
    li.style.color = "red";
  }

  // Add class to identify in CSS later
  li.className = book.alreadyRead ? "read" : "unread";

  // Append <li> to <ul>
  ul.appendChild(li);
});

// Append the full list to the body
document.body.appendChild(ul);

// Load external CSS after 5 seconds
setTimeout(() => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "styles.css";
  document.head.appendChild(link);
}, 5000);