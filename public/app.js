function go() {
  console.log("Test");
  fetch("/posts")
    .then(function(response) {
      return response.json();
    })
    .then(function(parsed) {
      console.log("Parsed", parsed);
      var results = parsed;

      var makeContainer = function() {
        var cardStop = document.createElement("div");
        cardStop.setAttribute("class", "cardTitle");
        cardStop.innerText = "STOP";

        var cardGo = document.createElement("div");
        cardGo.setAttribute("class", "cardTitle");
        cardGo.innerText = "GO";

        var cardContinue = document.createElement("div");
        cardContinue.setAttribute("class", "cardTitle");
        cardContinue.innerText = "CONTINUE";

        var container = document.createElement("div");
        container.setAttribute("id", "container");
        var columnStop = document.createElement("div");
        columnStop.setAttribute("id", "Stop");
        columnStop.appendChild(cardStop);
        container.appendChild(columnStop);
        var columnGo = document.createElement("div");
        columnGo.setAttribute("id", "Go");
        columnGo.appendChild(cardGo);
        container.appendChild(columnGo);
        var columnContinue = document.createElement("div");
        columnContinue.setAttribute("id", "Continue");
        columnContinue.appendChild(cardContinue);
        container.appendChild(columnContinue);

        for (let i = 0; i < results.length; i++) {
          var post = document.createElement("div");
          post.setAttribute("class", "card");

          var label = document.createElement("label");
          label.innerHTML = `${results[i].post_content} (${results[i].name})`;

          post.appendChild(label);

          if (results[i].category === "Stop") {
            columnStop.appendChild(post);
          } else if (results[i].category === "Go") {
            columnGo.appendChild(post);
          }
          if (results[i].category === "Continue") {
            columnContinue.appendChild(post);
          }
        }
        return container;
      };

      var main = document.getElementsByTagName("main")[0];

      console.log(main.childNodes.length);

      if (main.childNodes.length > 0) {
        main.removeChild(main.body.childNodes[0]);
      }
      console.log(makeContainer());
      main.appendChild(makeContainer());
      console.log(main.childNodes.length);
    });
}

go();

function checkCookies() {
  console.log("Test Cookies");
  fetch("/cookies")
    .then(function(response) {
      return response.json();
    })
    .then(function(parsed) {
      console.log("Cookies are:", parsed);
      var results = parsed;
    });
}

checkCookies();
