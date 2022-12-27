"use strict";
//2354c3c2d4ea49d29ec8c22843a78fec api key

const newContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const nextBtn = document.getElementById("btn-next");
const content = document.getElementById("content");
//lấy userArr từ localstorage
getUserArr();

//lấy current user
getCurrentUser();

//tạo class xem news heading
class News /*extends User */ {
  currentPage = 1;
  pageSize = 5;
  category = "General";
  #articles;

  constructor(/*firstName, lastName, userName, password*/) {
    //khởi tạo thông số pageSize và category theo người dùng
    this._getUserSetting();
    //fetch data và hiển thị ra màn hình
    this._getData();
    //bắt sự kiện vào thanh điều hướng
    content.addEventListener("click", this.navBar.bind(this));
  }

  //hàm lấy giá trị setting của User (user.pageSize, user.category)
  _getUserSetting() {
    userArr.forEach((item) => {
      if (item.userName === curUser.currentUser) {
        this.pageSize = item.pageSize;
        this.category = item.category;
      }
    });
  }

  //lấy data từ api
  async _getData() {
    try {
      //tạo biến headlines nhận giá trị trả về từ api
      const headlines = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&page=${this.currentPage}&pageSize=${this.pageSize}&apiKey=2354c3c2d4ea49d29ec8c22843a78fec`
      );

      //tạo lỗi nếu fetch API không thành công
      if (!headlines.ok)
        throw new Error(`${headlines.status}:  Can not load headline! `);
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
    newContainer.innerHTML = "";
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
      newContainer.insertAdjacentHTML("beforeend", html);
    });

    pageNum.textContent = this.currentPage;
  }

  // hàm chuyển trang khi click vào prev và next
  navBar(e) {
    //vô  hiệu hóa click ngoài 2 nav btn
    if (e.target.id !== "btn-prev" && e.target.id !== "btn-next") return;
    //khi click vào prev-btn
    if (e.target.id === "btn-prev") {
      this.currentPage--;
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

  get showArticle() {
    console.log(this.#articles);
  }
}

// khởi tạo instant news
const news = new News();
