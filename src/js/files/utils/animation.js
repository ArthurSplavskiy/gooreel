export const textAnimationIn = (text) => {
    gsap.to(text, {
        autoAlpha: 1
    })
}

export const textAnimationOut = (text) => {
    gsap.to(text, {
        autoAlpha: 0
    })
}
