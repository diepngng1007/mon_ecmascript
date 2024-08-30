import {router, render} from './src/lib'
import AddProduct from './src/page/add'
import ListProduct from './src/page/list';
import UpdateProduct from './src/page/update';

const app = document.querySelector('#app')
router.on('/products', () => render(ListProduct,app));
router.on('/products/add', () => render(AddProduct,app));
router.on('/products/update/:id', (params) => render(() => UpdateProduct(params.data.id),app));

router.resolve();