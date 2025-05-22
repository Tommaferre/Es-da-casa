This document contains JavaScript snippets that can be used in your browser's developer console to access various elements on the GOG.com website.

### Get all image elements on the page

```javascript
const images = document.querySelectorAll('img');
console.log(images);
```

### Select the main menù at the top of the page

```javascript
const mainMenu = document.querySelector('header nav');
console.log(mainMenu);
```

### Select all the news items under "News"

```javascript
const newsItems = document.querySelectorAll('section[data-testid="news"] article');
console.log(newsItems);
```

### Select the footer

```javascript
const footer = document.querySelector('footer');
console.log(footer);
```

### Select all the social media links at the bottom of the page

```javascript
const socialLinks = document.querySelectorAll('footer a[href*="facebook"], footer a[href*="twitter"], footer a[href*="youtube"], footer a[href*="instagram"]');
console.log(socialLinks);
```

## ATTENTION! Class and structure of the web site may change during time so it's always a good thing inspect the DOM to find selectors more precise and updated
