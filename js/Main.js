
const exercicesArray = [
    { "pic": 0, "min": 2 },
    { "pic": 1, "min": 2 },
    { "pic": 2, "min": 2 },
    { "pic": 3, "min": 2 },
    { "pic": 4, "min": 2 },
    { "pic": 5, "min": 2 },
    { "pic": 6, "min": 2 },
    { "pic": 7, "min": 2 },
    { "pic": 8, "min": 2 },
    { "pic": 9, "min": 2 }


];
let exercicesArrayModified = [...exercicesArray];

const lobbyHabndler = () => {
    const resetBtn = document.getElementById('reset');
    const main = document.querySelector('main');
    const routineBtn = document.getElementById('routine');

    const storing = () => {
        window.localStorage.currentList = JSON.stringify(exercicesArrayModified);
    }

    const restoring = () => {
        if (window.localStorage.currentList) {
            exercicesArrayModified = JSON.parse(window.localStorage.currentList);
            console.log(exercicesArrayModified)
        }
    }

    // Inject each element of exercicesArray into the main
    // =========================================================================
    const cardsDisplayer = (array) => {

        main.innerHTML = "";

        for (let i = 0; i < array.length; i++) {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const timerContainerDiv = document.createElement('div');
            timerContainerDiv.classList.add('timer-container');

            const timerInput = document.createElement('input');
            timerInput.setAttribute('type', 'number');
            timerInput.setAttribute('min', '1');
            timerInput.setAttribute('max', '12');
            timerInput.setAttribute('data-pic', array[i].pic);
            timerInput.classList.add('timer');
            timerInput.value = array[i].min;

            timerContainerDiv.appendChild(timerInput);

            const imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', `assets/images/${array[i].pic}.png`);
            imgElement.setAttribute('alt', `yoga figure ${array[i].pic}`);

            imgContainerDiv.appendChild(imgElement);

            const arrowsContainerDiv = document.createElement('div');
            arrowsContainerDiv.classList.add('arrows-container');

            const leftArrowDiv = document.createElement('div');
            leftArrowDiv.setAttribute('data-pic', array[i].pic);
            leftArrowDiv.classList.add('left');
            leftArrowDiv.innerHTML = '&#10151';

            const deleteDiv = document.createElement('div');
            deleteDiv.setAttribute('data-pic', array[i].pic);
            deleteDiv.classList.add('delete');
            deleteDiv.innerHTML = '&#10006';

            arrowsContainerDiv.appendChild(leftArrowDiv);
            arrowsContainerDiv.appendChild(deleteDiv);

            cardDiv.appendChild(timerContainerDiv);
            cardDiv.appendChild(imgContainerDiv);
            cardDiv.appendChild(arrowsContainerDiv);

            main.appendChild(cardDiv);

        }

        // Input number handler
        // ----------------------------------------------------------
        const timersInput = document.querySelectorAll('.timer');
        timersInput.forEach((timer) => {
            timer.addEventListener('input', () => {
                exercicesArrayModified.map((exercice) => {

                    if (exercice.pic == timer.dataset.pic) {
                        exercice.min = Number(timer.value)
                    }
                })
                storing()
                console.log(exercicesArrayModified)
            });
        });

        // Arrow handler
        // ----------------------------------------------------------
        const leftArrowBtn = document.querySelectorAll('.left');

        leftArrowBtn.forEach((arrow) => {
            arrow.addEventListener('click', () => {

                if (exercicesArrayModified[0].pic != arrow.dataset.pic) {

                    for (let i = 0; i < exercicesArrayModified.length; i++) {
                        if (exercicesArrayModified[i].pic == arrow.dataset.pic) {
                            // console.log(exercicesArrayModified[i].pic, i, arrow.dataset.pic);
                            [exercicesArrayModified[i], exercicesArrayModified[i - 1]] = [exercicesArrayModified[i - 1], exercicesArrayModified[i]];
                            break;
                        }
                    }
                    storing()
                    cardsDisplayer(exercicesArrayModified)
                }
            });
        });

        // Delete btn handler 
        // ----------------------------------------------------------
        const deleteBtn = document.querySelectorAll('.delete');

        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (exercicesArrayModified.length > 1) {
                    for (let i = 0; i < exercicesArrayModified.length; i++) {
                        if (exercicesArrayModified[i].pic == btn.dataset.pic) {
                            exercicesArrayModified.splice(i, 1)
                            break;
                        }
                    }
                    storing();
                    cardsDisplayer(exercicesArrayModified)
                }
            });
        });
    }

    // And call it again if clicked
    // ------------------------------------------------------------------------
    resetBtn.addEventListener('click', () => {
        exercicesArrayModified = [...exercicesArray];
        storing()
        cardsDisplayer(exercicesArrayModified)
    });

    // Switch to another html file
    // -----------------------------------------------------------------------
    routineBtn.addEventListener('click', () => {
        window.location.href = './routine.html';
        console.log('routine')
    });

    restoring()
    cardsDisplayer(exercicesArrayModified)
}

window.addEventListener('load', () => {
    lobbyHabndler();
});


















