import { _slideToggle } from './utils/functions.js'
import  MovingTiters from './classes/MovingTiters.js'
import gsap from 'gsap'
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin.js"

gsap.registerPlugin(DrawSVGPlugin)

class App {
    constructor () {
        this.init()
    }

    init () {
        this.addEventListeners()
        this.pinHeader()
        this.anchorTransition()
        this.scrollAnimation()
        //this.drawSVG()

        new MovingTiters({
            dom: document.querySelectorAll('.titers')
        })
    }

    drawSVG () {
        const shapes = 'path, line'
        gsap.fromTo(shapes, {drawSVG:"0%"}, {duration: 1, drawSVG:"100%", stagger: 0.1})
    }

    pinHeader () {

        const showAnim = gsap.from('.header', { 
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);
        
        ScrollTrigger.create({
            start: "+=200",
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });
    
        window.addEventListener('scroll', scroll_scroll);
        function scroll_scroll() {
            let src_value = window.pageYOffset;
            let header = document.querySelector('header.header');
            if (header !== null) {
                if (src_value > 200) {
                    header.classList.add('_scroll');
                } else {
                    header.classList.remove('_scroll');
                }
            }
        }
    }

    anchorTransition () {
        const anchorTimeline = gsap.timeline()
        let linkAnchors = document.querySelectorAll('[anchor-link]') 
        
        gsap.utils.toArray(linkAnchors).forEach(link => { 
            link.addEventListener("click", event => {
                event.preventDefault(); 

                document.documentElement.classList.remove('menu-open', 'lock');
                document.querySelector('.header__menu').classList.remove("menu-open");

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
        // new Observer(this.pageTitles, textAnimationIn, textAnimationOut)
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
        console.log("All resources finished loading!")
    }, 0);
})


