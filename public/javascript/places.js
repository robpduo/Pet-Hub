function initMap(types) {
    // Create the map.
    const toronto = { lat: 43.6532, lng: -79.3832 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: toronto,
      zoom: 15,
      mapId: "df65d34dfc32af7a"
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
  
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };
  
    // Perform a nearby search.
    const userCity = window.location.pathname.split("/");

    service.nearbySearch(
      { location: toronto, radius: 3000, type: types, keyword: "pet" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
  
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );
  }
  
  function addPlaces(places, map) {
    const placesList = document.getElementById("placesList");
  
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
          fillOpacity: 1,
          fillColor: "#000000",
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 1.5,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(45, 45),
        };
  
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
  
        const li = document.createElement("li");
  
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
          infowindow
        });
      }
    }
  }

// Initialize map on window open with pet keyword
window.initMap = initMap;

// function to clear the results list when button selected 
//Three event listeners to run the initmap function with different type parameters. 
function clearPlacesList(){
    document.getElementById("placesList").innerHTML = "";
}

document.getElementById('store').addEventListener('click', function() {
    clearPlacesList();
    initMap('store');
});
document.getElementById('park').addEventListener('click', function() {
    clearPlacesList();
    initMap('park');
});

document.getElementById('veterinary_care').addEventListener('click', function() {
    clearPlacesList();
    initMap('veterinary_care');
});