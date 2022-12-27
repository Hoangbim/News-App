"use strict";

const newsContainer = document.getElementById("news-container");
const navPageNum = document.getElementById("nav-page-num");
const pageNum = document.getElementById("page-num");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const submitBtn = document.getElementById("btn-submit");
const queryInput = document.getElementById("input-query");

class Search /*extends User */ {
  //đặt giá trị mặc định của currentPage
  currentPage = 1;
  //đặt giá trị mặc định của pageSize
  pageSize = 5;
  //đặt giá trị mặc định của #article
  #articles;
  //đặt giá trị mặc định của searchKey
  searchKey = "Việt Nam";

  constructor() {
    //lấy dữ liệu khởi tạo
    this._getData();
    //bắt sự kiện vào search button
    submitBtn.addEventListener("click", this._searchNews.bind(this));
    //bắt sự kiện vào thanh điều hướng
    navPageNum.addEventListener("click", this.navBar.bind(this));
  }

  // search dữ liệu
  _searchNews() {
    //kiểm tra hợp lệ của input, nếu true => gán this.searchKer bằng giá trị input
    if (this._validate()) {
      this.searchKey = queryInput.value;
    }
    //gọi hàm get data để tìm
    this._getData();
  }

  _validate() {
    let isCheck = true;
    // input không được trống
    if (queryInput.value.trim() === "") {
      isCheck = false;
      alert("Please enter search Key!");
      return;
    }
    return isCheck;
  }

  //lấy data từ api
  async _getData() {
    try {
      //tạo biến headlines nhận giá trị trả về từ api
      const headlines = await fetch(
        `https://newsapi.org/v2/everything?q=${this.searchKey}&pageSize=${this.pageSize}&page=${this.currentPage}&apiKey=2354c3c2d4ea49d29ec8c22843a78fec`
      );
      //tạo lỗi nếu fetch API không thành công
      if (!headlines.ok) throw new Error("No result, try another Keyword!");
      //tạo biến nhận kết quả trả về dạng json
      const data = await headlines.json();
      //gán giá trị trả về cho biến cục bộ(articles)
      this.#articles = await data.articles;
      // hiển thị ra màn hình
      this.renderData();
      //có thể return data.articles ở đây rồi dùng hàm then() để gán vào #ả
      this.hidePrevNext();
    } catch (err) {
      alert(err);
    }
  }

  //hàm hiển thị data lên màn hình
  renderData() {
    //xóa nội dung hiển thị cũ
    newsContainer.innerHTML = "";
    //tạo list div chưas  nội dung hiển thị từ data trả về từ API
    this.#articles.forEach((item) => {
      const html = `
          <div class="card flex-row flex-wrap">
                      <div class="card mb-3" style="">
                          <div class="row no-gutters">
                              <div class="col-md-4">
                                  <img src=${item.urlToImage}
                                      class="card-img"
                                      alt=${item.title}>
                              </div>
                              <div class="col-md-8">
                                  <div class="card-body">
                                      <h5 class="card-title">${item.title}</h5>
                                      <p class="card-text">${item.description}</p>
                                      <a href=${item.url}
                                          class="btn btn-primary">View</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`;
      //chèn nội dung vào div newContainer
      newsContainer.insertAdjacentHTML("beforeend", html);
    });

    pageNum.textContent = this.currentPage;
  }

  // hàm chuyển trang khi click vào prev và next
  navBar(e) {
    //vô  hiệu hóa click ngoài 2 nav btn
    if (e.target.id !== "btn-prev" && e.target.id !== "btn-next") return;
    //khi click vào prev-btn
    if (e.target.id === "btn-prev") {
      //giảm giá trị của currentPage
      this.currentPage--;
      //gọi hàm getData với currentPage thay đổi
      this._getData();
    }
    // khi click vào next button
    if (e.target.id === "btn-next") {
      //tăng giá trị currentPage
      this.currentPage++;
      //gọi hàm getData với current Page thay đổi
      this._getData();
    }
  }

  //hàm ẩn hiện prev và next button
  hidePrevNext() {
    //ẩn hiện previous button
    if (this.currentPage === 1) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
    }
    //ẩn hiện previous button
    if (
      this.currentPage ===
      Math.trunc(this.#articles.totalResults / this.pageSize)
    ) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
    }
  }
}

//khởi tạo instant Search mới
const search = new Search();
