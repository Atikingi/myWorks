class PetCards {
  constructor() {
    this.sliderBox = document.querySelector('.slider__content-inner');

    this.render(this.sliderBox, PetCards.template);
  }

  render(parent, block) {
    request({
      url: '../data/json/pets.json',
      onSuccess: (data) => {
        for (let i = 0, j = 0; i < data.length; i++, j++) {
          if (!data[i]) {
            return;
          }

          parent.appendChild(templateEngine(block));

          this.title = document.querySelectorAll('.slider__item-title')[j];
          this.title.textContent = data[i].name;

          this.img = document.querySelectorAll('.slider__image')[j];
          this.img.setAttribute('src', data[i].img_url);

          this.item = document.querySelectorAll('.slider__item')[j];
          this.item.id = data[i].id;
        }
      },
    });
  }
}

PetCards.template = [
  {
    tag: 'div',
    cls: 'slider__item',
    content: [
      {
        tag: 'img',
        cls: 'slider__image',
        attrs: {
          width: '270',
          height: '270',
        },
      },
      {
        tag: 'p',
        cls: 'slider__item-title',
      },
      {
        tag: 'button',
        cls: 'slider__item-button',
        text: 'Learn more',
      },
    ],
  },
];

const petCard = new PetCards();

const sliderForwardButton = document.querySelector('.arrow-forward');
const sliderBackButton = document.querySelector('.arrow-back');

let offset = 0;

function sliderMoveForward() {
  const sliderBox = document.querySelector('.slider__content-inner');
  const sliderBoxItem = document.querySelector('.slider__item');
  let elementWidth =
    parseInt(window.getComputedStyle(sliderBox, null).gap) + sliderBoxItem.offsetWidth;

  if (offset < -((sliderBox.children.length - 2) * elementWidth)) {
    return;
  }

  sliderBox.style.left = offset + -elementWidth + 'px';
  offset += -elementWidth;
}

function sliderMoveBack() {
  const sliderBox = document.querySelector('.slider__content-inner');
  const sliderBoxItem = document.querySelector('.slider__item');

  if (offset === 0) {
    return;
  }

  let elementWidth =
    parseInt(window.getComputedStyle(sliderBox, null).gap) + sliderBoxItem.offsetWidth;
  sliderBox.style.left = offset + elementWidth + 'px';
  offset += elementWidth;
}

sliderForwardButton.addEventListener('click', () => {
  sliderMoveForward();
});

sliderBackButton.addEventListener('click', () => {
  sliderMoveBack();
});
