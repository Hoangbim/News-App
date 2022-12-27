"use strict";
//taọ 1 class gồm các trường khởi tạo như sau
//task: nội dung công việc
//owner: username của người tạo
// isDone: đã hoàn thành hay chưa?

// khi ấn tạo
// {
//   /* <li>
// 						Hit the gym
// 						<span class="close">×</span>
// 					</li>
// 					<li class="checked">Pay bills<span class="close">×</span></li> */
// }

const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");

const list = document.querySelectorAll(".close");
const todoList = document.getElementById("todo-list");

const tasks = todoList.querySelectorAll("li");

// todoList.addEventListener("click", function (e) {
//   // chọn phần tử span khi click vào task!
//   const span = e.target.querySelector("span");
//   // nếu click vào span, thì sẽ không tìm được span element, dựa vào đó để loại trừ trường hợp xung đột (cùng 1 lúc khi click vào sẽ thực hiện đổi trạng thái của task và xóa task)
//   console.log(e.target.classList);
//   if (span) console.log(span.dataset.id);
//   //loại trừ trường hợp click ngoài vùng span
//   if (e.target.dataset.id) console.log(e.target.dataset.id);
// });

//để chọn task cần xóa khi click :
// trong template thêm trong span data-id="${task}", sau đó e.target.dataset.id sẽ là task mong muốn

// khởi tạo trang

// if (taskArr === []) {
//   console.log("hoang");
//   alert("Log in to use this function!");
//   window.location.href = "../index.html";
// }
getTodoArr();

getCurrentUser();

class Todo {
  constructor() {
    this._renderTodoList();
    addBtn.addEventListener("click", this._addTask.bind(this));
    todoList.addEventListener("click", this._editTodoList.bind(this));
  }

  _addTask() {
    //tạo instant của class Task mới bằng thông tin người dùng nhập vào
    const newTask = new Task(taskInput.value, curUser.currentUser);
    //thêm vào todoArr
    todoArr.push(newTask);

    //lưu vào storage
    saveToStorage("TODO_ARR", JSON.stringify(todoArr));

    this._renderTodoList();
    taskInput.value = "";
  }

  _editTodoList(e) {
    this._toggleTask(e);

    this._deleteTask(e);
    //loại trừ trường hợp click ngoài vùng span
    // if (e.target.dataset.id) console.log(e.target.dataset.id);
  }

  _renderTodoList() {
    //lọc trong todoArr lấy ra các task có owner === currentUser
    const ownerTaskArr = todoArr.filter(
      (item) => item.owner === curUser.currentUser
    );

    // clear todo list
    todoList.innerHTML = "";
    ownerTaskArr.forEach((item) => {
      const html = `<li ${item.isDone ? 'class = "checked"' : ""}>
      ${item.task}
      <span class="close" data-id="${item.task}">×</span>
    </li>`;
      //thêm element <li> vào cuối todoList
      todoList.insertAdjacentHTML("beforeend", html);
    });
  }

  _toggleTask(e) {
    // thay đổi trạng thái hiển thị của task
    e.target.classList.toggle("checked");
    //trỏ về span khi click vào task
    const span = e.target.querySelector("span");
    //cập nhật trạng thái của task vào todoArr
    if (span) {
      todoArr.forEach((item) => {
        if (
          item.task === span.dataset.id &&
          item.owner === curUser.currentUser
        ) {
          item.isDone = item.isDone === false ? true : false;
        }
      });
    }

    saveToStorage("TODO_ARR", JSON.stringify(todoArr));
  }

  _deleteTask(e) {
    if (!e.target.dataset.id) return;
    if (e.target.dataset.id) {
      console.log(e.target.dataset.id);
      // todoArr.forEach((item, i) =>
      //   if (item.task === e.target.dataset.id&&item.owner === curUser.currentUser) todoArr.splice(i, 1)
      // )
      todoArr.forEach((item, i) => {
        if (
          item.task === e.target.dataset.id &&
          item.owner === curUser.currentUser
        )
          todoArr.splice(i, 1);
      });
    }
    saveToStorage("TODO_ARR", JSON.stringify(todoArr));
    this._renderTodoList();
  }
}

const todo = new Todo();
