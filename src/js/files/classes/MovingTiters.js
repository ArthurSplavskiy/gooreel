export default class MovingTiters {
    constructor(options) {
        this.titers = options.dom
        this.createTiters()
    }

    createTiters() {
        if( this.titers.length ) {
            this.titers.forEach( item => {
                return titersSpeed(item);
            })
            window.addEventListener('resize', () => {
                this.titers.forEach( item => {
                    return titersSpeed(item);
                })
            })
        }
    
        function titersSpeed(titers) {
            let lists = titers.querySelectorAll('.titers__list');
            lists.forEach( list => {
                let speed = list.hasAttribute('data-speed') ? list.dataset.speed : 50;
                let res = parseInt(list.offsetWidth / speed);
                list.style.animationDuration = res + 's';
            })
        }
    }
}