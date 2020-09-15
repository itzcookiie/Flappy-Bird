# Flappy-Bird v0.0.1

##### 09/09/20 - Game is officially done or at least functionality wise. Changes now are to improve the game

### Learnings

- Learned about window.requestAnimationFrame and using it over setInterval. Still need to understand this more. Understand at the very least, it acts like setTimeout. The browser waits for the next repaint before loading it up, but need more understanding of this

(09/09/2020)
- Learnt (previously) about getComputedStyles for retrieving the CSS styles in JS
- Animations
- Positioning in CSS. Gonna spend more time on this. Position:relative seems pretty interesting. Wanna find out more about how `relative` and `absolute` work.


#### 23/08/2020
- Started at around 9pm. Made shortbread and cleaned the kitchen, but ended up coding till 5.35am. 
- Made my monitoring for obstacles better
- Spent a looong time coding today. Was trying to make my box fall at the same rate as the bird on flappy bird does. Not quite sure how they do it, but I think I will make it model gravity or use a physics model e.g. when you throw a ball into the air, there is a point in time where it will stop increasing in height and start to fall. So the box will fall at the rate of a curve. Could modifier it, so it's faster though
- Time is 5.49am. I have church this morning and I need to get there for 11am? Like 4hrs of sleep. Yikes..

#### 15/09/2020

- Made a few more changes. Just wanted to work on it tbh. Spent about 1hr, but time spent actually looking at my screen and working was maybe about 30mins
- Learnt from CS50 that coding should be like building small blocks. And each block is a new version. 
- Going as far as me saying this is Flappy Bird v.0.0.1
- Each feature I add/block I code is gonna be a new version just to emphasise the point.
- Now time to eat rice krispies and do CS50 :)

#### Todos
- Make game infinitely longer. The game will continue unless the player loses. Have the game generate obstacles as the game continues. Could have 2 obstacles generated at intervals, every time the scroll moves 100px etc &#x2611;
- Score system. Count the number of obstacles passed. One way is to: &#x2611;
1. Check if the box has passed an obstacle container
2. Find the `x cord of the far side of the obstacle container` using `element.getBoundingClientRect()`
3. Keep checking to see if the `x cord on the left/near side of the box` has made it pass the `x-cord on the far side of the obstacle container`
UPDATE (09/09/2020) - Couldn't do it this way because the player isn't actually moving along the x-axis. Instead I used the scroll bar to calculate how far the player has moved. When the scroll bar has passed the right side of the obstacle, then it means the player has passed that obstacle 
- Refactor
- Colour floor orange &#x2611;
- Use postion:relative to hide everything apart from the game screen/interface. *(15/09/2020)Tried doing this was a bit werid, so will have to look more into what this actually is ie. what effect is this*
- Stop player from being able to fly over obstacles. If he does, he dies. *(15/09/2020) Tried looking into this as well, but spent more time looking at the above point because that will kinda involve this.*
- Position obstacles further away from the player at the beginning, so he has time to get prepared &#x2611;
- Use an img/icon for player instead of a box? (optional)
- Create a welcome intro box menu for when you first arrive at the game (maybe just a click to play/get started)
- Change starting jump, so player doesn't start off so far high on first click
- Use grid for organising obstacles and increase space between obstacles
- Potentially increase speed at which obstacles fall and jump ie. make game more fast paced 