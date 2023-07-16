
//get page elements
var highscoreEl = document.querySelector("#highscore");
var gamespace = document.querySelector("#gamespace");

console.log(highscore);
console.log(gamespace);

//set up highscore object
var highscore = {
  name:"___",
  score:0
};

var lastHighscore = JSON.parse(localStorage.getItem("highscore"))
console.log(lastHighscore)
if (lastHighscore == null){
  localStorage.setItem("highscore", JSON.stringify(highscore))
  lastHighscore = localStorage.getItem(JSON.stringify("highscore"))
}
 
highscoreEl.textContent = "Hightscore:" + lastHighscore.name + ":" + lastHighscore.score


//define page element creation functions
function buttonStart() {
  var startButton = document.createElement("button");
  startButton.setAttribute("id", "start");
  return startButton;
}

function p() {
    var text = document.createElement("p");
    return text;
}

function button1() {
  var button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("data-type", "button1");
  return button;
}

function button2() {
  var button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("data-type", "button2");
  return button;
}

function button3() {
  var button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("data-type", "button3");
  return button;
}

function button4() {
  var button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("data-type", "button4");
  return button;
}

//establish answers variable for the randomize answer function
var answers = undefined;

//function to randomize the order which answers appear
function randomizeAnswerOrder(answers){
  var answerArray = answers

  var text1 = answerArray[Math.floor(Math.random()*4)]
  var answerArray2 = answerArray.filter(function(value) {
    return value !== text1;
  });

  var text2 = answerArray2[Math.floor(Math.random() * 3)]
  var answerArray3 = answerArray2.filter(function(value) {
    return value !== text2;
  });

  var text3 = answerArray3[Math.floor(Math.random() * 2)]
  var answerArray4 = answerArray3.filter(function(value) {
    return value !== text3;
  });

  var text4 = answerArray4[0]

  return [text1, text2, text3, text4]
}

var secondsLeft = undefined;
var score = 0;

//function to initialize the timer


