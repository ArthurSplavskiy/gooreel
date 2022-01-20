// import '../../libs/inline_svg.js';

inlineSVG.init({
	svgSelector: 'img.svg', // the class attached to all images that should be inlined
	initClass: 'js-inlinesvg', // class added to <html>
}, function () {
	console.log('All SVGs inlined');
});

{/* <img class="svg" data-src="viber.svg" alt=""></img> */}