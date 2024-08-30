import axios from "axios";
import {router, useEffect, useState} from '../lib'
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
        for(let btn of btnDelete) {
            btn.addEventListener('click', () => {
                if(confirm('Are you sure you want to delete')){
                    let id = btn.dataset.id;
                    axios.delete("http://localhost:3000/products/" + id)
                    .then(() => {
                        router.navigate('/product')
                    })
                }
            })
        }
    })
    return /*html*/`
    <div class="container">
    <h2 class="text-center">DANH SÁCH SẢN PHẨM</h2>
    <a class="btn btn-primary mb-2" href="/product/add" role="button">Thêm mới</a>
            <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
                ${products.map((product,index) => `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><img src="${product.image}" width="200" height="200"/></td>
                    <td>
                    <a class="btn btn-warning" href="/product/update/${product.id}" role="button">Cập nhật</a>
                    <button type="button" class="btn btn-danger" data-id="${product.id}" >Xóa</button>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    `
}