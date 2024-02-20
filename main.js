const API_KEY = `cf14a883ebcc43a8a235a2ba6ae0e1c7`
let news = []
 const getNews = async()=>{
    const url = new URL(
        `https://times-yeriel.netlify.app/`
        );
    const response =  await fetch(url);
    const data = await response.json(); // json은 파일 형식 중 하나이다. 파일의 확장자이다. 객체를 텍스트화한 타입이다.
    news = data.articles
    console.log("dddd", news);

}

getNews();
for (let i = 0; i < 20; i++){
    console.log("after", i);
}