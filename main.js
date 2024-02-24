const API_KEY = `cf14a883ebcc43a8a235a2ba6ae0e1c7`
let newsList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(e)=>getNewsByCategory(e)))
console.log("mmmm:", menus);
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;


const getNews = async()=>{
    try{
        url.searchParams.set("page",page); // => &page=page
        url.searchParams.set("pageSize", pageSize);
        const response = await fetch(url);
        const data = await response.json();
        console.log("ddd", data);
        if(response.status===200){
            if(data.articles.length === 0){
                throw new Error("No result for this search")
            }
            newsList = data.articles; // json은 파일 형식 중 하나이다. 파일의 확장자이다. 객체를 텍스트화한 타입이다.
            totalResults = data.totalResults
            render();
            paginationRender();
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        console.log("error", error.message);
        errorRender(error.message);
    }
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if(inputArea.style.display === "inline"){
        inputArea.style.display = "none";
    }else{
        inputArea.style.display = "inline"
    }
}

let url = new URL(
    `https://times-yeriel.netlify.app/top-headlines`
    // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
);

const getLatestNews = async()=>{
    url = new URL(
        `https://times-yeriel.netlify.app/top-headlines`
        // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    getNews();
};

const getNewsByCategory = async(e) => {
    const category = e.target.textContent.toLowerCase();
    console.log("category:", category);
    url = new URL(
        `https://times-yeriel.netlify.app/top-headlines?category=${category}`
        // `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    );
    getNews();
};

const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword);
         url = new URL(
        `https://times-yeriel.netlify.app/top-headlines?q=${keyword}`
        // `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
    );
    getNews();
};

const render = ()=>{
    const newsHTML = newsList.map(news=>`<div class = "row news">
    <div class = "col-lg-4">
        <img class = "new-img-size" src="${news.urlToImage}"/>
    </div>
    <div class = "col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
</div>`).join('');

    console.log("html", newsHTML);

    document.getElementById('news-board').innerHTML=newsHTML
}

const errorRender = (errorMessage) => {
    const errorHTML= `<div class="alert alert-danger d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div>
    ${errorMessage}
    </div>
  </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;

}

const paginationRender=()=>{
    //totalResult
    //page
    //pageSize
    //groupSize
    //totalpages
    const totalPages = Math.ceil(totalResults / pageSize);
    //pageGroup
    const pageGroup = Math.ceil(page/groupSize);
    //lastPage
    // 마지막 페이지그룹이 그룹사이즈보다 작다? lastpage = totalpage
    const lastPage = pageGroup * groupSize
    if(lastPage > totalPages){
        lastPage = totalPages;
    }

    //firstPage
    //
    const firstPage = 
    lastPage - (groupSize - 1)<=0? 1: lastPage - (groupSize - 1); 

    //first~last

    let paginationHTML=`<a class="page-link" onclick = "moveToPage(${page-1})" aria-label="Previous">
    <span aria-hidden="true">&laquo;</span></a>`

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`<li class="page-item ${i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    paginationHTML+=`<a class="page-link" onclick = "moveToPage(${page+1})" aria-label="Next">
    <span aria-hidden="true">&raquo;</span>
  </a>`
    document.querySelector(".pagination").innerHTML = paginationHTML

//     <nav aria-label="Page navigation example">
//     <ul class="pagination">
//       <li class="page-item">
//         <a class="page-link" href="#" aria-label="Previous">
//           <span aria-hidden="true">&laquo;</span>
//         </a>
//       </li>
//       <li class="page-item"><a class="page-link" href="#">1</a></li>
//       <li class="page-item"><a class="page-link" href="#">2</a></li>
//       <li class="page-item"><a class="page-link" href="#">3</a></li>
//       <li class="page-item">
        // <a class="page-link" href="#" aria-label="Next">
        //   <span aria-hidden="true">&raquo;</span>
        // </a>
//       </li>
//     </ul>
// </nav>

    
};

const moveToPage = (pageNum) => {
    console.log("moveToPage", pageNum);
    page = pageNum;
    getNews();
}

getLatestNews();

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 늇 가져오기
//3. 그 뉴스를 보여주기