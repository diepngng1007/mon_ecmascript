import "@/css/product.css";
import Loader from "@/component/loading";
import Pagination from "@/component/Pagination/pagination";
import HtmlPaging from "@/component/Pagination/htmlPaging";
import { PagingProduct } from "@/component/pagingProduct/pagingProduct";
export default function Product(slug) {
  if (slug) {
    document.addEventListener("DOMContentLoaded", async () => {
      const dataProducts = await fetch("http://localhost:3000/products");
      const dbJSON = await dataProducts.json();

      const findProducts = dbJSON.find((item, index) => {
        return item.id == slug;
      });

      console.log(findProducts);

      function formatCurrency(value) {
        return value.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      }
      const detail_product = document.querySelector(".detail_product");
      let html = ` <div class="detail_image">
            <img src="${findProducts.image}" alt="">
            </div>
            <div class="detail_description">
            <h2>${findProducts.name}</h2>
            <div style="display: flex;align-items: center; width: 350px;height: 21px;margin: 10px 0;">
            <img src="/img/${
              findProducts.rate
            }star.png" alt="" style="padding-right: 12px;">
            <p style="font-size: 14px;">(150 Reviews)</p>
        </div>
        <span style="font-size: 24px;">${formatCurrency(
          findProducts.price
        )}</span>
        <p style="font-size: 14px;margin: 15px 0;">${findProducts.mota}</p>
                <hr>
                <div>
                    <button>Buy Now</button>
                </div>
                <div style="margin-top: 35px;"><img src="/img/ideal.png" alt=""></div>
            </div>`;
      detail_product.innerHTML = html;
    });
    return /*html*/ `
    <div class="detail_product">
   
</div>
    `;
  } else {
    // no slug
    // no slug
    // no slug
    // no slug

    document.addEventListener("DOMContentLoaded", async () => {
        const listItem = document.querySelector(".list-items");
      const category = await fetch("http://localhost:3000/category");
      const product = await fetch("http://localhost:3000/products");
      const jsonProduct = await product.json();
      const jsonCate = await category.json();
      const newQuery = new URLSearchParams(window.location.search);
      const queryIDCate =
      newQuery.get("cateID")&& newQuery.get("cateID").length > 0
          ? newQuery.get("cateID").split(",")
          : null;
          const queryPage =Number(
            newQuery.get("page")&& newQuery.get("page").length > 0
              ? newQuery.get("page")
              : 1);
      // page variable
      const itemPerPage = 12;
      // arrProduct
      let newArr = queryIDCate ? queryIDCate : [];
      const filterProduct = jsonProduct.filter((item, index) => {
        if(newArr.length >0){
            return newArr.includes(String(item.categoriesID));
        }else{
            return item
        }
       
      });
    //   pagination ------------------------>
    const elPagination =document.querySelector('#pagination')
    Pagination(filterProduct,queryPage,itemPerPage,elPagination)
      const paginaProduct = PagingProduct(filterProduct,queryPage,itemPerPage);
     
      let htmlCateGory = ``;
      jsonCate.forEach((item, index) => {
        htmlCateGory += `<li ids="${item.id}" class="item">
        <span class="checkbox" >
            <i class="fa-solid fa-check check-icon"></i>
        </span>
        <span class="item-text">${item.name}</span>
    </li>`;
      });
      listItem.innerHTML = htmlCateGory;
      const selectBtn = document.querySelector(".select-btn");
      const items = document.querySelectorAll(".item");
      function queryUrl(paramsArray) {
        let currentURL = window.location.href;

        const parts = currentURL.split("?");

        let params = {};

        if (parts.length > 1) {
          const paramString = parts[1];
          const paramPairs = paramString.split("&");

          paramPairs.forEach((paramPair) => {
            const [key, value] = paramPair.split("=");
            params[key] = value;
          });
        }

        paramsArray.forEach((paramObj) => {
          params[paramObj.key] = paramObj.value;
        });

        const newParamString = Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&");

        const newURL = parts[0] + "?" + newParamString;
        window.location.href = newURL;
      }

      selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
      });

      const btnSelect = document.querySelector(".btn-text");
      if (newArr.length > 0) {
        selectBtn.classList.toggle("open");
        btnSelect.innerText = `${newArr.length} Chọn`;
      }
      items.forEach((item) => {
        newArr.forEach((itemz) => {
          if (item.getAttribute("ids") == itemz) {
            item.classList.toggle("checked");
          }
        });

        item.addEventListener("click", (event) => {
          const ids = event.target.getAttribute("ids");
          if (item.classList.value == "item checked") {
            const idsCheck = event.target.getAttribute("ids");
            const filterID = newArr.filter((item) => item != idsCheck);
            newArr = filterID;
          } else {
            newArr.push(ids);
          }
          const joinArr = newArr.join(",");
          queryUrl([{ key: "cateID", value: joinArr }]);
          item.classList.toggle("checked");

          let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");

          if (checked && checked.length > 0) {
            btnText.innerText = `${checked.length} Chọn`;
          } else {
            btnText.innerText = "Danh mục sản phẩm";
          }
        });
      });
      const product_for_category = document.querySelector('.product_for_category')
      let htmlProduct = ``
      paginaProduct.forEach((item,index)=>{
        htmlProduct += ` <div class="product_month__block" class="hover_btn">
        <div onclick="detailProduct('${item.id}')"  class="product-container__item" style="
      background-color: #f5f5f5;
      width: 270px;
      height: 250px;
      position: relative;
    ">
            <div style="display: flex; justify-content: center">
                <img src="${item.image}" alt="" style="width: 150px; height: 132px; margin-top: 50px" class="img" />
            </div>
            <div style="
        background-color: #db4444;
        width: 55px;
        height: 26px;
        font-size: 12px;
        color: white;
        border-radius: 3px;
        text-align: center;
        padding-top: 5px;
        position: absolute;
        top: 5%;
        left: 5%;
      ">
                <p>-40%</p>
            </div>
            <div style="
        background-color: white;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        position: absolute;
        top: 5%;
        right: 2%;
      ">
                <img src="./img/heart.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px" />
            </div>
            <div style="
        background-color: white;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        position: absolute;
        top: 22%;
        right: 2%;
      ">
                <img src="./img/eye.png" alt="" style="width: 24px; height: 24px; margin: 6px 5px" />
            </div>
            <div class="btn-check"><button>Add to cart</button></div>
        </div>
        <div style="margin-top: 18px">
            <h3 style="font-size: 16px">${item.name}</h3>
            <span style="color: #db4444; line-height: 38px">$ ${item.price} <s style="color: #a5a5a5">$ ${item.price_origin}</s></span>
            <div style="display: flex">
                <img src="./img/${item.rate}star.png" alt="" />
                <p style="color: #a5a5a5; font-size: 14px; padding-left: 10px">
                    (${item.purchase})
                </p>
            </div>
        </div>
    </div>`
      })
      product_for_category.innerHTML =htmlProduct
      //Pagination

      
      const elScript = document.createElement("script");
      let script = `function detailProduct(id){
       const formatID = id.replace("#","")
      window.location.href ="/product/"+formatID;
     }`;
      elScript.innerHTML = script;
       document.body.appendChild(elScript);
       const productss = document.querySelector(".product")
    //    productss.innerHTML = 
    });

       
    return `
<div class="product">
<div class="product_category">
    <div class="container">
        <div class="select-btn">
            <span class="btn-text">Danh mục sản phẩm</span>
            <span class="arrow-dwn">
            <img src="/img/down-chevron.png" alt="" />
            </span>
        </div>
        <ul class="list-items">
      

        </ul>
    </div>
</div>
<div class="product_container">
    <div class="product_for_category">
   ${Loader()}

    </div>

   ${HtmlPaging()}

</div>
</div>


`;
  }
}
