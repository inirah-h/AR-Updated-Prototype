/* ============================================
   SURAKSHA AR - HOME DASHBOARD
   ============================================ */

let currentLanguage = "en";
let isOffline = false;
let isSyncing = false;


/* ============================================
   INITIAL LOAD
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

    loadWorkerData();
    setCurrentDate();
    setupNavigation();
    setupLanguage();
    setupSync();
    updateConnectionStatus();

});


/* ============================================
   WORKER DATA
   ============================================ */

function loadWorkerData() {

    const savedUsername =
        localStorage.getItem("username");

    const savedUser =
        localStorage.getItem("loggedInUser");


    if (savedUser) {

        try {

            const user = JSON.parse(savedUser);

            if (user.name) {

                document.getElementById("workerName")
                    .textContent =
                    user.name.split(" ")[0];

                document.getElementById("profileName")
                    .textContent =
                    user.name;
            }

        } catch (error) {

            console.log(
                "User data not available."
            );

        }

    } else if (savedUsername) {

        document.getElementById("workerName")
            .textContent =
            savedUsername;

        document.getElementById("profileName")
            .textContent =
            savedUsername;
    }

}


/* ============================================
   DATE
   ============================================ */

function setCurrentDate() {

    const dateElement =
        document.getElementById("currentDate");

    const today = new Date();

    const formatted =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    dateElement.textContent = formatted;
}


/* ============================================
   NAVIGATION
   ============================================ */

function setupNavigation() {


    /* Training */

    document.getElementById("trainingBtn")
        .addEventListener("click", () => {

            window.location.href =
                "training.html";

        });


    document.getElementById("sideTraining")
        .addEventListener("click", () => {

            window.location.href =
                "training.html";

        });


    document.getElementById("mobileTraining")
        .addEventListener("click", () => {

            window.location.href =
                "training.html";

        });


    /* Progress */

    document.getElementById("progressBtn")
        .addEventListener("click", () => {

            window.location.href =
                "progress.html";

        });


    document.getElementById("sideProgress")
        .addEventListener("click", () => {

            window.location.href =
                "progress.html";

        });


    document.getElementById("mobileProgress")
        .addEventListener("click", () => {

            window.location.href =
                "progress.html";

        });


    /* Attendance */

    document.getElementById("attendanceBtn")
        .addEventListener("click", () => {

            window.location.href =
                "attendance.html";

        });


    document.getElementById("sideAttendance")
        .addEventListener("click", () => {

            window.location.href =
                "attendance.html";

        });


    /* Profile */

    document.getElementById("profileBtn")
        .addEventListener("click", () => {

            window.location.href =
                "profile.html";

        });


    document.getElementById("sideProfile")
        .addEventListener("click", () => {

            window.location.href =
                "profile.html";

        });


    document.getElementById("mobileProfile")
        .addEventListener("click", () => {

            window.location.href =
                "profile.html";

        });


    /* Home */

    document.getElementById("sideHome")
        .addEventListener("click", () => {

            window.location.href =
                "home.html";

        });


    document.getElementById("mobileHome")
        .addEventListener("click", () => {

            window.location.href =
                "home.html";

        });


    /* Certificate */

    document.getElementById("certificateBtn")
        .addEventListener("click", () => {

            window.location.href =
                "certificate.html";

        });


    /* Badge */

    document.getElementById("badgeBtn")
        .addEventListener("click", () => {

            alert(
                "Miner badge verification will be available here."
            );

        });

}


/* ============================================
   LANGUAGE
   ============================================ */

function setupLanguage() {

    const languageSelect =
        document.getElementById(
            "languageSelect"
        );

    if (!languageSelect) return;


    /*
       Use the same localStorage key
       as language-system.js
    */

    const savedLanguage =
        localStorage.getItem("language") || "en";


    currentLanguage =
        savedLanguage;


    languageSelect.value =
        savedLanguage;


    languageSelect.addEventListener(
        "change",
        () => {

            currentLanguage =
                languageSelect.value;


            /*
               Save language using the
               common language-system key
            */

            localStorage.setItem(
                "language",
                currentLanguage
            );


            /*
               Apply translation immediately
            */

            if (typeof applyLanguage === "function") {

                applyLanguage();

            }

        }
    );

}


/* ============================================
   ONLINE / OFFLINE
   ============================================ */

function updateConnectionStatus() {

    const status =
        document.getElementById(
            "connectionStatus"
        );

    const text =
        document.getElementById(
            "connectionText"
        );

    const dot =
        status.querySelector(
            ".status-dot"
        );


    if (navigator.onLine) {

        isOffline = false;

        text.textContent =
            "Online";

        dot.classList.add("purple");

    } else {

        isOffline = true;

        text.textContent =
            "Offline";

        dot.classList.remove("purple");

    }

}


/* ============================================
   ONLINE / OFFLINE EVENTS
   ============================================ */

window.addEventListener(
    "online",
    updateConnectionStatus
);


window.addEventListener(
    "offline",
    updateConnectionStatus
);


/* ============================================
   SYNC
   ============================================ */

function setupSync() {

    const syncButton =
        document.getElementById("syncBtn");

    if (!syncButton) return;


    syncButton.addEventListener(
        "click",
        syncData
    );

}


function syncData() {

    if (isSyncing) return;

    isSyncing = true;


    const overlay =
        document.getElementById(
            "syncOverlay"
        );


    if (overlay) {

        overlay.classList.add("show");

    }


    setTimeout(() => {

        isSyncing = false;


        if (overlay) {

            overlay.classList.remove("show");

        }

    }, 1500);

}