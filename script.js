const form = document.getElementById("user_input_form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValues = getFormInputValues();
  form.reset();
  makeCard(inputValues);
});

function getFormInputValues() {
  return {
    destination: document.getElementById("destination").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
  };
}

/*
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
*/
async function makeCard({ destination, location, description }) {
  encodeURIComponent(destination);
  const apiURL = `https://pixabay.com/api/?key=26982880-b8836bfc70b423ae9a4c2d356&q=${destination}&image_type=photo&pretty=true`;

  const response = await fetch(apiURL);
  const data = await response.json();
  
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("style", "width: 14rem");
  

  const cardPhoto = document.createElement("img");
  cardPhoto.classList.add("card-img-top");

  const defaultURL =
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHRyYXZlbHxlbnwwfHwwfHw%3D&w=1000&q=80";
  
    
    if(data.totalHits === 0){
      cardPhoto.setAttribute("src", defaultURL);
    }else{
      cardPhoto.setAttribute("src", data.hits[getRandomImageFromSearch()].largeImageURL);
    }
  card.appendChild(cardPhoto);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = destination;
  cardBody.appendChild(cardTitle);

  const cardLocation = document.createElement("p");
  cardLocation.classList.add("card-text");
  cardLocation.innerText = location;
  cardBody.appendChild(cardLocation);

  if (description.length === 0) {
    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerText = "No description provided";
    cardBody.appendChild(cardDescription);
  } else {
    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerText = description;
    cardBody.appendChild(cardDescription);
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btn_container");

  const editBtn = document.createElement("a");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "btn-warning");
  editBtn.addEventListener("click", updateCard);
  buttonContainer.append(editBtn);

  const removeBtn = document.createElement("a");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("btn", "btn-danger");
  removeBtn.addEventListener("click", removeCard);
  buttonContainer.append(removeBtn);

  cardBody.appendChild(buttonContainer);
  card.appendChild(cardBody);
  document.getElementById("cards_container").appendChild(card);
  document.getElementById("card_section_title").innerText = "My Wishlist";

  console.log(data)

  return card;
}

function removeCard(event) {
  const cardBody = event.target.parentElement.parentElement;
  const card = cardBody.parentElement;
  card.remove();
  if (document.getElementById("cards_container").childElementCount === 0) {
    document.getElementById("card_section_title").innerText =
      "Enter Destinations";
  }
}

function updateCard(event) {
  const cardBody = event.target.parentElement.parentElement;

  const card = cardBody.parentElement;
  const currentImg = card.children[0];

  const newDestination = prompt("Enter new destination");
  if (newDestination.length > 0) {
    cardBody.children[0].innerText = newDestination;
  }

  const newLocation = prompt("Enter new location");
  if (newLocation.length > 0) {
    cardBody.children[1].innerText = newLocation;
  }


  const newDesription = prompt("Enter new description");
  if (newDesription.length > 0) {
    cardBody.children[2].innerText = newDesription;
  }
}

function getRandomImageFromSearch(){
  const randNum = Math.floor(Math.random() * 21);
  return randNum;
}