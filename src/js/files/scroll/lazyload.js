//import LazyLoad from "vanilla-lazyload";

// Работает с объектами с класом ._lazy

new LazyLoad({
	//elements_selector: '._lazy',
	container: document.querySelector("#s-team"),
    thresholds: "200% 0px",
	class_loaded: '_lazy-loaded',
	//use_native: true
});
//console.log(lazyMedia)

// Обновить модуль
//lazyMedia.update();