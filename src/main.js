// Mobile menu
const btn = document.getElementById('menu-btn')
const menu = document.getElementById('mobile-menu')
if (btn && menu) {
  btn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden')
    menu.classList.toggle('hidden', !isHidden)
    menu.classList.toggle('flex', isHidden)
    btn.setAttribute('aria-expanded', String(isHidden))
  })
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.add('hidden'); menu.classList.remove('flex')
  }))
}

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in') })
},{ threshold: 0.15})
document.querySelectorAll('.reveal').forEach(el=> io.observe(el))

// Quote form -> WhatsApp
const form = document.getElementById('quote-form')
const statusEl = document.getElementById('form-status')
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const data = new FormData(form)
    const name = data.get('name')?.toString().trim()
    const phone = data.get('phone')?.toString().trim()
    const service = data.get('service')?.toString().trim()
    const from = data.get('from')?.toString().trim()
    const to = data.get('to')?.toString().trim()
    const date = data.get('date')?.toString().trim()
    const message = data.get('message')?.toString().trim()

    if(!name || !phone){
      statusEl.textContent = 'Please fill name and phone.'
      statusEl.className = 'text-sm text-red-600 mt-3'
      return
    }

    const text = `Hello Swift Transport! 👋%0A%0AI would like a FREE QUOTE:%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service||'-')}%0A*From:* ${encodeURIComponent(from||'-')}%0A*To:* ${encodeURIComponent(to||'-')}%0A*Date:* ${encodeURIComponent(date||'-')}%0A*Details:* ${encodeURIComponent(message||'-')}%0A%0ASent via swifttransport.ie`
    const url = `https://wa.me/353833758839?text=${text}`
    statusEl.textContent = 'Opening WhatsApp…'
    statusEl.className = 'text-sm text-emerald-600 mt-3'
    window.open(url, '_blank')
    setTimeout(()=>{ statusEl.textContent='✓ Quote sent via WhatsApp! We will reply shortly.' }, 800)
    form.reset()
  })
}

// Current year
const y = document.getElementById('year')
if (y) y.textContent = new Date().getFullYear()

// Header shadow on scroll
const header = document.getElementById('header')
if (header){
  const toggle = ()=> {
    if (window.scrollY > 10) header.classList.add('shadow-md','bg-white/95','backdrop-blur')
    else header.classList.remove('shadow-md','bg-white/95','backdrop-blur')
  }
  window.addEventListener('scroll', toggle, {passive:true})
  toggle()
}
