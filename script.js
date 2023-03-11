const addBookBtn = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const modalContent = document.getElementsByClassName("modal-content");
const span = document.getElementsByClassName("close")[0];

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

const test = new Book("bob", "al jaque", "22", true);

const test2 = new Book("Big", "Son Bonbbon", "2000", false);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookBtn.onclick = function () {
  modal.style.display = "block";
  createForm();
};

// To be used to increment myLibrary[i] for debugging purposes
// let i = 0;

// Create a break line element
const br = document.createElement("br");

// Create a form
function createForm() {
  // Create a form dynamically
  const form = document.createElement("form");
  form.setAttribute("class", "bookForm");
  form.setAttribute("method", "post");
  form.setAttribute("action", "submit.php");

  // Create an input element for Book Title
  const title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("name", "title");
  title.setAttribute("placeholder", "Book Title");

  // Create an input element for Author
  const author = document.createElement("input");
  author.setAttribute("type", "text");
  author.setAttribute("name", "author");
  author.setAttribute("placeholder", "Author");

  // Create an input element for Page Number
  const pages = document.createElement("input");
  pages.setAttribute("type", "number");
  pages.setAttribute("name", "pages");
  pages.setAttribute("placeholder", "Page Number");

  // Create an input element for Read
  const statusRead = document.createElement("input");
  statusRead.setAttribute("type", "radio");
  statusRead.setAttribute("name", "status");
  statusRead.setAttribute("value", "read");

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.innerText = "read";

  // Create an input element for Not Read
  const statusNotRead = document.createElement("input");
  statusNotRead.setAttribute("type", "radio");
  statusNotRead.setAttribute("name", "status");
  statusNotRead.setAttribute("value", "not read");

  const notReadLabel = document.createElement("label");
  notReadLabel.setAttribute("for", "not read");
  notReadLabel.innerText = "not read";

  // Create a submit button
  const s = document.createElement("input");
  s.setAttribute("type", "submit");
  s.setAttribute("value", "Submit");

  // Hide modal and remove form
  span.onclick = function () {
    modal.style.display = "none";
    form.remove(); // This prevents multiple form elements showing
  };
  // Hide modal and remove form
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      form.remove(); // This prevents multiple form elements showing
    }
  };

  // Append the full name input to the form
  form.appendChild(title);

  // Inserting a line break
  form.appendChild(br.cloneNode());

  // Append the author to the form
  form.appendChild(author);
  form.appendChild(br.cloneNode());

  // Append the emailID to the form
  form.appendChild(pages);
  form.appendChild(br.cloneNode());

  // Append the Password to the form
  form.appendChild(statusRead);
  form.appendChild(readLabel);
  form.appendChild(br.cloneNode());

  // Append the ReEnterPassword to the form
  form.appendChild(statusNotRead);
  form.appendChild(notReadLabel);
  form.appendChild(br.cloneNode());

  // Append the submit button to the form
  form.appendChild(s);

  modalContent[0].appendChild(form);

  form.addEventListener("submit", (event) => {
    // stop form submission
    event.preventDefault();
    const book = new Book(
      title.value,
      author.value,
      pages.value,
      form.status.value
    );

    addBookToLibrary(book);

    //   console.log(myLibrary[i].info());
    //   console.log(Object.keys(myLibrary));
    //   for (const key in myLibrary) {
    //   const value = myLibrary[key];

    //   console.log(key + ' : ' + value.info());

    // }
    //   i+=1
    //   console.log(i)
    form.remove();
  });
}
