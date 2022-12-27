"use strict";
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");

getUserArr();

getCurrentUser();

function changeSetting() {
  if (pageSizeInput.value < 1) return alert("PageSize must be larger than 0!");
  //lặp qua userArr.forEach, gán lại giá trị pageSize và category của user bằng input value
  userArr.forEach((item) => {
    if (item.userName === curUser.currentUser) {
      item.pageSize = +pageSizeInput.value;
      item.category = categoryInput.value;
    }
  });
  //lưu dữ liệu vào localstorage
  //   saveToStorage("USER_ARRAY", JSON.stringify(userArr));
  localStorage.setItem("USER_ARRAY", JSON.stringify(userArr));
}

submitBtn.addEventListener("click", changeSetting);
