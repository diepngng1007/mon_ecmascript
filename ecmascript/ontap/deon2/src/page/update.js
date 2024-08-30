import {router,useEffect,useState} from '../lib'
import axios from 'axios'
export default function UpdateProduct(id){
    const [products,setProduct] = useState({});
    useEffect(() => {
        axios.get("http://localhost:3000/products/" + id)
        .then((response) =>{
            const data = response.data
            setProduct(data)
            
            console.log(data)
        })
    },[]);
    useEffect(() => {
        const name = document.getElementById('name');
        const categories = document.getElementById('categories');
        const description = document.getElementById('description');
        const images = document.getElementById('image');
        const origin_price = document.getElementById('origin_price');
        const updateForm = document.getElementById('updateForm');
        updateForm.addEventListener('submit',(e) => {
            
            e.preventDefault();
            let newProduct = {
                "name" : name.value,
                "categories" : categories.value,
                "description": description.value,
                "image" : images.value,
                "origin_price" : origin_price.value
            }
            if(name.value == ""){
                alert("Vui lòng nhập tên sản phẩm")
                return false
            }
            if(categories.value == ""){
                alert("Vui lòng chọn phân loại phân loại")
                return false
            }
            if(description.value == ""){
                alert("Vui lòng nhập mô tả sản phẩm")
                return false
            }
            if(images.value == ""){
                alert("Vui lòng nhập ảnh sản phẩm")
                return false
            }
            if(origin_price.value == ""){
                alert("Vui lòng nhập giá gốc sản phẩm")
                return false
            }
            

            axios.put("http://localhost:3000/products/" + id, newProduct)
            .then(() => {
                setProduct(newProduct);
                router.navigate("/products");
            })
            alert("Cập nhật thành công");
        });
    })
    

    return /*html*/`
      <div class="container">
        <h2 class="my-3">Cập nhật sản phẩm</h2>
        <form id="updateForm">
            <div class="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" class="form-control" placeholder="Nhập tên sản phẩm" id="name" value="${products.name}">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <label class="input-group-text">Phân loại</label>
                </div>
                <select class="form-control" id="categories" value="${products.categories}">
                    <option value="">chon</option>
                    <option value="Loại 1" ${products.categories === 'Loại 1' ? 'selected' : ''}>Loai 1</option>
                    <option value="Loại 2" ${products.categories === 'Loại 2' ? 'selected' : ''}>Loại 2</option>
                </select>
            </div>
            <div class="form-group">
                <label>Mô tả</label>
                <input type="text" class="form-control" placeholder="Nhập mô tả sản phẩm" id="description" value="${products.description}">
            </div>
            <div class="form-group">
                <label>Ảnh</label>
                <input type="text" class="form-control" placeholder="Nhập ảnh sản phẩm" id="image" value="${products.image}">
            </div>
            <div class="form-group">
                <label>Giá gốc</label>
                <input type="number" step="1" min="0" class="form-control" placeholder="Nhập tên sản phẩm" id="origin_price" value="${products.origin_price}">
            </div>

            <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
      </div>
    `
}