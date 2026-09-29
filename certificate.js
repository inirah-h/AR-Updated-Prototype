/* ================= CERTIFICATE ================= */

// Certificate is unlocked for now
localStorage.setItem("certificateUnlocked", "true");


/* ================= WORKER ================= */

const workerName =
    localStorage.getItem("workerName") || "HARINI KUMAR";

document.getElementById("workerName").textContent = workerName;


/* ================= DATE ================= */

const today = new Date();

const formattedDate = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
});

document.getElementById("issuedDate").textContent =
    formattedDate;


/* ================= CERTIFICATE ID ================= */

let certificateId =
    localStorage.getItem("certificateId");

if (!certificateId) {

    const year = today.getFullYear();

    const randomNumber =
        Math.floor(1000 + Math.random() * 9000);

    certificateId =
        `SAR-JH-${year}-${randomNumber}`;

    localStorage.setItem(
        "certificateId",
        certificateId
    );
}

document.getElementById("certificateId").textContent =
    certificateId;


/* ================= BACK ================= */

function goBack() {
    window.location.href = "progress.html";
}


/* ================= PRINT ================= */

function printCertificate() {
    window.print();
}