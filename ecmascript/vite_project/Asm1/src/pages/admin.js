import Header from "@/components/header";

export default function Admin(){
    return `
    <div class="home">
    <div class="header">
        ${Header()}
    </div>
    <div>
    Admin
    </div>
    <div class="footer"></div>
    </div>
    `
}