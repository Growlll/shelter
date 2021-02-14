// Slider
let mySwiper = new Swiper('.slider', {
  loop: true,
  slidesPerView: 1,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
      slidesPerGroup: 1
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
      slidesPerGroup: 2
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 0,
      slidesPerGroup: 3
    }
  },
  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
  },
})

// Mobile menu
const btnMobileMenu = document.querySelector('.mobile-menu')
const headerInner = document.querySelector('#header-inner')
const logoHeader = document.querySelector('#logo-header')
const logoMobileMenu = document.querySelector('#logo-mobile-menu')
const menuMobile = document.querySelector('#menu-mobile')
const inactiveLink = document.querySelectorAll('.inactive')
const menuLink = document.querySelectorAll('.menu__link')

menuLink.forEach( el => {
  el.addEventListener('click', () => {
    document.body.style.overflow = 'auto'
    headerInner.classList.remove('header__inner--active')
    menuMobile.classList.remove('menu--mobile_active')
    logoHeader.classList.remove("logo--hidden")
    logoMobileMenu.classList.remove("logo--active")
    btnMobileMenu.classList.remove('mobile-menu--active')
  })
})

inactiveLink.forEach(el => {
  el.addEventListener('click', e => e.preventDefault())
})

btnMobileMenu.addEventListener('click', function (e) {
  if (!this.classList.contains('mobile-menu--active')) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
  headerInner.classList.toggle('header__inner--active')
  menuMobile.classList.toggle('menu--mobile_active')
  logoHeader.classList.toggle("logo--hidden")
  logoMobileMenu.classList.toggle("logo--active")
  this.classList.toggle('mobile-menu--active')
})

headerInner.addEventListener('click', function (e) {
  e.stopPropagation()
  document.body.style.overflow = 'auto'
  this.classList.remove('header__inner--active')
  menuMobile.classList.remove('menu--mobile_active')
  logoHeader.classList.remove("logo--hidden")
  logoMobileMenu.classList.remove("logo--active")
  btnMobileMenu.classList.remove('mobile-menu--active')
})

menuMobile.addEventListener('click', (e) => e.stopPropagation())

// Popup for pets
const btnPet = document.querySelectorAll('.btn-pet')
const popup = document.querySelector('#popup')
const template = document.querySelector('#pet')
let pets = []
const request = new XMLHttpRequest();
request.open('GET', '../../assets/pets.json');
request.onload = () => {
  pets = JSON.parse(request.response)
}

const arrToStr = arr => {
  return arr.reduce((acc, curr) => `${acc}, ${curr}`)
}

const sliderItem = document.querySelectorAll('.slider__item')
let pet = {}
sliderItem.forEach(e => {
  const btn = e.querySelector('.btn-pet')
  e.addEventListener('click', function (e) {
    if(popup.innerHTML !== '') return
    pets.forEach(el => {
      if(btn.dataset.name.toLowerCase() === el.name.toLowerCase()) {
        pet = el
        const petCard = template.content.cloneNode(true)
        petCard.querySelector('#img').setAttribute('src', pet.img)
        petCard.querySelector('#name').textContent = pet.name
        petCard.querySelector('#type').textContent = pet.type
        petCard.querySelector('#breed').textContent = pet.breed
        petCard.querySelector('#description').textContent = pet.description
        petCard.querySelector('#age').textContent = pet.age
        petCard.querySelector('#inoculations').textContent = arrToStr(pet.inoculations)
        petCard.querySelector('#diseases').textContent = arrToStr(pet.diseases)
        petCard.querySelector('#parasites').textContent = arrToStr(pet.parasites)
        petCard.querySelector('#card-close').addEventListener('click', closePopup)
        petCard.querySelector('#card-close').focus()
        petCard.querySelector('#card').addEventListener('click', (e) => {
          e.stopPropagation()
        })
        popup.append(petCard)
      }
    })
    popup.classList.add('popup--active')
    document.body.style.overflow = 'hidden'
  })
})

popup.addEventListener('click', closePopup)

function closePopup() {
  popup.classList.remove('popup--active')
  popup.innerHTML = ''
  document.body.style.overflow = 'auto'
}

request.send()

