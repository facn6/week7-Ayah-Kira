function go() {
  console.log("Test");
  fetch("/posts")
    .then(function(response) {
      return response.json();
    })
    .then(function(parsed) {
      console.log(parsed);
      var results = parsed;
    });
}

go();
