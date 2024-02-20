const API_KEY = `cf14a883ebcc43a8a235a2ba6ae0e1c7`
let newsList = []
const getLatesnews = async()=>{
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const response =  await fetch(url);
    const data = await response.json(); // json은 파일 형식 중 하나이다. 파일의 확장자이다. 객체를 텍스트화한 타입이다.
    newsList = data.articles;
    render();
    console.log("dddd", newsList);

}

const render = ()=>{
    const newsHTML = newsList.map(news=>`<div class = "row news">
    <div class = "col-lg-4">
        <img class = "new-img-size" src = ${news.urlToImage}/>
    </div>
    <div class = "col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publisheAt}
        </div>
    </div>
</div>`).join();

    console.log("html", newsHTML);

    document.getElementById('news-board').innerHTML=newsHTML
}


getLatesnews();