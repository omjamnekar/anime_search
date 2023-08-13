const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const showMoreButton = document.getElementById("showMore");
const seePreviousButton = document.getElementById("seePrevious");

let firstData = [];
let secondTitles = [];
let displayedResults = 0;
let previousResults = [];

// Fetch the second JSON data and store titles in a separate array
fetch(
  "https://raw.githubusercontent.com/omjamnekar/animejson1/master/weebhub_animelist.json"
)
  .then((response) => response.json())
  .then((secondData) => {
    secondTitles = secondData.map((item) => item.title);
  })
  .catch((error) => console.log("Error fetching second JSON data:", error));

// Fetch the first JSON data and store it in a global variable for search
fetch(
  "https://raw.githubusercontent.com/omjamnekar/animejson1/master/animebigFinal_animedataset.json"
)
  .then((response) => response.json())
  .then((data) => {
    firstData = data;
  })
  .catch((error) => console.log("Error fetching first JSON data:", error));

searchInput.addEventListener("input", () => {
  displayedResults = 0; // Reset displayedResults when new search is initiated
  updateResults();
});

seePreviousButton.addEventListener("click", () => {
  if (previousResults.length > 0) {
    resultsContainer.innerHTML = previousResults.pop(); // Retrieve and display previous results
    displayedResults -= 10;
    updateResults();
  }
});
showMoreButton.addEventListener("click", () => {
  previousResults.push(resultsContainer.innerHTML); // Store the current results
  displayedResults += 10;
  updateResults();
});

function updateResults() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const searchResults = [];

  if (searchTerm.length > 0) {
    // Search in the first JSON file for Name, Genres, and Producers
    const firstResults = firstData.filter(
      (item) =>
        (item.Name &&
          typeof item.Name === "string" &&
          item.Name.toLowerCase().includes(searchTerm)) ||
        (item.Genres &&
          typeof item.Genres === "string" &&
          item.Genres.toLowerCase().includes(searchTerm)) ||
        (item.Producers &&
          typeof item.Producers === "string" &&
          item.Producers.toLowerCase().includes(searchTerm))
    );

    // Search in the second JSON file for title
    const secondResults = secondTitles.filter((title) =>
      title.toString().toLowerCase().includes(searchTerm)
    );

    // Combine results from both files
    searchResults.push(...firstResults, ...secondResults);
  }

  displayResults(searchResults);
}

function displayResults(results) {
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    showMoreButton.style.display = "none";
    return;
  }

  showMoreButton.style.display =
    displayedResults < results.length ? "block" : "none";

  const resultList = document.createElement("ul");
  results.slice(displayedResults, displayedResults + 10).forEach((item) => {
    const listItem = document.createElement("li");

    if (item.Name) {
      listItem.innerHTML = `
      <div class="cards-of-search">
      ${
        item["Image URL"]
          ? `<img class="img-round" src="${item["Image URL"]}" alt="${item.Name} Image"><br>`
          : ""
      }
      <div class="text-search-put">
      <p><strong>Name:</strong> ${item.Name}</p><br>
        <p><strong>Genres:</strong> ${item.Genres}</p><br>
        <p><strong>Producers:</strong> ${item.Producers}</p><br>
        </div>
        </div>
        <hr>
      `;
    } else {
      listItem.innerHTML = `
      <div classs="cards-of-search">
      <img class="img-round" src='images.png'>
        <strong>Title:</strong> ${item}<br>
        <hr>
        </div>
      `;
    }

    resultList.appendChild(listItem);
  });

  resultsContainer.appendChild(resultList);
}

var searchInput1 = document.querySelector(".check");
var expandablew = document.querySelector(".expandable-input");

searchInput1.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent the click from propagating to document
  if (this.value === "") {
    expandablew.classList.add("expanded");
  }
});

expandablew.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent the click from propagating to document
});

document.addEventListener("click", function (event) {
  if (
    !searchInput1.contains(event.target) &&
    !expandablew.contains(event.target) &&
    searchInput1.value === ""
  ) {
    expandablew.classList.remove("expanded");
  }
});

searchInput.addEventListener("input", () => {
  displayedResults = 0; // Reset displayedResults when new search is initiated
  seePreviousButton.style.display = "block"; // Show the "See Previous" button
  updateResults();
});

searchInput.addEventListener("input", () => {
  displayedResults = 0; // Reset displayedResults when new search is initiated

  // Check if there's any text in the search input
  if (searchInput.value.trim() === "") {
    resultsContainer.innerHTML = ""; // Clear the results container
    showMoreButton.style.display = "none"; // Hide "Show More" button
    seePreviousButton.style.display = "none"; // Hide "See Previous" button
  } else {
    seePreviousButton.style.display = "block"; // Show "See Previous" button
    updateResults();
  }
});
