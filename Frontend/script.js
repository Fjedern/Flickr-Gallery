var currentPage = 1;
var searchQuery;

var btn = document.getElementById("submit");

btn.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = " ";
  searchQuery = document.getElementById("search").value;
  apiFetch(searchQuery, "1");
  currentPage++;
});

window.onscroll = function () {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    apiFetch(searchQuery, currentPage);
    currentPage++;
  }
};

function apiFetch(search, page) {
  fetch(`http://localhost:5000/picBySearch/${search}/${page}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      for (var i = 0; i <= result.length - 1; i++) {
        var image = document.createElement("img");
        if (result[i].farm != 0) {
          image.setAttribute(
            "src",
            `https://farm${result[i].farm}.staticflickr.com/${result[i].server}/${result[i].id}_${result[i].secret}.jpg`
          );
        }
        document.querySelector(".gallery").appendChild(image);
      }
      document.getElementById("error").innerHTML = "";
    })
    .catch(function (err) {
      document.getElementById("error").innerHTML = "Something went wrong";
      console.warn("Something went wrong.", err);
    });
}
