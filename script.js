const addBookBtn = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const modalContent = document.getElementsByClassName("modal-content");
const span = document.getElementsByClassName("close")[0];
const cardSpace = document.getElementsByClassName("card-space")[0];

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

function createCard(data) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const title = document.createElement("h2");

  const author = document.createElement("h3");

  const info = document.createElement("div");
  info.setAttribute("class", "page-status-container")

  const pages = document.createElement("p");

  const status = document.createElement("p");

  const changeStatus = document.createElement("button");
  changeStatus.textContent = "R"

  const remove = document.createElement("button");
  remove.textContent = "Del"

  cardSpace.appendChild(card)
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(info);
  info.appendChild(pages);
  info.appendChild(status);
  info.appendChild(changeStatus);
  card.appendChild(remove);

  title.textContent = data.title
  author.textContent = data.author
  pages.textContent = data.pages
  status.textContent = data.read
}
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

    createCard(book);

    form.remove();
    modal.style.display = "none";
  });
}
