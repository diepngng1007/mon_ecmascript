import { router, useEffect, useState } from "../lib/index"
import axios from "axios";
// import yup from "yup";
export default function AddProduct(){
    useEffect(()=>{
        const name = document.getElementById('name');
        const img = document.getElementById('image');
        const price = document.getElementById('price');
        const quantity = document.getElementById('quantity');
        const description = document.getElementById('description');
        const addFrom = document.getElementById('addFrom');

        addFrom.addEventListener('submit', (e) =>{
            e.preventDefault();
            let newProduct = {
                "name": name.value,
                "image": img.value,
                "price": price.value,
                "quantity": quantity.value,
                "description": description.value
            }
            //validate form
            if(name.value == ""){
                alert('Vui lòng nhập tên sản phẩm')
                return false
            }
            if(img.value == ""){
                alert('Vui lòng nhập ảnh sản phẩm')
                return false
            }
            if(price.value == ""){
                alert('Vui lòng nhập giá sản phẩm')
                return false
            }
            if(quantity.value == ""){
                alert('Vui lòng nhập số lượng sản phẩm')
                return false
            }
            if(description.value == ""){ 
                alert('Vui lòng nhập mô tả sản phẩm')
                return false
            }
            //call api
            axios.post("http://localhost:3000/products",newProduct)
            .then(()=>{
                router.navigate("/products")
            })
            alert("Thêm dữ liệu thành công");
        });

    })

    return /*html*/`
    <div class="container mt-5">
        <h1>Thêm mới sản phẩm</h1>
        <form class="pt-3" id="addFrom">
            <div class="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" class="form-control" id="name" placeholder="Nhập tên sản phẩm">
            </div>
            <div class="form-group">
                <label>Ảnh</label>
                <input type="text" class="form-control" id="image" placeholder="Nhập ảnh sản phẩm">
            </div>
            <div class="form-group">
                <label>Giá</label>
                <input type="number" step="1" min="0" class="form-control" id="price" placeholder="Nhập giá sản phẩm">
            </div>
            <div class="form-group">
                <label>Số lượng</label>
                <input type="number" step="1" min="0" class="form-control" id="quantity" placeholder="Nhập số lượng sản phẩm">
            </div>
            <div class="form-group">
                <label>Mô tả</label>
                <input type="text" class="form-control" id="description" placeholder="Nhập mô tả sản phẩm">
            </div>
            <button type="submit" class="btn btn-outline-primary">Thêm mới</button>
        </form>
    </div>
    `;
}