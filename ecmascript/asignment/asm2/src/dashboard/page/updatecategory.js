import '@/dashboard/css/addcategory.css'
export default function UpdateCategory(slug){
    document.addEventListener("DOMContentLoaded", async()=>{
        const newCate = await fetch('http://localhost:3000/category/'+slug)
        const jsonCate = await newCate.json()
        let html = `<div class="category-info">
        <div class="category-details">
        <label >Tên danh mục</label>
            <input type="text" id="category-title" name="category-title" value="${jsonCate.name}">
           
        </div>
       
    </div>
    
    <div class="category-actions">
        <button onclick='add_btn(${slug})' class="update-button">Cập nhật danh mục</button>
    </div>
    `
    const container_update= document.querySelector('.container_add-cate')
    container_update.innerHTML = html
   
    const script = document.createElement('script')
    script.innerHTML = `
    const category_title = document.querySelector('#category-title')
   async function add_btn(slug){
       if(confirm('Xác nhận cập nhật')== true){
        const value =category_title.value
        const cate = await fetch('http://localhost:3000/category')
        const cateJSON = await cate.json()
        const findcate = cateJSON.find(item=>item.name.toLowerCase() == value.toLowerCase())
        if(findcate){
            alert('Danh mục đã tồn tại')
        }else{
            fetch('http://localhost:3000/category/'+slug,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name:value})
            }).then(res=>{
                alert('Cập nhật danh mục thành công')
                window.location.reload()
            }).catch(err=>{
                alert('Lỗi khi cập nhật danh mục')
            })
        }
       }else{
        alert('Trở lại danh mục')
       }
      
    }
    `
    document.body.appendChild(script)
    
  
    
   
})    

    return `<div class="container_add-cate">
    
    </div> `
}