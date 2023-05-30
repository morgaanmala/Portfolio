const els = {
    score: null,
    answer: null,
    choices: null
};

const words = [
    'JAVASCRIPT',
    'VERGE',
    'IMMACULE',
    'PANDA',
	"CALLBACK",
	"FONCTION",
	"RECURCIVE",
	"RESPONSIVE",
	"SERVER",
	"NAVIGATEUR",
	"SCRIPT",
	"INDEX",
	"STYLE",
	"DOCUMENT",
	"BODY",
	"BOUCLE",
	"CONDITION",
	"VARIABLE",
    "POUDRE",
    "ASTICOT",
    "TRICEPS",
    "BODYBUILDING",
    "INSTRUMENT",
    'TELEVISION',
    'GARAGE',
    'RESTAURANT',
    'SANDWICH',
    'BISCUIT',
    'ELEPHANT',
    'CROCODILE',
    'HAMSTER',
    'TRAMWAY',
    'TAXI',
    'AMBULANCE',
    'SCOOTER',
    'PRESIDENT',
    'ABSTENTION',
    'ABSTINENCE',
    'ACCESSIBLE',
    'HUMOUR',
    'IDIOT',
    'ESSENCE',
    'IMPORTANT',
    'INTERNET',
    'INTERNATIONAL',
    'MATHS',
    'POLICE',
    'SIMPLE',
    'SPORT',
    'IMAGINATION',
    'VIOLET',
    'ROSE',
    'LEGAL',
    'ABONDANCE'
];
let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;

const init = () => {
    // console.log('>> #init');

    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');

    word = pickWord();
    wordMapping = getWordMapping(word);
    choices = generateChoices();
    choicesMapping = getChoicesMapping(choices);
    displayWord(wordMapping);
    displayChoices(choicesMapping);
    // displayScore();
    els.choices.addEventListener('click', ({ target }) => {
        // evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        }
    });
};

document.addEventListener('keydown', ({ keyCode }) => {
        // evt:KeyboardEvent evt.keyCode => { keyCode }
        console.log('keyCode', keyCode);
        const letter = String.fromCharCode(keyCode);
        checkLetter(letter);
});

const checkLetter = (letter) => {
    let isLetterInWord = false;
    let isAllLettersFound = true;
    wordMapping.forEach((letterMapping) => {
        // console.log('letterMapping.letter', letterMapping.letter);
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });
    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
    });
    displayChoices(choicesMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
};

const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
    document.querySelector('body').style.backgroundColor = 'red';
    els.choices.innerHTML = `<h1>Perdu :'(</h1>`;
};
const winGame = () => {
    document.querySelector('body').style.backgroundColor = 'rgba(168, 201, 231, 0.808)';
    els.choices.innerHTML = `<h1>Bravo champion !</h1>`;
}

const displayChoices = (choicesMapping) => {
    const choicesHtml = choicesMapping.map ((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`;
        }
        else {
            return `<li class="disabled">${letterMapping.letter}</li>`;
        }
    });
    els.choices.querySelector('ul').innerHTML = choicesHtml.join('');
};

const displayScore = () => {
    els.score.innerHTML = `${scoreCount} / ${maxScore}`;
    // image pour le score
    els.score.innerHTML = `<img src="../pendu/pendu image/00${scoreCount}.png" alt="pendu" />`;
}

const displayWord = (wordMapping) => {
    const wordHtml = wordMapping.map((letterMapping) => {
        if (letterMapping.isVisible === true) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li>_</li>`;
        }
    });

    els.answer.querySelector('ul').innerHTML = wordHtml
};

const generateChoices = () => {
    const choices = [];
    for(let index = 65; index <= 90; index++) {
        choices.push(String.fromCharCode(index));
    }
    return choices;
};

const getChoicesMapping = (choices) => {
    const choicesMapping = choices.map ((letter) => {
    return {
        letter,
        isChosen: false
    };
    });
    return choicesMapping;
};

const getWordMapping = (word) => {
    const wordArr = word.split('');
    const wordMapping = wordArr.map((letter, index) => {
        let isVisible = false;
        if (index === 0) {
            isVisible = true;
        }
        // Si on veut afficher la dernière lettre au début du pendu
        if (index == wordArr.length - 0) {
            isVisible = true;
        }
        return {
            letter,
            isVisible
        };
    });
    return wordMapping;
};

const pickWord = () => {
    const randomIndex = getRandomInt(0, words.length -1);

    return words[randomIndex];
};

window.addEventListener('load', () => {
    init();
});

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

