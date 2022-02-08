import  MovingTiters from './classes/MovingTiters.js'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin.js'
import { SplitText } from "gsap/SplitText.js"
import ScrollObserver from './classes/ScrollObserver.js'
import { bodyLockToggle, bodyLockStatus, _slideToggle } from "./utils/functions.js";
import { gotoBlock } from "./scroll/gotoblock.js";

gsap.registerPlugin(DrawSVGPlugin, SplitText)

class App {
    constructor () {
        this.header = document.querySelector('header.header')
        this.footerGridSVG = document.querySelector('.footer__anchor-grid svg')
        this.footerArrowSVG = document.querySelector('.footer__anchor-link svg')
        this.sectionDescription = document.querySelectorAll('.section-descr')
        this.scaleImages = document.querySelectorAll('[data-scroll-scale]')
        this.svgDrawOnScroll = document.querySelectorAll('[data-scroll-draw]')
        this.scrollIsViewElements = document.querySelectorAll('[data-is-view]')

        this.partnersGridInitHeight = document.querySelector('[data-view-more] .partners-grid') ? document.querySelector('[data-view-more] .partners-grid').clientHeight : null
        
        this.init()
    }

    init () {
        this.domCalculate()
        this.splitTextContent()
        this.addEventListeners()
        this.scrollAnimation()
        this.introScreenAnimation()
        this.menuAnimation()
        this.onResize()
        this.resizeEvent()

        new MovingTiters({
            dom: document.querySelectorAll('.titers')
        })
    }

    domCalculate () {
        // * PAGE TITLE 
        const pageTitle = document.querySelector('.intro-screen__title')
        const pageIntroContent = document.querySelector('.intro-screen__content_grid')
        if(pageTitle && pageIntroContent) {
            pageIntroContent.style.gridTemplateRows = `${pageTitle.offsetHeight}px`
        }
        // * MENU OVERFLOW LINE HEIGHT
        const menuLines = document.querySelector('.page-menu__lines')
        const pageMenu = document.querySelector('.page-menu')
        if(menuLines && pageMenu) {
            menuLines.style.height = pageMenu.scrollHeight + 'px'
        }
    }

    splitTextContent () {
        this.splitMainTitleBuffer = new SplitText(document.querySelector('h1'), { type: "lines" })
        this.splitMainTitle = new SplitText(this.splitMainTitleBuffer.lines, { type: "lines" })

        this.splitSecondTitlesBuffer = new SplitText(document.querySelectorAll('h2'), { type: "lines" })
        this.splitSecondTitles = new SplitText(this.splitSecondTitlesBuffer.lines, { type: "lines" })

        this.splitLinksBuffer = new SplitText(document.querySelectorAll('.page-menu .navigation-block__list li a'), { type: "lines" })
        this.splitLinks = new SplitText(this.splitLinksBuffer.lines, { type: "lines" })
    }

