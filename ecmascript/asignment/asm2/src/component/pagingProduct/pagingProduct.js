export const PagingProduct = (arr,page,itemPerPage)=>{
    // itemPerPage luôn phải là 12
    // arr mảng cần cắt
    // page hiện tại của sản phẩm
    // item per page số sản phẩm mỗi trang 
    let curentPage =0
    const startArr = arr.slice(page==0 ?0:(page*itemPerPage)-itemPerPage,page==0 ?page+itemPerPage:(page*itemPerPage))
    if(startArr.length>0){
        curentPage=page
    }

    return arr.slice(curentPage==0 ?0:(curentPage*itemPerPage)-itemPerPage,curentPage==0 ?curentPage+itemPerPage:(curentPage*itemPerPage))
}