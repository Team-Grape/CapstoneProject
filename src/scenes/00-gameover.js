export const gameover = () => {
    scene("gameover", () => {
        add([
            text("Gameover"),
            color(255, 0, 0),
            pos(width() / 2, 100),
            origin("center"),
        ])
        add([
            text("The evil ghost"),
            color(255, 0, 0),
            pos(width() / 2, 250),
            origin("center"),
        ])
        add([
            text("has caught you."),
            color(255, 0, 0),
            pos(width() / 2, 400),
            origin("center"),
        ])
    })
}