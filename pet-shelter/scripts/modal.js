class PetModal {
  constructor(parent) {
    this.parent = parent;

    this.backgroundInactive = document.querySelector('.inactive__background');
    this.buttonOpenModal = document.querySelector('.slider__item-button');
 
    this.petsContainer = document.querySelector('.pets');

    this.getModalContent = this.getModalContent.bind('this');

    this.backgroundInactive.classList.add('active');

    this.render(this.petsContainer, PetModal.template);
    this.getModalContent(parent);

    this.closeModalButton = document.querySelector('.modal-pet__close-button');
    this.closeModalButton.addEventListener('click', () => {

      this.backgroundInactive.classList.remove('active');
      document.querySelector('.modal-pet').remove();
    });
  }

  render(parent, block) {
    parent.appendChild(templateEngine(block));
  }

  getModalContent(parentId) {
    request({
      url: '../data/json/pets.json',
      onSuccess: (data) => {
        const currentPet = data.find((e) => e.id === parentId);

        document.querySelector('.modal-pet__image').src = currentPet.img_url;
        document.querySelector('.modal-pet__image').alt = `photo pet ${currentPet.name}`;

        document.querySelector('.modal-pet__name').textContent = currentPet.name;

        document.querySelector(
          '.modal-pet__family'
        ).textContent = `${currentPet.family} - ${currentPet.breed}`;

        document.querySelector('.modal-pet__description').textContent =
          currentPet.description;

        const attrPetTextContent = [
          currentPet.age,
          currentPet.inoculations,
          currentPet.diseases,
          currentPet.parasites,
        ];
        const modalPetAttrs = document.querySelectorAll('.modal-pet__attr-value');
        for (let i = 0; i < modalPetAttrs.length; i++) {
          modalPetAttrs[i].textContent = attrPetTextContent[i];
        }
      },
    });
  }
}

PetModal.template = {
  tag: 'div',
  cls: ['modal-pet', 'center'],
  content: [
    {
      tag: 'button',
      cls: 'modal-pet__close-button',
    },
    {
      tag: 'div',
      cls: 'modal-pet__wrapper',
      content: [
        {
          tag: 'div',
          cls: 'modal-pet__image-box',
          content: [
            {
              tag: 'img',
              cls: 'modal-pet__image',
              attrs: {
                alt: `photo pet`,
              },
            },
          ],
        },
        {
          tag: 'div',
          cls: 'modal-pet__content',
          content: [
            {
              tag: 'h3',
              cls: 'modal-pet__name',
            },
            {
              tag: 'h4',
              cls: 'modal-pet__family',
            },
            {
              tag: 'h5',
              cls: 'modal-pet__description',
            },
            {
              tag: 'ul',
              cls: 'modal-pet__list',
              content: [
                {
                  tag: 'li',
                  cls: 'modal-pet__list-item',
                  content: [
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-name',
                      text: 'Age: ',
                    },
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-value',
                    },
                  ],
                },
                {
                  tag: 'li',
                  cls: 'modal-pet__list-item',
                  content: [
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-name',
                      text: 'Inoculations: ',
                    },
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-value',
                    },
                  ],
                },
                {
                  tag: 'li',
                  cls: 'modal-pet__list-item',
                  content: [
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-name',
                      text: 'Diseases: ',
                    },
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-value',
                    },
                  ],
                },
                {
                  tag: 'li',
                  cls: 'modal-pet__list-item',
                  content: [
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-name',
                      text: 'Parasites: ',
                    },
                    {
                      tag: 'span',
                      cls: 'modal-pet__attr-value',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const petsContainer = document.querySelector('.pets');

petsContainer.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.classList.contains('slider__item-button')) {
    return;
  }

  new PetModal(target.parentElement.id)
});