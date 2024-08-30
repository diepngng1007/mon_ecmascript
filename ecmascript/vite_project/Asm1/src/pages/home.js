import Header from "@/components/header";
import Banner from "@/components/banner";
import ProductItem from "@/components/product/product_item";
import Footer from "@/components/footer";

export default function Home (){
   
    return `
    <div class="home">
    <div class="header">
        ${Header()}
    </div>
    <div class="container">
        ${Banner()}
        ${ProductItem()}
    </div>
    ${Footer()}
    </div>
    `
}