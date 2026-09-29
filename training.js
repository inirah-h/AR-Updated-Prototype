/* ============================================
   SURAKSHA AR - TRAINING
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    setupNavigation();

    setupThemeSync();

    setupLanguage();

    setupSync();

    setupTraining();

    updateProgress();

});


/* ============================================
   THEME
   ============================================ */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "bright") {

        document.body.classList.add("bright-theme");

    } else {

        document.body.classList.remove("bright-theme");

    }

}


function setupThemeSync() {

    window.addEventListener("storage", (event) => {

        if (event.key === "theme") {

            loadTheme();

        }

    });

}


/* ============================================
   NAVIGATION
   ============================================ */

function setupNavigation() {

    document.getElementById("sideHome")
        .onclick = () => {

            window.location.href =
                "home.html";

        };


    document.getElementById("mobileHome")
        .onclick = () => {

            window.location.href =
                "home.html";

        };


    document.getElementById("sideTraining")
        .onclick = () => {

            window.location.href =
                "training.html";

        };


    document.getElementById("mobileTraining")
        .onclick = () => {

            window.location.href =
                "training.html";

        };


    document.getElementById("sideProgress")
        .onclick = () => {

            window.location.href =
                "progress.html";

        };


    document.getElementById("mobileProgress")
        .onclick = () => {

            window.location.href =
                "progress.html";

        };


    document.getElementById("sideAttendance")
        .onclick = () => {

            window.location.href =
                "attendance.html";

        };


    document.getElementById("sideProfile")
        .onclick = () => {

            window.location.href =
                "profile.html";

        };


    document.getElementById("mobileProfile")
        .onclick = () => {

            window.location.href =
                "profile.html";

        };

}


/* ============================================
   LANGUAGE
   ============================================ */

function setupLanguage() {

    const select =
        document.getElementById("languageSelect");

    if (!select) return;


    /*
       Use the same localStorage key
       as language-system.js
    */

    const savedLanguage =
        localStorage.getItem("language") || "en";


    select.value =
        savedLanguage;


    /*
       Change language from dropdown
    */

    select.addEventListener("change", () => {

        const selectedLanguage =
            select.value;


        localStorage.setItem(
            "language",
            selectedLanguage
        );


        /*
           Apply common page translations
        */

        if (
            typeof applyLanguage ===
            "function"
        ) {

            applyLanguage();

        }


        /*
           Refresh dynamic training content
           if a scenario is currently selected
        */

        if (selectedScenario) {

            updateModalLanguage();

        }


        /*
           Refresh completed / locked buttons
        */

        updateProgress();

    });

}


/* ============================================
   SYNC
   ============================================ */

function setupSync() {

    const syncBtn =
        document.getElementById("syncBtn");

    const overlay =
        document.getElementById("syncOverlay");


    if (!syncBtn || !overlay) return;


    syncBtn.addEventListener("click", () => {

        overlay.classList.add("show");


        setTimeout(() => {

            overlay.classList.remove("show");

        }, 1500);

    });

}


/* ============================================
   TRAINING DATA
   ============================================ */

const trainingData = {

    fire: {

        module: "MODULE 01",

        title: "Fire Emergency",

        icon: "🔥",

        description:
            "Learn the correct safety procedure for handling a fire emergency inside the mine.",

        titleKey: "fireEmergency",

        descriptionKey: "fireEmergencyDescription"

    },


    gas: {

        module: "MODULE 02",

        title: "Gas Leakage",

        icon: "☁️",

        description:
            "Learn how to identify gas leakage and respond safely to protect yourself and other workers.",

        titleKey: "gasLeakage",

        descriptionKey: "gasLeakageDescription"

    },


    machine: {

        module: "MODULE 03",

        title: "Machine Malfunction",

        icon: "⚙️",

        description:
            "Learn how to respond when mining equipment malfunctions and follow safe shutdown procedures.",

        titleKey: "machineMalfunction",

        descriptionKey: "machineMalfunctionDescription"

    }

};


/* ============================================
   TRAINING SETUP
   ============================================ */

function setupTraining() {

    const cards =
        document.querySelectorAll(".scenario-card");


    cards.forEach(card => {

        const scenario =
            card.dataset.scenario;


        const button =
            card.querySelector(".start-btn");


        button.addEventListener("click", () => {

            openTrainingModal(scenario);

        });

    });


    document.getElementById("closeModal")
        .addEventListener(
            "click",
            closeModal
        );


    document.getElementById("trainingModal")
        .addEventListener(
            "click",
            (event) => {

                if (
                    event.target.id ===
                    "trainingModal"
                ) {

                    closeModal();

                }

            }
        );


    document.getElementById("beginTraining")
        .addEventListener(
            "click",
            beginTraining
        );


    document.getElementById("testBtn")
        .addEventListener("click", () => {

            if (
                document
                    .getElementById("testBtn")
                    .disabled === false
            ) {

                window.location.href =
                    "test.html";

            }

        });

}


