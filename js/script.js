
let emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const getRandomId = () => Math.random().toString(36).slice(2);

const registerNow = () => {
    event.preventDefault()

    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirmPassword").value
    


    if (!firstName) {
     showToast("Enter your name correctly", "error")
     return
    }
    if (!emailFormat.test(email)) {
     showToast("Enter your email correctly", "error")
     return
    }
    if (password.length < 8) {
     showToast("Enter your password correctly", "error")
     return
    }
    if (password !== confirmPassword) {
        showToast("Password Must Be Same", "error")
        return
    }

    if (document.getElementById("checkbox").checked === false) {
    showToast("Check the conditions and improve it", "error")
    return
  }


        let fullName = (firstName + " " + lastName).trim()

        let user = { fullName, email, password, id: getRandomId(), }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users));

        showToast("Your Data has been added, Please go to Login Page to Login", "success")

}

const login = () => {
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  var myData = JSON.parse(localStorage.getItem("users"));
  localStorage.setItem("users", JSON.stringify(myData));

  let user = myData.find((user) => user.email === email && user.password === password);

  if (user) {
    alert("Login successful");
    document.write(`<body style='background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)'><h1 style="text-align: center; color: #fff;">${user.fullName}</h1></body>`);
  } else {
    alert('User does not found, Please Register before you Login');
  }
};


function myFunction() {
  var x = document.getElementById("password");
  
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showToast(msg, type) {
    let color = "";
    switch (type) {
      case "success":
        color = "linear-gradient(to right, #a8e063, #56ab2f)";
        break;
      case "error":
        color = "linear-gradient(to right, #f11523, #7a0b23)";
        break;
      case "warning":
        color = "linear-gradient(to right, #fcb045, #fd1d1d, #833ab4)";
        break;
      case "info":
        color = "linear-gradient(to right, #4DA0B0, #D39D38)";
        break;
      default:
        color = "linear-gradient(to right, #00b09b, #96c93d)";
        break;
    }
    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: color,
      },
    }).showToast();
  }