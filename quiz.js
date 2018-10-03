let i = 0;
let Challenger;
const Quiz = [
    {
        question: 'Which is the cutest?',
        answers: {
            a: 'Shrek',
            b: 'A baby panda',
            c: 'A kitten',
            d: 'A puppy' 
        },
        correct: 'a'
    },
    {
        question: 'What is the most useful?',
        answers: {
            a: 'A phone',
            b: 'A car',
            c: 'The answers to the universe',
            d: 'A cup of tea'
        },
        correct: 'd'
    },
    {
        question: 'You wronged these people. Who is the most terrifying?',
        answers: {
            a: 'John Wick',
            b: 'El Chapo',
            c: 'Hannibal Lecter',
            d: 'Your wife'
        },
        correct: 'd'
    },
    {
        question: 'Who is the greatest mind in history?',
        answers: {
            a: 'Sir Isaac Newton',
            b: 'Kim Kardashian',
            c: 'Albert Einstein',
            d: 'Sherlock Holmes'
        },
        correct: 'b'
    },
    {
        question: 'Which is the largest creature in history?',
        answers: {
            a: 'The blue whale',
            b: 'Megalodon',
            c: 'The Rock',
            d: 'The giant squid'
        },
        correct: 'c'
    },
    {
        question: 'Which is the toughest?',
        answers: {
            a: 'Diamond',
            b: 'Metallic glass',
            c: 'The average millennials feelings',
            d: 'Lonsdaleite'
        },
        correct: 'c'
    }
]; 

class Player {
    constructor(name){
        this.name = name;   //so peoples names are linked with their score instead of being separate entities
        this.score = 0; 
    } 
    increaseScore() {
        this.score++;
    }
}

document.getElementById("start").addEventListener('click', loadQuiz);
document.getElementById("nextQ").addEventListener('click', nextQ);
document.getElementById("confirm").addEventListener('click', confirmAns);
document.getElementById("exit").addEventListener('click', exitQuiz);

function exitQuiz() {
    document.getElementById("results").style.visibility = "hidden"; //need to hide previous users results and show entry page for a new user to play
    document.getElementById("beforeQuiz").style.visibility = "visible";
    i = 0;      //used to loop through quiz object so reset so a new user starts on the first q
    let elements = document.getElementsByClassName("options");
        for (let counter=0; counter < elements.length; counter++) {
            elements[counter].style.border = "1px solid black"; //resetting to original border color because it was altered
        }
    document.getElementById("playerName").value = null; //shows text placeholder again, rather than empty
}

function loadNewInfo() {
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("nextQ").style.visibility = "hidden";   //dont want the users skipping questions
    document.getElementById("question").innerHTML = Quiz[i].question;
    document.getElementById("ansA").innerHTML = Quiz[i].answers.a;
    document.getElementById("ansB").innerHTML = Quiz[i].answers.b;
    document.getElementById("ansC").innerHTML = Quiz[i].answers.c;
    document.getElementById("ansD").innerHTML = Quiz[i].answers.d;
    document.getElementById("qNum").innerHTML = `Question ${i+1} of ${Quiz.length}`;    //so you can see how many q's left
}

function nextQ() {
    if (i < Quiz.length -1) {
        i++;
        loadNewInfo();
        let elements = document.getElementsByClassName("options");
        for (let counter=0; counter < elements.length; counter++) {
            elements[counter].style.border = "1px solid black";
        }
    } else {
        document.getElementById("quizContainer").style.visibility = "hidden";
        document.getElementById("results").style.visibility = "visible";    //show results, hide quiz
        document.getElementById("nextQ").style.visibility = "hidden";
        document.getElementById("challengerName").innerHTML = `Whew, congrats for surviving ${Challenger.name}, thats almost like a victory right?..Nope?..Okay. You wanna know your score, I know, I get it. Okay, here you go...`;
        document.getElementById("res").innerHTML = `${Challenger.score}/${Quiz.length}`;
    }
}

function confirmAns() {
    let chosenAns;
    let possibleChoices = document.getElementsByName("rad");

    for (c=0; c<possibleChoices.length; c++) {
        if (possibleChoices[c].checked) {   //only 1 answer can be checked, finds it and gets its value (a,b,c,d...preset upon creation)
            chosenAns = possibleChoices[c].value;

            if (chosenAns === Quiz[i].correct) {
                Challenger.increaseScore();
                document.getElementById(`opt-${Quiz[i].correct}`).style.border = "4px solid green"; //so the user knows theyre correct
                document.getElementById("confirm").style.visibility = "hidden";
                document.getElementById("nextQ").style.visibility = "visible"; //dont want them confirming again and increasing score. They need to move on
            } else {
                document.getElementById(`opt-${chosenAns}`).style.border = "4px solid red"; //shows user theyre wrong
                document.getElementById(`opt-${Quiz[i].correct}`).style.border = "4px solid green"; //shows them correct answer
                document.getElementById("confirm").style.visibility = "hidden";
                document.getElementById("nextQ").style.visibility = "visible";
            }
            break;
        }
    }
}

function loadQuiz() {
    let name = document.getElementById("playerName").value;
    let letters = /^[a-zA-Z]+$/;
    if (!name.match(letters)) {  //so only valid entries are accepted, no numbers etc
        alert("Come on, only letters, the quiz is waiting!");
        document.getElementById("playerName").value = "";
    } else {
        document.getElementById("beforeQuiz").style.visibility = "hidden";
        document.getElementById("quizContainer").style.visibility = "visible";
        Challenger = new Player(name);      //creates a new instance of a user so i dont have to reset it.
        loadNewInfo();
}
}