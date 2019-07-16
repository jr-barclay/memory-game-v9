
// ----------> Global Scope <---------- //

let deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;


// ----------> Shuffle Function <---------- //


function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);

    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();



// ----------> Card Icons <---------- //

const icons = ['fa fa-diamond', 'fa fa-diamond',
                'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
                'fa fa-anchor', 'fa fa-anchor', 
                'fa fa-bolt', 'fa fa-bolt',
                'fa fa-cube', 'fa fa-cube',
                'fa fa-leaf', 'fa fa-leaf',
                'fa fa-bicycle', 'fa fa-bicycle',
                'fa fa-bomb', 'fa fa-bomb'
];


// ----------> Shuffling the deck <---------- //

// Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// ----------> Clicking a Card <---------- //

deck.addEventListener('click', event => {
    const clickTarget = event.target;
    
    if (isClickValid(clickTarget)) {
        if (clockOff) {
        startClock();
        clockOff = false;
        }
    }
        if (clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);

                // Can flip no more than 2 cards //
                if (toggledCards.length === 2) {
                checkForMatch();
                console.log('2 cards selected')
                }
                    // Cards Match //
                    if (toggledCards.length === 2) {
                    checkForMatch(clickTarget);
                    checkScore();
                    addMove();
                }
        }
});


// ----------> Flipping over a Card <---------- //

function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
    );
}

// ----------> Matching a Card <---------- //

function checkForMatch() {

    if (toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className) 
        
    {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matched++;
    const TOTAL_PAIRS = 8;

        } else {
        setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        console.log('not a match')
        toggledCards = [];
        }, 550);

            } if (toggledCards.length === 2) {
            checkForMatch(clickTarget);

                } if (matched === TOTAL_PAIRS) {
                gameOver();
    }
}

// ----------> Counting Player Moves <---------- //

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    // adds move after number
    movesText.innerHTML = moves;
}

// ----------> Moves Counter <---------- //

function checkScore() {
    if (moves === 16 | moves === 24
        ) { removeStar();
    }
}

        // removes star from Players moves, to start on 1

function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {

       if (star.style.display !== 'none') {
           star.style.display = 'none';
           break;
       }
    }
}
hideStar();
hideStar();


// ----------> Timer Clock <---------- //

        // Displays the time //

function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

        // Appends clock display (0:00) //

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    clock.innerHTML = time;

    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}


// ----------> Stopping Timer Clock <---------- //

function stopClock() {
    clearInterval(clockId);
}

// ----------> Reset Game <---------- //

function resetGame() {
    resetClockAndTime();
    resetMoves();
    resetStars();
    shuffleDeck();
}


function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelector('.stars li');
    for (star of starList) {
        star.style.display = inline;
    }
}


// ----------> Toggle Modal Window <---------- //

function toggleModal() {
    const modal = document.querySelector('.modal-background');
    modal.classList.toggle('hide');
}
toggleModal()   // on
toggleModal()    //off


// ----------> Replay the Game <---------- //


function replayGame() {
    resetGame();
    stopClock();
    toggleModal();
}

document.querySelector('.modal-button').addEventListener('click', () => {
    console.log('replay')
});

// ----------> Game Over <---------- //

function gameOver() {
    stopClock();
    toggleModal();
}

const TOTAL_PAIRS = 8;


// ----------> Game Stats <---------- //


function writeModalStats () {

    const timeStat = document.querySelector('.time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const moveStat = document.querySelector('.moves');

    const starsStat = document.querySelector('.stars')
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    moveStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}
writeModalStats();


function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;

    for (star of stars) {

        if (star.style.display !== 'none') {
            starCount++;
        }
    }
}
// return starCount;
