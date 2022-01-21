import { _slideToggle } from './utils/functions.js'
import  MovingTiters from './classes/MovingTiters.js'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import ScrollObserver from './classes/ScrollObserver.js'

gsap.registerPlugin(DrawSVGPlugin,  ScrollTrigger)

class App {
    constructor () {
        this.footerGridSVG = document.querySelector('.footer__anchor-grid svg')
        this.init()
    }

    init () {
        this.addEventListeners()
        this.pinHeader()
        this.anchorTransition()
        this.scrollAnimation()
        this.introScreenAnimation()
        //this.drawSVG()

        new MovingTiters({
            dom: document.querySelectorAll('.titers')
        })
    }

    drawSVG () {
        this.shapes = 'path, line'
        gsap.fromTo(this.shapes, {drawSVG:'0%'}, {duration: 1, drawSVG:"100%", stagger: 0.1})
    }

    introScreenAnimation () {
        this.introScreen = document.querySelector('.intro-screen')
        this.introGridSVG = this.introScreen.querySelector('svg.grid')
        this.introRevealImages = this.introScreen.querySelectorAll('img[data-reveal]')
        this.introTimeline = gsap.timeline()

        let shapes = 'path, line'
        
        //this.introTimeline.fromTo(shapes, {drawSVG:'0%'}, {duration: 1, drawSVG:"100%", stagger: 0.1})

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

    anchorTransition () {
        const anchorTimeline = gsap.timeline()
        let linkAnchors = document.querySelectorAll('[anchor-link]') 
        
        gsap.utils.toArray(linkAnchors).forEach(link => { 
            link.addEventListener("click", event => {
                event.preventDefault(); 

                document.documentElement.classList.remove('menu-open', 'lock')
                document.querySelector('.header__menu').classList.remove("menu-open")

                // setTimeout(() => {
                //     document.documentElement.classList.remove('menu-open', 'lock');
                //     document.querySelector('.header__menu').classList.remove("menu-open");
                // }, 400)

                if(event.target.getAttribute("href")) {
                    anchorTimeline.to(window, {duration: 2.2, scrollTo: event.target.getAttribute("href")})
                }

                // if(document.querySelector('.page-transition') && event.target.getAttribute("href")) {
                //     anchorTimeline.to('.page-transition', {duration: 0.6, scaleX: 1, transformOrigin: 'top left'})
                //     anchorTimeline.to(window, {duration: 0.2, scrollTo: event.target.getAttribute("href")}) 
                //     anchorTimeline.to('.page-transition', {duration: 0.4, scaleX: 0, transformOrigin: 'top right'})
                // }
                
            }); 
        });
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
    }

    /*
        * Animation
    */
    scrollAnimation () {

        // * Footer grid draw on viewport
        if(this.footerGridSVG) {
            gsap.set(this.footerGridSVG.querySelectorAll('path'), { drawSVG:'0%' })
            this.d = () => {
                //let shapes = 'path, line'

                

                
                // set {drawSVG:'0%'}
                // to {duration: 1, drawSVG:"100%", stagger: 0.1}
                gsap.to(this.footerGridSVG.querySelectorAll('path'), {duration: 1, drawSVG:"100%", stagger: 0.1})
                console.log(this.footerGridSVG.querySelectorAll('path'))
            }
            this.f = () => {
                let shapes = 'path, line'
                gsap.to(this.footerGridSVG.querySelectorAll('path'), {duration: 1, drawSVG:'0%', stagger: 0.1})
            }
            new ScrollObserver(this.footerGridSVG, this.d, this.f)
        }
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


