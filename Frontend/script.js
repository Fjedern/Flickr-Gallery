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
    .then(function (data) {
      for (var i = 0; i <= data.length; i++) {
        var image = document.createElement("img");
        if (data[i].farm != 0) {
          image.setAttribute(
            "src",
            `https://farm${data[i].farm}.staticflickr.com/${data[i].server}/${data[i].id}_${data[i].secret}.jpg`
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
