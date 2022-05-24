document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.sq');
    const cont = document.querySelector('.cont');
    const circleWin = document.querySelector('.circle-win ');
    const crossWin = document.querySelector('.cross-win');
    let winCrossCount = 0;
    let winCircleCount = 0;
    let drawCount = 0;
    const crossWinCount = document.querySelector('.cross__value');
    const circleWinCount = document.querySelector('.circle__value');
    const draw = document.querySelector('.draw__value');
    let clickCount = 0;

    const clearDesk = () => {
        squares.forEach((e) => {
            e.classList.remove('cross');
            e.classList.remove('circle');
            e.classList.add('sq__enabled');
        })

        crossWin.classList.add('cross-win__hidden');
        circleWin.classList.add('circle-win__hidden');
        document.querySelector('.draw').classList.add('draw__hidden');
        clickCount = 0;
    }

    const checkWinner = () => {
        const checkCross = (item) => {
            return item.classList.contains('cross');
        }

        const checkCircle = (item) => {
            return item.classList.contains('circle');
        }

        if ((checkCross(squares[0]) && checkCross(squares[1]) && checkCross(squares[2])) ||
            (checkCross(squares[3]) && checkCross(squares[4]) && checkCross(squares[5])) ||
            (checkCross(squares[6]) && checkCross(squares[7]) && checkCross(squares[8])) ||
            (checkCross(squares[0]) && checkCross(squares[3]) && checkCross(squares[6])) ||
            (checkCross(squares[1]) && checkCross(squares[4]) && checkCross(squares[7])) ||
            (checkCross(squares[2]) && checkCross(squares[5]) && checkCross(squares[8])) ||
            (checkCross(squares[0]) && checkCross(squares[4]) && checkCross(squares[8])) ||
            (checkCross(squares[2]) && checkCross(squares[4]) && checkCross(squares[6]))
        ) {
            winCrossCount += 1;
            crossWinCount.textContent = winCrossCount;
            crossWin.classList.remove('cross-win__hidden');
            cont.classList.add('cont__disabled');
            squares.forEach((e) => {
                e.classList.remove('sq__enabled');
            })

            setTimeout(() => {
                clearDesk();
                cont.classList.remove('cont__disabled');
            }, 2500)

        }


        if ((checkCircle(squares[0]) && checkCircle(squares[1]) && checkCircle(squares[2])) ||
            (checkCircle(squares[3]) && checkCircle(squares[4]) && checkCircle(squares[5])) ||
            (checkCircle(squares[6]) && checkCircle(squares[7]) && checkCircle(squares[8])) ||
            (checkCircle(squares[0]) && checkCircle(squares[3]) && checkCircle(squares[6])) ||
            (checkCircle(squares[1]) && checkCircle(squares[4]) && checkCircle(squares[7])) ||
            (checkCircle(squares[2]) && checkCircle(squares[5]) && checkCircle(squares[8])) ||
            (checkCircle(squares[0]) && checkCircle(squares[4]) && checkCircle(squares[8])) ||
            (checkCircle(squares[2]) && checkCircle(squares[4]) && checkCircle(squares[6]))
        ) {
            winCircleCount += 1;
            circleWinCount.textContent = winCircleCount;
            circleWin.classList.remove('circle-win__hidden');
            cont.classList.add('cont__disabled');
            squares.forEach((e) => {
                e.classList.remove('sq__enabled');
            })

            setTimeout(() => {
                clearDesk();
                cont.classList.remove('cont__disabled');
            }, 2000)
        }

        if (clickCount === 9 && (circleWin.classList.contains('circle-win__hidden') && crossWin.classList.contains('cross-win__hidden'))) {
            document.querySelector('.draw').classList.remove('draw__hidden');
            clickCount = 0;
            drawCount += 1;
            draw.textContent = drawCount;

            setTimeout(() => {
                clearDesk();
                cont.classList.remove('cont__disabled');
            }, 2000)
        }
    };

    cont.onclick = (e) => {
        console.log(clickCount)
        const { target } = e;

        if (!(target.classList.contains('cross') || target.classList.contains('circle'))) {
            if (!(clickCount % 2 === 0)) {
                target.classList.add('circle');
                clickCount += 1;
            } else {
                target.classList.add('cross');
                clickCount += 1;
            }

            checkWinner();
        }

        if (target.classList.contains('circle') || target.classList.contains('cross')) {
            return;
        }
    }
})