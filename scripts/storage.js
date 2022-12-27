"use strict";

//lưu dữ liệu vào storage
const saveToStorage = function (key, value) {
  localStorage.setItem(key, value);
};

// hàm lấy dữ liệu
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

const userArr = [];
const todoArr = [];
let curUser;

// lấy UserArr từ storage, đặt lại giá trị pageSize và category theo giá trị của người dùng đã lưu trong storage
function getUserArr() {
  const data = getFromStorage("USER_ARRAY");
  if (data)
    data.forEach((item) => {
      const user = new User(
        item.firstName,
        item.lastName,
        item.userName,
        item.password
      );
      user.pageSize = item.pageSize;
      user.category = item.category;

      userArr.push(user);
    });
}

//hàm lấy dữ liệu của todo task
function getTodoArr() {
  //lấy data từ storage
  const data = getFromStorage("TODO_ARR");
  if (data)
    //tạo mới các instant Task từ dữ liệu trong TODO_ARR,cập nhật biến mặc định isDone theo giá trị trong storage!
    data.forEach((item) => {
      const task = new Task(item.task, item.owner);
      task.isDone = item.isDone;
      todoArr.push(task);
    });
}

//hàm lấy người dùng hiện tại ở storage
function getCurrentUser() {
  const user = getFromStorage("CURRENT_USER");
  if (!user) {
    alert("Please Login or register first!");
    window.location.href = "../index.html";
  }
  curUser = new CurrentUser(user.currentUser);
}
