kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true
})

loadSprite('drawer', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/b0eb3e20093725.562e563da7d9a.png')

add([
    sprite('drawer'),
    pos(80, 100),
    area()
])

// scene('game', () => {
//     sprite('drawer')
// })

// start('game')


// const map = [
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
// ]