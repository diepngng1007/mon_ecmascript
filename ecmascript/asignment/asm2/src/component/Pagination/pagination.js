export default function Pagination(arrPage, page, itemPerPage, pagination,varis) {
  // Nếu itemPerPage là 12 thì varis là 3 ||còn 10 là 1
  // itemPerPage luôn phải là 12
  // arrPage là số lượng phần tử sản phẩm
  // page là trang hiện tại
  //  itemPerPage số sản phẩm tối đa trong 1 trang
  // pagination là 1 element HTML
  let arr = [];
  const LentProduct = arrPage ? arrPage.length : 0;

  const pages = Math.round(LentProduct / itemPerPage);

  //   total pages
  for (let i = 0; i < pages; i++) {
    arr.push(i + 1);
  }
  //   total pages
  let numberPage = [];

  for (let i = 0; i < arr.length; i++) {
    numberPage.push(6 * i);
  }

  let htmlFirt = ``;
  let htmlLast = ``;
  const nextPage = numberPage.find((item) => {
    if (page !== 0) {
      return item == page;
    }
  });
  function findNearestNumber(array, target) {
    let nearest = null;

    for (const number of array) {
      if (number < target) {
        if (!nearest || target - number < target - nearest) {
          nearest = number;
        }
      }
    }

    return nearest;
  }

  arr
    .slice(
      page == 0
        ? page
        : nextPage
        ? nextPage - 1
        : page - 6 > 0
        ? findNearestNumber(numberPage, page) - 1
        : 0,
      nextPage
        ? nextPage + itemPerPage - (varis?varis:3) 
        : page > 6
        ? findNearestNumber(numberPage, page) + 10 - 1
        : findNearestNumber(numberPage, page) + 10
    )
    .forEach((item, index) => {
      const stt = index + 1;
      if (stt >= 0 && stt <= 7) {
        htmlFirt += `<li onclick="navigatePage(${item})" class="page__numbers ${
          page == item && "active"
        }"> ${item}</li>`;
      }
      if (stt > 9) {
        htmlFirt += `<li onclick="navigatePage(${item})" class="page__dots">...</li>`;
        htmlLast += `<li onclick="navigatePage(${item})" class="page__numbers ${
          page == item && "active"
        }"> ${item}</li>`;
      }
      //   if (item == arr.length) {
      //       return arr.slice(item - 2, item).forEach(item => {
      //           htmlFirt += `<li class="page__numbers ${page ==item &&"active"}"> ${item}</li>`;
      //           htmlLast += ``;
      //       })

      //   }
    });
  const page__btn_prev = document.querySelector(".page__btn_prev");
  const page__btn_next = document.querySelector(".page__btn_next");
  const container_pagination = document.querySelector(".container_pagination");
  if (arrPage.length <= 12) {
    container_pagination.outerHTML = ``;
  }
  if (arr.length == page) {
    page__btn_next.outerHTML = ``;
  } else {


    page__btn_next.outerHTML = `<li onclick="nextPageClick()" class="page__btn_next"><span class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transform -rotate-90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7"></path>
  </svg></span></li>`;
  }
  if (page == 1) {
    page__btn_prev.outerHTML = ``;
  } else {
    page__btn_prev.outerHTML = `<li onclick="prevPageClick()" class="page__btn_prev"><span class="material-icons">  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7"></path>
  </svg></span></li>`;
  }

  const scriptRenderPage = document.createElement("script");
  scriptRenderPage.innerHTML = `
    function queryUrlPage(paramsArray) {
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
        .map((key) => key +'='+ params[key])
        .join("&");

      const newURL = parts[0] + "?" + newParamString;
      window.location.href = newURL;
    }
    const navigatePage = (page)=>{
      queryUrlPage([{key:"page",value:page}])
    }
    const newQueryPage = new URLSearchParams(window.location.search);
    const pageQuery =Number(
      newQueryPage.get("page")&& newQueryPage.get("page").length > 0
        ? newQueryPage.get("page")
        : 1);
  const prevPageClick  = ()=>{
      queryUrlPage([{key:"page",value:pageQuery-1}])
        }
  const nextPageClick =()=>{
      queryUrlPage([{key:"page",value:pageQuery+1}])
        }
    `;
  document.body.appendChild(scriptRenderPage);
  const totalHTML = htmlFirt + htmlLast;

  pagination.outerHTML = totalHTML;
}
