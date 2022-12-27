"use strict";
const userName = document.getElementById("input-username");
const password = document.getElementById("input-password");
const loginBtn = document.querySelector(".btn");

//lấy data user từ localstorage
getUserArr();

//bắt sự kiện vào nút login
loginBtn.addEventListener("click", loginUser);

//hàm login
function loginUser() {
  const isValid = validateLogin();
  if (isValid) {
    // Biến kiểm tra password đúng
    let checkCorrect = 0;
    // lặp qua userArr để tìm user có username và password đúng
    userArr.forEach((item) => {
      if (
        item.userName === userName.value &&
        item.password === password.value
      ) {
        //tạo biến nhận User hiện tại
        const currentUser = new CurrentUser(userName.value);
        //lưu user hiện tại vào localstorage
        saveToStorage("CURRENT_USER", JSON.stringify(currentUser));
        //cập nhật giá trị checkCorrect
        checkCorrect++;
      }
    });

    //thông báo lỗi sai password
    if (checkCorrect === 0) {
      return alert("Incorrect Password!");
    }

    // chuyển về trang chủ khi đăng nhập xong
    window.location.href = "../index.html";
  }
}

// validate dữ liệu đầu vào
function validateLogin() {
  let isCheck = true;
  let checkInclude = 0;

  //kiểm tra trường userName không được để trống
  if (userName.value === "") {
    alert("Please enter username!");
    return (isCheck = false);
  }
  //kiểm tra trường password không được để trống
  if (password.value === "") {
    alert("Please enter password");
    return (isCheck = false);
  }
  // Lặp qua userArr để kiểm tra user name
  userArr.forEach((item) => {
    if (item.userName === userName.value) checkInclude++;
  });
  //nếu không tìm thấy username
  if (checkInclude === 0) {
    alert("user does not exist!");
    return (isCheck = false);
  }
  return isCheck;
}
