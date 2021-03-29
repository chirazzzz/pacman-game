const width = 28
const gameGrid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
let squares = []
let score = 0
scoreDisplay.textContent = score

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,
  1,0,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,0,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,2,2,2,2,2,2,2,2,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,0,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,0,1,1,1,
  1,1,1,1,1,0,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,0,0,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,1,1,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,0,0,1,1,0,1,1,0,1,1,1,0,0,1,1,1,0,1,1,0,1,1,0,0,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// create board
function createBoard() {
  //create layout.length amount of these elements with a for loop
  for (let i = 0; i < layout.length; i++) {
    // create element
    const square = document.createElement('div')
    // add square into grid
    gameGrid.appendChild(square)
    // push square into new squares array
    squares.push(square)
    
    
    // add styling class depending on layout key - 0,1,2,3,4
    if(layout[i] === 0) {
      square.classList.add('pac-dot')
    } else if (layout[i] === 1) {
      square.classList.add('wall')
    } else if (layout[i] === 2) {
      square.classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      square.classList.add('power-pellet')
    } 
  }
}

createBoard()

// starting position of pacman
let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pacman')

function control(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman')
  switch(e.key) {
    case 'ArrowRight':
      if (!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
          pacmanCurrentIndex % width < (width - 1)) {
            pacmanCurrentIndex++
          } else if (pacmanCurrentIndex === 391) {
            pacmanCurrentIndex = 364
          }
      break
    case 'ArrowUp':
      if (!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
          pacmanCurrentIndex - width >= 0) {
            pacmanCurrentIndex -= width
          }
      break
    case 'ArrowLeft':
      if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
          pacmanCurrentIndex % width !== 0) {
            pacmanCurrentIndex--
          } else if (pacmanCurrentIndex === 364) {
            pacmanCurrentIndex = 391
          }
      break
    case 'ArrowDown':
      if (!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
          pacmanCurrentIndex + width < (width * width)) {
            pacmanCurrentIndex += width
          }
      break
  }
  squares[pacmanCurrentIndex].classList.add('pacman')
  eatPacDots()
  eatPowerPellet()
}

// addEventListener to entire document so it hears all keypresses
document.addEventListener('keydown', control)

function eatPacDots() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    score++
    scoreDisplay.textContent = score
  }
}

function eatPowerPellet() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    //remove power-pellet, add a score of 10 and display it
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    score += 10
    scoreDisplay.textContent = score
    //change each of the four ghosts to isScared
    ghosts.forEach(ghost => ghost.isScared = true)
    //use setTimeout to unscare ghosts after 10 seconds
    setTimeout(unscareGhosts, 10000)
  }
}

function unscareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.ghostCurrentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('inky', 347, 300),
  new Ghost('blinky', 403, 250),
  new Ghost('pinky', 352, 200),
  new Ghost('clyde', 408, 350)
]

// draw ghosts onto grid 
ghosts.forEach(ghost => {
  squares[ghost.ghostCurrentIndex].classList.add(ghost.className)
  squares[ghost.ghostCurrentIndex].classList.add('ghost')
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
  console.log('moved')
  const directions = [-1, +1, -width, +width]
  let direction = directions[Math.floor(Math.random() * 4)]
  console.log(direction)
  
  ghost.timerId = setInterval(() => {
    //if the next square does NOT contain a wall and does NOT contain a ghost
    if (
      !squares[ghost.ghostCurrentIndex + direction].classList.contains('wall') &&
      !squares[ghost.ghostCurrentIndex + direction].classList.contains('ghost')
      ) {
      //remove any ghost
      squares[ghost.ghostCurrentIndex].classList.remove(ghost.className)
      squares[ghost.ghostCurrentIndex].classList.remove('ghost', 'isScared')
      //add direction to current Index
      ghost.ghostCurrentIndex += direction
      //add ghost class
      squares[ghost.ghostCurrentIndex].classList.add(ghost.className)
      squares[ghost.ghostCurrentIndex].classList.add('ghost')
    } else direction = directions[Math.floor(Math.random() * directions.length)]

    // if ghost is scared 
    if(ghost.isScared) {
      squares[ghost.ghostCurrentIndex].classList.add('isScared')
    }

    // if pacman eats scared ghost
    if ( ghost.isScared && 
         squares[ghost.ghostCurrentIndex].classList.contains('pacman') ) {
      //remove classnames - ghost.className, 'ghost' & 'isScared'
      squares[ghost.ghostCurrentIndex].classList.remove(ghost.className, 'ghost', 'isScared')
      // change ghosts currentIndex back to its startIndex
      ghost.ghostCurrentIndex = ghost.startIndex
      // add score of 100
      score += 100
      scoreDisplay.textContent = score
      //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
      squares[ghost.ghostCurrentIndex].classList.add(ghost.className, 'ghost')
    }
    gameOver()
    winGame()
  }, ghost.speed)
}

function gameOver() {
  //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost {
  if ( !squares[pacmanCurrentIndex].classList.contains('isScared')  && 
       squares[pacmanCurrentIndex].classList.contains('ghost') ) {
  //for each ghost - we need to stop it moving
  ghosts.forEach(ghost => clearInterval(ghost.timerId)) 
  //remove eventlistener from our control function
  document.removeEventListener('keydown', control)
  // Update score display to show lost game
  scoreDisplay.textContent = `You Lose`
}
}

function winGame() {
  if(score > 500) {
    //for each ghost - we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId)) 
    //remove eventlistener from our control function
    document.removeEventListener('keydown', control)
    // Update score display to show they've won game
    scoreDisplay.textContent = `You Win, you've collected all the pac-dots`
  }
}