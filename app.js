const modal = document.querySelector(".modal-ticket");

const btr = document.querySelectorAll(".button-modal-ticket");

for (var i = 0; i < btr.length; i++) {
  btr[i].onclick = function () {
    modal.style.display = "block";
  };
}

// Get the <span> element that closes the modal
var btn2 = document.getElementById("close-1");

btn2.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//************** Section Welcome slider */

$(".welcome__image").slick({
  draggable: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 2000,
});

$(".welcome__image").on(
  "afterChange",
  function (event, slick, currentSlide, nextSlide) {
    let number = document.querySelector(".welcome__slider .slider__count p");
    number.textContent = `0${currentSlide + 1}`;
  }
);
// ********* Explore Image ***********************

function initComparisons() {
  let x = document.getElementsByClassName("img-overlay");
  for (let i = 0; i < x.length; i++) {
    compImage(x[i]);
  }

  function compImage(img) {
    let clicked = 0;
    let w = img.offsetWidth;
    let h = img.offsetHeight;
    img.style.width = 440 + "px";

    let slider = document.createElement("div");
    slider.setAttribute("class", "comp-slider");
    img.parentElement.insertBefore(slider, img);
    slider.style.left = 440 - slider.offsetWidth / 2 + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e);
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      var a,
        x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
    }
  }
}

initComparisons();

// ********* Castom Player ***********************
const player = document.querySelector(".video__player");
const video = document.querySelector('.viewer');
const progress = document.querySelector(".progress");
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle-play');
const buttonScreenPlay = document.querySelector('.button-screen');
const ranges = player.querySelectorAll('.player__slider');
const buttonVolume = document.querySelector('.button__volume');
const buttonFullScreen = document.querySelector('.button__screen');
const slick = document.querySelector('.slick-list');
const buttonLeft = document.querySelector('.left');
const buttonRight = document.querySelector('.right');

const videoSlider = document.querySelector('.video__slider');


function stopVideo(){
   const iframe = videoSlider.querySelectorAll('iframe');
  func = 'pauseVideo';
  for (let i = 0; i < iframe.length; i++) {
    iframe[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
    
  }
}

$(".video-player").on('afterChange', function (event, slick, currentSlide, nextSlide) {
  if (currentSlide != nextSlide) {
    stopVideo()
  }
});


document.onkeypress = function(e){
  if(e.keyCode === 32 ){
     togglePlay();
     e.preventDefault();
  } 
}

document.addEventListener('keyup', function(e){
  if(e.keyCode === 77){   
    onVolume();
  }
})

document.addEventListener('keyup', function(e){
  if (e.keyCode === 70 ){
    fullScreen();
  } 
})

document.addEventListener('keyup', function(e){
   if (e.shiftKey && e.keyCode === 188 ){
    video.playbackRate -=0.1;
   } else if (e.shiftKey && e.keyCode === 190){
    video.playbackRate +=0.1;
   } else if (e.keyCode === 191){
     video.playbackRate = 1;
   }
})

document.addEventListener('keyup', function(e){
  if (e.keyCode === 74){
     video.currentTime -= parseFloat(5);
  } else if (e.keyCode === 76){
     video.currentTime += parseFloat(5);
  }
})

function togglePlay(){
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(){
  
  if(this.paused){
    toggle.classList.add('button__play');
    toggle.classList.remove('button__stop');
    buttonScreenPlay.classList.remove('none');
  }else{
    toggle.classList.remove('button__play');
    toggle.classList.add('button__stop'); 
    buttonScreenPlay.classList.add('none');
  }
}

function handleRangeUpdate(){
  video[this.name] = this.value;

  if(this.value == 0){
    buttonVolume.classList.remove('button__volume');
    buttonVolume.classList.add('button__no-volume');
  } else{
    buttonVolume.classList.add('button__volume');
    buttonVolume.classList.remove('button__no-volume');
  }
}

function fullScreen(){
  if(buttonFullScreen.classList.contains('button__screen')){
  player.requestFullscreen();
  video.style.height= "94vh";
  buttonFullScreen.classList.remove('button__screen');
  buttonFullScreen.classList.add('button__no-screen');
  }else{
  document.exitFullscreen();
  video.style.height= '650px';
  buttonFullScreen.classList.add('button__screen');
  buttonFullScreen.classList.remove('button__no-screen');
  }
  
}


// progress bar
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function onVolume(){
  if(buttonVolume.classList.contains('button__volume')){
    buttonVolume.classList.remove('button__volume');
    buttonVolume.classList.add('button__no-volume');
    ranges[0].value = 0;
    video[ranges[0].name] = ranges[0].value;
  }else{
    buttonVolume.classList.add('button__volume');
    buttonVolume.classList.remove('button__no-volume');    
    ranges[0].value = 1;
    video[ranges[0].name] = ranges[0].value;
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
buttonScreenPlay.addEventListener('click',updateButton);
buttonScreenPlay.addEventListener('click',togglePlay);
toggle.addEventListener('click', togglePlay);
buttonVolume.addEventListener('click',onVolume);
buttonFullScreen.addEventListener('click', fullScreen);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// ********* Slider Video ***********************
$('.video-player').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
  arrows: false,
  fade: true,
  asNavFor: '.video__slider'
});

$('.video__slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  swipe: false,
  asNavFor: '.video-player',
  dots: true,
  prevArrow: '.left',
  nextArrow: '.right',
  centerMode: false,
  focusOnSelect: true
});

// ********* Slider tickets ***********************

$('.tickets-content__img').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  dots: true,
})

