"use strict";

const registerBtn = document.querySelector(".btn");
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const userName = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");

// lấy dữ liệu từ local storage
getUserArr();

registerBtn.addEventListener("click", registerNewUser);

//hàm validate register input
function validatedUserInput() {
  let isCheck = true;
  //kiểm tra các trường không được để trống
  if (firstName.value === "") {
    alert("Please fill your firstname!");
    return (isCheck = false);
  }

  if (lastName.value === "") {
    alert("Please fill your lastname!");
    return (isCheck = false);
  }
  if (userName.value === "") {
    alert("Please fill your username!");
    return (isCheck = false);
  }
  if (password.value === "") {
    alert("Please fill your password!");
    return (isCheck = false);
  }
  if (confirmPassword.value === "") {
    alert("Please fill your confirmPassword!");
    return (isCheck = false);
  }

  //kiểm tra trùng username
  userArr.forEach((item) => {
    if (item.userName === userName.value) {
      alert("Username must be unique!");
      return (isCheck = false);
    }
  });

  //password phải nhiều hơn 8 ký tự
  if ((password.value + "").length <= 8) {
    alert("Password must be more than 8 charactor!");
    return (isCheck = false);
  }
  console.log(password.value, confirmPassword.value);
  //kiểm tra confirm password
  if (password.value !== confirmPassword.value) {
    alert("Confirmpassword not match!");
    return (isCheck = false);
  }

  return isCheck;
}

//hàm register new user
function registerNewUser() {
  //validate input
  const isValid = validatedUserInput();

  if (isValid) {
    //taọ istant User mới với dữ liệu nhập vào
    const user = new User(
      firstName.value,
      lastName.value,
      userName.value,
      password.value
    );
    //thêm vào userArr.
    userArr.push(user);

    saveToStorage("USER_ARRAY", JSON.stringify(userArr));

    console.log("Register successfull!");
    window.location.href = "../pages/login.html";
  }
}
