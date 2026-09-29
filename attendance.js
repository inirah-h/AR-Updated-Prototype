/* =====================================================
   SURAKSHA AR - ATTENDANCE
===================================================== */


/* =====================================================
   LANGUAGE
===================================================== */

const languageSelect = document.getElementById("languageSelect");

let currentLanguage =
    localStorage.getItem("language") || "en";

if (languageSelect) {

    languageSelect.value = currentLanguage;

    languageSelect.addEventListener("change", function () {

        currentLanguage = this.value;

        localStorage.setItem(
            "language",
            currentLanguage
        );

        if (typeof applyLanguage === "function") {
            applyLanguage();
        }

        renderAttendance();
    });
}


/* =====================================================
   ATTENDANCE DATA
===================================================== */

const defaultAttendance = [

    {
        date: "28 Sep 2026",
        day: "Monday",
        status: "present"
    },

    {
        date: "27 Sep 2026",
        day: "Sunday",
        status: "present"
    },

    {
        date: "26 Sep 2026",
        day: "Saturday",
        status: "present"
    },

    {
        date: "25 Sep 2026",
        day: "Friday",
        status: "absent"
    },

    {
        date: "24 Sep 2026",
        day: "Thursday",
        status: "present"
    },

    {
        date: "23 Sep 2026",
        day: "Wednesday",
        status: "present"
    },

    {
        date: "22 Sep 2026",
        day: "Tuesday",
        status: "present"
    }

];


/* =====================================================
   LOAD ATTENDANCE
===================================================== */

let attendanceData =
    JSON.parse(
        localStorage.getItem("attendanceData")
    );

if (!attendanceData) {

    attendanceData = defaultAttendance;

    localStorage.setItem(
        "attendanceData",
        JSON.stringify(attendanceData)
    );
}


/* =====================================================
   CALCULATE ATTENDANCE
===================================================== */

function calculateAttendance() {

    const totalDays = 30;

    const presentDays = 27;

    const absentDays = 3;

    const percentage =
        Math.round(
            (presentDays / totalDays) * 100
        );

    return {

        totalDays,
        presentDays,
        absentDays,
        percentage

    };
}


/* =====================================================
   UPDATE SUMMARY
===================================================== */

function updateSummary() {

    const data = calculateAttendance();

    document.getElementById(
        "attendancePercentage"
    ).textContent =
        data.percentage + "%";


    document.getElementById(
        "presentDays"
    ).textContent =
        data.presentDays;


    document.getElementById(
        "absentDays"
    ).textContent =
        data.absentDays;


    document.getElementById(
        "totalDays"
    ).textContent =
        data.totalDays;


    document.getElementById(
        "progressPercentage"
    ).textContent =
        data.percentage + "%";


    document.getElementById(
        "progressPresent"
    ).textContent =
        data.presentDays;


    document.getElementById(
        "progressTotal"
    ).textContent =
        data.totalDays;


    document.getElementById(
        "attendanceProgressBar"
    ).style.width =
        data.percentage + "%";
}


/* =====================================================
   RENDER TABLE
===================================================== */

function renderAttendance() {

    const tableBody =
        document.getElementById(
            "attendanceTableBody"
        );

    if (!tableBody) return;

    tableBody.innerHTML = "";


    attendanceData.forEach(record => {

        const row =
            document.createElement("tr");


        /* DATE */

        const dateCell =
            document.createElement("td");

        dateCell.textContent =
            record.date;


        /* DAY */

        const dayCell =
            document.createElement("td");

        dayCell.textContent =
            record.day;


        /* STATUS */

        const statusCell =
            document.createElement("td");

        const badge =
            document.createElement("span");

        badge.classList.add(
            "status-badge"
        );


        if (record.status === "present") {

            badge.classList.add(
                "status-present"
            );

            badge.textContent =
                "✓ Present";

        } else {

            badge.classList.add(
                "status-absent"
            );

            badge.textContent =
                "✕ Absent";
        }


        statusCell.appendChild(badge);


        row.appendChild(dateCell);

        row.appendChild(dayCell);

        row.appendChild(statusCell);


        tableBody.appendChild(row);

    });
}


/* =====================================================
   TODAY BUTTON
===================================================== */

const todayBtn =
    document.getElementById("todayBtn");

if (todayBtn) {

    todayBtn.addEventListener(
        "click",
        function () {

            const today =
                new Date();

            const formattedDate =
                today.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

            alert(
                "Today's date: " +
                formattedDate
            );

        }
    );
}


/* =====================================================
   NAVIGATION
===================================================== */

function navigateTo(id, page) {

    const element =
        document.getElementById(id);

    if (element) {

        element.addEventListener(
            "click",
            function () {

                window.location.href =
                    page;

            }
        );
    }
}


/* DESKTOP NAV */

navigateTo(
    "sideHome",
    "home.html"
);

navigateTo(
    "sideTraining",
    "training.html"
);

navigateTo(
    "sideProgress",
    "progress.html"
);

navigateTo(
    "sideAttendance",
    "attendance.html"
);

navigateTo(
    "sideProfile",
    "profile.html"
);


/* MOBILE NAV */

navigateTo(
    "mobileHome",
    "home.html"
);

navigateTo(
    "mobileTraining",
    "training.html"
);

navigateTo(
    "mobileProgress",
    "progress.html"
);

navigateTo(
    "mobileAttendance",
    "attendance.html"
);

navigateTo(
    "mobileProfile",
    "profile.html"
);


/* =====================================================
   INITIALIZE
===================================================== */

updateSummary();

renderAttendance();


/* Apply common language system */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (typeof applyLanguage === "function") {

            applyLanguage();

        }

        if (languageSelect) {

            languageSelect.value =
                localStorage.getItem(
                    "language"
                ) || "en";
        }

    }
);