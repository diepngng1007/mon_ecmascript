import "@/css/signup.css";
export default function SignUp() {
  document.addEventListener("DOMContentLoaded", () => {
  

    // add user
    const role = document.getElementById("role");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const fullname = document.getElementById("fullname");
    const btn_signup = document.getElementById("btn_signup");
    const confirm_password = document.getElementById("confirm_password");
    const changeValue = (event, target) => {
      const value = event.target.value;
      target.value = value;
    };
    role.addEventListener("input", (event) => {
      changeValue(event, role);
    });
    password.addEventListener("input", (event) => {
      changeValue(event, password);
    });
    email.addEventListener("input", (event) => {
      changeValue(event, email);
    });
    fullname.addEventListener("input", (event) => {
      changeValue(event, fullname);
    });
    confirm_password.addEventListener("input", (event) => {
      changeValue(event, confirm_password);
    });
    btn_signup.addEventListener("click", (event) => {
        event.preventDefault();
        const containsAtSymbol = (str) => {
            const atSymbolRegex = /@/;
            return atSymbolRegex.test(str);
          };
      const vl_fullname = fullname.value;
      const vl_role = role.value;
      const vl_email = email.value;
      const vl_password = password.value;
      const vl_confirm_password = confirm_password.value;
      if (vl_confirm_password === vl_password) {
        if (containsAtSymbol(vl_email)) {
          if (vl_password.length >= 8) {
            // handle post data---------- handle post data
            const obj = {
              fullname: vl_fullname,
              email: vl_email,
              phone: "",
              password: vl_password,
              role: vl_role.length > 0 ? vl_role : "US",
            };
            fetch("http://localhost:3000/account")
              .then((item) => item.json())
              .then((account) => {
                const findAccount = account.find(
                  (item) => item.email == vl_email
                );
                if (findAccount) {
                    alert('Email already')
                } else {
                  fetch("http://localhost:3000/account", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                  })
                    .then((res) => {
                      alert("Success Registered");
                      if(obj.role =='US'){
                        localStorage.setItem('account',JSON.stringify(obj))
                        window.location.href = window.location.origin
                      }else if(obj.role =='AD'){
                        localStorage.setItem('account',JSON.stringify(obj))
                        window.location.href ="/admin/dashboard"
                      }
                    })
                    .catch((err) => alert("Lỗi máy chủ"));
                }
              });
          } else {
            alert("Password must be at least 8 characters");
          }
        } else {
          alert("please enter email");
        }
      } else {
        alert("Please enter passsword");
      }
    });
    const href_signin = document.getElementById('href_signin')
    href_signin.addEventListener('click', (event) =>{
        event.preventDefault()
        window.location.href = '/signin'
    })
    
  });

  
  
  // <span class="form__span">or use email for registration</span>
  return `<div class="main_signup">
  <div class="main">
    <div class="container_signup a-container" id="a-container">
        <form id="a-form" class="form" method="" action="">
            <h2 class="form_title title">Create Account</h2>
            <div class="form__icons">
                <img class="form__icon" src="">
                <img class="form__icon" src="">
                <img class="form__icon" src="">
            </div>
          
            <input id="fullname" class="form__input" type="text" placeholder="FullName">
            <input id="email" class="form__input" type="text" placeholder="Email" >
            <input id="password" class="form__input" type="password" placeholder="Password">
            <input id="confirm_password" class="form__input" type="password" placeholder="Confirm password">
            <input id="role" class="form__input" type="text" placeholder="Role">
            <button id="btn_signup" class="form__button button submit">SIGN UP</button>
        </form>
    </div>

    

    <div class="switch" id="switch-cnt">
        <div class="switch__circle"></div>

        <div class="switch__container" id="switch-c1">
            <h2 class="switch__title title">Welcome Back!</h2>
            <p class="switch__description description">To keep connected with us please login with your personal info</p>
            <button id="href_signin" class="switch__button button switch-btn">SIGN IN</button>
        </div>
        <div class="switch__container is-hidden" id="switch-c2">
            <h2 class="switch__title title">Hello Friend!</h2>
            <p class="switch__description description">Enter your personal details and start the journey with us</p>
            <button class="switch__button button switch-btn">SIGN UP</button>
        </div>
    </div>
</div>
  </div>
`;
}
