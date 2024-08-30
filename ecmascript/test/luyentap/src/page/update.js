import {router, useEffect, useState} from '../lib'
import axios from 'axios'
export default function UpdateProduct(id){
    const [products, setProduct] = useState({})
    useEffect(() => {
        axios.get("http://localhost:3000/products/" + id)
        .then((response) => {
            const data = response.data
            setProduct(data)
        })
    },[])
    useEffect(() => {
        const name = document.getElementById('name')
        const description = document.getElementById('description')
        const quantity = document.getElementById('quantity')
        const made_in = document.getElementById('made_in')
        const updateForm = document.getElementById('updateForm')

        updateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let newProduct = {
                "name" : name.value,
                "description" : description.value,
                "quantity" : quantity.value,
                "made_in": made_in.value
            }
            axios.put("http://localhost:3000/products/" + id, newProduct)
            .then(() => {
                router.navigate('/products')
                alert('cập nhật thành công')
            })
        })
    })
    return /*html*/`
    <div class="container">
    <h2 class="text-center my-3">Cập nhật sản phẩm</h2>
        <form id="updateForm">
            <div class="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" class="form-control" placeholder="Nhập tên sản phẩm" id="name" value="${products.name}">
            </div>
            <div class="form-group">
                <label>Mô tả</label>
                <input type="text" class="form-control" placeholder="Nhập mô tả sản phẩm" id="description" value="${products.description}">
            </div>
            <div class="form-group">
                <label>Số lượng</label>
                <input type="text" step="1" min="0" class="form-control" placeholder="Nhập số lượng sản phẩm" id="quantity" value="${products.quantity}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text">Xuất xứ</label>
                </div>
                <select class="custom-select" id="made_in" value="${products.made_in}">
                    <option>Choose...</option>
                    <option value="Việt Nam" ${products.made_in === 'Việt Nam' ? 'selected' : '' }>Việt Nam</option>
                    <option value="Trung Quốc" ${products.made_in === 'Trung Quốc' ? 'selected' : '' }>Trung Quốc</option>
                    <option value="Đài Loan" ${products.made_in === 'Đài Loan' ? 'selected' : '' }>Đài Loan</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
    </div>
    `
}