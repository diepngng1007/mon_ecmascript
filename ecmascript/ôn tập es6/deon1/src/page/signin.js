import { router, useEffect, useState } from "../lib/index"
import axios from "axios";
export default function Signin(){
    useEffect(() => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const formLogin = document.getElementById("formLogin");
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            let loginData = {
                username: username.value,
                password: password.value
            }
            axios.get("http://localhost:3000/accounts")
            .then((response) => {
                const data = response.data;
                const findAccounts = data.find((account) => 
                    account.username === loginData.username && account.password === loginData.password)
                if(findAccounts){
                    router.navigate('/products')
                    alert('Đăng nhập thành công')
                }
                if(!findAccounts){
                    alert('Username hoặc password không chính xác! Vui lòng thử lại')
                }
            })
            

        })
    },[])
    return /*html*/`
        <div class="container mt-3">
            <h1 class="text-center">SIGN IN</h1>
            <form class="px-4 py-3" id="formLogin">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" placeholder="Enter username..." id="username">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" placeholder="Enter password..." id="password">
                </div>
                <button type="submit" class="btn btn-info">Sign In</button>
            </form>
        </div>
    `;
}