//main function. Used as a function so that it can be called within itself. 
function stateresult() {
    //get the state data variable here, at the beginning of the function
    var state = gamespace.dataset.state;

    function setTime() {

      var timer = document.createElement("h1")
      gamespace.appendChild(timer)
    
      var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds left.";
    
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          timer.remove()
          gamespace.dataset.state = "6"
          stateresult()
        }
    
      }, 1000);
    }

    //set up the page for each different state
    if (state === "0") {
        console.log("start");
        var startButton = buttonStart();
        gamespace.appendChild(startButton);
     
        startButton.textContent = "Start";
        
        //deal with button press
        startButton.addEventListener("click", function() {
            event.preventDefault();
            gamespace.dataset.state = "1";
            startButton.setAttribute("class", "clicked");
            startButton.remove();
            

            //set timer on button press
            secondsLeft =15;
            setTime();
            
            stateresult();
        });
    }
    else if (state === "1") {
        console.log("state 1");

        //add all elements
        var question = p();
        gamespace.appendChild(question);

        var answer1 = button1();
        gamespace.appendChild(answer1);

        var answer2 = button2();
        gamespace.appendChild(answer2);

        var answer3 = button3();
        gamespace.appendChild(answer3);

        var answer4 = button4();
        gamespace.appendChild(answer4);


        //set the answers array
        var answers = ["document.querySelector()", "document.selectElement()", "html.select()", "page.grabElement()"]

        //randomize the order
        var questionAnswers = randomizeAnswerOrder(answers);

        //set answers and question text
        question.textContent = "How do you select an element of your webpage html?"
        answer1.textContent = questionAnswers[0];
        answer2.textContent = questionAnswers[1];
        answer3.textContent = questionAnswers[2];
        answer4.textContent = questionAnswers[3];

        //select all current answer buttons
        var answerButtons = gamespace.querySelectorAll("button[data-type^='button']");


        //function for whenever any of the buttons are pressed
        answerButtons.forEach(function(button) {
            button.addEventListener("click", function(event) {
                event.preventDefault();

                //change state
                gamespace.dataset.state = "2";
                button.setAttribute("class", "clicked");


                //correct or false
                if (button.textContent === "document.querySelector()") {
                console.log("correct");
                score++;
                } 
                else {
                console.log("incorrect");
                } 

                //remove all new elements for next stage
                answerButtons.forEach(function(btn) {
                    btn.remove();
                });
                question.remove();
                stateresult(); 


            
    
            });
        });

    }
    else if (state == "2") {
        console.log("state 2");

        var question = p();
        gamespace.appendChild(question);

        var answer1 = button1();
        gamespace.appendChild(answer1);

        var answer2 = button2();
        gamespace.appendChild(answer2);

        var answer3 = button3();
        gamespace.appendChild(answer3);

        var answer4 = button4();
        gamespace.appendChild(answer4);

        var answers = ["html.add()", "document.elementSet()", "Elements add themselves", "(querySelected Item).appendChild()"]
        var questionAnswers =randomizeAnswerOrder(answers);

        question.textContent = "How do you add elements created and JavaScript to the page?"
        answer1.textContent = questionAnswers[0];
        answer2.textContent = questionAnswers[1];
        answer3.textContent = questionAnswers[2];
        answer4.textContent = questionAnswers[3];


        var answerButtons = gamespace.querySelectorAll("button[data-type^='button']");

        answerButtons.forEach(function(button) {
            button.addEventListener("click", function(event) {
                event.preventDefault();
                gamespace.dataset.state = "3";
                button.setAttribute("class", "clicked");

                if (button.textContent === "(querySelected Item).appendChild()") {
                console.log("correct");
                score++
                } 
                else {
                console.log("incorrect");
                } 
                answerButtons.forEach(function(btn) {
                    btn.remove();
                });
                question.remove()
                stateresult(); 


            
    
            });
        });

    }
    else if (state == "3") {
      console.log("state 3");

      var question = p();
      gamespace.appendChild(question);

      var answer1 = button1();
      gamespace.appendChild(answer1);

      var answer2 = button2();
      gamespace.appendChild(answer2);

      var answer3 = button3();
      gamespace.appendChild(answer3);

      var answer4 = button4();
      gamespace.appendChild(answer4);

      var answers = ["element.document.attribute()", "element.setAttribute()", "element.Attribute()", "JavaScript can't do that. "]
      var questionAnswers =randomizeAnswerOrder(answers);

      question.textContent = "How do you select an attribute of a selected or created element?"
      answer1.textContent = questionAnswers[0];
      answer2.textContent = questionAnswers[1];
      answer3.textContent = questionAnswers[2];
      answer4.textContent = questionAnswers[3];


      var answerButtons = gamespace.querySelectorAll("button[data-type^='button']");

      answerButtons.forEach(function(button) {
          button.addEventListener("click", function(event) {
              event.preventDefault();
              gamespace.dataset.state = "4";
              button.setAttribute("class", "clicked");

              if (button.textContent === "element.setAttribute()") {
              console.log("correct");
              score++;
              } 
              else {
              console.log("incorrect");
              } 
              answerButtons.forEach(function(btn) {
                  btn.remove();
              });
              question.remove()
              stateresult(); 


          
  
          });
      });

  }
  else if (state == "4") {
    console.log("state 4");

    var question = p();
    gamespace.appendChild(question);

    var answer1 = button1();
    gamespace.appendChild(answer1);

    var answer2 = button2();
    gamespace.appendChild(answer2);

    var answer3 = button3();
    gamespace.appendChild(answer3);

    var answer4 = button4();
    gamespace.appendChild(answer4);

    var answers = ["element.state = '_'", "element.data.state()", "element.dataset.state = '_'", "element.dataset.state()"]
    var questionAnswers =randomizeAnswerOrder(answers);

    question.textContent = "Say we have an element with a data variable of 'state'. How do we change it?"
    answer1.textContent = questionAnswers[0];
    answer2.textContent = questionAnswers[1];
    answer3.textContent = questionAnswers[2];
    answer4.textContent = questionAnswers[3];


    var answerButtons = gamespace.querySelectorAll("button[data-type^='button']");

    answerButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            gamespace.dataset.state = "5";
            button.setAttribute("class", "clicked");

            if (button.textContent === "element.dataset.state = '_'") {
            console.log("correct");
            score++;
            } 
            else {
            console.log("incorrect");
            } 
            answerButtons.forEach(function(btn) {
                btn.remove();
            });
            question.remove()
            stateresult(); 


        

        });
    });

  }
  else if (state == "5") {
    console.log("state 5");

    var question = p();
    gamespace.appendChild(question);

    var answer1 = button1();
    gamespace.appendChild(answer1);

    var answer2 = button2();
    gamespace.appendChild(answer2);

    var answer3 = button3();
    gamespace.appendChild(answer3);

    var answer4 = button4();
    gamespace.appendChild(answer4);

    var answers = ["element.dataset.variable", "element.dataset('variable')", "element.data.variable", "element.dataSet('type', 'variable')"]
    var questionAnswers =randomizeAnswerOrder(answers);

    question.textContent = "In order to add a variable in JS for an elements dataset variable, we use var 'name' = _____"
    answer1.textContent = questionAnswers[0];
    answer2.textContent = questionAnswers[1];
    answer3.textContent = questionAnswers[2];
    answer4.textContent = questionAnswers[3];


    var answerButtons = gamespace.querySelectorAll("button[data-type^='button']");

    answerButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            gamespace.dataset.state = "6";
            button.setAttribute("class", "clicked");

            if (button.textContent === "element.dataset.variable") {
            console.log("correct");
            score++;
            } 
            else {
            console.log("incorrect");
            } 
            answerButtons.forEach(function(btn) {
                btn.remove();
            });
            question.remove()
            stateresult(); 


        

        });
    });

  }

  else if (state == "6") {
    console.log("6")
    
    //remove all elements on gamespace
    for (i = 0; i != gamespace.childElementCount;){
      gamespace.firstChild.remove();
    }

    //result text for screen
    var resultText = document.createElement("h1");
    gamespace.appendChild(resultText);
    

    //if the player made a new highscore, allow them to change the highscore value with their own name.
    //Otherwise, just set up for the player to play again.
    if (score > highscore.score){

      //add all text
      resultText.textContent = "Congrats, you made a new highscore!"
      var formInstruction = document.createElement("h3")
      gamespace.appendChild(formInstruction)
      formInstruction.textContent = "Enter your three character name"

      var nameFormShow = document.createElement("h3")
      gamespace.appendChild(nameFormShow);
      
      //add a name array for the player to interact with through keyboard events
      var nameArray = ["_", "_", "_"]
      nameFormShow.textContent = nameArray.join('');

      //watch for keydown events. When one happens, place the key value into an empty array spot. 
      document.addEventListener("keydown", function(event){
        console.log(event.key)
        if (nameArray[0] == "_"){
          console.log("yes")
          nameArray[0] = event.key
        }
        else if(nameArray[1] == "_"){
          nameArray[1] = event.key
        }
        else if (nameArray[2] == "_"){
          nameArray[2] = event.key
        }
        
        //change the display of the fake input bar whenever a letter is added
        nameFormShow.textContent = nameArray.join('');
      })

      //add a submit button
      var submitBtn = document.createElement("button");
      submitBtn.textContent = "Submit";
      gamespace.appendChild(submitBtn);


      //when pressed, the submit button changes the local storage highscore array
      //When pressed, the button sets the screen for the player to start again. 
      submitBtn.addEventListener("click", function(){
        event.preventDefault()
        var newName = nameArray.join('');
        highscore.name = newName;
        highscore.score = score;

        localStorage.setItem("highscore", JSON.stringify(highscore))
        console.log(highscore)

        lastHighscore = JSON.parse(localStorage.getItem("highscore"))
        highscoreEl.textContent = "Highscore:" + lastHighscore.name + ":" + lastHighscore.score
        score = 0
        for (i = 0; i != gamespace.childElementCount;){
          gamespace.firstChild.remove();
        }

        var tryAgain = document.createElement("h3")
        tryAgain.textContent = "Want to try again?"
        gamespace.appendChild(tryAgain)

        var startButton = buttonStart();
        gamespace.appendChild(startButton);
     
        startButton.textContent = "Start";
        
        //New start button here
        startButton.addEventListener("click", function() {
            event.preventDefault();
            gamespace.dataset.state = "1";
            startButton.setAttribute("class", "clicked");
            startButton.remove();

            //remove all previous elements
            for (i = 0; i != gamespace.childElementCount;){
              gamespace.firstChild.remove();
            }
            

            //set timer on button press
            secondsLeft =15;
            setTime();
            
            stateresult();
        });
      })
    }
    else{
      score = 0
      resultText.textContent = "Dang, looks like you didn't beat the highscore this time. "
      var tryAgain = document.createElement("h3")
      tryAgain.textContent = "Want to try again?"
      gamespace.appendChild(tryAgain)

      var startButton = buttonStart();
        gamespace.appendChild(startButton);
     
        startButton.textContent = "Start";
        
        //deal with button press
        startButton.addEventListener("click", function() {
            event.preventDefault();
            gamespace.dataset.state = "1";
            startButton.setAttribute("class", "clicked");
            startButton.remove();
            

            //set timer on button press
            for (i = 0; i != gamespace.childElementCount;){
              gamespace.firstChild.remove();
            }
            secondsLeft =15;
            setTime();
            
            
            
            stateresult();
        });
    }
  }
}

  stateresult();

