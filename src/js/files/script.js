import  MovingTiters from './classes/MovingTiters.js'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin.js'
//import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js'
import ScrollObserver from './classes/ScrollObserver.js'

gsap.registerPlugin(DrawSVGPlugin, ScrollToPlugin) // ,  ScrollTrigger

class App {
    constructor () {
        this.footerGridSVG = document.querySelector('.footer__anchor-grid svg')
        this.footerArrowSVG = document.querySelector('.footer__anchor-link svg')
        this.sectionDescription = document.querySelectorAll('.section-descr')
        this.quoteDecorations = document.querySelectorAll('.quote-text__decoration span')
        this.init()
    }

    init () {
        this.addEventListeners()
        //this.pinHeader()
        this.scrollAnimation()
        this.introScreenAnimation()
        //this.drawSVG()

        new MovingTiters({
            dom: document.querySelectorAll('.titers')
        })
    }

    // drawSVG () {
    //     this.shapes = 'path, line'
    //     gsap.fromTo(this.shapes, {drawSVG:'0%'}, {duration: 1, drawSVG:"100%", stagger: 0.1})
    // }

    introScreenAnimation () {
        this.introScreen = document.querySelector('.intro-screen')
        this.introGridSVG = this.introScreen.querySelector('svg.grid')
        this.introRevealImages = this.introScreen.querySelectorAll('img[data-reveal]')
        this.introTimeline = gsap.timeline()

        
        if(this.introGridSVG) {
            const svgPath = this.introGridSVG.querySelectorAll('path, line')
            this.introTimeline.fromTo(svgPath, {drawSVG:'0%'}, {duration: 1, drawSVG:"100%", stagger: 0.1})
        }
        if(this.introRevealImages) {
            gsap.utils.toArray(this.introRevealImages).forEach(image => {
                this.introTimeline.to(image, {
                    onEnter: () => image.classList.add('_reveal')
                }) 
            })
        }
    }

    pinHeader () {
        this.header = document.querySelector('header.header')

        const showAnim = gsap.from(this.header, { 
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1)
        
        ScrollTrigger.create({
            start: "+=100",
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }, 
            onEnter: () => this.header.classList.add('_scroll'),
            onLeaveBack: () => this.header.classList.remove('_scroll'),
        })
    }

    documentActions (e) {
        const targetElement = e.target
 
        // * Language toggle on mobile
        if(!targetElement.classList.contains('lang-toggle__spoller') && !targetElement.closest('.lang-toggle__spoller')) {
            const langSpollerButton = document.querySelector('.spollers__title')
            const spollerBody = document.querySelector('.spollers__body')

            if(langSpollerButton.classList.contains('_spoller-active')) {
                langSpollerButton.classList.remove('_spoller-active')
                spollerBody.setAttribute('hidden', 'true')
            }
        }
        // * anchor transition
        if (targetElement.closest('[anchor-link]')) {
            this.anchorTimeline = gsap.timeline()
			if(targetElement.hasAttribute("href")) {
                this.anchorTimeline.to(window, {duration: 1.2, scrollTo: targetElement.getAttribute("href")})
            }
			e.preventDefault();
		}
    }

    /*
        * Animation
    */
    scrollAnimation () {

        // * Footer grid draw on viewport
        if(this.footerGridSVG && this.footerArrowSVG) {
            const svgPath = [...this.footerGridSVG.querySelectorAll('path'), ...this.footerArrowSVG.querySelectorAll('path')]
            gsap.set(svgPath, { drawSVG:'0%' })
            const animationIn = () => {
                gsap.to(svgPath, {duration: 1, drawSVG:"100%", stagger: 0.1})
            }
            new ScrollObserver(this.footerGridSVG, animationIn)
        }
        // * Footer grid draw on viewport
        if(this.sectionDescription.length > 0) {
            new ScrollObserver(this.sectionDescription, this.isView)
        }
        if(this.quoteDecorations.length > 0) {
            new ScrollObserver(this.quoteDecorations, this.isView)
        }
    }

    /*
        * Functions
    */
    isView (el) {
        !el.classList.contains('is-view') ? el.classList.add('is-view') : null
    }


    /*
        * Events
    */
    addEventListeners () {
        document.addEventListener('click', this.documentActions.bind(this))
    }
    removeEventListeners () {
    }
}

window.addEventListener('load', event => {
    setTimeout(function () {
        document.documentElement.classList.add('loaded');
        new App()
    }, 0);
})


