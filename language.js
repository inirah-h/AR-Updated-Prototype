const languageOptions =
    document.querySelectorAll(".language-option");

let selectedLanguage =
    localStorage.getItem("language") || "en";


function updateLanguageSelection() {

    languageOptions.forEach(option => {

        option.classList.remove("selected");

        if (
            option.dataset.language ===
            selectedLanguage
        ) {
            option.classList.add("selected");
        }

    });
}


languageOptions.forEach(option => {

    option.addEventListener("click", function () {

        selectedLanguage =
            this.dataset.language;

        localStorage.setItem(
            "language",
            selectedLanguage
        );

        updateLanguageSelection();

    });

});


function continueToHome() {

    localStorage.setItem(
        "language",
        selectedLanguage
    );

    window.location.href = "home.html";
}


updateLanguageSelection();