/* ============================================
   OPEN MODAL
   ============================================ */

let selectedScenario = null;


function openTrainingModal(scenario) {

    selectedScenario =
        scenario;


    const data =
        trainingData[scenario];


    document.getElementById("modalIcon")
        .textContent =
        data.icon;


    document.getElementById("modalModule")
        .textContent =
        data.module;


    document.getElementById("modalTitle")
        .setAttribute(
            "data-i18n",
            data.titleKey
        );


    document.getElementById("modalDescription")
        .setAttribute(
            "data-i18n",
            data.descriptionKey
        );


    document
        .getElementById("trainingModal")
        .classList.add("show");


    /*
       Apply selected language
    */

    if (
        typeof applyLanguage ===
        "function"
    ) {

        applyLanguage();

    }

}


/* ============================================
   UPDATE MODAL LANGUAGE
   ============================================ */

function updateModalLanguage() {

    if (!selectedScenario) return;


    const data =
        trainingData[selectedScenario];


    document.getElementById("modalTitle")
        .setAttribute(
            "data-i18n",
            data.titleKey
        );


    document.getElementById("modalDescription")
        .setAttribute(
            "data-i18n",
            data.descriptionKey
        );


    if (
        typeof applyLanguage ===
        "function"
    ) {

        applyLanguage();

    }

}


/* ============================================
   CLOSE MODAL
   ============================================ */

function closeModal() {

    document
        .getElementById("trainingModal")
        .classList.remove("show");

}


/* ============================================
   BEGIN TRAINING
   ============================================ */

function beginTraining() {

    if (!selectedScenario) return;


    /*
       Temporary flow:

       For now clicking Begin AR Training
       marks the module as completed.

       Later this button can open the
       actual AR training screen.
    */


    localStorage.setItem(
        "training_" +
        selectedScenario,
        "completed"
    );


    closeModal();


    updateProgress();

}


/* ============================================
   UPDATE PROGRESS
   ============================================ */

function updateProgress() {

    const scenarios =
        [
            "fire",
            "gas",
            "machine"
        ];


    let completed = 0;


    scenarios.forEach(scenario => {

        const card =
            document.querySelector(
                `[data-scenario="${scenario}"]`
            );


        if (!card) return;


        const badge =
            card.querySelector(
                ".status-badge"
            );


        const button =
            card.querySelector(
                ".start-btn"
            );


        const isCompleted =
            localStorage.getItem(
                "training_" +
                scenario
            ) === "completed";


        if (isCompleted) {

            completed++;


            badge.setAttribute(
                "data-i18n",
                "completed"
            );


            badge.classList.add(
                "completed"
            );


            button.setAttribute(
                "data-i18n",
                "trainingCompleted"
            );


            button.innerHTML =
                "Training Completed ✓";


        } else {

            badge.setAttribute(
                "data-i18n",
                "notStarted"
            );


            badge.classList.remove(
                "completed"
            );


            button.removeAttribute(
                "data-i18n"
            );


            button.innerHTML =
                "Start Training <span>→</span>";

        }

    });


    const percentage =
        (completed / 3) * 100;


    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";


    /*
       Progress text
    */

    document.getElementById(
        "progressText"
    ).setAttribute(
        "data-i18n",
        "completedModules"
    );


    /*
       Store completed count so
       language-system can display it
       later if needed.
    */

    document.getElementById(
        "progressText"
    ).dataset.completed =
        completed;


    document.getElementById(
        "progressText"
    ).textContent =
        completed +
        " / 3 Completed";


    /* ========================================
       UNLOCK TEST
       ======================================== */

    const testBtn =
        document.getElementById(
            "testBtn"
        );


    if (completed === 3) {

        testBtn.disabled = false;


        testBtn.classList.add(
            "unlocked"
        );


        testBtn.setAttribute(
            "data-i18n",
            "startTest"
        );


        testBtn.textContent =
            "Start Test →";


    } else {

        testBtn.disabled = true;


        testBtn.classList.remove(
            "unlocked"
        );


        testBtn.setAttribute(
            "data-i18n",
            "testLocked"
        );


        testBtn.textContent =
            "Test Locked 🔒";

    }


    /*
       Apply current language
    */

    if (
        typeof applyLanguage ===
        "function"
    ) {

        applyLanguage();

    }

}