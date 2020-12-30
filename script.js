const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}    

//Get quote from API
async function getQuote() {
    showloadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';    
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        console.log("Length: " + data.quoteText.length);
        quoteText.classList.remove('quote-text');
        //if no author info show as unknown
        if (data.quoteAuthor === '') {
           
             authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // reduce font for long quotes
        if (data.quoteText.length < 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('quote-text');
        }
        quoteText.innerText = data.quoteText;
    //stop loader and show quote    
    removeLoadingSpinner();

    } catch (error){
        ///getQuote();
        console.log('Darn, no quote', error);
    }
    //tweet quote
    function tweetQuote(){  
        const quote = quoteText.innerText;
        const author = authorText.innerText;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, '_blank');
    }

    //event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
}

// on load 
getQuote();
//showloadingSpinner();
