
window.onload = function () {
    var startGame = false;
    var toGuess = '';
    var guess = '';
    var toShow = '';
    var usedLetters = [];
    var userKey = '';
    var inputValue = '';
    var name = '';
    var countError = -1;
    var playReady = false;
    var win = 0;
    var lose = 0;
    var final = '';
    var goodSound = new Audio('assets/sound/key.wav');
    var winSound = new Audio('assets/sound/win.wav');
    var play = false;
    var randNumber = 0;

    document.getElementById("start").addEventListener("click", function () {
        usedLetters = [];

        var x = document.getElementById("myWelcome");
        var y = document.getElementById("myGame");

        if (x.style.display != "none") {
            x.style.display = "none";
            y.style.display = "block";
        }

        toGuess = game.start;

        name = document.getElementById('yourName').value;
        document.getElementById("name").innerHTML = 'Hello, ' + name + '!';
        startGame = true;
        countError = -1;
        win = 0;
        lose = 0;

        document.getElementById("status_image").innerHTML = "<img src='assets/images/" + countError + ".png'>";
        document.getElementById("win").innerHTML = "WIN <span class='badge badge-light'>" + win + "</span>";
        document.getElementById("lose").innerHTML = "LOSE <span class='badge badge-light'>" + lose + "</span>";

    });

    document.getElementById("finish").addEventListener("click", function () {
        var x = document.getElementById("myWelcome");
        var y = document.getElementById("myGame");

        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none"
        }

        name = document.getElementById('yourName').value;
        document.getElementById("name").innerHTML = 'Hello, ' + name + '!';
        startGame = false;
        name = '';
        document.getElementById('yourName').value = '';
        document.getElementById("start").disabled = true;

        usedLetters = [];
        final = '';
        document.getElementById("key_guessed").innerHTML = final;
        document.getElementById("key_losed").innerHTML = usedLetters;
    });


    var game = {
        words: ['ELEPHANT', 'CHEESE', 'WATER', 'BUILDING', 'MOVIE', 'PLANE', 'PICTURE', 'LAPTOP'],
        
        get start() {
            countError = 0;
            randNumber = Math.floor(Math.random() * this.words.length);
            guess = new Array(this.words[randNumber].length);
            toShow = new Array(this.words[randNumber].length);
            return (this.words[randNumber]);
        },

        get findCoincidence() {
            toShow = new Array(guess.length);
            for (var k = 0; k < guess.length; k++) {
                if (userKey.toUpperCase() === toGuess[k]) {
                    guess[k] = userKey.toUpperCase();
                    goodSound.play();
                }
            }
        }
    }

    document.onkeyup = function (event) {

        userKey = event.key;
        inputValue = event.which;

        name = document.getElementById('yourName').value;
        if (name.length > 0 && name != '') {
            document.getElementById("start").disabled = false;
        } else {
            document.getElementById("start").disabled = true;
        }

        if(!play){
            if (inputValue === 32) {
                playReady = true;
                countError = 0;
            }
    
            if (startGame && playReady) {
                if (inputValue >= 65 && inputValue <= 90) {
                    if (usedLetters.indexOf(userKey.toUpperCase()) > -1 || guess.indexOf(userKey.toUpperCase()) > -1) {
                        //console.log('This key was already use');
                    } else if (toGuess.indexOf(userKey.toUpperCase()) > -1) {
                        //console.log('This key is part of the word');
                        game.findCoincidence;
                    } else {
                        //console.log('This key is not in the word');
                        usedLetters.push(userKey.toUpperCase());
                        countError++;
                    }
                }
    
                game.findCoincidence;
    
                for (var i = 0; i < guess.length; i++) {
                    if (!guess[i]) {
                        toShow[i] = ' _ ';
                    } else {
                        toShow[i] = guess[i];
                    }
                }
    
                final = toShow.join('');
    
                document.getElementById("key_guessed").innerHTML = final;
                document.getElementById("key_losed").innerHTML = usedLetters;
                document.getElementById("status_image").innerHTML = "<img src='assets/images/" + countError + ".png'>";
    
                if (toShow.indexOf(' _ ') < 0) {
                    win++;
                    document.getElementById("status_image").innerHTML = "<img src='assets/images/" + final.toLowerCase() + ".png'>";
                    document.getElementById("win").innerHTML = "WIN <span class='badge badge-light'>" + win + "</span>";    
                    play= true;
                    document.getElementById("again").hidden = false;
                    winSound.play();
                }

                if(countError == 11){
                    lose++;
                    document.getElementById("lose").innerHTML = "LOSE <span class='badge badge-light'>" + lose + "</span>"; 
                    play= true;
                    document.getElementById("again").hidden = false;
                    winSound.play();
                }
    
            }
        }
        
    }


    document.getElementById("again").addEventListener("click", function () {

        play= false;
        document.getElementById("again").hidden = true;

        usedLetters = [];
        final = '';
        document.getElementById("key_guessed").innerHTML = final;
        document.getElementById("key_losed").innerHTML = usedLetters;
        countError = -1;
        toGuess = game.start;       

    });

}

