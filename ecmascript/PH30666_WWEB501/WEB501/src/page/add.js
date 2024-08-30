import axios from "axios";
import {router, useEffect, useState} from '../lib'
export default function AddProduct(){
    useEffect(() => {

    })
    return /*html*/`
        <div class="container">
        <h2>TH</h2>
            <form>
                <div class="form-group">
                    <label>Tên sản phẩm</label>
                    <input type="text" class="form-control" placeholder="Nhập tên sản phẩm">
                </div>
                <div class="form-group">
                    <label>Giá</label>
                    <input type="number" step="1" min="0" class="form-control" placeholder="Nhập giá sản phẩm">
                </div>
                <div class="form-group">
                    <label>Ảnh</label>
                    <input type="text" class="form-control" placeholder="Nhập ảnh sản phẩm">
                </div>
                <button type="submit" class="btn btn-primary">Thêm mới</button>
            </form>
        </div>
    `
}