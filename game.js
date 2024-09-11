const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("h1").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
};

const playSound = (name) => {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

document.addEventListener("keydown", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

const animatePress = (currentColour) => {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
