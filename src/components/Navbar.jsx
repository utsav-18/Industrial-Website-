import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { company, navItems } from '../config'

export default function Navbar({ onQuote }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return undefined
    document.body.style.overflow = 'hidden'
    drawerRef.current?.focus()
    const escape = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', escape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', escape) }
  }, [open])
  return <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
    <a className="brand" href="#home" onClick={() => setOpen(false)}><img className="brand-logo" src="/images/Logo.jpeg" alt="Hari Engineering logo" /><span>{company.name}<small>HYDRAULIC ENGINEERING</small></span></a>
    <button className={`mobile-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><span /><span /><span /></button>
    {open && <button className="drawer-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    <nav ref={drawerRef} tabIndex={-1} className={open ? 'nav-open' : ''} aria-label="Main navigation">
      <div className="drawer-header"><img src="/images/Logo.jpeg" alt="Hari Engineering logo" /><button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
      {navItems.map(([label, id]) => <a key={`${label}-${id}`} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <button className="button button-small" onClick={() => { setOpen(false); onQuote() }}>Get Quote</button>
    </nav>
  </header>
}
