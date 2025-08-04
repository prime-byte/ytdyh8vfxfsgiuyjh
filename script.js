// Quiz Data
const quizQuestions = {
    easy: [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: "Leonardo da Vinci"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
    ],
    medium: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: "Au"
        },
        {
            question: "Which language has the most native speakers?",
            options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
            correctAnswer: "Mandarin Chinese"
        },
        {
            question: "What is the square root of 64?",
            options: ["6", "7", "8", "9"],
            correctAnswer: "8"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
            correctAnswer: "Harper Lee"
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
            correctAnswer: "Mount Everest"
        }
    ],
    hard: [
        {
            question: "What is the atomic number of uranium?",
            options: ["89", "90", "91", "92"],
            correctAnswer: "92"
        },
        {
            question: "Which country is the largest by area?",
            options: ["China", "United States", "Canada", "Russia"],
            correctAnswer: "Russia"
        },
        {
            question: "What is the derivative of x³?",
            options: ["2x²", "3x²", "3x", "x⁴/4"],
            correctAnswer: "3x²"
        },
        {
            question: "Who discovered penicillin?",
            options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Robert Koch"],
            correctAnswer: "Alexander Fleming"
        },
        {
            question: "What is the speed of light in a vacuum (m/s)?",
            options: ["299,792,458", "300,000,000", "250,000,000", "350,000,000"],
            correctAnswer: "299,792,458"
        }
    ],
    extreme: [
        {
            question: "What is the value of Avogadro's number?",
            options: ["6.022 × 10²³", "3.141 × 10²³", "2.718 × 10²³", "1.618 × 10²³"],
            correctAnswer: "6.022 × 10²³"
        },
        {
            question: "Which mathematician formulated the uncertainty principle?",
            options: ["Albert Einstein", "Niels Bohr", "Werner Heisenberg", "Erwin Schrödinger"],
            correctAnswer: "Werner Heisenberg"
        },
        {
            question: "What is the solution to the Riemann Hypothesis?",
            options: ["All non-trivial zeros have real part 1/2", "All non-trivial zeros are on the critical line", "Both A and B", "Still unsolved"],
            correctAnswer: "Still unsolved"
        },
        {
            question: "Which philosopher wrote 'Being and Time'?",
            options: ["Jean-Paul Sartre", "Friedrich Nietzsche", "Martin Heidegger", "Immanuel Kant"],
            correctAnswer: "Martin Heidegger"
        },
        {
            question: "What is the time complexity of Dijkstra's algorithm with a Fibonacci heap?",
            options: ["O(V log V + E)", "O(V²)", "O(V E)", "O(V + E)"],
            correctAnswer: "O(V log V + E)"
        }
    ]
};

// Game State
const gameState = {
    currentDifficulty: null,
    questions: [],
    currentQuestionIndex: 0,
    timer: null,
    timeLeft: 0,
    score: {
        correct: 0,
        incorrect: 0,
        timeup: 0
    },
    settings: {
        easy: { time: 30, colorThresholds: { green: 15, yellow: 5 } },
        medium: { time: 20, colorThresholds: { green: 10, yellow: 5 } },
        hard: { time: 15, colorThresholds: { green: 8, yellow: 4 } },
        extreme: { time: 10, colorThresholds: { green: 10, yellow: 3 } }
    },
    questionCount: 0,
    adShown: false,
    actionAfterAd: null
};

