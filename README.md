# Flappy-Bird

### Learnings

- Learned about window.requestAnimationFrame and using it over setInterval. Still need to understand this more. Understand at the very least, it acts like setTimeout. The browser waits for the next repaint before loading it up, but need more understanding of this


#### 23/08/2020
- Started at around 9pm. Made shortbread and cleaned the kitchen, but ended up coding till 5.35am. 
- Made my monitoring for obstacles better
- Spent a looong time coding today. Was trying to make my box fall at the same rate as the bird on flappy bird does. Not quite sure how they do it, but I think I will make it model gravity or use a physics model e.g. when you throw a ball into the air, there is a point in time where it will stop increasing in height and start to fall. So the box will fall at the rate of a curve. Could modifier it, so it's faster though
- Time is 5.49am. I have church this morning and I need to get there for 11am? Like 4hrs of sleep. Yikes..

#### Todos
- Make game infinitely longer. The game will continue unless the player loses. Have the game generate obstacles as the game continues. Could have 2 obstacles generated at intervals, every time the scroll moves 100px etc
- Score system. Count the number of obstacles passed. One way is to:
1. Check if the box has passed an obstacle container
2. Find the `x cord of the far side of the obstacle container` using `element.getBoundingClientRect()`
3. Keep checking to see if the `x cord on the left/near side of the box` has made it pass the `x-cord on the far side of the obstacle container`
