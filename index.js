// All book objects
const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
};

// Add Book To Library function
function addBookToLibrary(title, author, pages, read) {
  // Create a book from arguments
  // Store book into the array
  myLibrary.push(new Book(title, author, pages, read));
}

// loop through array (forEach)
// display each book on the page (on a table)
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');
let headerRow = '';
let bodyRow = '';


function displayBook() {
  // Remove all rows (tr)
  if (!(headerRow === '') && !(bodyRow === '')) {
    thead.replaceChildren();
    tbody.replaceChildren();
  }

  // Create header with obj keys as text nodes
  headerRow = document.createElement("tr");
  let keys = Object.keys(myLibrary[0]);

  let header = [];
  let headerText = [];

  // Add header and headerText values to both arrays
  for (let i = 0 ; i < keys.length ; i++) {
    header.push(document.createElement("th"));
    headerText.push(document.createTextNode(keys[i]));
  }

  // Append header value to headerText value
  for (let i = 0 ; i < header.length ; i++) {
    header[i].appendChild(headerText[i]);
    headerRow.appendChild(header[i]);
  }

  // Append row into table head (thead)
  thead.appendChild(headerRow);

  // ROW DATA time...
  for (let i = 0 ; i < myLibrary.length ; i++) {
    // Create each row (for the data)
    bodyRow = document.createElement("tr");

    // initialize data variables for each row
    let newData = '';
    let newText = '';

    for (let j = 0 ; j < Object.values(myLibrary[i]).length ; j++) {

      // add data for each row
      newData = document.createElement('td');
      newText = document.createTextNode(Object.values(myLibrary[i])[j]);

      // Append text to data cell (td)
      newData.appendChild(newText);

      // Append data cell (td) to row (tr)
      bodyRow.appendChild(newData);

    }

    // Add new delete button
    let deleteButton = document.createElement('button');
      
    // Add class to button
    deleteButton.classList = "button delete-button";

    // Add Text node and append
    deleteButton.appendChild(document.createTextNode('X'));

    // Append to the row
    bodyRow.appendChild(deleteButton);

    // Add Data Position to Row (to delete later)
    bodyRow.setAttribute("data-position", i);
    
    // Append rows to tbody
    tbody.appendChild(bodyRow);
  }
}

// Add New Book button

const newBookButton = document.querySelector('.new-book');
newBookButton.addEventListener("click", addBookPopup);
function addBookPopup(e) {
};

const submitNewBook = document.querySelector('.submit-new-book');
submitNewBook.addEventListener("click", bookSubmit);


function bookSubmit(e) {
  e.preventDefault();
  let title = document.querySelector('#book-title');
  let author = document.querySelector('#book-author');
  let pages = document.querySelector('#book-pages');
  let read = document.querySelector('input[type="radio"]:checked');

  if (
    (title.value.length > 0) &&
    (author.value.length > 0) &&
    (pages.value.length > 0) &&
    (read !== null)
  ) {
    addBookToLibrary(title.value, author.value, pages.value, read.value);
  } else {
    window.alert("All fields are required");
    return false;
  }

  // console.log(title.value);
  // console.log(author.value);
  // console.log(pages.value);
  // console.log(read);

  displayBook();

  // Clear from input
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;

}

// DeleteItem Event Listener
tbody.addEventListener('click', deleteItem);

function deleteItem(e) {
  // Get element for delete button in row
  if (e.target.classList.contains('delete-button')) {

    // get index of array using data-attribute
    let arr = e.target.parentElement.getAttribute("data-position");
  
    // Delete item from myLibrary object array
    myLibrary.splice(arr, 1);

    // The get the delete button's parent and remove it from the table list
    tbody.removeChild(e.target.parentElement);
  }
}
