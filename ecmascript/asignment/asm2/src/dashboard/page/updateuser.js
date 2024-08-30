import '@/dashboard/css/addcategory.css'
export default function UpdateUser(slug){
    document.addEventListener("DOMContentLoaded", async()=>{
        const newCate = await fetch('http://localhost:3000/account/'+slug)
        const jsonCate = await newCate.json()
        let html = `<div class="category-info">
        <div class="category-details">
        <label >Tên Người dùng</label>
            <input type="text" id="full-name" name="category-title" value="${jsonCate.fullname}">
            <label >gmail</label>
            <input type="text" id="email" name="category-title" value="${jsonCate.email}">
            <label >   Mật khẩu  </label>
            <input type="text" id="password" name="category-title" value="${jsonCate.password}">
            <label >  Quyền   </label>
            <input type="text" id="role" name="category-title" value="${jsonCate.role}">
        </div>
       
    </div>
    
    <div class="category-actions">
        <button onclick='add_btn(${slug})' class="update-button">Cập nhật người dùng</button>
    </div>
    `
    const container_update= document.querySelector('.container_add-cate')
    container_update.innerHTML = html
   
    const script = document.createElement('script')
    script.innerHTML = `
    const email = document.querySelector('#email')
    const role = document.querySelector('#role')
    const password = document.querySelector('#password')
    const phone = document.querySelector('#phone')
    const fullname = document.querySelector('#full-name')
   async function add_btn(slug){
        const obj = {
            email:email.value,
            role:role.value,
            password:password.value,
            phone:phone.value,
            fullname:fullname.value
        }
       if(confirm('Xác nhận cập nhật')== true){
        const value =email.value
        fetch('http://localhost:3000/account/'+slug,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(res=>{
                alert('Cập nhật người dùng thành công')
                window.location.reload()
            }).catch(err=>{
                alert('Lỗi khi cập nhật người dùng')
            })
        
       }else{
        alert('Trở lại người dùng')
       }
      
    }
    `
    document.body.appendChild(script)
    
  
    
   
})    

    return `<div class="container_add-cate">
    
    </div> `
}