document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container')
    const gameField = document.querySelector('.game-field')
    const player = document.querySelector('.player')
    let gameStart = false
    const points = 30 * 4
    let fallingId;
    let checkForObstaclesId

    const distanceFromTop = 937 * 25

    console.log(gameContainer)

    gameField.addEventListener('click', (e) => {
        const playerCords = player.getBoundingClientRect()
        const startingPosition = playerCords.top + (playerCords.height / 2)

        // console.log(playerCords, 'pc')
        // const { top, bottom, right, left, height, width } = playerCords

        // console.log(obstacleHit, 'Obstacle Hit')

        if(gameStart) {
                if(player.style.transform) {
                    console.log(player.style.transform)
                    const transformPos = player.style.transform.match(/-*\d+/g).join('')
                    const value = parseInt(transformPos)
                    const newValue = value - 50
                    console.log(value, newValue)
                    player.animate({
                        transform: [player.style.transform, 'translateY('  + newValue +'px'],
                        easing: ['ease-in', 'ease-out']
                    }, 100)
                    // player.style.top = (parseFloat(player.style.top) - 50) + 'px'
                    player.style.transform = 'translateY('  + newValue +'px'
                    checkIfGameOver(player.getBoundingClientRect())
                    return;
                }
                console.log('??')
                return player.style.transform = "translateY(-50px)"

        } else {
            gameStart = true
            let currentTime = 0
            let delay = 1000 / 60
            function gameMode(timeStamp) {
                // console.log(playerCords)
                // gameContainer.animate({
                //     scrollLeft: [gameContainer.scrollLeft, gameContainer.scrollLeft + 50]
                // }, 10)
                if(timeStamp < currentTime) { window.requestAnimationFrame(gameMode); return; }
                currentTime = timeStamp + delay
                gameContainer.scrollLeft += 3
                if(player.style.transform) {
                    const transformPos = player.style.transform.match(/-*\d+/g).join('')
                    const value = parseInt(transformPos)
                    console.log('Value going down')
                    // player.animate({
                    //     transform: [player.style.transform, `translateY(${(value + 1)}px)`]
                    // }, 100)
                    // player.style.top = (parseFloat(player.style.top) + 1.5) + 'px'
                    player.style.transform = `translateY(${(value + 3)}px)`
                    const gameStatus = checkIfGameOver(player.getBoundingClientRect())
                    window.requestAnimationFrame(gameMode)
                    return;
                }
                player.style.transform = "translateY(1px)"
                window.requestAnimationFrame(gameMode)
            }
            window.requestAnimationFrame(gameMode)
            // timerId = setTimeout(function gameMode() {
            //     // console.log(playerCords)
            //     // gameContainer.animate({
            //     //     scrollLeft: [gameContainer.scrollLeft, gameContainer.scrollLeft + 50]
            //     // }, 10)
            //     gameContainer.scrollLeft += 10
            //     if(player.style.top) {
            //         player.animate({
            //             top: [player.style.top, (parseFloat(player.style.top) + 9.81) + 'px']
            //         }, 100)
            //         player.style.top = (parseFloat(player.style.top) + 9.81) + 'px'
            //         const gameStatus = checkIfGameOver(player.getBoundingClientRect())
            //         console.log(gameStatus, 'GS')
            //         timerId = setTimeout(gameMode, 100)
            //         return;
            //     }
            //     player.style.top = startingPosition + 'px'
            //     timerId = setTimeout(gameMode, 100)
            // }, 100)
        }
    })

    function checkIfGameOver(cordsToCheck) {
        const { top, bottom, right, left, height, width } = cordsToCheck

        const cords = [
            {x: left, y: top, position: 'TL'},
            {x: left + width, y: top, position: 'TR'},
            {x: left + width, y: top + height, position: 'BR'},
            {x: left, y: height + top, position: 'BL'}]

        return cords.some(cords => {
            switch (cords.position) {
                case 'TL': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    touchedObstacle.length > 0 ? alert('Game over') : null
                    return touchedObstacle.length
                }
                case 'TR': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    touchedObstacle.length > 0 ? alert('Game over') : null
                     return touchedObstacle.length
                }
                case 'BR': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    touchedObstacle.length > 0 ? alert('Game over') : null
                    return touchedObstacle.length
                }
                case 'BL': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    touchedObstacle.length > 0 ? alert('Game over') : null
                    return touchedObstacle.length
                }
            }
        })
    }
    // setInterval(() => {
    //     gameContainer.scrollLeft += 10
    // }, 500)

})

// TODO
/* Be able to get square to touch any of the obstacles and console log it
Think about ways to get sqaure to touch obstacles and be notified about it
Add animations for sqaure falling and jumping
Find a way to layout obstacles
Animate scrolling
Rethink code design
 */