// ********* Button Book ***********************

const btnBook = document.querySelectorAll(".button-book");

btnBook.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const btnTop = e.target.offsetTop;
    const btnLeft = e.target.offsetLeft;

    const xInside = x - btnLeft;
    const yInside = y - btnTop;

    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 250);
  });
});

//*********** Gallery*******/

const pictureInnerContainer = document.querySelector(
  ".gallery-inner-container"
);

let arrayPicture = [];

for (let i = 1; i < 16; i++) {
  let img = ` <img class='_anim-items' src="assets/img/galery/galery${i}.avif" alt="galery${i}">`;
  arrayPicture.push(img);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);

  array.map((e) => {
    pictureInnerContainer.innerHTML += e;
  });
}

shuffle(arrayPicture);

//*************Animation image */

const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        let animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        animItem.classList.remove("_active");
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + screenLeft };
  }
}
//************************* Calc ticket ********************/
let ticketSection = document.querySelector('.tickets');
let stepDown = document.getElementsByClassName("step-down");
let stepUp = document.getElementsByClassName("step-up");

let basicInput = document.querySelector('.tick-basic');
let seniorInput = document.querySelector('.tick-senior');
let count = document.querySelector('.count');

let typesTickets = document.getElementsByName("radio");

  for (let i = 0; i < stepDown.length; i++) {
    let button = stepDown[i];
    button.addEventListener("click", function (event) {
      let buttonClicked = event.target;
      let input = buttonClicked.parentElement.children[1];
      let inputValue = input.value;
      let newValue = parseInt(inputValue) - 1;
      
      if (newValue >= 0) {
        input.value = newValue;
      } else {
        input.value = 0;
      }
      getTotal();
    });    
  }


for (let i = 0; i < stepUp.length; i++) {
  let button = stepUp[i];
  button.addEventListener("click", function (event) {
    let buttonClicked = event.target;
    let input = buttonClicked.parentElement.children[1];
    let inputValue = input.value;
    let newValue = parseInt(inputValue) + 1;
    input.value = newValue;
    getTotal();
  });
}

function check() {
  
const label = tickets.querySelectorAll('label');
  for (let i = 0; i < typesTickets.length; i++) {
    if (typesTickets[i].checked) {      
      localStorage.setItem('labelTickets',label[i].innerText);
      localStorage.setItem('typesTickets',i);
     return i;
    }
  }
}

