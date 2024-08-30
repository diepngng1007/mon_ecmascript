import Navigo from "navigo"
import Home from "./pages/Home"
import Header from "./component/header"
import Footer from "./component/footer"
import Product from "./pages/Product"
import '@/css/detail.css'
import ProductAdmin from "./dashboard/page/product"
import NavigaAdmin from "./component/NavAdmin/navAdmin"
import UpdateProduct from "./dashboard/page/updateproduct"
import AddProduct from "./dashboard/page/addproduct"
import AddCategory from "./dashboard/page/addcategory"
import Category from "./dashboard/page/category"
import UpdateCategory from "./dashboard/page/updatecategory"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import User from "./dashboard/page/user"
import UpdateUser from "./dashboard/page/updateuser"
import AddUser from "./dashboard/page/adduser"
import Dashboard from "./dashboard/page/dashboard"
const router = new Navigo("/")


// Kiểm tra xem tài khoản có trong hệ thống không

const localAccount = localStorage.getItem('account')?JSON.parse(localStorage.getItem('account')):undefined // nay la set gio la get lay thang account ra xai.
fetch('http://localhost:3000/account').then(item=>item.json()).then(item=>{
    const findUser = item.find(itemz=>itemz&&itemz.email ==localAccount.email)
    if(!findUser){
        localStorage.removeItem('account')
    }
})
let isAdmin = false
if(localAccount){
    if(localAccount.role =="AD"){
        isAdmin= true
    }
} // tao ra bien isAdmin neu account login vao la admin thi xac nhan la admin ;
const root =  (header,page,footer,slug)=>{
    if(page){
        if(!header ||!footer){
            return `${page &&page()}`   
        }else{
            if(header,page,footer){
                return  `
                ${header&&header()}
                ${page &&page(slug && slug)}
                ${footer&&footer()}
                `
            }else{
                return `
                Chưa có dữ liệu trang
                `
            }
           
        }
    }
   

}
const rootAdmin =  (nav,page,slug)=>{
    if(nav,page){
        return  `
        <div style="height:100vh;width:100%;display:flex;background-color:white">
        <div style="width:18%;height:100%;background-color:#87CEFA">  ${nav&&nav()}</div>
        <div style="width:82%;height:100%;overflow-y: hidden;position:relative;margin:0 30px"> ${page &&page(slug && slug)}</div>
        </div>
        `
    }else{
        return `
        Chưa có dữ liệu trang
        `
    }

}
const App = document.getElementById("app")
const custom_script =  document.getElementById('customScript')
// user
router.on('/',()=>{ 
    App.innerHTML =  root(Header, Home,Footer)
})
router.on('/product', ()=>{
    App.innerHTML =  root(Header, Product,Footer)
})
router.on('/product/:id', (params)=>{
    const id = params.data.id
    App.innerHTML =  root(Header,Product,Footer,id)
})

const button = ()=>{
    document.addEventListener('DOMContentLoaded', ()=>{
        const logout = document.getElementById('logout')
        logout.addEventListener('click',()=>{
            localStorage.removeItem('account')
            window.location.reload()
        })
    })
    return `<button id="logout">Đăng xuất</button>`
} // dang xuat o day .. xoa di thang account o localStorage
if(localAccount){
    router.on('/signin', ()=>{
  
        App.innerHTML =  root(null,button,null)
    })
    router.on('/signup', ()=>{
    
        App.innerHTML =  root(null,button,null)
    })
}else{
    router.on('/signin', ()=>{
  
        App.innerHTML =  root(null,SignIn,null)
    })
    router.on('/signup', ()=>{
    
        App.innerHTML =  root(null,SignUp,null)
    })
}  

// admin
// kiem tra admin
if(isAdmin){
    router.on('/admin/dashboard',()=>{ 
        App.innerHTML =  rootAdmin(NavigaAdmin, Dashboard)
    })
    router.on('/admin/product', ()=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, ProductAdmin)
    })
    router.on('/admin/product/add', ()=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, AddProduct)
    })
    
    router.on('/admin/product/update/:id', (params)=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, UpdateProduct,params.data.id)
    })
    router.on('/admin/category', ()=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, Category)
    })
    router.on('/admin/category/add', ()=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, AddCategory)
    })
    router.on('/admin/category/update/:id', (params)=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, UpdateCategory,params.data.id)
    })
    // crud user
    router.on('/admin/user', ()=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, User)
    })
    router.on('/admin/user/add', ()=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, AddUser)
    })
    router.on('/admin/user/update/:id', (params)=>{
        App.innerHTML =  rootAdmin(NavigaAdmin, UpdateUser,params.data.id)
    })
}
router.resolve()