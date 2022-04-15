let myLibrary = [] 

function Book(title, author, pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        let msg
        if (this.read){
            return `${this.title} by ${this.author}, ${this.pages} pages, already read!`
        } else{
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet!`
        }
    }
    this.changeRead = function(){
        if (this.read == true){
            this.read = false
        }else{
            this.read = true
        }
    }
};

//Show cards of books
let showBooks = function(){
    myLibrary.forEach((book,index) => {
        addBook(book, index)
    })
}


//Remove all book cards
let removeBooks = function(){
    let books = document.querySelectorAll(".book")
        books.forEach(book => {
            book.remove();
        });
}

//Set the inputs to empty strings
clearInputs = function(){
    document.querySelectorAll("input").forEach(input => {
        input.value = ""
    })
}

//Creates a Book Card
function addBook(book, index) {
    let div = document.createDocumentFragment();
    fragment = document.createElement("div")
    fragment.className = "book" + " " + String(index)
    let title = document.createElement("p");
    title.className = "title"
    title.innerHTML = book.title;index
    fragment.appendChild(title);
    let author = document.createElement("p");
    author.className = "author"
    author.innerHTML = book.author;
    fragment.appendChild(author);
    let pages = document.createElement("p");
    pages.className = "pages"
    pages.innerHTML = book.pages;
    fragment.appendChild(pages);
    buttonDiv = document.createElement("div")
    buttonDiv.className = "buttons"
    let read = document.createElement("button");
    if (book.read == true){
        read.className = "Read readbutton";
        read.innerHTML = "Read";
        buttonDiv.appendChild(read);
    }else{
        read.className = "notRead readbutton";
        read.innerHTML = "Not Read";
        buttonDiv.appendChild(read);
    }
    let but = document.createElement("button")
    but.id = "killBook"
    but.innerHTML = "Remove"
    buttonDiv.appendChild(but)
    fragment.appendChild(buttonDiv)
    
    let Grid = document.querySelector(".grid-book");
    div.appendChild(fragment)
    Grid.appendChild(div)
};

//Open the form PopUp
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

//Closes the form PopUp
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

//Save the form information
function saveForm(){
    let info = Array.from(document.querySelectorAll('input')).reduce((acc,input) => ({...acc,[input.id]: input.value}),{});
    console.log(info)
    // insert pop up error
    let new_book = new Book(info.title,info.author,info.pages,info.read)
    new_book.read = document.getElementById("accepted").checked
    console.log(document.getElementById("accepted").checked)
    myLibrary.push(new_book)
    closeForm()
    removeBooks()
    showBooks()
    enableKill()
    clearInputs()
    changeStatus()
    return false;
}

//Enable the removal of cards
function enableKill(){
    let buttons = document.querySelectorAll("#killBook").length;
    for (let i = 0; i < buttons ; i++) {
        document.querySelectorAll("#killBook")[i].addEventListener("click", function() {
            console.log(`Button Clicked in Book ${i}`);
            myLibrary.pop(i)
            removeBooks()
            showBooks()
            enableKill()
            changeStatus()
        });
    }
}

//Changes the status of read in the site and in the array
function changeStatus(){
    let reads = document.querySelectorAll(".readbutton").length;
    for(let i = 0; i < reads; i++){
        document.querySelectorAll(".readbutton")[i].addEventListener("click", function(){
            myLibrary[i].changeRead()
            console.log("change me!!!!!")
            removeBooks()
            showBooks()
            enableKill()
            changeStatus()
        })
    }
}
