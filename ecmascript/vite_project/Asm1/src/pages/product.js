import Header from "@/components/header";
import ProductItem from "@/components/product/product_item";
export default function Product(){
    return `
    <div class="home">
    <div class="header">
        ${Header()}
    </div>
    <div>
        ${ProductItem()}
    </div>
    <div class="footer"></div>
    </div>
    `
}