export const gameover = () => {
    scene("gameover", () => {
        add([
            text("Gameover"),
            color(255, 0, 0),
            pos(width() / 2, 100),
            origin("center"),
        ])
        add([
            text("The evil ghost", {size: 48}),
            color(255, 0, 0),
            pos(width() / 2, 230),
            origin("center"),
        ])
        add([
            text("has caught you.", {size: 48}),
            color(255, 0, 0),
            pos(width() / 2, 330),
            origin("center"),
        ])
        add([
            text("Click here to restart", {size: 36}),
            color(255, 255, 255),
            pos(width() / 2, 460),
            origin("center"),
            area(),
            "restartButton"
        ])
        onClick("restartButton", () => {
          go("title")
        })
    })
}
