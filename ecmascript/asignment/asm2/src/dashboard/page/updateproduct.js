import '@/dashboard/css/updateprd.css'
export default function UpdateProduct(slug){
document.addEventListener("DOMContentLoaded", async()=>{
    const data = await fetch('http://localhost:3000/products/'+slug)
    const cate = await fetch('http://localhost:3000/category')
    const jsonCate = await cate.json()
    const jsonData = await data.json()
    const findCate = jsonCate.find(item=>item.id == jsonData.categoriesID)
    let html = `<div class="product-info">
    <div class="product-details">
    <label >Tiêu đề sản phẩm</label>
        <input type="text" id="product-title" name="product-title" value="${jsonData&&jsonData.name}">
        <label >Giá tiền</label>
        <input type="number" step="1" id="product-price" name="product-price" value="${jsonData.price}">
        <label >Mô tả sản phẩm</label>
        <textarea id="product-description" name="product-description">${jsonData.mota}</textarea>
        <p class="product-quantity">Số lượng sản phẩm:</p>
        <input type="number" id="product-quantity" name="product-quantity" value="${jsonData.quantity !==undefined?jsonData.quantity:1}">
        <br>
        <select id="product-status" name="product-status">
            <option value="instock">Còn hàng</option>
            <option value="outofstock">Hết hàng</option>
        </select>
        <label >flash sale</label>
        <input type="checkbox" id="falshsale" name="falshsale" >
      
    </div>
    <div class="check-img">
        <input class="select-image" type="file" placeholder="chọn file">
        <img style="width:150px;height:150px" class="current-img" src="${jsonData.image}" alt="Hình ảnh đại diện sản phẩm">
        <br />
        <input oninput="handleShowCategory(event)" cate-id="${jsonData.categoriesID}" value="${findCate&&findCate.name}" placeholder="Nhập để tìm danh mục" id="product-cate">
        <div id="showCate">
        
        </div>
    </div>
</div>

<div class="product-actions">
    <button onclick='update_btn(${slug})' class="update-button">Cập nhật sản phẩm</button>
</div>`
const container_update= document.querySelector('.container_update-prd')
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
    if(value.length>0){ showCate.innerHTML = html}else{
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
const catePrd = document.querySelector('#product-cate')
const flashsale = document.querySelector('#falshsale')
   fetch('http://localhost:3000/products/'+${slug}).then(items=>items.json()).then(it=>{
    flashsale.checked = it.flashsale
   })
  
function selectCate (name,id){
    const cateID = catePrd.getAttribute('cate-id')
    if(cateID){
        catePrd.removeAttribute('cate-id')
        catePrd.setAttribute('cate-id',id)
        catePrd.value =name
        showCate.innerHTML = ''
    }else{
        catePrd.setAttribute('cate-id',id)
        catePrd.value =name
        showCate.innerHTML = ''
    }
}


async function update_btn(id){
   if(confirm('Xác nhận cập nhật sản phẩm')==true){
    const name = titlePrd.value;
    const description = descriptionPrd.value;
    const price = parseFloat(pricePrd.value);
    const quantity = parseInt(quantityPrd.value);
    const status = statusPrd.value;
    const image = linkImg;
    const data = await fetch('http://localhost:3000/products/'+id)
    if(data.status ===200){
        const findData = await data.json();
        findData.name = name
        findData.mota = description
        findData.price =price
        findData.categoriesID = catePrd.getAttribute('cate-id')
        findData.quantity = quantity
        findData.status = status
        findData.image = linkImg
        if(flashsale.checked){
            findData.flashsale = true  
        }else{
            findData.flashsale = false 
        }
        fetch('http://localhost:3000/products/'+id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(findData)
         }).then(res=>{
            if(res.status ==200){
                alert("cập nhật sản phẩm thành công")
                window.location.reload()
            }else{
                alert("cập nhật sản phẩm thất bại")
            }
         })
    }else{
        alert('Cập nhật không thành công')
    }
   }else{
    alert('Quay lại sản phẩm')
   }
 

}

`
document.body.appendChild(script)


})

    return ` <div class="container_update-prd">
    
</div> `
}