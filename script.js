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
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookBtn.onclick = function () {
  modal.style.display = "block";
  createForm();
};

function createCard() {
  const getBook = myLibrary.length - 1
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const title = document.createElement("h3");

  const author = document.createElement("h4");

  const pages = document.createElement("p");

  const info = document.createElement("div");
  info.setAttribute("class", "card-options-container")

  

  const statusButton = document.createElement("button");
  statusButton.setAttribute("class", "status")

  const remove = document.createElement("button");
  remove.textContent = "Del"
  remove.setAttribute("class", "remove")
  cardSpace.appendChild(card)
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(info);
  info.appendChild(statusButton);
  info.appendChild(remove);

  title.textContent = myLibrary[getBook].title
  author.textContent = myLibrary[getBook].author
  pages.textContent = myLibrary[getBook].pages + " pages"
  statusButton.textContent = myLibrary[getBook].read

  
  changeStatus(statusButton, card);
  removeBook(remove, title, card)
}

function changeStatus(button, card) {
  button.onclick = function() {
    if (myLibrary[findIndex(card)].read === "not read") {
      myLibrary[findIndex(card)].read = "read";
      button.textContent = myLibrary[findIndex(card)].read;
    } else {
      myLibrary[findIndex(card)].read = "not read"; 
       button.textContent = myLibrary[findIndex(card)].read;
    }
   }
}

function removeBook(button, card) {
  button.onclick = function() {
    myLibrary.splice(findIndex(card), 1);
    card.remove();
 }
}

function findIndex(card) {// Finds the index of the card you're currently manipulating
  const elementPos = myLibrary.map(e => e.title).indexOf(card.firstChild.textContent);
  return elementPos
}

const br = document.createElement("br");

function createForm() {

  const form = document.createElement("form");
  form.setAttribute("class", "bookForm");
  form.setAttribute("method", "elementPost");
  form.setAttribute("action", "submit.php");

  const title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("name", "title");
  title.setAttribute("placeholder", "Book Title");

  const author = document.createElement("input");
  author.setAttribute("type", "text");
  author.setAttribute("name", "author");
  author.setAttribute("placeholder", "Author");

  const pages = document.createElement("input");
  pages.setAttribute("type", "number");
  pages.setAttribute("name", "pages");
  pages.setAttribute("placeholder", "Page Number");

  const statusRead = document.createElement("input");
  statusRead.setAttribute("type", "radio");
  statusRead.setAttribute("name", "status");
  statusRead.setAttribute("value", "read");

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.innerText = "read";

  const statusNotRead = document.createElement("input");
  statusNotRead.setAttribute("type", "radio");
  statusNotRead.setAttribute("name", "status");
  statusNotRead.setAttribute("value", "not read");

  const notReadLabel = document.createElement("label");
  notReadLabel.setAttribute("for", "not read");
  notReadLabel.innerText = "not read";

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

  form.appendChild(title);

  form.appendChild(br.cloneNode());

  form.appendChild(author);
  form.appendChild(br.cloneNode());

  form.appendChild(pages);
  form.appendChild(br.cloneNode());

  form.appendChild(statusRead);
  form.appendChild(readLabel);
  form.appendChild(br.cloneNode());

  form.appendChild(statusNotRead);
  form.appendChild(notReadLabel);
  form.appendChild(br.cloneNode());

  form.appendChild(s);

  modalContent[0].appendChild(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const book = new Book(
      title.value,
      author.value,
      pages.value,
      form.status.value
    );

    addBookToLibrary(book);

    createCard();

    form.remove();
    modal.style.display = "none";
  });
}
