window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}
// 获取主要元素
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel-button.right');
const prevButton = document.querySelector('.carousel-button.left');

const nav = document.querySelector('.carousel-nav');
const dots = Array.from(nav.children);

// 当前幻灯片索引
let currentIndex = 0;

// 根据第一张 slide 计算宽度（假设所有 slide 宽度相同）
const slideWidth = slides[0].getBoundingClientRect().width;

// 将所有slide水平排列(可选，如果需要动态计算位置)
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

// 更新轨道偏移
function moveToSlide(track, currentIndex) {
  const amountToMove = -slideWidth * currentIndex;
  track.style.transform = `translateX(${amountToMove}px)`;
}

// 更新圆点激活状态
function updateDots(dots, currentIndex) {
  dots.forEach(dot => dot.classList.remove('current-slide'));
  dots[currentIndex].classList.add('current-slide');
}

// 点击右箭头
nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    moveToSlide(track, currentIndex);
    updateDots(dots, currentIndex);
  }
});

// 点击左箭头
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    moveToSlide(track, currentIndex);
    updateDots(dots, currentIndex);
  }
});

// 点击底部圆点
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    moveToSlide(track, currentIndex);
    updateDots(dots, currentIndex);
  });
});


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
