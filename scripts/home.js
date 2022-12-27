"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

const user = getFromStorage("CURRENT_USER");
//không dùng hàm getCurrentUser vì sẽ bị văng thông báo
//trạng thái hiển thị khi người dùng đăng nhập
if (user) {
  // ẩn giao diện chưa đăng nhập (thêm attribute style = display : 'none')
  loginModal.style.display = "none";
  // Hiển thị Welcome message
  welcomeMessage.innerHTML = `Welcome ${user.currentUser}!`;
  // hiển thị giao diện main content (xóa attribute style = display : 'none')
  mainContent.removeAttribute("style");
}
//khi người dùng chưa đăng nhập
if (!user) {
  mainContent.style.display = "none";
}

//hàm logout
function logout() {
  // xóa current user trong local storage
  localStorage.removeItem("CURRENT_USER");
  //hiển thị giao diện chưa đăng nhập, (xóa attribute style = display : 'none')
  loginModal.removeAttribute("style");
  //ẩn giao diện maincontent(thêm attribute style = display : 'none')
  mainContent.style.display = "none";
}

//bắt sự kiện vào nút logout
logoutBtn.addEventListener("click", logout);
