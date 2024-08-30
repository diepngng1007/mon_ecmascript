import {router, useEffect, useState} from '../lib'
import axios from 'axios'
export default function AddProduct(){
    useEffect(() => {
        const name = document.getElementById('name')
        const description = document.getElementById('description')
        const quantity = document.getElementById('quantity')
        const made_in = document.getElementById('made_in')
        const addForm = document.getElementById('addForm')

        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let newProduct = {
                "name" : name.value,
                "description" : description.value,
                "quantity" : quantity.value,
                "made_in": made_in.value
            }
            axios.post("http://localhost:3000/products", newProduct)
            .then(() => {
                router.navigate('/products')
                alert("thêm thành công")
            })
        })
    })
    return /*html*/`
        <div class="container">
        <h2 class="text-center my-3">Thêm sản phẩm</h2>
            <form id="addForm">
                <div class="form-group">
                    <label>Tên sản phẩm</label>
                    <input type="text" class="form-control" placeholder="Nhập tên sản phẩm" id="name">
                </div>
                <div class="form-group">
                    <label>Mô tả</label>
                    <input type="text" class="form-control" placeholder="Nhập mô tả sản phẩm" id="description">
                </div>
                <div class="form-group">
                    <label>Số lượng</label>
                    <input type="text" step="1" min="0" class="form-control" placeholder="Nhập số lượng sản phẩm" id="quantity">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text">Xuất xứ</label>
                    </div>
                    <select class="custom-select" id="made_in">
                        <option selected>Choose...</option>
                        <option value="Việt Nam">Việt Nam</option>
                        <option value="Trung Quốc">Trung Quốc</option>
                        <option value="Đài Loan">Đài Loan</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Thêm mới</button>
            </form>
        </div>
    `
}