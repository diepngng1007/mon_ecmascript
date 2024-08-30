import axios from "axios";
import {router, useEffect, useState} from '../lib'
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
        const name = document.getElementById('name');
        const price = document.getElementById('price');
        const image = document.getElementById('image');
        const updateForm = document.getElementById('updateForm');

        updateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let newProduct = {
                "name" : name.value,
                "price" : price.value,
                "image" : image.value
            }
            if(name.value == ""){
                alert("Vui lòng nhập tên sản phẩm")
                return false
            }
            if(price.value == ""){
                alert("Vui lòng nhập giá sản phẩm")
                return false
            }
            if(image.value == ""){
                alert("Vui lòng nhập ảnh sản phẩm")
                return false
            }
            axios.put("http://localhost:3000/products/" + id, newProduct)
            .then(() => {
                setProduct(newProduct)
                router.navigate('/product')
                alert('Cập nhật thành công')
            })
        })
    })
    return /*html*/`
    <div class="container">
        <h2 class="text-center">Cập nhật sản phẩm</h2>
            <form id="updateForm">
                <div class="form-group">
                    <label>Tên sản phẩm</label>
                    <input type="text" class="form-control" placeholder="Nhập tên sản phẩm" id="name" value="${products.name}">
                </div>
                <div class="form-group">
                    <label>Giá</label>
                    <input type="number" step="1" min="0" class="form-control" placeholder="Nhập giá sản phẩm" id="price" value="${products.price}">
                </div>
                <div class="form-group">
                    <label>Ảnh</label>
                    <input type="text" class="form-control" placeholder="Nhập ảnh sản phẩm" id="image" value="${products.image}">
                </div>
                <button type="submit" class="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    `
}