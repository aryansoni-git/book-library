// HTML ELEMENTS
const container = document.querySelector('#container');
const addBookBtn = document.querySelector('#add-book');
const submitBtn = document.querySelector('#submit');
const addBookForm = document.querySelector('form');
const dialog = document.querySelector('dialog');
const errorMsg = document.querySelector('#error-msg');

// LIBRARY
const myLibrary = [];

// FUNCTIONS:

// BOOK OBJECT CONSTRUCTOR
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

// ADD BOOK TO LIBRARY
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

// Function to display books in the container
function displayBooks() {
    container.textContent = ''; // Clear previous content

    myLibrary.forEach(book => {
        // DIV's IN CONTAINER
        // Book
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        // Title
        const titleHeading = document.createElement('h3');
        titleHeading.textContent = `${book.title}`;
        // Author
        const authorDiv = document.createElement('div')
        const authorHeading = document.createElement('h4');
        const authorPara = document.createElement('p');
        authorHeading.textContent = `Author:`;
        authorPara.textContent = `${book.author}`;
        // Pages
        const pagesDiv = document.createElement('div')
        const pagesHeading = document.createElement('h4');
        const pagesPara = document.createElement('p');
        pagesHeading.textContent = `Pages:`;
        pagesPara.textContent = `${book.pages}`;
        // Status: Text & Toggle Img
        // Status
        const statusDiv = document.createElement('div')
        const statusHeading = document.createElement('h4');
        const statusPara = document.createElement('p');
        const statusText = document.createElement('span');
        statusHeading.textContent = `Status:`;
        statusText.textContent = `${book.isRead}`;
        // Toggle Img
        const toggleStatusBtn = document.createElement('img');
        toggleStatusBtn.setAttribute('src', './images/toggle.svg');
        toggleStatusBtn.setAttribute('style', 'filter: hue-rotate(90deg);');
        // Remove Button
        const removeBookBtn = document.createElement('button');
        removeBookBtn.textContent = 'Remove';

        // ADDING CLASS
        authorDiv.classList.add('info');
        pagesDiv.classList.add('info');
        statusDiv.classList.add('info');
        removeBookBtn.classList.add('remove-book');
        statusPara.classList.add('status-toggle');
        toggleStatusBtn.classList.add('toggle');

        // APPENDING
        // Author
        authorDiv.appendChild(authorHeading);
        authorDiv.appendChild(authorPara);
        // Pages
        pagesDiv.appendChild(pagesHeading);
        pagesDiv.appendChild(pagesPara);
        // Status
        statusDiv.appendChild(statusHeading);
        statusDiv.appendChild(statusPara);
        statusPara.appendChild(statusText);
        statusPara.appendChild(toggleStatusBtn);
        // Remove Button
        bookDiv.appendChild(removeBookBtn);
        // Div's In Book
        bookDiv.append(titleHeading, authorDiv, pagesDiv, statusDiv, removeBookBtn);
        // Book Div -> Container
        container.appendChild(bookDiv);

        // EVENT LISTENER : REMOVE BOOK BUTTON
        removeBookBtn.addEventListener('click', () => {
            const index = myLibrary.indexOf(book);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
            displayBooks();
        });

        // EVENT LISTENER : REMOVE BOOK BUTTON
        toggleStatusBtn.addEventListener('click', () => {
            statusText.textContent = statusText.textContent === 'reading' ? 'completed' : 'reading';
        })

    });
}

// EVENT LISTENERS

// Dialog outside click close
dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
    }
});

// Show add book dialog on button click
addBookBtn.addEventListener('click', () => {
    errorMsg.textContent = ``;
    addBookForm.reset();
    dialog.showModal();
});

// Prevent default form submission
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

// Add book to library and display on submit
submitBtn.addEventListener('click', () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#checkbox').checked ? 'reading' : 'not read yet';

    if (title === '' || author === '' || isNaN(pages) || pages <= 0) {
        errorMsg.textContent = `Please fill in all fields correctly.`;
    } else {
        const existingBook = myLibrary.find(book => book.title === title);
        if (existingBook) {
            errorMsg.textContent = `This book already exists in your library!`;
        } else {
            addBookToLibrary(title, author, pages, isRead);
            displayBooks();
            dialog.close();
        }
    }
});