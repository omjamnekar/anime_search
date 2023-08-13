let availsearch = [
  { id: "HTML" },
  { id: "CSS" },
  { id: "Easy Tutorials" },
  { id: "Web designing tutorials" },
  { id: "JavaScript" },
  { id: "Where to learn coding online" },
  { id: "Where to learn web Design" },
  { id: "How to create a website" },
];

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    result = availsearch.filter((item) => {
      return item.id.toLowerCase().includes(input.toLowerCase());
    });
  }
  display(result);

  if (!result.length) {
    resultBox.innerHTML = "";
  }
};

function display(result) {
  const content = result.map((item) => {
    return "<li onclick='selectInput(this)'>" + item.id + "</li>";
  });

  resultBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultBox.innerHTML = "";
}

var searchInput = document.querySelector("icons-search");

searchInput.addEventListener("click", function () {
  searchInput.classList.toggle("expanded");
});
