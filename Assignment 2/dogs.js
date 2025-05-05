async function loadDogImages() {
    const res = await fetch("https://dog.ceo/api/breeds/image/random/10");
    const data = await res.json();
  
    const container = document.getElementById("carousel");
    container.innerHTML = "";
  
    data.message.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.style.height = "150px";
      img.style.margin = "0 10px";
      container.appendChild(img);
    });
  
    new Glider(container, {
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: true,
      dots: '.dots',
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      }
    });
  }  
  
  async function loadBreedButtons() {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();
    const breeds = Object.keys(data.message);
  
    const container = document.getElementById("breed-buttons");
    breeds.forEach(breed => {
      const btn = document.createElement("button");
      btn.className = "nav-button";
      btn.textContent = breed;
      btn.onclick = () => loadBreedInfo(breed);
      container.appendChild(btn);
    });
  }
  
  async function loadBreedInfo(breed) {
    const infoDiv = document.getElementById("breed-info");
    infoDiv.innerHTML = `
      <h3>${breed.toUpperCase()}</h3>
      <p>Description: ${breed} is a great dog.</p>
      <p>Min Life: 10 years</p>
      <p>Max Life: 14 years</p>
    `;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadDogImages();
    loadBreedButtons();
  
    if (annyang) {
      annyang.addCommands({
        'load dog breed *name': (name) => {
          loadBreedInfo(name.toLowerCase());
        }
      });
    }
  });
  