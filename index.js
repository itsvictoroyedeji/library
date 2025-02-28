// All book objects
const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
};

// Add Book status prototype to toggle later in rows
Book.prototype.status = function() {
  return this.read.toLowerCase() == "yes" ? "Mark as unread" : "Mark as read"
}

// Add Book To Library function
function addBookToLibrary(title, author, pages, read) {
  // Create a book from arguments
  // Store book into the array
  myLibrary.push(new Book(title, author, pages, read));
}

// Add NEW BOOK button (POPUP DIALOG)
const showButton = document.getElementById("showDialog");
const mainDialog = document.getElementById("main-dialog");
const cancelButton = document.querySelector(".cancel-button");
const submitNewBook = document.querySelector('.submit-new-book');

// "Add Book to library" button to open modal
showButton.addEventListener("click", () => {
  mainDialog.showModal();
})

// Cancel Modal Button
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  mainDialog.close();
})

//Submit new book
submitNewBook.addEventListener("click", bookSubmit);
// CREATE BOOK INSTANCE AFTER BUTTON SUBMIT
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

  // RUN SUBMIT BOOK FUNCTION 
  displayBook();

  // Clear from input
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
  
  // Close dialog
  mainDialog.close();
}

// Declare global displayBook() values
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');
let headerRow = '';
let bodyRow = '';

// SUBMIT NEW BOOK TO MYLIBRARY OBJECT AND DISPLAY ON TABLE 
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
  
    // Add 1st letter capitalized version of value
    headerText
      .push(document
        .createTextNode(keys[i]
          .slice(0,1)
          .toUpperCase()
           + keys[i]
           .slice(1)
          )
        );
  }
  // Add extra header for edit buttons
  header.push(document.createElement("th"));
  headerText.push(document.createTextNode(''));

  // Append header value to headerText value
  for (let i = 0 ; i < header.length ; i++) {
    header[i].appendChild(headerText[i]);
    headerRow.appendChild(header[i]);
  }

  // Append row into table head (thead)
  thead.appendChild(headerRow);

  // ROW DATA time...
  for (let i = 0 ; i < myLibrary.length ; i++) {
    // Create each ROW (for the data)
    bodyRow = document.createElement("tr");

    // initialize data variables for each row
    let newData = '';
    let newText = '';

    for (let j = 0 ; j < Object.values(myLibrary[i]).length ; j++) {

      // add DATA for each row
      newData = document.createElement('td');
      newText = document.createTextNode(Object.values(myLibrary[i])[j]);

      // Append text to data cell (td)
      newData.appendChild(newText);

      // Append data cell (td) to row (tr)
      bodyRow.appendChild(newData);
    }

    // Add Extra "td" cell for Delete and "Mark As Read Buttons"
    let dataButtons = document.createElement('td');

    // Add Class to td element under "read" (to change later if need be) - The next 3 lines
    readIndex = Object.keys(myLibrary[0]).indexOf('read');

    let readIndexElement = bodyRow.querySelector(`td:nth-Child(${readIndex + 1})`);

    readIndexElement.classList = "read-status";

    // Add generate "read" status button
    readOrUnread = myLibrary[i].status();

    // Create "read" status text button
    let readStatus = document.createElement('span');

    // Add Class to text button
    readStatus.classList = "read-or-unread";

    // Add Text node and append to element
    readStatus.appendChild(document.createTextNode(readOrUnread));

    // Add "mark as read/unread" value attribute
    readStatus.setAttribute("data-value", readStatus.textContent)

    // Append read status to "td"
    dataButtons.appendChild(readStatus);

    // Add new delete button
    let deleteButton = document.createElement('button');
      
    // Add class to button
    deleteButton.classList = "button delete-button";

    // Add Text node and append
    deleteButton.appendChild(document.createTextNode('X'));

    // Append delete button to "td"
    dataButtons.appendChild(deleteButton);

    // Append "td" (delete/read status) to the row "tr"
    bodyRow.appendChild(dataButtons);

    // Add Data Position to Row (to delete later)
    bodyRow.setAttribute("data-position", i);
    
    // Append rows to tbody
    tbody.appendChild(bodyRow);
  }
}

// DeleteItem Event Listener
tbody.addEventListener('click', deleteItem);

function deleteItem(e) {
  // Get element for delete button in row
  if (e.target.classList.contains('delete-button')) {

    // get value of row array via data-attribute
    let arr = e.target.parentElement.parentElement.getAttribute("data-position");
  
    // Delete item from myLibrary object array
    myLibrary.splice(arr, 1);

    // Then get the delete button's parent and remove it from the table list
    tbody.removeChild(e.target.parentElement.parentElement);
  }
}

// Change Read Status
let readOrUnread = '';

// Get Index of 'read' (taken from end of displayBook() function)
let readIndex = '';

// Read Status Event Listener
tbody.addEventListener('click', changeReadStatus);

function changeReadStatus(e) {
  if (e.target.classList.contains('read-or-unread')) {

    // find read status on object
    let arr = e.target.parentElement.parentElement.getAttribute("data-position");

    if (myLibrary[arr].read == "Yes") {
      // Change "read" status on object
      myLibrary[arr].read = "No";

      // Change read status text on display table (next 2 lines)
      readOrUnread = myLibrary[arr].status();

      e.target.textContent = readOrUnread;

      e.target.setAttribute("data-value", readOrUnread);

      // Change read data on table
      e.target.parentElement.parentElement.children[readIndex].textContent = "No";
    } else {
      // Change "read" status on object
      myLibrary[arr].read = "Yes";

      // Change read status text on display table (next 2 lines)
      readOrUnread = myLibrary[arr].status();

      e.target.textContent = readOrUnread;

      e.target.setAttribute("data-value", readOrUnread);

      // Change read data on table
      e.target.parentElement.parentElement.children[readIndex].textContent = "Yes";
    }

  }
 
}
