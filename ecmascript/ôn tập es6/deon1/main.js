import Navigo from "navigo";
import {router, render} from "./src/lib";
import DataProduct from "./src/page/product";
import AddProduct from "./src/page/add";
import UpdateProduct from "./src/page/update";
import Signup from "./src/page/signup";
import Signin from "./src/page/signin";



const app = document.querySelector('#app');
router.on('/products',()=>render(DataProduct, app));
router.on('/products/add',()=>render(AddProduct, app));
router.on('/products/update/:id',(params) => render(() => UpdateProduct(params.data.id),app));
router.on('/signup',()=>render(Signup, app));
router.on('/signin',()=>render(Signin, app));

router.resolve();