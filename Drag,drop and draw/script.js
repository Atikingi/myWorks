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

const paintBox = document.querySelector('.paint');
paintBox.width = container.offsetWidth - 23;
paintBox.height = container.offsetHeight - 23;
const context = paintBox.getContext('2d');
let isDrawing;


const startPaint = (event) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.pageX - paintBox.offsetLeft, event.pageY - paintBox.offsetTop);

}

const painting = (event) => {
    if (isDrawing == true) {
        let x = event.pageX - paintBox.offsetLeft;
        let y = event.pageY - paintBox.offsetTop;

        context.strokeStyle = 'red';
        context.lineWidth = 2;
        console.log(context.lineTo(x, y))
        context.lineTo(x, y);
        context.stroke();
    }
}

const stopPaint = (event) => {
    isDrawing = false;
}

paintBox.addEventListener('mousedown', startPaint);
paintBox.addEventListener('mousemove', painting);
paintBox.addEventListener('mouseover', stopPaint);
paintBox.addEventListener('mouseup', stopPaint);