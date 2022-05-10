namespace SpriteKind {
    export const Crate = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Floor = SpriteKind.create()
    export const Gold = SpriteKind.create()
    export const Valentine = SpriteKind.create()
    export const Arrow = SpriteKind.create()
}
function setLevel (level: number) {
    tiles.setCurrentTilemap(maps[level - 1])
    info.setScore(steps[level - 1])
    tilePlayer = assets.tile`myTileStart`
    tileBox = assets.tile`box`
    tileBoxOpen = assets.tile`myTile0`
    if (level < 8) {
        tileTarget = sprites.castle.tileGrass2
        tileFloor = sprites.castle.tileGrass3
        tileFloor_box = assets.tile`floor_box`
        tileTarge_box = assets.tile`target_box`
        tileFloor_player = assets.tile`tileFloor_player`
    } else {
        tileTarget = sprites.dungeon.collectibleInsignia
        tileFloor = sprites.dungeon.floorLight2
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.Crate)
    placeSpritesOnTile(tileFloor_box, tileTarge_box, tileFloor_player)
    placeSpritesOnTile(tileBox, tileBoxOpen, tilePlayer)
    game.splash("Level " + level, "\"B\" to reset level")
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Crate, function (sprite, otherSprite) {
    if (controllerEnable) {
        aniMove(otherSprite)
        if (otherSprite.tileKindAt(TileDirection.Center, tileTarget) || otherSprite.tileKindAt(TileDirection.Center, tileTarge_box)) {
            music.baDing.play()
            otherSprite.setImage(img`
                . b b b b b b b b b b b b b b . 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
                b e e 4 4 4 4 4 4 4 4 4 4 e e b 
                b b b b b b b d d b b b b b b b 
                . b b b b b b c c b b b b b b . 
                b c c c c c b c c b c c c c c b 
                b c c c c c c b b c c c c c c b 
                b c c c c c c c c c c c c c c b 
                b c c c c c c c c c c c c c c b 
                b b b b b b b b b b b b b b b b 
                b e e e e e e e e e e e e e e b 
                b e e e e e e e e e e e e e e b 
                b c e e e e e e e e e e e e c b 
                b b b b b b b b b b b b b b b b 
                . b b . . . . . . . . . . b b . 
                `)
        } else {
            otherSprite.setImage(img`
                . . b b b b b b b b b b b b . . 
                . b e 4 4 4 4 4 4 4 4 4 4 e b . 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
                b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
                b e e 4 4 4 4 4 4 4 4 4 4 e e b 
                b e e e e e e e e e e e e e e b 
                b e e e e e e e e e e e e e e b 
                b b b b b b b d d b b b b b b b 
                c b b b b b b c c b b b b b b c 
                c c c c c c b c c b c c c c c c 
                b e e e e e c b b c e e e e e b 
                b e e e e e e e e e e e e e e b 
                b c e e e e e e e e e e e e c b 
                b b b b b b b b b b b b b b b b 
                . b b . . . . . . . . . . b b . 
                `)
        }
        isSolved()
    }
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controllerEnable) {
        if (controller.up.isPressed()) {
            locNext = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Top)
            locNext2 = locNext.getNeighboringLocation(CollisionDirection.Top)
            tryMoveOneStep()
        } else if (controller.down.isPressed()) {
            locNext = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)
            locNext2 = locNext.getNeighboringLocation(CollisionDirection.Bottom)
            tryMoveOneStep()
        } else if (controller.left.isPressed()) {
            locNext = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)
            locNext2 = locNext.getNeighboringLocation(CollisionDirection.Left)
            tryMoveOneStep()
        } else if (controller.right.isPressed()) {
            locNext = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)
            locNext2 = locNext.getNeighboringLocation(CollisionDirection.Right)
            tryMoveOneStep()
        } else if (controller.B.isPressed()) {
            setLevel(level)
        }
    }
})
function placeSpritesOnTile (box: Image, target: Image, player2: Image) {
    for (let loc of tiles.getTilesByType(box)) {
        spr = sprites.create(img`
            . . b b b b b b b b b b b b . . 
            . b e 4 4 4 4 4 4 4 4 4 4 e b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b b b b b b b d d b b b b b b b 
            c b b b b b b c c b b b b b b c 
            c c c c c c b c c b c c c c c c 
            b e e e e e c b b c e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `, SpriteKind.Crate)
        spr.z = 1
        tiles.placeOnTile(spr, loc)
        tiles.setTileAt(loc, tileFloor_box)
    }
    for (let loc of tiles.getTilesByType(target)) {
        spr = sprites.create(img`
            . b b b b b b b b b b b b b b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b b b b b b b d d b b b b b b b 
            . b b b b b b c c b b b b b b . 
            b c c c c c b c c b c c c c c b 
            b c c c c c c b b c c c c c c b 
            b c c c c c c c c c c c c c c b 
            b c c c c c c c c c c c c c c b 
            b b b b b b b b b b b b b b b b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `, SpriteKind.Crate)
        spr.z = 1
        tiles.placeOnTile(spr, loc)
        tiles.setTileAt(loc, tileTarge_box)
    }
    for (let loc of tiles.getTilesByType(player2)) {
        tiles.placeOnTile(sokoban, loc)
        tiles.setTileAt(loc, tileFloor_player)
    }
}
function locIsBox () {
    for (let nextBox2 of sprites.allOfKind(SpriteKind.Crate)) {
        if (loc.column == nextBox2.tilemapLocation().column && loc.row == nextBox2.tilemapLocation().row) {
            return true
        }
    }
    return false
}
function tryMoveOneStep () {
    music.playTone(523, music.beat(BeatFraction.Eighth))
    if (!(isPlayerBlocked())) {
        info.changeScoreBy(-1)
        aniMove(sokoban)
    }
}
function aniMove (sprite: Sprite) {
    aniStepCount = 8
    dx = locNext.x - sokoban.tilemapLocation().x
    dy = locNext.y - sokoban.tilemapLocation().y
    for (let index = 0; index < aniStepCount; index++) {
        sprite.x += dx / aniStepCount
        sprite.y += dy / aniStepCount
        pause(80 / aniStepCount)
    }
}
function isPlayerBlocked () {
    loc = locNext
    if (tiles.tileAtLocationIsWall(loc)) {
        // sokoban.sayText("Wall", 1000)
        return true
    } else {
        if (locIsBox()) {
            loc = locNext2
            if (tiles.tileAtLocationIsWall(loc) || locIsBox()) {
                sokoban.sayText("Box is blocked", 800)
                return true
            }
        }
    }
    // sokoban.sayText("-")
    return false
}
// initTiles()
function isSolved () {
    let scoreAdding:number
let projectile:Sprite
boxesInTargets = 0
    for (let box of sprites.allOfKind(SpriteKind.Crate)) {
        if (box.image.equals(img`
            . b b b b b b b b b b b b b b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b b b b b b b d d b b b b b b b 
            . b b b b b b c c b b b b b b . 
            b c c c c c b c c b c c c c c b 
            b c c c c c c b b c c c c c c b 
            b c c c c c c c c c c c c c c b 
            b c c c c c c c c c c c c c c b 
            b b b b b b b b b b b b b b b b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `)) {
            boxesInTargets += 1
        }
    }
    if (boxesInTargets == sprites.allOfKind(SpriteKind.Crate).length) {
        if (level == maps.length) {
            game.over(true, effects.confetti)
        } else {
            controllerEnable = false
            for (let index = 0; index < 4; index++) {
                sokoban.changeScale(1, ScaleAnchor.Middle)
                pause(50)
            }
            music.playMelody("C - C G C5 C5 - - ", 480)
            if (info.score() > 0) {
                scoreAdding = 5
                game.setDialogFrame(img`
                    e e e e e e e e e e e e e e e e 
                    e e e e e e e e e e e e e e e e 
                    e e 4 e 4 4 4 4 4 4 4 4 e 4 e e 
                    e e e e 4 4 4 4 4 4 4 4 e e e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e 4 4 4 4 4 4 4 4 4 4 4 4 e e 
                    e e e e 4 4 4 4 4 4 4 4 e e e e 
                    e e 4 e 4 4 4 4 4 4 4 4 e 4 e e 
                    e e e e e e e e e e e e e e e e 
                    e e e e e e e e e e e e e e e e 
                    `)
                game.showLongText("U made a better solution! Post your solution at https://\\nforum.makecode.com\\n/t/12178  please\\n Have fun!   ", DialogLayout.Bottom)
            } else if (info.score() == 0) {
                scoreAdding = 3
            } else if (info.score() > steps[level - 1] * -0.2) {
                scoreAdding = 2
            } else {
                scoreAdding = 1
            }
            for (let index = 0; index < scoreAdding; index++) {
                projectile = sprites.createProjectileFromSprite(img`
                    ....................
                    ....................
                    ....................
                    ....2222...2222.....
                    ...222222.222222....
                    ..222222222222222...
                    ..222222222222222...
                    ..222222222222222...
                    ..222222222222222...
                    ..222222222222222...
                    ..222222222222222...
                    ...2222222222222....
                    ....22222222222.....
                    .....222222222......
                    ......2222222.......
                    .......22222........
                    ........222.........
                    .........2..........
                    .........2..........
                    ....................
                    `, sokoban, -100, -100)
                projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
                projectile.z = 5
                projectile.scale = 0.1
                for (let index = 0; index < 8; index++) {
                    projectile.scale += 0.3
                    pause(50)
                }
                info.changeLifeBy(1)
            }
            pause(1000)
            level += 1
            setLevel(level)
            for (let index = 0; index < 4; index++) {
                sokoban.changeScale(-1, ScaleAnchor.Middle)
                pause(50)
            }
            controllerEnable = true
        }
    }
}
// required for life=0,
// Don't delete!
info.onLifeZero(function () {
	
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    if (controllerEnable) {
        countRepeatA += 1
        if (countRepeatA > 111) {
            countRepeatA = 0
            level = Math.constrain(game.askForNumber("Level=?", 2), 1, maps.length)
            setLevel(level)
        }
    }
})
let countRepeatA = 0
let boxesInTargets = 0
let dy = 0
let dx = 0
let aniStepCount = 0
let loc: tiles.Location = null
let spr: Sprite = null
let locNext2: tiles.Location = null
let locNext: tiles.Location = null
let tileFloor_player: Image = null
let tileTarge_box: Image = null
let tileFloor_box: Image = null
let tileFloor: Image = null
let tileTarget: Image = null
let tileBoxOpen: Image = null
let tileBox: Image = null
let tilePlayer: Image = null
let controllerEnable = false
let level = 0
let steps: number[] = []
let maps: tiles.TileMapData[] = []
let sokoban: Sprite = null
sokoban = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(sokoban)
sokoban.setStayInScreen(true)
sokoban.z = 2
maps = [
tilemap`level48`,
tilemap`level49`,
tilemap`level0`,
tilemap`level52`,
tilemap`level54`,
tilemap`level55`,
tilemap`box_open`,
tilemap`level42`,
tilemap`level44`,
tilemap`level45`,
tilemap`level46`,
tilemap`level47`
]
steps = [
4,
13,
17,
13,
10,
41,
33,
31,
103,
28,
97,
0,
366,
310,
0
]
info.setLife(0)
level = 4
setLevel(level)
controllerEnable = true
