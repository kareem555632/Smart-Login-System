// ================> start <==================>
// =========================================>
let signName = document.getElementById("signName");
let signMail = document.getElementById("signMail");
let signPassword = document.getElementById("signPassword");
let signUpBtn = document.getElementById("signUpBtn");
let loginBtn = document.getElementById("loginBtn");
let loginMail = document.getElementById("loginMail");
let loginPassword = document.getElementById("loginPassword");
let logOutBtn = document.getElementById("logOutBtn");
let accountsContainer = [];


if (localStorage.getItem("accounts") !== null) {
    accountsContainer = JSON.parse(localStorage.getItem("accounts"));
}

if (signUpBtn !== null) {
    signUpBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let account = {
            name: signName.value,
            mail: signMail.value,
            password:signPassword.value
        }
        if (checkRequired(signName) && checkRequired(signMail) && checkRequired(signPassword)&&validateLength(signName,3,15)&&validateLength(signPassword,9,30)&&checkEmail(signMail)&&checkAccount(account)) {
            document.getElementById("succesAlert").innerHTML = `<h4 class="alert alert-success text-success p-1 text-center">Success</h4>`;
            document.getElementById("succesAlert").classList.remove("d-none");
            accountsContainer.push(account);
            localStorage.setItem("accounts", JSON.stringify(accountsContainer));
            clearForm();
            setTimeout(() => {
                window.location = "/index.html";
            },2000)
            console.log(accountsContainer);
        } else {
            if (checkRequired(signName) === false || checkRequired(signMail) === false || checkRequired(signPassword) === false) {
                document.getElementById("succesAlert").innerHTML = `<h4 class="alert alert-danger text-danger p-1 text-center">All input Is Required</h4>`;
                document.getElementById("succesAlert").classList.remove("d-none");
            }
            else if (validateLength(signName, 3, 15) === false || validateLength(signPassword, 9, 30) === false) {
                document.getElementById("succesAlert").classList.add("d-none");
                // document.getElementById("succesAlert").innerHTML = `<h4 class="alert alert-danger text-danger p-1 text-center">All input Is Required</h4>`;
            }
            else if(checkEmail(signMail)===false) {
                document.getElementById("succesAlert").classList.add("d-none");
            }
            else if (checkAccount(account) === false) {
                document.getElementById("succesAlert").innerHTML = `<h4 class="alert alert-danger text-danger p-1 text-center">Email is exist</h4>`;
                document.getElementById("succesAlert").classList.remove("d-none");
            }
        }
        
    })

}


function checkRequired(input) {
    if (input.value === '') {
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}


function showError(input, message) {
    input.parentElement.classList.remove("success");
    input.classList.add("error");
    input.parentElement.classList.add("error");
    input.parentElement.querySelector('small').innerHTML = message;
}

function showSuccess(input) {
    input.parentElement.classList.remove("error");
    input.parentElement.classList.add("success");
}

function validateLength(input, min, max) {
    if (input.value.length < min && input.value.length !=0) {
        showError(input, `${input.id.slice(4).toUpperCase()} shoud be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${input.id.slice(4).toUpperCase()} shoud be less than ${max} characters`);
        return false;
    } else {
        return true;
    }
}


function checkEmail(input) {
    let value = input.value.trim();
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(value)) {
        showSuccess(input);
        return true;
    } else if (value.length != 0) {
        showError(input, "Email Is Not Vaild");
        return false;
    }
}

function clearForm() {
    signName.value = '';
    signMail.value = '';
    signPassword.value = '';
}


function checkAccount(acc) {
    let test = 0;
    for (let i = 0; i < accountsContainer.length; i++){
        if (acc.name === accountsContainer[i].name || acc.mail === accountsContainer[i].mail) {
            test++;
        }
    }

    if (test != 0) {
        return false;
    } else {
        return true;
    }
}

if (loginBtn !== null) {
    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (checkRequired(loginMail) && checkRequired(loginPassword)) {
            // console.log("true");
            if (!isAccFound(loginMail, loginPassword)&&loginMail.value!==''&&loginPassword.value!=='') {
                document.getElementById("invaild").classList.toggle('d-none');
            } else {
                document.getElementById("invaild").classList.toggle("d-none");
                location.pathname = '/home.html';
            }
        } else {
            if (checkRequired(loginMail) === false) {
                showError(loginMail, "Email is Required");
            }
            if (checkRequired(loginPassword) === false) {
                showError(loginPassword, "Password is required");
            }
        }
        
    })
}


function isAccFound(emailInput, passInput) {
    let emailValue = emailInput.value;
    let passValue = passInput.value;
    let tes = 0;
    for (let i = 0; i < accountsContainer.length; i++){
        if (accountsContainer[i].mail.toLowerCase() === emailValue.toLowerCase() && accountsContainer[i].password.toLowerCase() === passValue.toLowerCase()) {
            console.log(accountsContainer[i].name);
            sessionStorage.setItem("accountName",JSON.stringify(accountsContainer[i].name))
            tes++;
        } 
    }

    if (tes === 1) {
        return true;
    } else {
        return false;
    }

}

if (location.pathname==='/home.html') {
    document.getElementById("accName").innerHTML = JSON.parse(sessionStorage.getItem("accountName"));
    logOutBtn.addEventListener("click", () => {
        location.pathname = '/index.html';
    })
}
// ================> end <==================>
// =========================================>

















