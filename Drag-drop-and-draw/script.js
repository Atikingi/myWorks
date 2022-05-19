const draggableElement = document.querySelectorAll('.element');
const absolute = document.querySelectorAll('.absolute');
const dropBox = document.querySelector('.drop-elements');
const dragBox = document.querySelector('.drag-elements');
const container = document.querySelector('.paint-box');



draggableElement.forEach((element) => {
    element.ondragstart = function() {
        return false;
    };
});

draggableElement.forEach((element) => {
    element.addEventListener('mousedown', function(event) {
        const target = event.target;

        document.onmousemove = function(event) {
            target.classList.add('absolute');
            document.body.appendChild(target);

            target.style.left = event.pageX - 50 + 'px';
            target.style.top = event.pageY - 50 + 'px';
        };

        element.addEventListener('mouseup', function(event) {
            let x = event.pageX - 50;
            let y = event.pageY - 50;

            document.onmousemove = null;

            const underTarget = document.elementsFromPoint(x, y);
            if (underTarget[1] === dropBox) {
                target.classList.remove('absolute');
                target.style.background = '#0bac7c';
                dropBox.appendChild(target);
            }

            if (underTarget[1] === dragBox) {
                target.classList.remove('absolute');
                target.style.background = '#e6d056';
                dragBox.appendChild(target);
            }

            element.onmouseup = null;
        });
    });
});

// Draw

const paintBox = document.querySelector('.paint');
const context = paintBox.getContext('2d');
const drawColor = document.querySelectorAll('.color');
const drawWidth = document.querySelectorAll('.width');
const clearButton = document.querySelector('.clear-button');

paintBox.width = container.offsetWidth - 223;
paintBox.height = container.offsetHeight - 23;


let isDrawing;

const changeColor = (color) => {
    context.strokeStyle = color;
}

const changeWidth = (width) => {
    context.lineWidth = width;
}

drawColor.forEach((elem) => {
    elem.onclick = function() {
        changeColor(getComputedStyle(elem).backgroundColor);
    }
})

drawWidth.forEach((elem) => {
    elem.onclick = function() {
        changeWidth(parseInt(getComputedStyle(elem).width));
    }
})

const startPaint = (event) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.pageX - paintBox.offsetLeft, event.pageY - paintBox.offsetTop);

}

const painting = (event) => {
    if (isDrawing == true) {
        let x = event.pageX - paintBox.offsetLeft;
        let y = event.pageY - paintBox.offsetTop;

        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.lineTo(x, y);
        context.stroke();
    }
}

const stopPaint = () => {
    isDrawing = false;
}

paintBox.addEventListener('mousedown', startPaint);
paintBox.addEventListener('mousemove', painting);
paintBox.addEventListener('mouseover', stopPaint);
paintBox.addEventListener('mouseup', stopPaint);
clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, paintBox.width, paintBox.height);
})