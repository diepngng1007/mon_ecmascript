import {router,useEffect,useState} from '../lib'
import axios from 'axios'
export default function AddProduct(){
    useEffect(() => {
        const name = document.getElementById('name');
        const categories = document.getElementById('categories');
        const description = document.getElementById('description');
        const images = document.getElementById('image');
        const origin_price = document.getElementById('origin_price');
        const addForm = document.getElementById('addForm');
        console.log(images.value);
        addForm.addEventListener('submit',(e) => {
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
            

            axios.post("http://localhost:3000/products", newProduct)
            .then(() => {
                router.navigate("/products");
            })
            alert("Thêm mới thành công");
        });
    })

    return /*html*/`
      <div class="container">
        <h2 class="my-3">Thêm sản phẩm</h2>
        <form id="addForm">
            <div class="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" class="form-control" placeholder="Nhập tên sản phẩm" id="name">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <label class="input-group-text">Phân loại</label>
                </div>
                <select class="form-control" id="categories">
                    <option value="">Chọn</option>
                    <option value="Loại 1">Loại 1</option>
                    <option value="Loại 2">Loại 2</option>
                </select>
            </div>
            <div class="form-group">
                <label>Mô tả</label>
                <input type="text" class="form-control" placeholder="Nhập mô tả sản phẩm" id="description">
            </div>
            <div class="form-group">
                <label>Ảnh</label>
                <input type="text" class="form-control" placeholder="Nhập ảnh sản phẩm" id="image">
            </div>
            <div class="form-group">
                <label>Giá gốc</label>
                <input type="number" step="1" min="0" class="form-control" placeholder="Nhập giá gốc" id="origin_price">
            </div>

            <button type="submit" class="btn btn-primary">Thêm mới</button>
        </form>
      </div>
    `
}