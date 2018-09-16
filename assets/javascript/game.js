$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button to begin name
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
            clearInterval(theClock),
            generateLoss()
        )
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>"; 
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 3000);  //end generatewin
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    //end generate loss

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1] +"</p><p class='answer'>C. "+answerArray[questionCounter][2] +"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; //end generate question
    
    function wait() {
        //ternary operator replacing if/else for generate more questions
    questionCounter < 10 ? 
        (questionCounter++,
        generateQuestions(),
        counter = 30,
        timerWrapper() ):
        
       (finalScreen())
    }; //end function
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    [ "Which team has the most Super Bowl wins?", 
    "Which team has the most Super Bowl Apperences?", 
    "How many yards are there in, what is known as the 'RED ZONE'?", 
    "How many players are required to play a game of football?", 
    "Who has the record for most rushing yards in their career?", 
    "Who has the record for most recieving yards in their career?", 
    "Who has the record for most passing yards in their career?", 
    "How many points is a saftey worth?",
    "How many games are there in a regular season?",
    "How many teams are there in the NFL?",
    ];

    var answerArray = [
        ["Steelers", "Patriots", "Cowboys", "Packers"], 
        ["Buffalo Bills", "New England Patriots", "Dallas Cowboys", "Pittsburgh Steelers"], 
        ["15 yards", "10 yards", "20 yards", "30 yards"], 
        ["20 players", "22 players", "25 players", "26 players"], 
        ["Walter Payton", "Barry Sanders", "LaDainian Tomlinson", "Emmitt Smith"], 
        ["Jerry Rice", "Tony Gonzalez", "Terrel Owens", "Randy Moss"], 
        ["Brett Farve", "Peyton Manning", "Tom Brady", "Dan Marino"], 
        ["1 point", "2 points", "3 points", "6 points"]
        ["10 games", "12 games", "16 games", "20 games"],
        ["30 teams", "32 teams", "36 teams", "40 teams"], ];


    var correctAnswers = 
    [ "A. Steelers", 
    "B. New England Patriots", 
    "C. 20 yards", 
    "B. 22 players", 
    "D. Emmitt Smith", 
    "A. Jerry Rice", 
    "B. Peyton Manning", 
    "B. 2 Points",
    "C. 16 games",
    "B. 32 teams" ];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sounds/Doubleclick.mp3");