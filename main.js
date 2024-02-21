const API_KEY = `cf14a883ebcc43a8a235a2ba6ae0e1c7`
let newsList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(e)=>getNewsByCategory(e)))
console.log("mmmm:", menus);

const getLatestNews = async()=>{
    const url = new URL(
        `https://times-yeriel.netlify.app/top-headlines`
        // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`

    );
    const response =  await fetch(url);
    const data = await response.json(); // json은 파일 형식 중 하나이다. 파일의 확장자이다. 객체를 텍스트화한 타입이다.
    newsList = data.articles;
    render();
    console.log("dddd", newsList);

}

const getNewsByCategory = async(e) => {
    const category = e.target.textContent.toLowerCase();
    console.log("category:", category);
    const url = new URL(
        `https://times-yeriel.netlify.app/top-headlines?category=${category}`
        // `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd", data);
    newsList = data.articles;

    render();

}

const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword);
    const url = new URL(
        `https://times-yeriel.netlify.app/top-headlines?keyword=${keyword}`
        // `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("keyworld data:", data)
    newsList = data.articles;
    render();
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


getLatestNews();

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 늇 가져오기
//3. 그 뉴스를 보여주기