import '@/dashboard/css/addproduct.css'
export default function AddProduct(){
    document.addEventListener("DOMContentLoaded", async()=>{
        const data = await fetch('http://localhost:3000/products')
        const cate = await fetch('http://localhost:3000/category')
        const jsonCate = await cate.json()
        const jsonData = await data.json()
        const findCate = jsonCate.find(item=>item.id == jsonData.categoriesID)
        let html = `<div class="product-info">
        <div class="product-details">
        <label >Tiêu đề sản phẩm</label>
            <input type="text" id="product-title" name="product-title" value="">
            <p class="price_origin">Giá ban đầu:</p>
            <input type="number" id="price_origin" name="price_origin" value="">
            <label >Giá tiền</label>
            <input type="number" step="1" id="product-price" name="product-price" value="">
            <label >Mô tả sản phẩm</label>
            <textarea id="product-description" name="product-description"></textarea>
            <p class="product-quantity">Số lượng sản phẩm:</p>
            <input type="number" id="product-quantity" name="product-quantity" value="1">
        
            <br>
            <select id="product-status" name="product-status">
                <option value="instock">Còn hàng</option>
                <option value="outofstock">Hết hàng</option>
            </select>
     
            
         
        </div>
        <div class="check-img">
      
            <input class="select-image" type="file" placeholder="chọn file">
            <img style="width:150px;height:150px" class="current-img" src="" alt="Hình ảnh đại diện sản phẩm">
            <div><span class="">flash sale:</span>
            <input type="checkbox" id="flashsale"></div>
            <br/>
            <input oninput="handleShowCategory(event)" cate-id="" value="" placeholder="Nhập để thêm danh mục" id="product-cate">
            <div id="showCate">
            
            </div>
           
        </div>
    </div>
    
    <div class="product-actions">
        <button onclick='update_btn()' class="update-button">Thêm sản phẩm</button>
    </div>`
    const container_update= document.querySelector('.container_add-prd')
    container_update.innerHTML = html
    
    const script = document.createElement('script')
    
    script.innerHTML = `
    const showCate = document.querySelector('#showCate')
    let html =\`\`
    async function handleShowCategory(event){
        html=\`\`
        showCate.innerHTML = ''
        const value = event.target.value
        const cateData = await fetch('http://localhost:3000/category')
        const jsonCateData = await cateData.json()
        const filterCate = jsonCateData.filter(item=>item.name.toLowerCase().includes(value.toLowerCase()))
        filterCate.forEach(item=>{
            html += \` 
            <div onclick="selectCate('\${item.name\}',\${item.id\})" class="optionCategory">\${item.name\}</div>
            
            
            
            \`
        })
        if(value.length>0){
             showCate.innerHTML = html
        }else{
            showCate.innerHTML = ''
        }
       
    }
    const selectImg =document.querySelector('.select-image')
    const currentImg =document.querySelector('.current-img')
    let linkImg = currentImg?currentImg.src:'';
    selectImg.addEventListener('change',(event)=>{
       const file = event.target.files[0]
       const nameFile = file ?file.name:''
       linkImg =nameFile.length>0 && '/img/'+nameFile
       if(file){
        const reader = new FileReader()
        reader.onload = (e)=>{
            currentImg.src = e.target.result
           }
           reader.readAsDataURL(file)
       }else{
        currentImg.src = ''
       }
      
    })
    const titlePrd = document.querySelector('#product-title')
    const descriptionPrd = document.querySelector('#product-description')
    const pricePrd = document.querySelector('#product-price')
    const quantityPrd = document.querySelector('#product-quantity')
    const statusPrd = document.querySelector('#product-status')
    const price_origin_el = document.querySelector('#price_origin')
    const catePrd = document.querySelector('#product-cate')
    const flashsale = document.querySelector('#flashsale')
    function selectCate (name,id){
        const cateID = catePrd.getAttribute('cate-id')
        if(cateID){
            catePrd.removeAttribute('cate-id')
            catePrd.setAttribute('cate-id',id)
            catePrd.value =name
        }else{
            catePrd.setAttribute('cate-id',id)
            catePrd.value =name
        }
    }
    async function update_btn(){
        const name = titlePrd.value;
        const description = descriptionPrd.value;
        const price = parseFloat(pricePrd.value);
        const quantity = parseInt(quantityPrd.value);
        const price_origin =parseFloat( price_origin_el.value)
        const status = statusPrd.value;
        if(price_origin_el.value.length >0){
            const obj = {name : name,
                mota : description,
                price :price,
                categoriesID : catePrd.getAttribute('cate-id'),
                quantity : quantity,
                status : status,
                image : linkImg,
                price_origin:price_origin,
                rate:5,
                purchase:0,
                flashsale:flashsale.checked
            }
            fetch('http://localhost:3000/products',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
             }).then(res=>{
                    alert("Thêm sản phẩm thành công")
                    window.location.reload()
             }).catch(err=>{
                alert("Lỗi khi thêm sản phẩm")
             })
        }else{
            alert("Vui lòng nhập giá ban dầu sản phẩm")
        }
          
    
    }
    
  
    
    `
   
    document.body.appendChild(script)
})    

    return `<div class="container_add-prd">
    
    </div> `
}