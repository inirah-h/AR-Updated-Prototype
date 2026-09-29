/* ============================================
   SURAKSHA AR - SAFETY TEST
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    setupNavigation();

    setupThemeSync();

    setupLanguage();

    setupSync();

    checkTrainingCompletion();

    setupTest();

});


/* ============================================
   THEME
   ============================================ */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "bright") {

        document.body.classList.add(
            "bright-theme"
        );

    } else {

        document.body.classList.remove(
            "bright-theme"
        );

    }

}


function setupThemeSync() {

    window.addEventListener(
        "storage",
        (event) => {

            if (event.key === "theme") {

                loadTheme();

            }

        }
    );

}


/* ============================================
   NAVIGATION
   ============================================ */

function setupNavigation() {

    const navigation = {

        sideHome: "home.html",

        sideTraining: "training.html",

        sideProgress: "progress.html",

        sideAttendance: "attendance.html",

        sideProfile: "profile.html",

        mobileHome: "home.html",

        mobileTraining: "training.html",

        mobileProgress: "progress.html",

        mobileProfile: "profile.html"

    };


    Object.keys(navigation).forEach(id => {

        const element =
            document.getElementById(id);

        if (!element) return;


        element.onclick = () => {

            window.location.href =
                navigation[id];

        };

    });

}


/* ============================================
   LANGUAGE
   ============================================ */

function setupLanguage() {

    const select =
        document.getElementById(
            "languageSelect"
        );

    if (!select) return;


    const savedLanguage =
        localStorage.getItem("language") ||
        "en";


    select.value =
        savedLanguage;


    select.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "language",
                select.value
            );


            if (
                typeof applyLanguage ===
                "function"
            ) {

                applyLanguage();

            }

            renderQuestion();

        }
    );

}


/* ============================================
   SYNC
   ============================================ */

function setupSync() {

    const syncBtn =
        document.getElementById(
            "syncBtn"
        );

    const overlay =
        document.getElementById(
            "syncOverlay"
        );


    if (!syncBtn || !overlay) return;


    syncBtn.addEventListener(
        "click",
        () => {

            overlay.classList.add("show");


            setTimeout(() => {

                overlay.classList.remove(
                    "show"
                );

            }, 1500);

        }
    );

}


/* ============================================
   TRAINING CHECK
   ============================================ */

function checkTrainingCompletion() {

    const fire =
        localStorage.getItem(
            "training_fire"
        ) === "completed";


    const gas =
        localStorage.getItem(
            "training_gas"
        ) === "completed";


    const machine =
        localStorage.getItem(
            "training_machine"
        ) === "completed";


    if (
        !fire ||
        !gas ||
        !machine
    ) {

        alert(
            "Please complete all 3 training modules before taking the test."
        );

        window.location.href =
            "training.html";

    }

}


/* ============================================
   QUESTIONS
   ============================================ */

const questions = [

    {
        category: "FIRE SAFETY",

        question:
            "What should you do first when you notice a fire inside the mine?",

        options: [
            "Raise the alarm and inform others",
            "Continue working normally",
            "Go closer to the fire",
            "Ignore the situation"
        ],

        answer: 0
    },


    {
        category: "FIRE SAFETY",

        question:
            "What should workers do after a mine fire alarm is raised?",

        options: [
            "Run without following instructions",
            "Follow the designated evacuation procedure",
            "Return to the work area",
            "Wait near the fire"
        ],

        answer: 1
    },


    {
        category: "FIRE SAFETY",

        question:
            "Why is it important to follow the designated evacuation route?",

        options: [
            "To reach the fire faster",
            "To avoid emergency personnel",
            "To move safely toward the designated safe area",
            "To continue working"
        ],

        answer: 2
    },


    {
        category: "GAS SAFETY",

        question:
            "What should you do when you suspect a gas leakage?",

        options: [
            "Ignore it",
            "Report the leakage and move to a safe area",
            "Use an open flame",
            "Continue working"
        ],

        answer: 1
    },


    {
        category: "GAS SAFETY",

        question:
            "Why should workers move away from an area affected by gas leakage?",

        options: [
            "To avoid possible exposure to hazardous gas",
            "To find more work",
            "To inspect the machine",
            "To increase production"
        ],

        answer: 0
    },


    {
        category: "GAS SAFETY",

        question:
            "What should workers avoid near a suspected gas leakage?",

        options: [
            "Following safety instructions",
            "Moving to a safe location",
            "Ignition sources",
            "Reporting the situation"
        ],

        answer: 2
    },


    {
        category: "MACHINE SAFETY",

        question:
            "What should you do when mining equipment malfunctions?",

        options: [
            "Continue operating it",
            "Report the malfunction and follow shutdown procedures",
            "Touch moving parts",
            "Ignore the warning"
        ],

        answer: 1
    },


    {
        category: "MACHINE SAFETY",

        question:
            "Why should a malfunctioning machine be safely shut down?",

        options: [
            "To prevent further risk and possible injury",
            "To increase machine speed",
            "To continue production",
            "To avoid reporting"
        ],

        answer: 0
    },


    {
        category: "MACHINE SAFETY",

        question:
            "What should workers avoid when a machine is malfunctioning?",

        options: [
            "Reporting the problem",
            "Following safety procedures",
            "Attempting unsafe repairs while the machine is operating",
            "Moving to a safe area"
        ],

        answer: 2
    },


    {
        category: "GENERAL SAFETY",

        question:
            "What is the most important principle during a mine emergency?",

        options: [
            "Protect production first",
            "Ignore instructions",
            "Follow safety procedures and protect people",
            "Continue working"
        ],

        answer: 2
    }

];


