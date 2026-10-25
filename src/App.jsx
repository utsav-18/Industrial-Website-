import { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import Navbar from './components/Navbar'
import EnquiryForm from './components/EnquiryForm'
import EnquiryModal from './components/EnquiryModal'
import CertificateModal from './components/CertificateModal'
import ProductCard from './components/ProductCard'
import AccessoryCard from './components/AccessoryCard'
import { accessories, categories, products } from './data/products'
import { services } from './data/services'
import { company } from './config'

const customerLogos = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png']

function SectionHeading({ eyebrow, title, children, light = false }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="section-lede">{children}</p>}</div>
}

export default function App() {
  const [category, setCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [certificateOpen, setCertificateOpen] = useState(false)
  const shownProducts = useMemo(() => category === 'All' ? products : products.filter((product) => product.category === category), [category])
  const openQuote = () => setSelectedProduct({ name: 'General Enquiry' })
  useEffect(() => {
    document.documentElement.classList.add('motion-ready')
    const observed = document.querySelectorAll('main > section, .product-card, .service-item')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: 0.08 })
    observed.forEach((element) => observer.observe(element))
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready') }
  }, [])
  return <div>
    <Navbar onQuote={openQuote} />
    <main>
      <section className="hero" id="home">
        <div className="hero-content"><p className="eyebrow accent">HYDRAULIC ENGINEERING / Jamshedpur, India</p><h1>Force engineered<br /><em>for what’s next.</em></h1><p className="hero-copy">Integrated hydraulic equipment, service and refurbishment solutions for demanding industrial applications.</p><div className="hero-actions"><a className="button button-primary" href="#products">Explore Products <ArrowDownRight size={17} /></a><button className="button button-ghost" onClick={openQuote}>Request a Quote <ArrowRight size={16} /></button></div><div className="hero-note"><span className="status-dot" /> Building dependable hydraulic systems since 2023</div></div>
        <div className="hero-visual"><img src="/images/Hydraulic press machine refurbishment.jpeg" alt="Refurbished hydraulic press machine" /><div className="hero-card"><span>01</span><strong>Precision in<br />every stroke.</strong><ArrowUpRight /></div></div>
        <div className="hero-index">SCROLL TO EXPLORE <span /></div>
      </section>
      <section className="intro section-wrap" id="about"><div className="intro-number">01</div><SectionHeading eyebrow="About Hari Engineering" title="Engineering a more dependable tomorrow.">Hari Engineering was established in 2023 with the intention of providing integrated hydraulic engineering solutions to domestic customers.</SectionHeading><div className="intro-grid"><button className="intro-image certificate-trigger" onClick={() => setCertificateOpen(true)} aria-label="View certificate"><img src="/images/Certificate.png" alt="Hari Engineering certificate" loading="lazy" /></button><div className="intro-copy"><p>From new equipment to legacy machinery, we bring practical engineering thinking to every stage of a hydraulic system’s life. Our work spans manufacturing, maintenance, repair, refurbishment, installation and recommissioning.</p><div className="mini-points"><div><strong>01</strong><span>Built for<br />industry</span></div><div><strong>02</strong><span>Service-led<br />partnership</span></div><div><strong>03</strong><span>Solutions that<br />fit the work</span></div></div><a className="text-button" href="#services">Discover our services <ArrowRight size={16} /></a></div></div></section>
      <section className="products-section section-wrap" id="products"><div className="section-topline"><SectionHeading eyebrow="Our capabilities" title={<>The right force<br />for the job.</>} /> <p className="section-sidecopy">Explore a considered range of hydraulic presses, jacks and power systems. Every product is selected around the demands of real work.</p></div><div className="filter-row">{categories.map((item) => <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)}>{item}</button>)}</div>{category !== 'Accessories' && <div className="product-grid">{shownProducts.map((product) => <ProductCard product={product} key={product.id} onEnquire={setSelectedProduct} />)}</div>}{(category === 'All' || category === 'Accessories') && <div className="accessory-block"><div className="accessory-heading"><p className="eyebrow">System essentials</p><h3>Hydraulic accessories</h3><p>Supporting components for complete hydraulic systems, maintenance and field service.</p></div><div className="accessory-grid">{accessories.map((item) => <AccessoryCard accessory={item} key={item.name} onEnquire={setSelectedProduct} />)}</div></div>}</section>
      <section className="services-section" id="services"><div className="section-wrap"><SectionHeading light eyebrow="Beyond the machine" title={<>Care that keeps<br />industry moving.</>}>Our service capability is built around uptime, safety and thoughtful engineering intervention.</SectionHeading><div className="services-grid">{services.map(({ title, description, icon: Icon }, index) => <div className="service-item" key={title}><span className="service-number">0{index + 1}</span><Icon size={25} strokeWidth={1.5} /><h3>{title}</h3><p>{description}</p><ChevronRight /></div>)}</div></div></section>
      <section className="project-section section-wrap" id="projects"><div className="section-topline"><SectionHeading eyebrow="Featured project" title={<>Respect the legacy.<br />Renew the future.</>} /><p className="section-sidecopy">A before-and-after study in bringing legacy machinery back into productive service, with a cleaner, more capable finish.</p></div><div className="project-images"><figure><img src="/images/Hydraulic press machine refurbishment.jpeg" alt="Hydraulic press refurbishment project" loading="lazy" /><figcaption><span>01 / Refurbishment</span><strong>Restoring capability through considered engineering.</strong></figcaption></figure><div className="project-aside"><div className="aside-icon"><ShieldCheck /></div><p>Complete overhaul and refurbishment for hydraulic press models, with modernization and PLC automation capabilities where appropriate.</p><span className="project-note">Scope and one-year guarantee to be confirmed per project.</span></div></div></section>
      <section className="customers-section" id="customers"><div className="section-wrap"><SectionHeading eyebrow="Our customers" title="Trusted in good company." /></div><div className="logo-window"><div className="logo-track">{[...customerLogos, ...customerLogos].map((logo, index) => <img key={`${logo}-${index}`} src={`/images/Train/${logo}`} alt="Customer logo" loading="lazy" />)}</div></div></section>
      <section className="contact-section section-wrap" id="contact"><div className="contact-layout"><div><SectionHeading eyebrow="Let’s get to work" title={<>Have a challenge<br />in mind?</>}>Tell us what you’re building, repairing or improving. We’ll bring the right questions.</SectionHeading><div className="contact-details"><a href={`tel:${company.phone.replace(/\s/g, '')}`}><Phone size={18} />{company.phone}</a><a href={`mailto:${company.email}`}><Mail size={18} />{company.email}</a><span><MapPin size={18} />{company.address}</span></div></div><div className="contact-form-wrap"><EnquiryForm /></div></div></section>
    </main>
    <footer><div className="footer-top"><a className="brand footer-brand" href="#home"><img className="brand-logo" src="/images/Logo.jpeg" alt="Hari Engineering logo" /><span>{company.name}<small>HYDRAULIC ENGINEERING</small></span></a><p>Integrated hydraulic engineering solutions for industry, maintenance and what comes next.</p><a className="button button-ghost light-button" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Hari Engineering. All rights reserved.</span><span>Jamshedpur, Jharkhand, India</span><a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a></div></footer>
    {selectedProduct && <EnquiryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    {certificateOpen && <CertificateModal onClose={() => setCertificateOpen(false)} />}
  </div>
}
