/* ============================================
   SURAKSHA AR - PROGRESS
   ============================================ */


document.addEventListener("DOMContentLoaded", () => {

    loadProgress();

    setupNavigation();

    setupLanguage();

    updateConnectionStatus();

});



/* ============================================
   TRAINING PROGRESS
   ============================================ */

function loadProgress() {

    const fireCompleted =
        localStorage.getItem("training_fire") === "completed";

    const gasCompleted =
        localStorage.getItem("training_gas") === "completed";

    const machineCompleted =
        localStorage.getItem("training_machine") === "completed";


    const completed = [

        fireCompleted,
        gasCompleted,
        machineCompleted

    ].filter(Boolean).length;


    const percentage =
        Math.round((completed / 3) * 100);


    /* Percentage */

    document.getElementById(
        "progressPercentage"
    ).textContent = percentage + "%";


    /* Count */

    document.getElementById(
        "completedCount"
    ).textContent = completed + " / 3";


    /* Circle */

    const circle =
        document.querySelector(".progress-circle");


    circle.style.background =
        `conic-gradient(
            var(--purple) ${percentage * 3.6}deg,
            var(--purple-light) ${percentage * 3.6}deg
        )`;


    /* Individual scenarios */

    updateScenario(
        "fireCard",
        "fireStatus",
        fireCompleted
    );

    updateScenario(
        "gasCard",
        "gasStatus",
        gasCompleted
    );

    updateScenario(
        "machineCard",
        "machineStatus",
        machineCompleted
    );


    /* Overall message */

    updateProgressMessage(completed);


    /* Test */

    updateTestStatus(completed);


    /* Certificate */

    updateCertificate();

}



/* ============================================
   SCENARIO STATUS
   ============================================ */

function updateScenario(
    cardId,
    statusId,
    completed
) {

    const card =
        document.getElementById(cardId);

    const status =
        document.getElementById(statusId);

    if (completed) {

        card.classList.add("completed");

        status.classList.add("completed");

        status.innerHTML = `
            <span class="status-icon">
                ✓
            </span>

            <span class="status-text"
                  data-i18n="completed">
                Completed
            </span>
        `;

    } else {

        card.classList.remove("completed");

        status.classList.remove("completed");

        status.innerHTML = `
            <span class="status-icon">
                ○
            </span>

            <span class="status-text"
                  data-i18n="notCompleted">
                Not Completed
            </span>
        `;

    }

}



/* ============================================
   PROGRESS MESSAGE
   ============================================ */

function updateProgressMessage(completed) {

    const title =
        document.getElementById("progressMessage");

    const description =
        document.getElementById("progressDescription");


    if (completed === 0) {

        title.textContent =
            getTranslation("startYourTraining");

        description.textContent =
            getTranslation("completeAllScenarios");

    }

    else if (completed < 3) {

        title.textContent =
            getTranslation("keepGoing");

        description.textContent =
            getTranslation("scenariosRemaining");

    }

    else {

        title.textContent =
            getTranslation("trainingCompleted");

        description.textContent =
            getTranslation("testUnlocked");

    }

}



/* ============================================
   TEST STATUS
   ============================================ */

function updateTestStatus(completed) {

    const testStatus =
        document.getElementById("testStatus");

    const testIcon =
        document.getElementById("testIcon");

    const testText =
        document.getElementById("testStatusText");

    const testDescription =
        document.getElementById("testDescription");


    const score =
        localStorage.getItem("testScore");


    if (score) {

        testIcon.textContent = "✓";

        testStatus.classList.add("passed");

        testText.textContent =
            getTranslation("completed");

        document.getElementById(
            "testScore"
        ).textContent = score + "%";


        testDescription.textContent =
            getTranslation("testCompleted");

        return;

    }


    if (completed === 3) {

        testIcon.textContent = "🔓";

        testText.textContent =
            getTranslation("unlocked");

        testDescription.textContent =
            getTranslation("testReady");

        testStatus.classList.add("unlocked");

    }

    else {

        testIcon.textContent = "🔒";

        testText.textContent =
            getTranslation("locked");

        testDescription.textContent =
            getTranslation("completeTrainingToUnlock");

    }

}



/* ============================================
   CERTIFICATE
   ============================================ */

function updateCertificate() {

    const score =
        Number(
            localStorage.getItem("testScore") || 0
        );


    const status =
        document.getElementById(
            "certificateStatus"
        );

    const text =
        document.getElementById(
            "certificateText"
        );


    if (score >= 70) {

        status.textContent =
            getTranslation("earned");

        status.style.color =
            "var(--green)";

        status.style.background =
            "#e8f7ef";

        text.textContent =
            getTranslation("certificateEarned");

    }

}



/* ============================================
   TRANSLATION HELPER
   ============================================ */

function getTranslation(key) {

    const language =
        localStorage.getItem("language") || "en";


    if (
        typeof translations !== "undefined" &&
        translations[language] &&
        translations[language][key]
    ) {

        return translations[language][key];

    }


    if (
        typeof translations !== "undefined" &&
        translations.en &&
        translations.en[key]
    ) {

        return translations.en[key];

    }


    return key;

}



/* ============================================
   LANGUAGE SELECT
   ============================================ */

function setupLanguage() {

    const select =
        document.getElementById(
            "languageSelect"
        );


    const savedLanguage =
        localStorage.getItem("language") || "en";


    select.value = savedLanguage;


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


            loadProgress();

        }
    );

}



/* ============================================
   NAVIGATION
   ============================================ */

function setupNavigation() {


    /* Home */

    document
        .getElementById("backHomeBtn")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "home.html";
            }
        );


    document
        .getElementById("sideHome")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "home.html";
            }
        );


    document
        .getElementById("mobileHome")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "home.html";
            }
        );


    /* Training */

    document
        .getElementById("sideTraining")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "training.html";
            }
        );


    document
        .getElementById("mobileTraining")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "training.html";
            }
        );


    /* Progress */

    document
        .getElementById("sideProgress")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "progress.html";
            }
        );


    document
        .getElementById("mobileProgress")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "progress.html";
            }
        );


    /* Profile */

    document
        .getElementById("sideProfile")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "profile.html";
            }
        );


    document
        .getElementById("mobileProfile")
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "profile.html";
            }
        );

}



/* ============================================
   ONLINE / OFFLINE
   ============================================ */

function updateConnectionStatus() {

    const text =
        document.getElementById(
            "connectionText"
        );

    if (navigator.onLine) {

        text.textContent =
            getTranslation("online");

    } else {

        text.textContent =
            getTranslation("offline");

    }

}


window.addEventListener(
    "online",
    updateConnectionStatus
);

window.addEventListener(
    "offline",
    updateConnectionStatus
);