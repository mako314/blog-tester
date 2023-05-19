// Lets say we want to search a database of books, accounting for both the title and author of the book, and append the search result to a div we've created in the HTML.
// This is where we'll globally scope some variables we'll be using. Try to remember this for the futre (hint for when we reset our forms content)

const searchBar = document.querySelector("#search-form") //We set our searchBar variable to grab the html element with an id of "search-form"
const appendToMe = document.querySelector("#appendMe")

//console.log(searchBar) // We console log EVERYTHING. This is the SAFEST way to ensure you're going down the right path.

//We'll grab the searchBar variable and call an eventListener on it.

searchBar.addEventListener("submit", (e) => {   //  You use this addEventListener to get the value of what you input into the search form. We pass in the parameter E and make an arrow function.

    e.preventDefault() //call preventDefault on the event to prevent a refresh.
    //console.log(e) //Console log here to make sure you're getting the event information.
    searchBooks(e) //This is the function you’ll pass the event into.

  })
  
  function searchBooks(e){
    //create a FETCH to obtain the data located in the db.json
    fetch("http://localhost:3000/books")        //Make sure to run json-server --watch db.json
      .then(resp => resp.json())
      .then((books) => {

    console.log(books)                   // This console.log will ONLY run when you SUBMIT. (Review the callback located in our addEventListener)

    let searchInquiry = e.target["search"].value.toLowerCase()          //Lets make a variable to hold the content that's inputted into the search form.
    
    console.log(searchInquiry)          // Always console.log to make sure you’re grabbing the correct value, the value being 
    
    //The logic is taking a book, filtering and seeing what we're searching for matches the title or the author what's in our db.json .
    
    let filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchInquiry) || book.author.toLowerCase().includes(searchInquiry))       //
    
        if (filteredBooks.length === 0){
          alert("Sorry, but we currently do not have this book available.") //just something to output if nothing matches the search
        } else {
          filteredBooks.forEach(book  => { //After filtering through the books and seeing if  what is inputted into the searchInquiry matches what we have in our database (using include you can test for shorter answers.) 
          postSearchData(book) //Every time you submit, this function is ran, with the data that is being checked for above. 
          })    
      }
        searchBar.reset() //Since our searchBar variable is globally scoped, we can also call it here. .reset() simply resets the form after you submit.
    })}

    function postSearchData(book){
        console.log(book)

        let postedResults = document.createElement("ul")

        postedResults.textContent = book.title

        appendToMe.appendChild(postedResults)
    }