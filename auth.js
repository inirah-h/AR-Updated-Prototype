import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut,
    deleteUser
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    runTransaction
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";


// =====================================================
// SCREEN NAVIGATION
// =====================================================

function hideAllScreens() {

    const screens = [
        "choiceScreen",
        "loginScreen",
        "registerScreen",
        "forgotScreen"
    ];

    screens.forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }

    });
}


function showChoice() {

    hideAllScreens();

    document
        .getElementById("choiceScreen")
        .classList.remove("hidden");
}


function showLogin() {

    hideAllScreens();

    document
        .getElementById("loginScreen")
        .classList.remove("hidden");

    clearError("loginError");
}


function showRegister() {

    hideAllScreens();

    document
        .getElementById("registerScreen")
        .classList.remove("hidden");

    clearError("registerError");
}


function showForgotPassword() {

    hideAllScreens();

    document
        .getElementById("forgotScreen")
        .classList.remove("hidden");

    clearError("forgotError");
}


// =====================================================
// ERROR HELPER
// =====================================================

function clearError(id) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = "";
    }
}


// =====================================================
// VALIDATION
// =====================================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function isValidPhone(phone) {

    return /^[6-9][0-9]{9}$/.test(phone);
}


function isValidPassword(password) {

    const length =
        password.length >= 8;

    const alphabet =
        /[A-Za-z]/.test(password);

    const number =
        /[0-9]/.test(password);

    const special =
        /[^A-Za-z0-9]/.test(password);

    return (
        length &&
        alphabet &&
        number &&
        special
    );
}


// =====================================================
// PASSWORD LIVE VALIDATION
// =====================================================

const passwordInput =
    document.getElementById("newPassword");


if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        function () {

            const password =
                this.value;

            updateRule(
                "ruleLength",
                password.length >= 8,
                "At least 8 characters"
            );

            updateRule(
                "ruleLetter",
                /[A-Za-z]/.test(password),
                "At least 1 alphabet"
            );

            updateRule(
                "ruleNumber",
                /[0-9]/.test(password),
                "At least 1 number"
            );

            updateRule(
                "ruleSpecial",
                /[^A-Za-z0-9]/.test(password),
                "At least 1 special character"
            );

        }
    );
}


function updateRule(id, valid, text) {

    const element =
        document.getElementById(id);

    if (!element) return;

    if (valid) {

        element.textContent =
            "✓ " + text;

        element.style.color =
            "#20c963";

    } else {

        element.textContent =
            "✗ " + text;

        element.style.color =
            "#77858a";
    }
}


// =====================================================
// REGISTER
// =====================================================

