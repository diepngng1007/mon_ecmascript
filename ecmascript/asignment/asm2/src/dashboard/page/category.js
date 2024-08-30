import HtmlPaging from "@/component/Pagination/htmlPaging";
import Pagination from "@/component/Pagination/pagination";
import { PagingProduct } from "@/component/pagingProduct/pagingProduct";

export default function Category(){
    document.addEventListener("DOMContentLoaded",async()=>{
        const dataCate = await fetch('http://localhost:3000/category') 
        const arrCateGory = await dataCate.json()
    
        const itemPerPage =10
        const newQuery = new URLSearchParams(window.location.search);
        const queryPage =Number(
            newQuery.get("page")&& newQuery.get("page").length > 0
              ? newQuery.get("page")
              : 1);
        const filterCategory = PagingProduct(arrCateGory,queryPage,itemPerPage)
        const pagination = document.querySelector("#pagination")
        Pagination(arrCateGory, queryPage, itemPerPage, pagination,1)
        let htmlCategory = `` 
        const tBody = document.querySelector("tbody")
        filterCategory.forEach((item,index)=>{
            const findCate = arrCateGory.find(itemz=>itemz.id == item.categoriesID)
            htmlCategory+=`<tr>
            <td>
                <input data-prdID="${item.id}" class="check_prd" type="checkbox">
            </td>
            <td class="product-name">
                ${item.name}
                <div class="product-options">
                    <div><span>ID: ${item.id}</span></div>
                    <div class="quick-edit"><a href="/admin/category/update/${item.id}">Chỉnh sửa</a></div>
                    <div class="trash"><a onCLick="handleDel('${item.id}')">Xóa</a></div>
                </div>
            </td>
        </tr>`
        })
        tBody.innerHTML = htmlCategory
        const script = document.createElement("script")
        script.innerHTML = `const handleDel=  (id)=>{
            if(confirm("Bạn có muốn xóa sản các danh mục đã chọn?") ==true){
                fetch('http://localhost:3000/category/'+id,{
                    method:'DELETE'
                }).then(res=>{
                    if(res.status == 200){
                        alert("Xóa danh mục thành công id: " +id)
                        window.location.reload()
                    }else{
                        alert("Xóa danh mục thất bại")
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
                fetch('http://localhost:3000/category/'+id,{
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
            if(checkID.length>0){
                if(confirm("Bạn có muốn xóa các danh mục đã chọn?")==true ){
                    const arrPromise = checkID.map(id=>checkDelete(id))
                    Promise.all(arrPromise).then(result=>{
                        alert("Xóa thành công các danh mục có id: "+result.join(","))
                        arrPromise.length = 0
                        window.location.reload()
                    }).catch(err=> alert(err))
                }else{
                    console.log("that bai")
                }
            }else{
                alert("Vui lòng chọn ít nhất 1 danh mục để xóa")
            }
           
        })
        `
        document.body.appendChild(script)
        
        
        })
    
    return `
    <div style="display:flex" class="header_product_admin"> <button class="delete_btn">Xóa</button> <a style="border:1px solid rgba(0, 0, 0, 0.191);
    display:block;padding:5px;margin-left:5px;text-decoration:none;border-radius:5px;background-color:#3366FF;color:white;border:none" href="/admin/category/add">Thêm danh mục</a> </div>
    <div class="mt-50">
    <table class="product-table">
    <thead>
        <tr>
            <th>
                <input id="checkAll" type="checkbox">
            </th>
            <th>Danh mục</th>
        </tr>
    </thead>
    <tbody>
        
    </tbody>
</table>

${HtmlPaging()}
    </div>`
}