/* ============================================
   TEST VARIABLES
   ============================================ */

let currentQuestion = 0;

let userAnswers =
    new Array(questions.length).fill(null);


/* ============================================
   TEST SETUP
   ============================================ */

function setupTest() {

    document.getElementById(
        "nextBtn"
    ).addEventListener(
        "click",
        nextQuestion
    );


    document.getElementById(
        "previousBtn"
    ).addEventListener(
        "click",
        previousQuestion
    );


    document.getElementById(
        "submitBtn"
    ).addEventListener(
        "click",
        submitTest
    );


    document.getElementById(
        "continueBtn"
    ).addEventListener(
        "click",
        () => {

            window.location.href =
                "progress.html";

        }
    );


    renderQuestion();

}


/* ============================================
   RENDER QUESTION
   ============================================ */

function renderQuestion() {

    const question =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `${currentQuestion + 1} / ${questions.length}`;


    document.getElementById(
        "questionCount"
    ).textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    document.getElementById(
        "questionCategory"
    ).textContent =
        question.category;


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    const optionsContainer =
        document.getElementById(
            "optionsContainer"
        );


    optionsContainer.innerHTML = "";


    question.options.forEach(
        (optionText, index) => {

            const label =
                document.createElement(
                    "label"
                );


            label.className =
                "option";


            if (
                userAnswers[currentQuestion] ===
                index
            ) {

                label.classList.add(
                    "selected"
                );

            }


            label.innerHTML = `

                <input
                    type="radio"
                    name="answer"
                    value="${index}"
                    ${userAnswers[currentQuestion] === index ? "checked" : ""}
                >

                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span class="option-text">
                    ${optionText}
                </span>

            `;


            label.addEventListener(
                "click",
                () => {

                    selectAnswer(index);

                }
            );


            optionsContainer.appendChild(
                label
            );

        }
    );


    updateNavigation();

    updateProgressBar();

}


/* ============================================
   SELECT ANSWER
   ============================================ */

function selectAnswer(index) {

    userAnswers[currentQuestion] =
        index;


    document
        .querySelectorAll(".option")
        .forEach((option, i) => {

            option.classList.toggle(
                "selected",
                i === index
            );

        });


    const radio =
        document.querySelector(
            `.option:nth-child(${index + 1}) input`
        );


    if (radio) {

        radio.checked = true;

    }

}


/* ============================================
   NEXT
   ============================================ */

function nextQuestion() {

    if (
        userAnswers[currentQuestion] ===
        null
    ) {

        alert(
            "Please select an answer before continuing."
        );

        return;

    }


    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        renderQuestion();

    }

}


/* ============================================
   PREVIOUS
   ============================================ */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }

}


/* ============================================
   NAVIGATION BUTTONS
   ============================================ */

function updateNavigation() {

    const previousBtn =
        document.getElementById(
            "previousBtn"
        );


    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    const submitBtn =
        document.getElementById(
            "submitBtn"
        );


    previousBtn.disabled =
        currentQuestion === 0;


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextBtn.style.display =
            "none";

        submitBtn.style.display =
            "block";

    } else {

        nextBtn.style.display =
            "block";

        submitBtn.style.display =
            "none";

    }

}


/* ============================================
   PROGRESS BAR
   ============================================ */

function updateProgressBar() {

    const percentage =
        ((currentQuestion + 1) /
        questions.length) * 100;


    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";

}


/* ============================================
   SUBMIT TEST
   ============================================ */

function submitTest() {

    const unanswered =
        userAnswers.filter(
            answer => answer === null
        ).length;


    if (unanswered > 0) {

        alert(
            "Please answer all questions before submitting the test."
        );

        return;

    }


    let score = 0;


    questions.forEach(
        (question, index) => {

            if (
                userAnswers[index] ===
                question.answer
            ) {

                score++;

            }

        }
    );


    showResult(score);

}


/* ============================================
   SHOW RESULT
   ============================================ */

function showResult(score) {

    const questionCard =
        document.getElementById(
            "questionCard"
        );


    const resultCard =
        document.getElementById(
            "resultCard"
        );


    const resultIcon =
        document.getElementById(
            "resultIcon"
        );


    const resultTitle =
        document.getElementById(
            "resultTitle"
        );


    const scoreText =
        document.getElementById(
            "scoreText"
        );


    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    questionCard.style.display =
        "none";


    resultCard.style.display =
        "block";


    scoreText.textContent =
        `${score} / ${questions.length}`;


    /*
       Pass mark = 70%
    */

    const percentage =
        (score / questions.length) * 100;


    if (percentage >= 70) {

        resultIcon.textContent =
            "🎉";


        resultTitle.textContent =
            "Test Passed";


        resultMessage.textContent =
            "Congratulations! You have successfully completed the safety knowledge test.";


        localStorage.setItem(
            "testStatus",
            "passed"
        );


    } else {

        resultIcon.textContent =
            "📚";


        resultTitle.textContent =
            "Test Not Passed";


        resultMessage.textContent =
            "Please review the safety training modules and try the test again.";


        localStorage.setItem(
            "testStatus",
            "failed"
        );

    }

}