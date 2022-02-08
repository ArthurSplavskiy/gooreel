/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Lazy } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../../scss/libs/_swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	if (document.querySelector('#employee-page__slider-1')) {
		new Swiper('#employee-page__slider-1', {
			modules: [Navigation, Lazy],
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 4
			},
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 40,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			// Arrows
			navigation: {
				nextEl: '.employee-page__slider-1__next',
				prevEl: '.employee-page__slider-1__prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 16,
				},
				480: {
					slidesPerView: 1.5,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 2.8,
					spaceBetween: 40,	
				},
				1134: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
				1920: {
					slidesPerView: 4,
					spaceBetween: 40,
				}
			}
		})
	}

	if (document.querySelector('#vacancy-page__slider-1')) {
		new Swiper('#vacancy-page__slider-1', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 40,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			navigation: {
				nextEl: '.vacancy-page__slider-1__next',
				prevEl: '.vacancy-page__slider-1__prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 16,
				},
				480: {
					slidesPerView: 1.5,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 2.8,
					spaceBetween: 40,	
				},
				1134: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
				1920: {
					slidesPerView: 4,
					spaceBetween: 40,
				}
			}
		})
	}

	if (document.querySelector('#game-slider-1')) {
		new Swiper('#game-slider-1', {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 40,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			navigation: {
				nextEl: '.game-slider-1__next',
				prevEl: '.game-slider-1__prev',
			},
			pagination: {
				el: '.game-slider-1__pagination',
				type: 'fraction',
			},
		})
	}

	// TOUCH SLIDER
	if(document.querySelector('.touch-slider__slider')) {
		//const sliders = document.querySelectorAll('.touch-slider')

		new Swiper('.touch-slider__slider', {
			modules: [Lazy],
			lazy: {
				checkInView: true,
				loadPrevNext: true,
				loadPrevNextAmount: 4
			},
			slidesPerView: "auto",
			spaceBetween: 40,
			breakpoints: {
				320: {
					spaceBetween: 8,
				},
				480: {
					spaceBetween: 16,
				},
				768: {
					spaceBetween: 40,
				}
			}
		});
	}
	//=====================================================================================

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});