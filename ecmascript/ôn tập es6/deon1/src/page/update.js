import { router, useEffect, useState } from "../lib/index"
import axios from "axios";
export default function UpdateProduct(id){
    const [product, setProduct] = useState({})
    useEffect(()=>{
        axios.get("http://localhost:3000/products/" + id)
        .then((response) => {
            // Xử lý dữ liệu trả về tại đây
            const data = response.data;
            setProduct(data);
        })
    },[])
    useEffect(() =>{
        const name = document.getElementById('name');
        const img = document.getElementById('image');
        const price = document.getElementById('price');
        const quantity = document.getElementById('quantity');
        const description = document.getElementById('description');
        const updateFrom = document.getElementById('updateFrom');

        updateFrom.addEventListener('submit', (e) =>{
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
            axios.put("http://localhost:3000/products/" + id, newProduct)
            .then(()=>{
                setProduct(newProduct) // cập nhat lai gia tri cua new product vao set product
                router.navigate("/products")
            })
            alert("Cập nhật dữ liệu thành công");
        });
    })
    return /*html*/`
    <div class="container mt-5">
        <h1>Cập nhật sản phẩm</h1>
        <form class="pt-3" id="updateFrom">
            <div class="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" class="form-control" id="name" placeholder="Nhập tên sản phẩm" value="${product&&product.name}">
            </div>
            <div class="form-group">
                <label>Ảnh</label>
                <input type="text" class="form-control" id="image" placeholder="Nhập ảnh sản phẩm" value="${product&&product.image}">
            </div>
            <div class="form-group">
                <label>Giá</label>
                <input type="number" step="1" min="0" class="form-control" id="price" placeholder="Nhập giá sản phẩm" value="${product&&product.price}">
            </div>
            <div class="form-group">
                <label>Số lượng</label>
                <input type="number" step="1" min="0" class="form-control" id="quantity" placeholder="Nhập số lượng sản phẩm" value="${product&&product.quantity}">
            </div>
            <div class="form-group">
                <label>Mô tả</label>
                <input type="text" class="form-control" id="description" placeholder="Nhập mô tả sản phẩm" value="${product&&product.description}">
            </div>
            <button type="submit" class="btn btn-outline-primary">Cập nhật</button>
        </form>
    </div>  
    `

}