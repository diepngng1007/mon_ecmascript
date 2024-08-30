import { products } from "@/data/data"

export default function ProductItem(){
    console.log(products);
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');
    return `
    <div class="container">
        <div class="row">
            ${
                products.map((item,index) => {
                    // if(id == item.CategoryId){
                        return `
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${item.image}" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-price">${item.price}$</p>
                                </div>
                                <div class="text-center pb-3">
                                    <button type="button" class="btn btn-warning">Mua hàng</button>
                                </div>
                            </div>
                        </div>
                        `
                    // }
                   
                }).join("")
            }
            
        </div>
    </div>
    `
}