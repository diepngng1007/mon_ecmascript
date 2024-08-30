import '@/component/Pagination/index.css'
export default function HtmlPaging(){
    return `
    <div class="container_pagination">
        <ul class="page">
            <li onclick="prevPageClick()" class="page__btn_prev"><span class="material-icons"></span></li>
            <div id="pagination"></div>
            <li onclick="nextPageClick()" class="page__btn_next"><span class="material-icons"></span></li>
        </ul>
    </div>
    `
}