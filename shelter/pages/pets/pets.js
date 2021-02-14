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

const clientWidth = () => {
  const desktopWidth = document.documentElement.clientWidth
  let num
  switch(true) {
    case desktopWidth > 767 && desktopWidth < 1280:
      num = 8
      break
    case desktopWidth > 319 && desktopWidth < 768:
      num = 16
      break
    default:
      num = 6
  }
  return num
}

let pets = []
let fullPetsList = []
const request = new XMLHttpRequest();
request.open('GET', '../../assets/pets.json');
request.onload = () => {
  pets = JSON.parse(request.response)

  fullPetsList = (() => {
    let tempArr = []
    const width = clientWidth()

    for (let i = 0; i < width; i++) {
      const newPets = pets

      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j)
        const randElem = newPets.splice(randInd, 1)[0]
        newPets.push(randElem)
      }
      tempArr = [...tempArr, ...newPets]
    }
    return tempArr
  })()

  fullPetsList = sort863(fullPetsList)

  createPets(fullPetsList)

  // for (let i = 0; i < (fullPetsList.length / 6); i++) {
  //   const stepList = fullPetsList.slice((i * 6), (i * 6) + 6)
  //
  //   for (let j = 0; j < 6; j++) {
  //     stepList.forEach((item, ind) => {
  //       if (item.name === stepList[j].name && ind !== j) {
  //         document.querySelector('#pets').children[(i* 6) + j].style.border = "5px solid red"
  //       }
  //     })
  //   }
  // }

}


//  pagination
const pgnStart = document.querySelector('.pagination__start')
const pgnPrev = document.querySelector('.pagination__prev')
const pgnNext = document.querySelector('.pagination__next')
const pgnEnd = document.querySelector('.pagination__end')
const pgnCurr = document.querySelector('.pagination__current')

let page = 1

pgnNext.addEventListener('click', () => {
  changePage('next')
  createPets(fullPetsList)
})
pgnEnd.addEventListener('click', () => {
  changePage('end')
  createPets(fullPetsList)
})
pgnPrev.addEventListener('click', () => {
  changePage('prev')
  createPets(fullPetsList)
})
pgnStart.addEventListener('click', () => {
  changePage('start')
  createPets(fullPetsList)
})

const changePage = (val) => {
  if (val === 'next') {
    if (page < (fullPetsList.length / pets.length)) ++page
    pgnCurr.textContent = page
    if (page === (fullPetsList.length / pets.length)) {
      pgnNext.setAttribute('disabled', 'true')
      pgnEnd.setAttribute('disabled', 'true')
    }
    if (pgnCurr.textContent > 1) {
      pgnPrev.removeAttribute('disabled')
      pgnStart.removeAttribute('disabled')
    }
  }

  if (val === 'end') {
    page = fullPetsList.length / pets.length
    pgnCurr.textContent = fullPetsList.length / pets.length
    pgnPrev.removeAttribute('disabled')
    pgnStart.removeAttribute('disabled')
    pgnNext.setAttribute('disabled', 'true')
    pgnEnd.setAttribute('disabled', 'true')
  }

  if (val === 'prev') {
    if (page > 1) --page
    pgnCurr.textContent = page
    if (page === 1) {
      pgnPrev.setAttribute('disabled', 'true')
      pgnStart.setAttribute('disabled', 'true')
    }
    if (pgnCurr.textContent < fullPetsList.length / pets.length) {
      pgnNext.removeAttribute('disabled')
      pgnEnd.removeAttribute('disabled')
    }
  }

  if (val === 'start') {
    page = 1
    pgnCurr.textContent = page
    pgnNext.removeAttribute('disabled')
    pgnEnd.removeAttribute('disabled')
    pgnStart.setAttribute('disabled', 'true')
    pgnPrev.setAttribute('disabled', 'true')
  }
}

const createPets = (petsList) => {
  const width = clientWidth()
  const elem = document.querySelector('#pets')
  const elements = createElements(petsList)

  pgnCurr.textContent = page
  elem.innerHTML = ''
  for (let i = (page - 1) * (fullPetsList.length / width); i < page * (fullPetsList.length / width); i++) {
    elem.appendChild(elements[i])
    setTimeout(() => elements[i].style.opacity = '1', 100)
  }
}

const createElements = (petsList) => {
  let arr = []
  for (let i = 0; i < petsList.length; i++) {
    const card = document.createElement('div')
    const imgWrap = document.createElement('div')
    const img = document.createElement('img')
    const name = document.createElement('div')
    const btn = document.createElement('button')
    const nameContent = document.createTextNode(petsList[i].name)
    const btnContent = document.createTextNode('Learn more')
    card.classList.add('pets__card')
    imgWrap.classList.add('pets__img')
    img.setAttribute('src', petsList[i].img)
    img.setAttribute('alt', petsList[i].name)
    name.classList.add('pets__name')
    btn.classList.add('btn', 'btn--transparent', 'btn-pet')
    btn.setAttribute('data-name', petsList[i].name)
    imgWrap.appendChild(img)
    name.appendChild(nameContent)
    btn.appendChild(btnContent)
    card.appendChild(imgWrap)
    card.appendChild(name)
    card.appendChild(btn)
    arr.push(card)

    popupPet(card, btn)
  }

  return arr
}

const sort863 = (list) => {
  return sort6recursively(list)
}

const sort6recursively = (list) => {
  const length = list.length
  const width = clientWidth()

  for (let i = 0; i < (length / width); i++) {
    const stepList = list.slice((i * 6), (i * 6) + 6)

    for (let j = 0; j < 6; j++) {
      const duplicateItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j)
      })

      if (duplicateItem !== undefined) {
        const ind = (i * 6) + j
        const which80fList = Math.trunc(ind / 8)

        list.splice(which80fList * 8, 0, list.splice(ind, 1)[0])

        sort6recursively(list)
      }
    }
  }

  return list
}


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
  document.body.style.overflow = "auto"
  this.classList.remove('header__inner--active')
  menuMobile.classList.remove('menu--mobile_active')
  logoHeader.classList.remove("logo--hidden")
  logoMobileMenu.classList.remove("logo--active")
  btnMobileMenu.classList.remove('mobile-menu--active')
})

menuMobile.addEventListener('click', (e) => e.stopPropagation())


// Popup for pets
const popup = document.querySelector('#popup')
const template = document.querySelector('#pet')

const arrToStr = arr => {
  return arr.reduce((acc, curr) => `${acc}, ${curr}`)
}

let pet = {}
const popupPet = (card, btn) => {
  card.addEventListener('click', function (e) {
    if (popup.innerHTML !== '') return
    pets.forEach(el => {
      if (btn.dataset.name.toLowerCase() === el.name.toLowerCase()) {
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
}

popup.addEventListener('click', closePopup)

function closePopup() {
  popup.classList.remove('popup--active')
  popup.innerHTML = ''
  document.body.style.overflow = 'auto'
}

request.send()