function getTotal(){
  
  let basic = 0;
  let senior = 0;
  let total = 0


  if (parseInt(basicInput.value)){
    basic = parseInt(basicInput.value)
    
  }

  if (parseInt(seniorInput.value)){
    senior = parseInt(seniorInput.value)
  }

  switch (check()){
    case 0:
    total = basic * 20 + senior * 10;
    break;
    case 1:
    total = basic * 25 + senior * 12.5;
    break;
    case 2:
    total = basic * 40 + senior * 20;
    break;
  }

  count.innerHTML = total;
  localStorage.setItem('count',total);
  localStorage.setItem('basic',basic);
  localStorage.setItem('senior',senior);
}

count.textContent = localStorage.getItem('count');
basicInput.value = localStorage.getItem('basic'); 
seniorInput.value = localStorage.getItem('senior');
typesTickets[Number(localStorage.getItem('typesTickets'))].checked = true;
getTotal();
//************************* MapBox ********************/
mapboxgl.accessToken =
  "pk.eyJ1IjoibG9zdGZveCIsImEiOiJja3VqdDJpeXkxNmMwMnZubXdoOXpscjB6In0.Jo1yKUO-KrqYsnKa9vEIKg";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/light-v10", // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 16, // starting zoom
});

const marker1 = new mapboxgl.Marker({
  color: "#171717",
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker2 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker3 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker4 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const marker5 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-right");


//*****************Valid forms */



//********************Calc form */
var today = new Date().toISOString().split('T')[0];
document.getElementsByName("date")[0].setAttribute('min', today);

const dateTime = document.querySelector('form')
const time = document.getElementById('time');
const date = document.getElementById('date');
const input = document.querySelectorAll('input');
const numberTicket = document.querySelectorAll('.overview-count-ticket__amount')
const timeTicket = document.querySelectorAll('.overview-text-info__text');
const totalCount = document.querySelector('.overview-count-total__amount');
const typeOfTicket = document.querySelectorAll('.overview-count-ticket__type');
const sumOfTicket = document.querySelectorAll('.overview-count-ticket__sum');


function updateDate(){
  const nowDate =  document.getElementById('date').value;
  const nowTime = document.getElementById('time').value;
  
  
  timeTicket[0].innerHTML =  `<p>${nowDate}</p>`;
  timeTicket[1].innerHTML = `<p>${nowTime}</p>`;
}
timeTicket[2].innerHTML = `<p>${localStorage.getItem('labelTickets')}</p>`;
dateTime.addEventListener('click',updateDate);

numberTicket[0].innerHTML = localStorage.getItem('basic');
numberTicket[1].innerHTML = localStorage.getItem('senior');
totalCount.innerHTML = `€ ${localStorage.getItem('count')}`;


switch(+localStorage.getItem('typesTickets')){
  case 0:
  typeOfTicket[0].innerHTML = 'Basic (20 €)';
  typeOfTicket[1].innerHTML = 'Senior (10 €)';
  sumOfTicket[0].innerHTML = `${20 * Number(localStorage.getItem('basic'))} €`;
  sumOfTicket[1].innerHTML = `${10 * Number(localStorage.getItem('basic'))} €`;
  break;
  case 1:
    typeOfTicket[0].innerHTML = 'Basic (25 €)';
    typeOfTicket[1].innerHTML = 'Senior (12,5 €)';    
    sumOfTicket[0].innerHTML = `${25 * Number(localStorage.getItem('basic'))} €`;
    sumOfTicket[1].innerHTML = `${12.5 * Number(localStorage.getItem('basic'))} €`;
    break;
  case 2:
    typeOfTicket[0].innerHTML = 'Basic (40 €)';
    typeOfTicket[1].innerHTML = 'Senior (20 €)';    
  sumOfTicket[0].innerHTML = `${40 * Number(localStorage.getItem('basic'))} €`;
  sumOfTicket[1].innerHTML = `${20 * Number(localStorage.getItem('basic'))} €`;
    break;
}
