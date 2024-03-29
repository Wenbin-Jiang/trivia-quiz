const questions = [
  {
    question: "Question: How many Infinity Stones are there??", // First question
    answers: [
      { text: "4", correct: false }, // First answer option
      { text: "5", correct: false }, // Second answer option
      { text: "6", correct: true }, // Third answer option (correct)
      { text: "7", correct: false }, // Fourth answer option
    ],
  },
  {
    question: "Question: What type of doctor is Doctor Strange?", // Second question
    answers: [
      { text: "A Cardiothoracic Surgeon", correct: false },
      { text: "A Neurosurgeon", correct: true }, // Second answer option (correct)
      { text: "An Oral Surgeon", correct: false },
      { text: "An Orthopedic Surgeon", correct: false },
    ],
  },
  {
    question: "Question: Which movie kicked off the Marvel Cinematic Universe?", // Third question
    answers: [
      { text: "Iron Man", correct: true }, // First answer option (correct)
      { text: "Spider Man", correct: false },
      { text: "Captain America", correct: false },
      { text: "Black Panther", correct: false },
    ],
  },
  {
    question: "Question: Where is Captain America from?", // Fourth question
    answers: [
      { text: "Queens", correct: false },
      { text: "Manhattan", correct: false },
      { text: "Brooklyn", correct: true }, // Third answer option (correct)
      { text: "Toronto", correct: false },
    ],
  },
  {
    question: "Question: Black Panther is set in which fictional country?", // Fifth question
    answers: [
      { text: "Zubrowka", correct: false },
      { text: "Wakanda", correct: true }, // Second answer option (correct)
      { text: "Themyscira", correct: false },
      { text: "Panem", correct: false },
    ],
  },
];

//login
const loginContainer = document.getElementById("login-container");
const quizContainer = document.getElementById("quiz-container");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");

//quiz
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

//  authentication function
function authenticate(username, password) {
  // username= admin and password = 0000
  if (username === "admin" && password === "0000") {
    return true;
  } else {
    return false;
  }
}

// Event listener for login button
loginBtn.addEventListener("click", () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (authenticate(username, password)) {
    // Authentication successful
    loginContainer.style.display = "none";
    quizContainer.style.display = "block";
    startQuiz();
  } else {
    // Authentication failed
    errorMessage.textContent = "Invalid username or password";
  }
});

let currentQuestionIndex = 0;
let score = 0;

// Function to update the progress bar
function updateProgressBar() {
  const progress = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  updateProgressBar();
}

// Function to display a question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Function to reset the state (clear answer buttons)
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// Function to display the final score
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// Function to handle the next button click
function handleNextBtn() {
  currentQuestionIndex++;
  updateProgressBar();
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