    introScreenAnimation () {
        this.introScreen = document.querySelector('.intro-screen')
        const isViewDelay = 2000
        const animationH2LinesIn = (el) => {
            gsap.to(el, {
                y: '0'
            })
        }

        if(this.introScreen) {
            this.introGridSVG = this.introScreen.querySelector('svg.grid')
            this.introScaleImages = this.introScreen.querySelectorAll('img[data-scale]')
            this.introQuote = this.introScreen.querySelector('.quote-text')
            this.preloaderLines = document.querySelectorAll('.preloader__wrapper span')
            this.introTimeline = gsap.timeline()
        }

        setTimeout(() => this.introScreen.classList.add('is-view'), isViewDelay)

        if(this.introGridSVG && this.introTimeline) {
            const svgPath = this.introGridSVG.querySelectorAll('path, line')
            this.introTimeline.fromTo(svgPath, {drawSVG:'0%'}, {
                duration: 1.5, 
                drawSVG:"100%", 
                stagger: 0.1, 
                delay: 1,
            })
        } else {
            new ScrollObserver(this.splitSecondTitles.lines, animationH2LinesIn)
        }
        if(this.introScaleImages && this.introTimeline) {
            gsap.utils.toArray(this.introScaleImages).forEach(image => {
                this.introTimeline.to(image, {
                    onEnter: () => image.classList.add('_scale'),
                    delay: 1
                }, '1') 
            })
        }
        if(this.header && this.introTimeline) {
            this.introTimeline.fromTo(this.header, {yPercent: -100}, {yPercent: 0}, '-=2.5')
            this.introTimeline.call(_ => {
                this.header.style = ''
                this.preloaderLines.forEach(line => line.style.willChange = 'auto')
            })
        }
        // * h2 Animation
        if(this.splitSecondTitles.lines.length > 0 && this.introTimeline) {
            this.introTimeline.call(_ => {
                new ScrollObserver(this.splitSecondTitles.lines, animationH2LinesIn)
            })
        }
    }
    menuAnimation () {
        this.iconMenu = document.querySelector('.icon-menu')

        this.isDisabledMenu = () => {
            this.headerMenu.classList.contains('_disable') ? this.headerMenu.classList.remove('_disable') : this.headerMenu.classList.add('_disable')
            this.iconMenu.classList.contains('_disable') ? this.iconMenu.classList.remove('_disable') : this.iconMenu.classList.add('_disable')
            this.header.classList.contains('_menu-active') ? this.header.classList.remove('_menu-active') : this.header.classList.add('_menu-active')
        }

        this.headerMenu = document.querySelector('.page-menu')

        if(this.headerMenu) {
            this.headerMenuBody = this.headerMenu.querySelector('.page-menu__body')
            this.menuLines = this.headerMenu.querySelectorAll('.page-menu__lines span')
        }

        this.menuTimeline = gsap.timeline({
            onStart: this.isDisabledMenu,
            onComplete: this.isDisabledMenu,
            onReverseComplete: this.isDisabledMenu,
        })

        if(this.headerMenu) { 
            this.menuTimeline.fromTo(this.headerMenu, { yPercent: -100 }, { yPercent: 0, duration: 0.01 })
        }
        if(this.menuLines) {
            this.menuTimeline.fromTo(this.menuLines, {scaleY: 0}, {scaleY: 1, stagger: 0.05})
        }
        if(this.headerMenuBody) {
            this.menuTimeline.fromTo(this.headerMenuBody, {autoAlpha: 0}, {autoAlpha: 1, duration: 1})
        }
        if(this.splitLinks.isSplit) {
            this.menuTimeline.fromTo(this.splitLinks.lines, 
            {
                yPercent: 100,
                autoAlpha: 0
            },
            {
                yPercent: 0,
                autoAlpha: 1,
                stagger: 0.1,
            }, '1')
        }

        this.menuTimeline.pause()
    }
    documentActions (e) {
        const targetElement = e.target
 
        // * Language toggle on mobile
        if (!targetElement.classList.contains('lang-toggle__spoller') && !targetElement.closest('.lang-toggle__spoller')) {
            const langSpollerButton = document.querySelector('.spollers__title')
            const spollerBody = document.querySelector('.spollers__body')

            if(langSpollerButton && langSpollerButton.classList.contains('_spoller-active')) {
                langSpollerButton.classList.remove('_spoller-active')
                _slideToggle(spollerBody)
            }
        }
        if (targetElement.closest('[data-anchor]')) {
            gotoBlock(targetElement.getAttribute("href"))
			e.preventDefault();
		}
        // * menu open
        if (targetElement.closest('.icon-menu')) {
            if (bodyLockStatus) {
                bodyLockToggle();
                document.documentElement.classList.toggle('menu-open');
                this.headerMenu.classList.toggle('menu-open');

                if(this.headerMenu.classList.contains('menu-open')) {
                    this.menuTimeline.play()
                } else {
                    this.isDisabledMenu()
                    this.menuTimeline.reverse()
                }
            }
        }
        // * show more
        if (targetElement.closest('[data-view-more]')) {
            //e.preventDefault()
    
            const $moreItemsContainer = targetElement.closest('[data-view-more]')
            $moreItemsContainer ? $moreItemsContainer.classList.toggle('show-more') : null
            const $showMoreLink = $moreItemsContainer ? $moreItemsContainer.querySelector('[data-show-more]') : null

            const firstText = $showMoreLink ? $showMoreLink.dataset.showMore.split(',')[0] : 'Show more' // default value
            const secondText = $showMoreLink ? $showMoreLink.dataset.showMore.split(',')[1] : 'Hide'

            if( targetElement.closest('.square-view-all') || targetElement.classList.contains('square-view-all') ) {
                const root = targetElement.classList.contains('square-view-all') ? targetElement : targetElement.closest('.square-view-all')
                const span = root.querySelector('.more-info__text')

                if(span) {
                    span.innerText = secondText
                    if ( !$moreItemsContainer.classList.contains('show-more') ) {
                        span.innerText = firstText

                        gotoBlock(`.${$moreItemsContainer.parentElement.classList[0]}`)
                    }
                }
            }

            if( targetElement.closest('.more-info') || targetElement.classList.contains('more-info') ) {
                const root = targetElement.classList.contains('more-info') ? targetElement : targetElement.closest('.more-info')
                const span = root.querySelector('.more-info__text')

                if(span) {
                    span.innerText = secondText
                    if ( !$moreItemsContainer.classList.contains('show-more') ) {
                        span.innerText = firstText

                        gotoBlock(`.${$moreItemsContainer.parentElement.classList[0]}`, false, 500, - this.partnersGridInitHeight)
                    }
                }
            }

        }
        // * search form
        if (targetElement.closest('.search-form__btn')) {
            e.preventDefault()
            const root = targetElement.classList.contains('search-form') ? targetElement : targetElement.closest('.search-form')
            root.classList.add('_active')
        }
        // * more-info 
        if (targetElement.closest('[data-view-more]') && (targetElement.closest('.more-info') || targetElement.classList.contains('more-info'))) {
            e.preventDefault()
        }
        if( !targetElement.closest('.search-form') && document.querySelector('.search-form._active') ) {
            document.querySelector('.search-form').classList.remove('_active')
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
        // * Section Description line
        if(this.sectionDescription.length > 0) {
            new ScrollObserver(this.sectionDescription, this.isView)
        }
        // * Scale images
        if(this.scaleImages.length > 0) {
            new ScrollObserver(this.scaleImages, this.isView)
        }
        // * Draw svg on scroll
        if(this.svgDrawOnScroll.length > 0) {
            const svgPath = Array.from(this.svgDrawOnScroll).map(svg => {
                return [...svg.querySelectorAll('path'), ...svg.querySelectorAll('rect'), ...svg.querySelectorAll('line')]
            })
            gsap.set(svgPath, { drawSVG:'0%' })
            const animationIn = (el) => {
                gsap.to([...el.querySelectorAll('path'), ...el.querySelectorAll('rect'), ...el.querySelectorAll('line')], {duration: 4, drawSVG:"100%", stagger: 0.1})
            }
            new ScrollObserver(this.svgDrawOnScroll, animationIn)
        }
        // * Is view elements
        if(this.scrollIsViewElements.length > 0) {
            this.scrollIsViewElements.forEach(item => {
                const options = {
                    threshold: 0.5
                }
                item.getAttribute('data-is-view') ? options.threshold = item.getAttribute('data-is-view') : null
                new ScrollObserver(this.scrollIsViewElements, this.isView, null, options)
            })
        }
    }

    /*
        * Functions
    */
    isView (el) {
        !el.classList.contains('is-view') ? el.classList.add('is-view') : null
    }
    isClass (el, cls) {
        let rootEl 
        if(el.classList.contains(cls)) {
            rootEl = el
        } else {
            this.isClass()
        }
        
        return rootEl 
    }

    /*
        * Events
    */
    addEventListeners () {
        document.addEventListener('click', this.documentActions.bind(this))
    }
    removeEventListeners () {
    }
    onResize () {
        this.domCalculate()
        // this.splitMainTitle.revert()
        // this.splitSecondTitles.revert()
        // this.splitLinks.revert()
    }
    resizeEvent () {
        window.addEventListener('resize', this.onResize.bind(this))
    }
}

window.addEventListener('load', event => {
    setTimeout(function () {
        document.documentElement.classList.add('loaded');
        new App()
    }, 0);
})


