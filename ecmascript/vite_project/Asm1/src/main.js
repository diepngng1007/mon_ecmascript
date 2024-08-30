import Navigo from "navigo"
import Home from "./pages/home"
import Product from "./pages/product"
import About from "./pages/about"
import Admin from "./pages/admin"

const router = new Navigo("/")
const render = (content,target) => {
    target.innerHTML = content
}

const app = document.querySelector("#app")

router.on('/', ()=>{
    render(Home(),app)
})
router.on('/product', ()=>{
    render(Product(),app)
})
router.on('/contact',()=>{
    render(About(),app)
})
router.on('/admin',()=>{
    render(Admin(),app)
})
router.resolve()