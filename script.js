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

// const test = new Book("bob", "al jaque", "22", true);
// myLibrary.push(test)

// const test2 = new Book("Big", "Son Bonbbon", "2000", false);
// myLibrary.push(test2)
function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookBtn.onclick = function () {
  modal.style.display = "block";
  createForm();
};

function createCard() { // No need to reiterate/ just look at -1 in the array
  const getBook = myLibrary.length - 1
  // alert(cardClass.h2)// Alert h2 of all cards
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
  title.textContent = myLibrary[getBook].title
  // alert(myLibrary[book].title)
  author.textContent = myLibrary[getBook].author
  pages.textContent = myLibrary[getBook].pages
  status.textContent = myLibrary[getBook].read
}

const br = document.createElement("br");

function createForm() {

  const form = document.createElement("form");
  form.setAttribute("class", "bookForm");
  form.setAttribute("method", "post");
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


// TODO: Add functionaliy to status and delete buttons