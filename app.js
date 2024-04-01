const recommendedURL = "https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco";
const imageList = document.querySelector("#image-lists")

async function cards(allData){

    console.log(allData.length);
    let size = allData.length;
    imageList.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    allData.forEach(el => {
        console.log(el)
        const cityName = el.cityName;
        const weather = el.weather;
        const distance = (el.distanceKm/1000).toFixed(2);
        const date = el.date.slice(0, 10);

        const eventName = el.eventName;

        const imgUrl= el.imgUrl;
        const indexOfd = imgUrl.indexOf('d/');
        const indexOfview = imgUrl.indexOf('/view');

        const imgUrlId = imgUrl.slice(indexOfd+2, indexOfview);
        

        const imgUrlId1 = `https://drive.google.com/thumbnail?id=${imgUrlId}`;
        // console.log(imgUrlId1)

        const cardHTML = `<div class = "img-container"
        style = "background-image: url(${imgUrlId1});">
                
                <div class="first">
                    <h3>${eventName}</h3>
                    <p> <img src="Images/location.svg" alt=""> ${cityName}</p>
                </div>
    
                <div class="second">
                    <h4>${date}</h4>
                    <p>${weather} || ${distance}Km</p>
                </div>
            </div>`;

        imageList.innerHTML = imageList.innerHTML + cardHTML;
    });
   
    
  
}
async function dataFetch(recommendedURL){
    const response = await fetch(recommendedURL);
    const data = await response.json();
    console.log(data);
    const allData = data.events;
    cards(allData);
}

dataFetch(recommendedURL);