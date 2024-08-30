import axios from "axios";
import {router, useEffect, useState} from '../lib'
export default function SignIn(){
    useEffect(() => {
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const SignInForm = document.getElementById('SignInForm')
        SignInForm.addEventListener('submit', () => {
            let dataAccount = {
                "username": username.value,
                "password": password.value
            }
            axios.get("http://localhost:3000/users",dataAccount)
            .then((response) => {
                const data = response.data
                const findUser = data.find((user) => user.username === dataAccount.username && user.password === dataAccount.password)
                if(findUser){
                    router.navigate('/product')
                    alert('Đăng nhập thành công')
                }
                if(!findUser){
                    alert('username or password ko hợp lệ')
                }
            })
        })
    })
    return /*html*/`
    <div class="container">
    <h2 class="text-center mt-3">Đăng Nhập</h2>
        <form id="SignInForm">
            <div class="form-group">
                <label>Tên người dùng</label>
                <input type="text" class="form-control" placeholder="Nhập tên người dùng" id="username">
            </div>
            <div class="form-group">
                <label>Mật khẩu</label>
                <input type="password" class="form-control" placeholder="Nhập mật khẩu" id="password">
            </div>
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </form>
    </div>
    `
}