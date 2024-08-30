import { router, useEffect, useState } from "../lib/index"
import axios from "axios";
export default function DataProduct(){
    const [products, setProduct] = useState([])
    useEffect(() =>{
        axios.get("http://localhost:3000/products")
        .then((response) => {
            // Xử lý dữ liệu trả về tại đây
            const data = response.data;
            setProduct(data);
        })
    },[]);
    useEffect(() =>{
        const btnDelete = document.querySelectorAll('.btn-outline-danger')
        // console.log(btnDelete);
        for(let btn of btnDelete){
            btn.addEventListener('click', () => {
                if(confirm('Bạn chắc chắn muốn xóa dữ liệu chứ?')){
                    let id = btn.dataset.id;
                    axios.delete('http://localhost:3000/products/'+ id)
                    .then(() => {
                        router.navigate('/products')
                        window.location.reload();
                    });
                }
            })
        }
    });
    return /*html*/`
        <div class="container mt-3">
        <h1 class="text-center">Danh sách sản phẩm</h1>
        <a role="button" class="btn btn-outline-primary mb-3" href="/products/add">Thêm mới</a>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                ${products.map((product, index) => `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${product.name}</td>
                        <td><img src="${product.image}" style="width:200px;height:200px;"></td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>${product.description}</td>
                        <td>
                            <a role="button" class="btn btn-outline-warning" href="/products/update/${product.id}">Cập nhật</a>
                            <a role="button" class="btn btn-outline-danger" data-id="${product.id}">Xóa</a>
                        </td>
                    </tr>
                `).join('')}

                </tbody>
            </table>
        </div>
    `
}