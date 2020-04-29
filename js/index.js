document.addEventListener("DOMContentLoaded", function () {
  let currentUser = {};
  fetch(`http://localhost:3000/users`)
    .then(function (response) {
      return response.json();
    })
    .then(function (u) {
      currentUser = u[0];
    });
  let firstUl = document.querySelector("ul");
  let bookDiv = document.querySelector("#show-panel");
  fetch("http://localhost:3000/books")
    .then(function (response) {
      return response.json();
    })
    .then(function (r) {
      for (let i = 0; i < r.length; i++) {
        let bookLi = document.createElement("li");
        bookLi.innerText = r[i].title;
        firstUl.append(bookLi);
        bookLi.addEventListener("click", function () {
          bookDiv;
          while (bookDiv.firstChild) {
            bookDiv.removeChild(bookDiv.lastChild);
          }
          let bookImg = document.createElement("img");
          bookImg.src = r[i].img_url;
          let bookDes = document.createElement("p");
          bookDes.innerText = r[i].description;
          bookDiv.append(bookImg, bookDes);
          for (let j = 0; j < r[i].users.length; j++) {
            let usernameLi = document.createElement("li");
            usernameLi.innerText = r[i].users[j].username;
            bookDiv.append(usernameLi);
          }

          // like button!
          let likeButton = document.createElement("button");
          likeButton.innerText = "like";
          bookDiv.append(likeButton);
          likeButton.addEventListener("click", function () {
            console.log(r[i].users);
            console.log(currentUser);
            //  debugger
            let userFound = false
             r[i].users.forEach(function(user){
                if (user.id == currentUser.id)
                userFound = true
             })
            if (!userFound) {
              r[i].users.push(currentUser);
              let newArr = r[i].users;
              console.log(r[i].users);
              fetch(`http://localhost:3000/books/${r[i].id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  users: newArr,
                }),
              })
                .then(function (response) {
                  return response.json();
                })
                .then(function () {
                  let usernameLi = document.createElement("li");
                  usernameLi.innerText = currentUser.username;
                  bookDiv.append(usernameLi);
                });
            }
          });
        });
      }
    });
});
