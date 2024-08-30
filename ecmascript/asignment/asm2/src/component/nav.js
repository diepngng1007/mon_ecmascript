export default function NavUser() {
  document.addEventListener("DOMContentLoaded", () => {
    let html = ``;
    const localAccount = localStorage.getItem("account");
    const dropdown_nav = document.querySelector(".dropdown");
    if (localAccount) {
      html = ` <ul>
            <li id="logout_nav"><a >Đăng xuất</a></li>
        </ul>`;
    } else {
      html = ` <ul>
            <li><a href="/signin">Đăng nhập</a></li>
            <li><a href="/signup">Đăng ký</a></li>
        </ul>`;
    }
    dropdown_nav.innerHTML = html;
    const script_nav = document.createElement("script");
    script_nav.innerHTML = `
    const logout_nav = document.getElementById("logout_nav");
    if(logout_nav){
        logout_nav.addEventListener("click", () => {
            localStorage.removeItem("account");
            window.location.href = "/signin";
          });
    }
        `;
  
    document.body.appendChild(script_nav);
  });

  const firtSlug = window.location.origin + "/";
  const domain = window.location.href;
  return ` <nav class="navbar">
    <div class="navbar_logo">
        <h1 style="font-size: 24px;">Exclusive</h1>
    </div>
    <div class="navbar_menu">
        <ul class="nav-item">
            <li><a style='${
              firtSlug === domain
                ? "border-bottom:1px solid black"
                : "border-bottom:1px solid transparent"
            }' href="/" class="a">Trang chủ</a></li>
            <li><a style='${
              domain.indexOf("/product") !== -1
                ? "border-bottom:1px solid black"
                : "border-bottom:1px solid transparent"
            }' href="/product">Sản phẩm</a></li>
        </ul>
    </div> 
    <div class="navbar_product">
        <div class="navbar_product__input">
            <input type="text" placeholder="What are you looking for?">
            <img src="./img/search.png" alt="">
        </div>
        <div style="margin-top: 5px;" class="navbar_product__heart">
            <img src="./img/heart.png" alt="">
            <div class="dropdown">
               
            </div>
        </div>
        <!-- <div style="margin-top: 5px;">
            <img src="./img/cart.png" alt="">
        </div> -->
    </div>       
</nav>`;
}
