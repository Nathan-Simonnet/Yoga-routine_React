let exercicesArray = JSON.parse(window.localStorage.currentList);
const main = document.querySelector('main');
const lobbyBtn = document.getElementById('lobby');
const routine = document.getElementById('routine');
let cardContainer;


const routineHandler = (array) => {
    let index = 0;
    let transitionTime = true;
    let min = array[index].min;
    let sec = 0;

    const routineDisplayer = (array) => {

        if (cardContainer) {
            cardContainer.remove()
        }

        cardContainer = document.createElement('div');
        cardContainer.classList.add('card');

        const counterContainer = document.createElement('div');
        counterContainer.classList.add('counter-container');

        const counter = document.createElement('div');
        counter.id = 'counter';

        const minutes = document.createElement('span');
        minutes.id = 'minutes';
        minutes.textContent = min;

        const colon = document.createTextNode(' : ');

        const seconds = document.createElement('span');
        seconds.id = 'seconds';
        seconds.textContent = sec < 10 ? "0" + sec : sec;

        counter.appendChild(minutes);
        counter.appendChild(colon);
        counter.appendChild(seconds);

        counterContainer.appendChild(counter);

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.src = `assets/images/${array[index].pic}.png`
        img.alt = 'yoga figure';

        imgContainer.appendChild(img);

        cardContainer.appendChild(counterContainer);
        cardContainer.appendChild(imgContainer);

        main.appendChild(cardContainer);


        // Automatic timer with stimeout
        // ------------------------------------------------------------------------------

        const ring = () => {
            const audio = new Audio();
            audio.src = "../assets/media/ring.mp3";
            audio.play();
        }
        const timerHandler = (array) => {
            setTimeout(() => {
                if (min == 0 && sec == 0) {
                    index++;
                    if (index == array.length) {
                        window.location.href = './end.html';
                        console.log('end')
                    }
                    min = array[index].min;
                    sec = 0;
                    ring()
                    transitionTime = true
                    routineDisplayer(array)
                }
                else if (sec == "00") {
                    min--;
                    sec = 59;
                    transitionTime = false
                    routineDisplayer(array)

                } else {
                    sec--;
                    routineDisplayer(array)
                }
            }, 1000)
        }
        // enter the number of seconds for one beep before passing to a new image
        // ------------------------------------------------------------------------------
        const beep = () => {
            const audio = new Audio();
            audio.src = "../assets/media/beep.mp3";
            audio.play();
        }
        const transitionTimer = (index, max) => {

            setTimeout(() => {
                beep()
                if (index < max) {
                    index++;
                    transitionTimer(index, max)
                } else {
                    timerHandler(array)
                }
            }, 1000)
        }
        // Transition or not ?
        // ------------------------------------------------------------------------------
        if (transitionTime == true) {
            transitionTimer(1, 3)
        } else {
            timerHandler(array)
        }
    }

    const main = document.querySelector('main');
    const goBtn = document.getElementById('routine');

    goBtn.addEventListener('click', () => {
        window.location.href = './routine.html';
        console.log('routinedd')
    });
    routineDisplayer(array);

}

lobbyBtn.addEventListener('click', () => {
    window.location.href = './index.html';
    console.log('lobby')
});

document.getElementById('go').addEventListener('click', () => {
    routineHandler(exercicesArray);
    document.getElementById('go').remove()
});
