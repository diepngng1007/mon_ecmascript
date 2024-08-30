import {router, useEffect, useState} from '../lib'
import axios from 'axios'
export default function ListProduct(){
    const [products, setProduct] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/products")
        .then((response) => {
            const data = response.data
            setProduct(data)
        })
    },[])
    useEffect(() => {
        const btnDelete = document.querySelectorAll('.btn-danger')
        for(let btn of btnDelete){
            btn.addEventListener('click', () => {
                if(confirm('Bạn chắn chắn muốn xóa dữ liệu chứ')){
                    let id = btn.dataset.id
                    axios.delete("http://localhost:3000/products/" + id)
                    .then(() => {
                        router.navigate('/products')
                        alert('xóa thành công')
                    })
                }
            })
        }
    })
    return /*html*/`
    <div class="container">
    <h1 class="text-center my-3">DANH SÁCH SẢN PHẨM</h1>
    <a class="btn btn-primary" href="/products/add" role="button">Thêm mới</a>
            <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Xuất xứ</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
                ${products.map((product, index) => `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.quantity}</td>
                        <td>${product.made_in}</td>
                        <td>
                        <a class="btn btn-warning" href="/products/update/${product.id}" role="button">Cập nhật</a>
                        <button type="button" class="btn btn-danger" data-id="${product.id}">Xóa</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    </div>
    `
}