// DOM Elements
const difficultyScreen = document.getElementById('difficulty-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const difficultyCards = document.querySelectorAll('.difficulty-card');
const instructionsModal = document.getElementById('instructions-modal');
const feedbackModal = document.getElementById('feedback-modal');
const bannerAdModal = document.getElementById('banner-ad-modal');
const exitConfirmModal = document.getElementById('exit-confirm-modal');
const tryAgainConfirmModal = document.getElementById('tryagain-confirm-modal');
const startQuizBtn = document.getElementById('start-quiz-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const closeBannerAdBtn = document.getElementById('close-banner-ad-btn');
const confirmExitBtn = document.getElementById('confirm-exit-btn');
const cancelExitBtn = document.getElementById('cancel-exit-btn');
const confirmTryAgainBtn = document.getElementById('confirm-tryagain-btn');
const cancelTryAgainBtn = document.getElementById('cancel-tryagain-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const exitQuizBtn = document.getElementById('exit-quiz-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options-container');
const timerDisplay = document.getElementById('timer');
const timerProgress = document.getElementById('timer-progress');
const correctAnswersDisplay = document.getElementById('correct-answers');
const incorrectAnswersDisplay = document.getElementById('incorrect-answers');
const timeoutAnswersDisplay = document.getElementById('timeout-answers');
const totalAttemptedDisplay = document.getElementById('total-attempted');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMessage = document.getElementById('feedback-message');
const resultText = document.getElementById('result-text');
const correctAnswerText = document.getElementById('correct-answer-text');
const modalDifficultyTitle = document.getElementById('modal-difficulty-title');
const modalTimerValue = document.getElementById('modal-timer-value');
const bannerAdSlot = document.getElementById('banner-ad-slot');

// Audio Elements
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const timeupSound = document.getElementById('timeup-sound');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game
    difficultyCards.forEach(card => {
        card.addEventListener('click', () => selectDifficulty(card.dataset.difficulty));
    });

    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', loadNextQuestion);
    closeBannerAdBtn.addEventListener('click', closeBannerAd);
    tryAgainBtn.addEventListener('click', () => handleActionWithAd('tryagain'));
    backToHomeBtn.addEventListener('click', backToHome);
    exitQuizBtn.addEventListener('click', () => handleActionWithAd('exit'));
    confirmExitBtn.addEventListener('click', showResults);
    cancelExitBtn.addEventListener('click', () => exitConfirmModal.classList.remove('active'));
    confirmTryAgainBtn.addEventListener('click', tryAgain);
    cancelTryAgainBtn.addEventListener('click', () => tryAgainConfirmModal.classList.remove('active'));

    // Close buttons for modals
    document.querySelector('.close-btn').addEventListener('click', () => {
        instructionsModal.classList.remove('active');
    });

    // Shuffle all questions initially
    shuffleArray(quizQuestions.easy);
    shuffleArray(quizQuestions.medium);
    shuffleArray(quizQuestions.hard);
    shuffleArray(quizQuestions.extreme);
});

// Game Functions
function selectDifficulty(difficulty) {
    gameState.currentDifficulty = difficulty;
    gameState.questions = [...quizQuestions[difficulty]];
    gameState.currentQuestionIndex = 0;
    gameState.score = {
        correct: 0,
        incorrect: 0,
        timeup: 0
    };
    gameState.questionCount = 0;

    // Update modal content based on difficulty
    modalDifficultyTitle.textContent = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode Instructions`;
    modalTimerValue.textContent = gameState.settings[difficulty].time;

    // Show instructions modal
    instructionsModal.classList.add('active');
}

function startQuiz() {
    instructionsModal.classList.remove('active');
    difficultyScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

function loadQuestion() {
    // Reset timer
    clearInterval(gameState.timer);
    const difficultySettings = gameState.settings[gameState.currentDifficulty];
    gameState.timeLeft = difficultySettings.time;
    timerDisplay.textContent = gameState.timeLeft;
    
    // Reset timer progress bar
    timerProgress.style.width = '100%';
    timerProgress.style.backgroundColor = '#4CAF50';
    
    // Start timer
    gameState.timer = setInterval(() => updateTimer(difficultySettings), 1000);
    
    // Get current question
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    // Update question text
    questionText.textContent = currentQuestion.question;
    
    // Update options
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.dataset.option = index + 1;
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(option));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update question counter
    gameState.questionCount++;
}

function updateTimer(difficultySettings) {
    gameState.timeLeft--;
    timerDisplay.textContent = gameState.timeLeft;
    
    // Update progress bar with animation
    const progressPercentage = (gameState.timeLeft / difficultySettings.time) * 100;
    timerProgress.style.width = `${progressPercentage}%`;
    
    // Change color based on time left with smooth transition
    if (gameState.timeLeft <= difficultySettings.colorThresholds.yellow) {
        timerProgress.style.backgroundColor = '#F44336'; // Red
        timerDisplay.style.color = '#F44336';
        if (gameState.timeLeft <= 3) {
            timerDisplay.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
        }
    } else if (gameState.timeLeft <= difficultySettings.colorThresholds.green) {
        timerProgress.style.backgroundColor = '#FFC107'; // Yellow
        timerDisplay.style.color = '#FFC107';
        timerDisplay.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
    } else {
        timerProgress.style.backgroundColor = '#4CAF50'; // Green
        timerDisplay.style.color = '#4CAF50';
        timerDisplay.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
    }
    
    if (gameState.timeLeft <= 0) {
        clearInterval(gameState.timer);
        timeUp();
    }
}

function selectAnswer(selectedOption) {
    // Disable all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Stop the timer
    clearInterval(gameState.timer);
    timerDisplay.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
    
    // Get current question
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    // Check if answer is correct
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Update score
    if (isCorrect) {
        gameState.score.correct++;
        showFeedback(true, currentQuestion.correctAnswer);
    } else {
        gameState.score.incorrect++;
        showFeedback(false, currentQuestion.correctAnswer);
    }
    
    // Highlight selected answer
    options.forEach(option => {
        if (option.textContent === selectedOption) {
            option.style.backgroundColor = isCorrect ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)';
            option.style.borderColor = isCorrect ? 'var(--correct-color)' : 'var(--incorrect-color)';
        }
        if (option.textContent === currentQuestion.correctAnswer) {
            option.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            option.style.borderColor = 'var(--correct-color)';
        }
    });
    
    // Send data to server (simulated)
    sendQuestionDataToServer(selectedOption, isCorrect ? 'correct' : 'wrong');
}

function timeUp() {
    // Disable all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Get current question
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    // Update score
    gameState.score.timeup++;
    
    // Show feedback
    showFeedback('timeup', currentQuestion.correctAnswer);
    
    // Highlight correct answer
    options.forEach(option => {
        if (option.textContent === currentQuestion.correctAnswer) {
            option.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            option.style.borderColor = 'var(--correct-color)';
        }
    });
    
    // Send data to server (simulated)
    sendQuestionDataToServer(null, 'timeout');
}

function showFeedback(result, correctAnswer) {
    if (result === true) {
        // Correct answer
        feedbackTitle.textContent = "Correct!";
        feedbackTitle.className = "correct";
        resultText.textContent = "correct";
        resultText.className = "correct";
        correctAnswerText.textContent = correctAnswer;
        correctSound.play();
    } else if (result === false) {
        // Incorrect answer
        feedbackTitle.textContent = "Incorrect!";
        feedbackTitle.className = "incorrect";
        resultText.textContent = "incorrect";
        resultText.className = "incorrect";
        correctAnswerText.textContent = correctAnswer;
        wrongSound.play();
    } else {
        // Time up
        feedbackTitle.textContent = "Time's Up!";
        feedbackTitle.className = "timeup";
        resultText.textContent = "too late";
        resultText.className = "timeup";
        correctAnswerText.textContent = correctAnswer;
        timeupSound.play();
    }
    
    feedbackModal.classList.add('active');
}

function loadNextQuestion() {
    feedbackModal.classList.remove('active');
    
    // Show banner ad after every 3 questions
    if (gameState.questionCount % 3 === 0) {
        showBannerAd();
        gameState.actionAfterAd = 'nextQuestion';
    } else {
        proceedToNextQuestion();
    }
}

function proceedToNextQuestion() {
    gameState.currentQuestionIndex++;
    
    if (gameState.currentQuestionIndex < gameState.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showBannerAd() {
    bannerAdModal.classList.add('active');
    gameState.adShown = true;

    // Clear previous ad
    bannerAdSlot.innerHTML = '';

    // Inject Adsterra script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
        atOptions = {
            'key': 'ee4ce4e15c3690c11335665b3dcf5721',
            'format': 'iframe',
            'height': 250,
            'width': 300,
            'params': {}
        };
    `;
    bannerAdSlot.appendChild(configScript);

    const adScript = document.createElement('script');
    adScript.src = `//www.highperformanceformat.com/ee4ce4e15c3690c11335665b3dcf5721/invoke.js`;
    bannerAdSlot.appendChild(adScript);

    // Delay close button
    closeBannerAdBtn.disabled = true;
    setTimeout(() => {
        closeBannerAdBtn.disabled = false;
    }, 5000);
}

function closeBannerAd() {
    bannerAdModal.classList.remove('active');
    gameState.adShown = false;
    
    // Execute the action that was supposed to happen after the ad
    if (gameState.actionAfterAd === 'nextQuestion') {
        proceedToNextQuestion();
    } else if (gameState.actionAfterAd === 'exit') {
        exitConfirmModal.classList.add('active');
    } else if (gameState.actionAfterAd === 'tryagain') {
        tryAgainConfirmModal.classList.add('active');
    }
    
    // Reset action
    gameState.actionAfterAd = null;
}

function handleActionWithAd(action) {
    // Show banner ad first
    showBannerAd();
    gameState.actionAfterAd = action;
}

function showResults() {
    // Clear any active timers
    clearInterval(gameState.timer);
    
    // Hide quiz screen, show results screen
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    exitConfirmModal.classList.remove('active');
    
    // Update results display
    correctAnswersDisplay.textContent = gameState.score.correct;
    incorrectAnswersDisplay.textContent = gameState.score.incorrect;
    timeoutAnswersDisplay.textContent = gameState.score.timeup;
    totalAttemptedDisplay.textContent = gameState.score.correct + gameState.score.incorrect + gameState.score.timeup;
    
    // Send final results to server (simulated)
    sendFinalResultsToServer();
}

function tryAgain() {
    // Reset game state
    gameState.currentQuestionIndex = 0;
    gameState.score = {
        correct: 0,
        incorrect: 0,
        timeup: 0
    };
    gameState.questionCount = 0;
    
    // Shuffle questions for a new game
    shuffleArray(gameState.questions);
    
    // Go back to quiz screen
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    tryAgainConfirmModal.classList.remove('active');
    
    loadQuestion();
}

function backToHome() {
    resultsScreen.classList.remove('active');
    difficultyScreen.classList.add('active');
}

function sendQuestionDataToServer(selectedAnswer, result) {
    // In a real app, this would be an actual API call
    console.log('Sending question data to server:', {
        questionId: gameState.currentQuestionIndex,
        selectedAnswer,
        result,
        difficulty: gameState.currentDifficulty
    });
    
    // Simulate API call
    setTimeout(() => {
        console.log('Question data saved successfully');
    }, 500);
}

function sendFinalResultsToServer() {
    // In a real app, this would be an actual API call
    console.log('Sending final results to server:', {
        difficulty: gameState.currentDifficulty,
        correctAnswers: gameState.score.correct,
        incorrectAnswers: gameState.score.incorrect,
        timeupAnswers: gameState.score.timeup
    });
    
    // Simulate API call
    setTimeout(() => {
        console.log('Final results saved successfully');
    }, 500);
}

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
