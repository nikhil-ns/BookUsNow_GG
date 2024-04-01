const recommendedURL = "https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco";
const upcomingURL = "https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming";

const imageList = document.querySelector("#image-lists");
const boxContent = document.querySelector(".box-events");

async function recommendedShows(recommendedShowsData){

    // console.log(recommendedShowsData.length);
    let size = recommendedShowsData.length;
    imageList.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    recommendedShowsData.forEach(el => {
        // console.log(el)
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


async function upcomingShows(upcomingShowsData){
    upcomingShowsData.forEach(el => {
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
        
        const boxHTML = ` <div class="boxes">
                <div class="box-image">
                    <img src="${imgUrlId1}" alt="">
                    <h3>${date}</h3>
                </div>

                <div class="box-content">
                    <div class="first">
                        <h3>${eventName}</h3>
                        <p> <img src="Images/location.svg" alt="">${cityName}</p>
                    </div>
                    <div class="second">
                        <p>${weather} <br> ${distance} Km</p>
                    </div>
                </div>
            </div>`

        boxContent.innerHTML = boxContent.innerHTML + boxHTML;

    
    });
}

async function dataFetch(recommendedURL, upcomingURL){
    const response = await fetch(recommendedURL);
    const data = await response.json();
    const recommendedShowsData = data.events;
    recommendedShows(recommendedShowsData);

    const response1 = await fetch(upcomingURL);
    const data1 = await response1.json();
    const upcomingShowsData = data1.events;
    upcomingShows(upcomingShowsData);
}

dataFetch(recommendedURL, upcomingURL);