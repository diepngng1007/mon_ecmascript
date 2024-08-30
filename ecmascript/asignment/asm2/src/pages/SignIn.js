import '@/css/signin.css'
export default function SignIn(){

    document.addEventListener("DOMContentLoaded",()=>{
        const btn_login = document.getElementById('btn_login')
        const password = document.getElementById("password");
        const email = document.getElementById("email");
        const changeValue = (event, target) => {
          const value = event.target.value;
          target.value = value;
        };
        password.addEventListener("input", (event) => {
          changeValue(event, password);
        });
        email.addEventListener("input", (event) => {
            changeValue(event, email);
          });
          btn_login.addEventListener('click',(event)=>{
            event.preventDefault();
            fetch('http://localhost:3000/account').then(res=>res.json()).then(result=>{
                const findAccount = result.find(item=>{
                    if(item.email === email.value){
                        if(item.password === password.value){
                                return item
                        }
                    }
                })
       
                if(findAccount){
                    const obj = {
                        fullname:findAccount.fullname,
                        email:findAccount.email,
                        role:findAccount.role
                    }
                    localStorage.setItem('account',JSON.stringify(obj)) // luu bien dang nhap vao localStorage
                    if(findAccount.role ==='AD'){
                        window.location.href = '/admin/dashboard'
                    }else if(findAccount.role ==='US'){
                        window.location.href = window.location.origin
                    }
                 
                }else{
                    alert('Enter email or password')
                }
            })
          })
          const href_signup = document.getElementById('href_signup')
          href_signup.addEventListener('click',(event)=>{
            event.preventDefault()
            window.location.href = '/signup'
          })
    })


    return ` 
    <div>
    <div class="main_signup">
  <div class="main">
  <div>
  <div class="container_signin b-container" id="b-container">
  <form id="b-form" class="form" method="" action="">
      <h2 class="form_title title">Sign in to Website</h2>
      <div class="form__icons">
          <img class="form__icon" src="">
          <img class="form__icon" src="">
          <img class="form__icon" src="">
      </div>
      <input id="email" class="form__input" type="text" placeholder="Email">
      <input id="password" class="form__input" type="password" placeholder="Password">
      <a class="form__link">Forgot your password?</a>
      <button id="btn_login" class="form__button button submit">SIGN IN</button>
      <button id="href_signup" class="form__button button submit">SIGN UP</button>
  </form>
</div> 
  </div>
  
  </div></div>
  </div>
  
`
}