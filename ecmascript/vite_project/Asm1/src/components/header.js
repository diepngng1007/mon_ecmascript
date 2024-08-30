import { menus } from "@/data/data"

export default function Header(){
    const pathName = window.location.pathname
    const arrPath = pathName.split('/')
    const slug = arrPath[1]
    const active = slug ==='product'?1:slug ==='contact'?2:slug ==='admin'?3:0

    return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            ${menus.map((item,index) => {
                if (item.dropDown && item.dropDown.length > 0) {
                    return `
                        <li class="nav-item dropdown">
                            <a class="nav-link drop-hover dropdown-toggle ${index === active?'active':''}" href="${item.path}" id="menu-${item.id}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${item.name}</a>
                            <div class="dropdown-menu" aria-labelledby="menu-${item.id}">
                                ${item.dropDown.map((subitem) => {
                                    return `
                                        <a class="dropdown-item" href="${subitem.path}">${subitem.name}</a>
                                    `;
                                }).join("")}
                            </div>
                        </li>
                    `;
                } else {
                    return `
                        <li class="nav-item">
                            <a class="nav-link ${index === active?'active':''}" href="${item.path}">${item.name}</a>
                        </li>
                    `;
                }
            }).join("")}
        </ul>
    </div>
</nav>

    `
}