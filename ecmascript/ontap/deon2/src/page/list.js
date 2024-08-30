import {router,useEffect,useState} from "../lib/index";
import axios from "axios";
export default function DataProduct(){
    const [products,setProduct] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/products")
        .then((response) =>{
            const data = response.data
            setProduct(data)
        })
    },[]);

    useEffect(() => {
        const btnDelete = document.querySelectorAll('.btn-outline-danger');
        for(let btn of btnDelete){
            btn.addEventListener('click', () =>{
                if(confirm('Bạn chắc chắn muốn xóa dữ liệu chứ')){
                    let id = btn.dataset.id;
                    axios.delete("http://localhost:3000/products/" + id)
                    .then(() =>{
                        window.location.reload();
                        router.navigate('/products')
                    });
                }
            });
        }
    });

    return /*html*/`
        <div class="container">
        <h1 class="text-center pt-3">Danh sách sản phẩm</h1>
        <a class="btn btn-outline-primary my-3" href="/products/add" role="button">Thêm mới</a>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Phân loại</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Giá gốc</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map((product,index) => `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${product.name}</td>
                            <td>${product.categories}</td>
                            <td>${product.description}</td>
                            <td><img src="${product.image}" width="200" height="200"/></td>
                            <td>${product.origin_price}</td>
                            <td>
                                <a class="btn btn-outline-warning" href="/products/update/${product.id}" role="button">Cập nhật</a>
                                <a class="btn btn-outline-danger" data-id="${product.id}" href="#" role="button" >Xóa</a>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}