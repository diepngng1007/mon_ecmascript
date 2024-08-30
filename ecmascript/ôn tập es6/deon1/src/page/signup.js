import { router, useEffect, useState } from "../lib/index"
import axios from "axios";
export default function Signup(){
    useEffect(() =>{
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const email = document.getElementById("email");
        const address = document.getElementById("address");
        const formSignup = document.getElementById("formSignup");
        formSignup.addEventListener('submit',(e) => {
            e.preventDefault();
            let newAccount = {
                "username": username.value,
                "password": password.value,
                "email": email.value,
                "address": address.value
            }
            axios.post("http://localhost:3000/accounts", newAccount)
            .then(()=>{
                router.navigate('/signup');
            })
            if(username.value == ""){
                alert("Username không được để trống")
                return false
            }
            if(password.value == ""){
                alert("Password không được để trống")
                return false
            }
            if(email.value == ""){
                alert("Email không được để trống")
                return false
            }
            if(address.value == ""){
                alert("Address không được để trống")
                return false
            }
            alert("Đăng ký thành công");
        })
        
    })
    return /*html*/`
        <div class="container mt-3">
            <h1 class="text-center">SIGN UP</h1>
            <form class="px-4 py-3" id="formSignup">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" placeholder="Enter username..." id="username">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="text" class="form-control" placeholder="Enter password..." id="password">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" placeholder="Enter email..." id="email">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" placeholder="Enter address..." id="address">
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                    <a class="btn btn-info" href="/signin" role="button">Sign In</a>
                </div>
            </form>
        
        </div>
    `
}