async function completeRegistration() {

    const name =
        document
            .getElementById("registerName")
            .value
            .trim();

    const username =
        document
            .getElementById("registerUsername")
            .value
            .trim();

    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();

    const phone =
        document
            .getElementById("registerPhone")
            .value
            .trim();

    const password =
        document
            .getElementById("newPassword")
            .value;

    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;

    const error =
        document.getElementById("registerError");


    error.textContent = "";


    // -------------------------
    // BASIC VALIDATION
    // -------------------------

    if (name === "") {

        error.textContent =
            "Please enter your full name.";

        return;
    }


    if (username.length < 3) {

        error.textContent =
            "Username must contain at least 3 characters.";

        return;
    }


    if (!/^[a-zA-Z0-9_]+$/.test(username)) {

        error.textContent =
            "Username can contain only letters, numbers and underscore.";

        return;
    }


    if (!isValidEmail(email)) {

        error.textContent =
            "Please enter a valid Email ID.";

        return;
    }


    if (
        phone !== "" &&
        !isValidPhone(phone)
    ) {

        error.textContent =
            "Please enter a valid 10 digit Indian phone number.";

        return;
    }


    if (!isValidPassword(password)) {

        error.textContent =
            "Password must contain at least 8 characters, 1 alphabet, 1 number and 1 special character.";

        return;
    }


    if (password !== confirmPassword) {

        error.textContent =
            "Passwords do not match.";

        return;
    }


    // -------------------------
    // DISABLE BUTTON
    // -------------------------

    const button =
        document.querySelector(
            "#registerScreen .primary-btn"
        );

    if (button) {
        button.disabled = true;
        button.textContent =
            "CREATING ACCOUNT...";
    }


    let firebaseUser = null;


    try {

        // -------------------------
        // CREATE FIREBASE ACCOUNT
        // -------------------------

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        firebaseUser =
            userCredential.user;


        // -------------------------
        // CHECK USERNAME
        // -------------------------

        const usernameId =
            username.toLowerCase();


        const usernameRef =
            doc(
                db,
                "usernames",
                usernameId
            );


        // -------------------------
        // RESERVE USERNAME
        // -------------------------

        await runTransaction(
            db,
            async transaction => {

                const usernameDoc =
                    await transaction.get(
                        usernameRef
                    );


                if (usernameDoc.exists()) {

                    throw new Error(
                        "USERNAME_ALREADY_EXISTS"
                    );
                }


                transaction.set(
                    usernameRef,
                    {
                        uid: firebaseUser.uid,
                        username: username
                    }
                );

            }
        );


        // -------------------------
        // SAVE USER PROFILE
        // -------------------------

        await setDoc(
            doc(
                db,
                "users",
                firebaseUser.uid
            ),
            {
                uid: firebaseUser.uid,
                name: name,
                username: username,
                email: email,
                phone: phone,
                createdAt: new Date().toISOString()
            }
        );


        // -------------------------
        // SEND EMAIL VERIFICATION
        // -------------------------

        await sendEmailVerification(
            firebaseUser
        );


        alert(
            "Account created successfully!\n\nA verification link has been sent to your email. Please verify your email before logging in."
        );


        // -------------------------
        // SIGN OUT
        // -------------------------

        await signOut(auth);


        // -------------------------
        // CLEAR FORM
        // -------------------------

        document.getElementById(
            "registerName"
        ).value = "";

        document.getElementById(
            "registerUsername"
        ).value = "";

        document.getElementById(
            "registerEmail"
        ).value = "";

        document.getElementById(
            "registerPhone"
        ).value = "";

        document.getElementById(
            "newPassword"
        ).value = "";

        document.getElementById(
            "confirmPassword"
        ).value = "";


        showLogin();


    } catch (firebaseError) {

        console.error(
            "Registration error:",
            firebaseError
        );


        // -------------------------
        // USERNAME ALREADY EXISTS
        // -------------------------

        if (
            firebaseError.message ===
            "USERNAME_ALREADY_EXISTS"
        ) {

            error.textContent =
                "This username is already registered. Please choose another.";

            if (firebaseUser) {
                await deleteUser(firebaseUser);
            }

            return;
        }


        // -------------------------
        // FIREBASE ERRORS
        // -------------------------

        switch (firebaseError.code) {

            case "auth/email-already-in-use":

                error.textContent =
                    "This Email ID is already registered.";

                break;


            case "auth/invalid-email":

                error.textContent =
                    "Please enter a valid Email ID.";

                break;


            case "auth/weak-password":

                error.textContent =
                    "Password is too weak.";

                break;


            case "auth/network-request-failed":

                error.textContent =
                    "Network error. Please check your internet connection.";

                break;


            default:

                error.textContent =
                    "Registration failed. Please try again.";

        }

    } finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "CREATE ACCOUNT";
        }
    }
}


// =====================================================
// LOGIN
// =====================================================

