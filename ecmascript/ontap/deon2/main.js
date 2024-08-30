import Navigo from "navigo";
import {router, render} from "./src/lib"
import DataProduct from "./src/page/list";
import AddProduct from "./src/page/add";
import UpdateProduct from "./src/page/update";


const app = document.querySelector("#app");
router.on('/products',()=>render(DataProduct,app));
router.on('/products/add',()=>render(AddProduct,app));
router.on('/products/update/:id',(params) => render(() => UpdateProduct(params.data.id),app));

router.resolve();