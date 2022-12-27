"use strict";

class User {
  //đặt giá trị mặc định của pageSize và category
  pageSize = 6;
  category = "Sports";

  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }
}

class CurrentUser {
  constructor(currentUser) {
    this.currentUser = currentUser;
  }
}

class Task {
  //đặt giá trị mặc định isDone là false
  isDone = false;
  constructor(task, owner) {
    this.task = task;
    this.owner = owner;
  }
}
