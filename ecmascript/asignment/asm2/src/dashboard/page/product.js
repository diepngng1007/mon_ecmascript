import HtmlPaging from '@/component/Pagination/htmlPaging'
import Pagination from '@/component/Pagination/pagination'
import { PagingProduct } from '@/component/pagingProduct/pagingProduct'
import '@/dashboard/css/product.css'
export default function ProductAdmin(){

    document.addEventListener("DOMContentLoaded",async()=>{
    const data = await fetch('http://localhost:3000/products')
    const dataCate = await fetch('http://localhost:3000/category') 
    const arrCateGory = await dataCate.json()

    const jsonData = await data.json()
    const itemPerPage =10
    const newQuery = new URLSearchParams(window.location.search);
    const queryPage =Number(
        newQuery.get("page")&& newQuery.get("page").length > 0
          ? newQuery.get("page")
          : 1);
    const filterProduct = PagingProduct(jsonData,queryPage,itemPerPage)
    const pagination = document.querySelector("#pagination")
    Pagination(jsonData, queryPage, itemPerPage, pagination,1)
    let htmlProduct = `` 
    const tBody = document.querySelector("tbody")
    filterProduct.forEach((item,index)=>{
        const findCate = arrCateGory.find(itemz=>itemz.id == item.categoriesID)
        htmlProduct+=`<tr>
        <td>
            <input data-prdID="${item.id}" class="check_prd" type="checkbox">
        </td>
        <td><img style="width:40px" src="${item.image}" alt="Product Image"></td>
        <td class="product-name">
            ${item.name}
            <div class="product-options">
                <div><span>ID: ${item.id}</span></div>
                <div class="quick-edit"><a href="/admin/product/update/${item.id}">Chỉnh sửa</a></div>
                <div class="trash"><a onCLick="handleDel('${item.id}')">Xóa</a></div>
            </div>
        </td>
        <td>$ ${item.price}</td>
        <td>${findCate?findCate.name:"Chưa có danh mục"}</td>
    </tr>`
    })
    tBody.innerHTML = htmlProduct
    const script = document.createElement("script")
    script.innerHTML = `const handleDel=  (id)=>{
        if(confirm("Bạn có muốn xóa sản các sản phẩm đã chọn?") ==true){
            fetch('http://localhost:3000/products/'+id,{
                method:'DELETE'
            }).then(res=>{
                if(res.status == 200){
                    alert("Xóa sản phẩm thành công id: " +id)
                    window.location.reload()
                }else{
                    alert("Xóa sản phẩm thất bại")
                }
            })
        }else{
            console.log("Xoa that bai")
        }
      
    }
    let checkID = []
    let checkAllClick=false
    const checkAll = document.getElementById('checkAll')
    const check_prd = document.querySelectorAll('.check_prd')
    const delete_btn = document.querySelector('.delete_btn')

    checkAll.addEventListener('click',()=>{
        if(checkAllClick ==true){
            check_prd.forEach(item=>{
                item.checked = false
                checkID = []
            })
            checkAllClick=false
        }else{
            checkID = []
            check_prd.forEach(item=>{
                const id =item.dataset.prdid 
                checkID.push(id)
                item.checked = true
            })
            checkAllClick=true
        }
      
    })
    check_prd.forEach((item)=>{
        item.addEventListener("click",(event)=>{
            const target =  event.target
            const check =target.checked
            const prdID = target.dataset.prdid
            let filterID =[]
            if(check==true){
                checkID.push(prdID)
            }else{
                filterID = checkID.filter(item=>item!==prdID) 
                checkID =filterID
            }
        
        })  
    })
    function checkDelete (id){
        return new Promise(function (resolve, reject){
            fetch('http://localhost:3000/products/'+id,{
                method:'DELETE'
            }).then(res=>{
                if(res.status ==200){
                    resolve(id)
                }else{
                    reject("Thời gian chờ xóa quá lâu hãy tải lại trang!")
                }
            })
        })
    }
    delete_btn.addEventListener("click",()=>{
        if(checkID.length > 0){
            if(confirm("Bạn có muốn xóa các sản phẩm đã chọn?")==true ){
                const arrPromise = checkID.map(id=>checkDelete(id))
                Promise.all(arrPromise).then(result=>{
                    alert("Xóa thành công các sản phẩm có id: "+result.join(","))
                    arrPromise.length = 0
                    window.location.reload()
                }).catch(err=> alert(err))
            }else{
                console.log("that bai")
            }
        }else{
            alert("Vui lòng chọn ít nhất 1 sản phẩm để xóa")
        }
       
    })
    `
    document.body.appendChild(script)
    
    
    })



    return `
    <div class="header_product_admin" style="display:flex"> <button class="delete_btn">Xóa</button> <a style="border:1px solid rgba(0, 0, 0, 0.191);
    display:block;padding:5px;margin-left:5px;text-decoration:none;border-radius:5px;background-color:#3366FF;color:white;border:none" href="/admin/product/add">Thêm sản phẩm</a> </div>
    <div class="mt-50">
    <table class="product-table">
    <thead>
        <tr>
            <th>
                <input id="checkAll" type="checkbox">
            </th>
            <th>Hình ảnh sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th> Danh mục</th>
        </tr>
    </thead>
    <tbody>
        
    </tbody>
</table>

${HtmlPaging()}
    </div>`
}