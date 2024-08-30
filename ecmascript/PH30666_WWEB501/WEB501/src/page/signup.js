import axios from "axios";
import {router, useEffect, useState} from '../lib'
export default function SignUp() {
    useEffect(() => {
      const username = document.getElementById('username');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const SignUpForm = document.getElementById('SignUpForm');
  
      SignUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        let dataAccount = {
          "username": username.value,
          "email": email.value,
          "password": password.value
        };
  
        if (username.value === "") {
          alert('Tên người dùng không được để trống');
          return false;
        }
        if (email.value === "") {
          alert('Email không được để trống');
          return false;
        }
        if (password.value === "") {
          alert('Mật khẩu không được để trống');
          return false;
        }
  
        axios.post("http://localhost:3000/users", dataAccount)
          .then(() => {
            router.navigate('/signup');
            alert('Đăng ký thành công');
          });
      });
    }, []);
  
    return /*html*/ `
      <div class="container">
        <h2 class="text-center mt-3">Đăng ký</h2>
        <form id="SignUpForm">
          <div class="form-group">
            <label>Tên người dùng</label>
            <input type="text" class="form-control" placeholder="Nhập tên người dùng" id="username">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Nhập email" id="email">
          </div>
          <div class="form-group">
            <label>Mật khẩu</label>
            <input type="password" class="form-control" placeholder="Nhập mật khẩu" id="password">
          </div>
          <button type="submit" class="btn btn-primary">Đăng ký</button>
          <a class="btn btn-info" href="/signin" role="button">Đăng nhập</a>
        </form>
      </div>
    `;
  }