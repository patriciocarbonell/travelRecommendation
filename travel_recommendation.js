const api = "travel_recommendation_api.json";
const results = [];
const searchInput = document.getElementById("search");
const navForm = document.getElementById("navForm");
const divPresentation = document.getElementById("presentation");
const clearButton = document.getElementById("btnClear");

navForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const search = searchInput.value.toLowerCase();
    if (search === "beach" || search === "beaches") {
        displayRecommendations("beach");
    } else if (search === "temple" || search === "temples") {
        displayRecommendations("temple");
    } else if (search === "country" || search === "countries") {
        displayRecommendations("country");
    } else {
        alert("Please enter a valid keyword: beach, temple, or country.");
    }
});

clearButton.addEventListener("click", () => {
    clearResults();
});

function displayRecommendations(keyword) {
    fetch(api)
    .then(res => res.json())
    .then(data => {
        results.length = 0;
        if (keyword === "country") {
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    results.push({
                        country: country.name,
                        city: city.name,
                        imageUrl: city.imageUrl,
                        description: city.description
                    });
                });
            });
        } else if (keyword === "temple") {
            data.temples.forEach(temple => {
                results.push({
                    type: "temple",
                    name: temple.name,
                    imageUrl: temple.imageUrl,
                    description: temple.description
                });
            });
        } else if (keyword === "beach") {
            data.beaches.forEach(beach => {
                results.push({
                    type: "beach",
                    name: beach.name,
                    imageUrl: beach.imageUrl,
                    description: beach.description
                });
            });
        }
        displayResults();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResults() {
    divPresentation.innerHTML = "";
    results.forEach(result => {

        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result");

        const image = document.createElement("img");
        image.src = result.imageUrl;
        image.alt = result.name;
        image.className = "imgRecomendations";
        resultDiv.appendChild(image);

        const name = document.createElement("h3");
        if (result.country) {
            name.textContent = result.city;
        } else if (result.name) {
            name.textContent = result.name;
        }
        resultDiv.appendChild(name);

        const description = document.createElement("p");
        description.textContent = result.description;
        resultDiv.appendChild(description);

        divPresentation.appendChild(resultDiv);
    });
}

function clearResults() {
    divPresentation.innerHTML = "";
    searchInput.value = "";
    window.location.href = "index.html"
}
