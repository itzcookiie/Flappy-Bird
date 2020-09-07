document.addEventListener('DOMContentLoaded', () => {
    const obstaclesContainer = document.querySelector('.obstacles-container')
    const playerContainer = document.querySelector('.player-container')
    const game = document.querySelector('.game')
    const gameScreen = document.querySelector('.game-screen')
    const gameField = document.querySelector('.game-field')
    const player = document.querySelector('.player')
    const scoreboard = document.querySelector('.scoreboard')
    const score = document.querySelector('.score')
    const jump = 50
    let gameOver = false
    const points = 30 * 4
    let timerId;
    let animationId;
    let checkForObstaclesId

    const obstacleSets = [
        {
            top: 'short',
            bottom: 'long'
        },
        {
            top: '',
            bottom: ''
        },
        {
            top: 'long',
            bottom: 'short'
        }
    ]

    function mapObstacles() {
        const obstacleElements = Object.values(obstaclesContainer.children)
        const { right, width } = playerContainer.getBoundingClientRect()
        const baseWidth = right - width
        return obstacleElements.map(element => {
            return {
                element,
                xCord: element.getBoundingClientRect().right - baseWidth
            }
        })
    }

    const distanceFromTop = 937 * 25

    function generateObstacles() {
        const obstacles = mapObstacles()
        const middleObstacle = Math.round(obstacles.length / 2)

        if(game.scrollLeft > obstacles[middleObstacle - 1].xCord) {
            console.log('hello')
            // obstacles.slice(0, 5).map(obstacle => obstaclesContainer.removeChild(obstacle.element))

            let fragment = document.createDocumentFragment()
            for(let i = 0; i < 5; i++) {
                const randomNumber = Math.floor(Math.random() * 3)
                const randomObstacleSet = obstacleSets[randomNumber]
                const obstacleContainer = document.createElement('div')
                obstacleContainer.classList.add('obstacle-container')
                obstacleContainer.innerHTML = 
                `
                    <div class="obstacle ${randomObstacleSet.top}"></div>
                    <div class="obstacle ${randomObstacleSet.bottom}"></div>
                `
                fragment.appendChild(obstacleContainer)
            }
            obstaclesContainer.appendChild(fragment)

            // game.scrollLeft -= obstacles[2].xCord
            const { width } = getComputedStyle(gameScreen)
            gameScreen.style.width = parseInt(width) + 1000 + 'px'
        }
    }


    gameField.addEventListener('click', (e) => {
        const halfwayPoint = ((game.scrollWidth - game.clientWidth) / 2) + game.clientWidth / 2
        const playerCords = player.getBoundingClientRect()
        const startingPosition = playerCords.top + (playerCords.height / 2)

        // console.log(playerCords, 'pc')
        // const { top, bottom, right, left, height, width } = playerCords

        // console.log(obstacleHit, 'Obstacle Hit')
        // console.log(floorXCord, playerCords.bottom, 'x cords')
        console.log(halfwayPoint, game.scrollLeft)

        // if(game.scrollLeft >= halfwayPoint) {
        //     // const { width } = getComputedStyle(gameScreen)
        //     // gameScreen.style.width = parseInt(width) + 1000 + 'px'
        //     generateObstacles()
        //     Object.values(obstaclesContainer.children).slice(0,5).map(oc => obstaclesContainer.removeChild(oc))
        //     game.scrollLeft -= 975
        // }

                if(!player.style.transform) {
                    console.log('??')
                    player.style.transform = "translateY(-50px)"
                }
                    console.log(timerId)
                    if(timerId) {
                        clearTimeout(timerId) 
                        cancelAnimationFrame(animationId)
                    }
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
                    const timeToMaxHeight = Math.sqrt((2 * jump) / 9.81) 
                    console.log(timeToMaxHeight)
                    timerId = setTimeout(() => {
                        let currentTime = 0
                        let startTime = 0
                        let delay = 1000 / 60
                        function gameMode(timeStamp) {
                            cancelAnimationFrame(animationId)
                            generateObstacles()
                            console.log('hello')
                            if(startTime === 0) startTime = timeStamp
                            const elapsed = timeStamp - startTime
                            currentTime = timeStamp
                            game.scrollLeft += 5
                            if(player.style.transform) {
                                const transformPos = player.style.transform.match(/-*\d+/g).join('')
                                const value = parseInt(transformPos)
                                const drop = Math.round(value + (0.5 * 9.81 * (elapsed/1000)))
                                player.style.top = (parseFloat(player.style.top) + 1.5) + 'px'
                                player.style.transform = `translateY(${(drop)}px)`
                                const gameStatus = checkIfGameOver(player.getBoundingClientRect())
                                return gameStatus === 0 ? alert('Game over bro') : animationId = window.requestAnimationFrame(gameMode)
                            }
                            player.style.transform = "translateY(1px)"
                            animationId = window.requestAnimationFrame(gameMode)
                        }
                        animationId = window.requestAnimationFrame(gameMode)
                    }, 10)
                    return;
    })

    function checkIfGameOver(cordsToCheck) {
        const { top, bottom, right, left, height, width } = cordsToCheck
        const floorXCord = gameField.getBoundingClientRect().bottom

        const cords = [
            {x: left, y: top, position: 'TL'},
            {x: left + width, y: top, position: 'TR'},
            {x: left + width, y: top + height, position: 'BR'},
            {x: left, y: height + top, position: 'BL'}]

        const currentObstacles = mapObstacles() 

        const numOfObstaclesCleared = currentObstacles.filter(obstacle => game.scrollLeft >= obstacle.xCord)
        score.textContent = numOfObstaclesCleared.length
            
        if(gameOver || bottom >= floorXCord) {
            return 0;
        }

        return cords.some(cords => {
            switch (cords.position) {
                case 'TL': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    if(touchedObstacle.length > 0) alert('Game over')
                    return touchedObstacle.length
                }
                case 'TR': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    if(touchedObstacle.length > 0) alert('Game over')
                    return touchedObstacle.length
                }
                case 'BR': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    if(touchedObstacle.length > 0) alert('Game over')
                    return touchedObstacle.length
                }
                case 'BL': {
                    const allElements = document.elementsFromPoint(cords.x , cords.y)
                    const allElementsInArray = Object.values(allElements)
                    const touchedObstacle = allElementsInArray.filter(element => element.classList.contains('obstacle'))
                    if(touchedObstacle.length > 0) alert('Game over')
                    return touchedObstacle.length
                }
            }
        })
    }
})

// TODO
/* Be able to get square to touch any of the obstacles and console log it
Think about ways to get sqaure to touch obstacles and be notified about it
Add animations for sqaure falling and jumping
Find a way to layout obstacles
Animate scrolling
Rethink code design
 */
