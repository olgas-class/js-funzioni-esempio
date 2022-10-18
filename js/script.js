const itemsContainer = document.querySelector(".items");
const thumbsContainer = document.querySelector(".thumbs");

const images = [
  "img/01.jpg",
  "img/02.jpg",
  "img/03.jpg",
  "img/04.jpg",
  "img/05.jpg",
];

// Creazione elementi iniziali
createSliderWithThumbs(images, itemsContainer, thumbsContainer);

// Stato dell'applicazione
let activeItem = 0;

// Navigazione
const sliderItems = document.getElementsByClassName("item");
const thumbItems = document.getElementsByClassName("thumb");

showSlide(0);
document.querySelector(".next").addEventListener("click", slideForward);
document.querySelector(".prev").addEventListener("click", slideBackword);


/////////////////////////////////////////////////////////
// NAVIGATION NON PURE FUNCTIONS
/**
 * Description: La funzione che mostra lo slide successivo
 */
function slideForward() {
  hideSlide(activeItem);
  // Posso andare avanti finchè esiste l'immagine successiva (penultimo elemento)
  if (activeItem < sliderItems.length - 1) {
    activeItem++;
  } else {
    activeItem = 0;
  }
  showSlide(activeItem);
}

/**
 * Description: La funzione che mostra lo slide precedente
 */
function slideBackword() {
  hideSlide(activeItem);
  // Posso andare indietro finché esisite l'immagine precedente (il secondo elemento)
  if (activeItem > 0) {
    activeItem--;
  } else {
    // Altrimenti riparto dall'ultimo elemento
    activeItem = sliderItems.length - 1;
  }
  showSlide(activeItem);
}

/**
 * Description: La funzione che mostra un dato slide
 * @param {number} index - l'indice dello slide da mostrare
 */
function showSlide(index) {
  sliderItems[index].classList.add("active");
  thumbItems[index].classList.add("active");
}

/**
 * Description: La funzione che nascone un dato slide
 * @param {number} index - l'indice dello slide da nascondere
 */
function hideSlide(index) {
  sliderItems[index].classList.remove("active");
  thumbItems[index].classList.remove("active");
}

// UI FUNCTIONS
/**
 * Description: La funzione che crealo slider con i thumbs partendo da array di immagini
 * @param {Array} imagesArray - immagini da inserire nello slider
 * @param {Object} slidesWrapper - elemento html che contiene gli slides
 * @param {Object} thumbsWrapper - elemento html che contiene i thumbs
 */
function createSliderWithThumbs(imagesArray, slidesWrapper, thumbsWrapper) {
  for (let i = 0; i < imagesArray.length; i++) {
    const thisImage = imagesArray[i];
    slidesWrapper.innerHTML += createSlide(thisImage);
    thumbsWrapper.append(createThumb(thisImage, i));
  }
}

/**
 * Description: Funzione che crea un singolo slide
 * @param {String} image - immagine da inserire nello slide
 * @returns {String} la stringa che rappresenta elemento html dello slide
 */
function createSlide(image) {
  return `<div class="item">
            <img src="${image}" alt="" />
          </div>`;
}

/**
 * Description: Funzione che crea un singolo thumb
 * @param {String} image - immagine da inserire nello thumb
 * @returns {Object} L'elemento html che rappresenta thumb
 */
function createThumb(image, index) {
  const thumb = document.createElement("div");
  thumb.innerHTML = `<img src="${image}" alt="" />`;
  thumb.classList.add("thumb");
  thumb.addEventListener("click", function () {
    hideSlide(activeItem);
    activeItem = index;
    showSlide(activeItem);
  });
  return thumb;
}
