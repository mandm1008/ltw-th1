const app = {
  // state
  menuShow: false,
  chooseIndexDelayValue: 500,
  chooseIndexDelay: undefined,

  // init
  init() {
    this.event()
    this.chooseIndex()
    this.chooseIndexBanner()
    this.scrollTopShow()
  },

  // event
  event() {
    // menu event
    document.querySelector(".navbar__menu")
      .addEventListener("click", this.menuShow.bind(this))
    document.querySelector("#overlay")
      .addEventListener("click", this.menuHidden.bind(this))
    document.querySelector(".navbar__links")
      .addEventListener("click", this.menuHidden.bind(this))
    window.addEventListener("resize", (() => {
      clearTimeout(this.chooseIndexDelay)
      this.chooseIndexDelay = setTimeout(this.chooseIndex.bind(this), this.chooseIndexDelayValue)
    }).bind(this))
    window.addEventListener("scroll", this.scrollTopShow)
    document.querySelector("#scroll-top").onclick = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  },

  // handler
  menuShow() {
    const navbarElement = document.querySelector(".navbar__links")
    const overlayElement = document.querySelector("#overlay")
    const lastNavbarLink = navbarElement.querySelector(".navbar__link.navbar__link--primary")

    this.menuShow = true
    navbarElement.style.left = 0
    overlayElement.classList.add("show")
    lastNavbarLink.classList.remove("button")
  },

  menuHidden() {
    const navbarElement = document.querySelector(".navbar__links")
    const overlayElement = document.querySelector("#overlay")
    const lastNavbarLink = navbarElement.querySelector(".navbar__link.navbar__link--primary")

    this.menuShow = false
    navbarElement.style.left = "-40%"
    overlayElement.classList.remove("show")
    lastNavbarLink.classList.add("button")
  },

  chooseIndex() {
    const bannerElement = document.querySelector(".banner__image")
    const x = (window.innerWidth - 1200) / 2

    if (x > 0) {
      bannerElement.style.translate = x + "px"
      document.querySelectorAll(".things-dec-l").forEach(item => item.style.left = `${0 - x}px`)
      document.querySelectorAll(".things-dec-r").forEach(item => item.style.right = `${0 - x}px`)
      document.querySelector(".contact>img").style.right = `${0 - x}px`
    }
    this.chooseIndexBanner()

    this.chooseIndexDelay = undefined
  },

  chooseIndexBanner() {
    const bannerElement = document.querySelector(".banner__image")
    bannerElement.style.transform = `translateY(0)`
    const index = bannerElement.getBoundingClientRect()
    const top = index.top

    bannerElement.style.transform = `translateY(-${top}px)`
  },

  scrollTopShow() {
    const scroll = window.scrollY
    const scrollTopElement = document.querySelector("#scroll-top")

    if (scroll > 200) {
      scrollTopElement.classList.add("show")
    } else {
      scrollTopElement.classList.remove("show")
    }
  }
}

app.init()