async function loginUser() {

    const email =
        document
            .getElementById("loginIdentifier")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    const error =
        document.getElementById("loginError");


    error.textContent = "";


    if (email === "" || password === "") {

        error.textContent =
            "Please enter your Email ID and password.";

        return;
    }


    if (!isValidEmail(email)) {

        error.textContent =
            "Please enter a valid Email ID.";

        return;
    }


    const button =
        document.querySelector(
            "#loginScreen .primary-btn"
        );


    if (button) {

        button.disabled = true;

        button.textContent =
            "LOGGING IN...";
    }


    try {

        // -------------------------
        // FIREBASE LOGIN
        // -------------------------

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        // -------------------------
        // EMAIL VERIFICATION
        // -------------------------

        if (!user.emailVerified) {

            error.textContent =
                "Please verify your email before logging in. Check your inbox.";

            await signOut(auth);

            return;
        }


        // -------------------------
        // GET USER PROFILE
        // -------------------------

        const userRef =
            doc(
                db,
                "users",
                user.uid
            );


        const userDoc =
            await getDoc(userRef);


        if (!userDoc.exists()) {

            error.textContent =
                "User profile not found. Please contact support.";

            await signOut(auth);

            return;
        }


        const userData =
            userDoc.data();


        // -------------------------
        // SAVE ONLY NON-SENSITIVE
        // SESSION DATA
        // -------------------------

        localStorage.setItem(
            "username",
            userData.username || ""
        );


        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                uid: user.uid,
                name: userData.name,
                username: userData.username,
                email: userData.email,
                phone: userData.phone || ""
            })
        );


        // -------------------------
        // GO TO LANGUAGE PAGE
        // -------------------------

        window.location.href =
            "language.html";


    } catch (firebaseError) {

        console.error(
            "Login error:",
            firebaseError
        );


        switch (firebaseError.code) {

            case "auth/invalid-credential":

                error.textContent =
                    "Incorrect Email ID or password.";

                break;


            case "auth/user-not-found":

                error.textContent =
                    "No account found with this Email ID.";

                break;


            case "auth/wrong-password":

                error.textContent =
                    "Incorrect password.";

                break;


            case "auth/invalid-email":

                error.textContent =
                    "Please enter a valid Email ID.";

                break;


            case "auth/too-many-requests":

                error.textContent =
                    "Too many login attempts. Please try again later.";

                break;


            case "auth/network-request-failed":

                error.textContent =
                    "Network error. Please check your internet connection.";

                break;


            default:

                error.textContent =
                    "Login failed. Please try again.";
        }

    } finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "LOGIN";
        }
    }
}


// =====================================================
// FORGOT PASSWORD
// =====================================================

async function sendResetEmail() {

    const email =
        document
            .getElementById("forgotIdentifier")
            .value
            .trim()
            .toLowerCase();

    const error =
        document.getElementById("forgotError");


    error.textContent = "";


    if (email === "") {

        error.textContent =
            "Please enter your Email ID.";

        return;
    }


    if (!isValidEmail(email)) {

        error.textContent =
            "Please enter a valid Email ID.";

        return;
    }


    const button =
        document.querySelector(
            "#forgotScreen .primary-btn"
        );


    if (button) {

        button.disabled = true;

        button.textContent =
            "SENDING...";
    }


    try {

        await sendPasswordResetEmail(
            auth,
            email
        );


        alert(
            "Password reset email sent successfully. Please check your inbox."
        );


        document.getElementById(
            "forgotIdentifier"
        ).value = "";


        showLogin();


    } catch (firebaseError) {

        console.error(
            "Password reset error:",
            firebaseError
        );


        switch (firebaseError.code) {

            case "auth/user-not-found":

                error.textContent =
                    "No account found with this Email ID.";

                break;


            case "auth/invalid-email":

                error.textContent =
                    "Please enter a valid Email ID.";

                break;


            case "auth/network-request-failed":

                error.textContent =
                    "Network error. Please check your internet connection.";

                break;


            default:

                error.textContent =
                    "Unable to send reset email. Please try again.";
        }

    } finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "SEND RESET EMAIL";
        }
    }
}


// =====================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// =====================================================

window.showChoice =
    showChoice;

window.showLogin =
    showLogin;

window.showRegister =
    showRegister;

window.showForgotPassword =
    showForgotPassword;

window.completeRegistration =
    completeRegistration;

window.loginUser =
    loginUser;

window.sendResetEmail =
    sendResetEmail;


// =====================================================
// INITIAL SCREEN
// =====================================================

showChoice();