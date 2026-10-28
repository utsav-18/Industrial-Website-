import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import Navbar from './components/Navbar'
import EnquiryForm from './components/EnquiryForm'
import EnquiryModal from './components/EnquiryModal'
import ProductCard from './components/ProductCard'
import AccessoryCard from './components/AccessoryCard'
import WhatsAppButton from './components/WhatsAppButton'
import { accessories, categories, products } from './data/products'
import { expertiseText, services } from './data/services'
import { company } from './config'

const customerLogos = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png']

function SectionHeading({ eyebrow, title, children, light = false }) {
  return <div className={`section-heading ${light ? 'light' : ''}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {children && <p className="section-lede">{children}</p>}
  </div>
}

function Reveal({ children, className = '', delay = 0 }) {
  return <div className={`reveal ${className}`} style={{ '--reveal-delay': `${Math.min(delay, 0.35)}s` }}>{children}</div>
}

export default function App() {
  const [category, setCategory] = useState(categories[0])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const shownProducts = useMemo(() => (!category || category === 'All' || category === 'ALL') ? products : products.filter((product) => product.category === category), [category])
  const openQuote = () => setSelectedProduct({ name: 'General Enquiry' })

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.14 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [category])

  return <div>
    <Navbar onQuote={openQuote} />
    <div className="marquee-bar" aria-label="Our customers">
      <div className="marquee-track">
        <div className="marquee-group">
          {customerLogos.map((logo, index) => <span className="logo-tile" key={`m1-${logo}-${index}`}><img src={`/images/Train/${logo}`} alt="Customer logo" loading="lazy" /></span>)}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {customerLogos.map((logo, index) => <span className="logo-tile" key={`m2-${logo}-${index}`}><img src={`/images/Train/${logo}`} alt="Customer logo" loading="lazy" /></span>)}
        </div>
      </div>
    </div>
    <main>
      <section className="hero hero-split" id="home">
        <div className="hero-visual" role="img" aria-label="Metallic Hari Engineering hydraulic branding">
          <button className="hero-artwork-cta" onClick={openQuote} aria-label="Enquire now">Enquire Now <ArrowRight size={17} /></button>
        </div>
      </section>

      <section className="products-section section-wrap" id="products">
        <Reveal><SectionHeading eyebrow="Our products" title="The right force for the job.">Explore a considered range of hydraulic presses, jacks and power systems. Every product is selected around the demands of real work.</SectionHeading></Reveal>
        <div className="filter-row">{categories.map((item) => <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)}>{item}</button>)}<a className="filter filter-link" href="#refurbishment">REFURBISHMENT PROJECTS <ArrowRight size={13} /></a></div>
        <div className="product-grid">{shownProducts.map((product, index) => <Reveal key={product.id} delay={index * 0.05}><ProductCard product={product} onEnquire={setSelectedProduct} /></Reveal>)}</div>
        {(category === 'HYDRAULIC EQUIPMENTS' || category === 'All' || category === 'ALL') && <div className="accessory-block"><div className="accessory-heading"><div><p className="eyebrow">System essentials</p><h3>Hydraulic accessories</h3></div><p>Supporting components for complete hydraulic systems, maintenance and field service.</p></div><div className="accessory-grid">{accessories.map((item, index) => <Reveal key={item.name} delay={index * 0.05}><AccessoryCard accessory={item} onEnquire={setSelectedProduct} /></Reveal>)}</div></div>}
      </section>

      <section className="about-section section-wrap" id="about">
        <Reveal><SectionHeading eyebrow="About Hari Engineering" title="Engineering a more dependable tomorrow." /></Reveal>
        <div className="about-panel">
          <Reveal className="about-copy"><p className="eyebrow accent">Built for industry</p><h3>Practical engineering.<br />Dependable outcomes.</h3><p>Hari Engineering was established in 2023 with the intention of providing integrated hydraulic engineering solutions to domestic customers.</p><div className="tag-row"><span>Manufacturing</span><span>Maintenance</span><span>Refurbishment</span><span>Installation</span></div></Reveal>
          <Reveal className="about-mark" delay={0.1}><div className="logo-bezel"><img src="/images/Logo.jpeg" alt="Hari Engineering logo" /></div></Reveal>
        </div>
        <div className="metrics-grid">{[['2023', 'Established with a service-first approach'], ['6+', 'Hydraulic service capabilities'], ['100%', 'Focused on dependable engineering']].map(([value, text], index) => <Reveal key={value} delay={index * 0.05}><article className="metric-card"><strong>{value}</strong><p>{text}</p></article></Reveal>)}</div>
      </section>

      <section className="story-section section-wrap">
        <div className="story-grid"><Reveal className="info-card"><SectionHeading eyebrow="Who we are" title="Engineering that understands the work." /><p>From new equipment to legacy machinery, we bring practical engineering thinking to every stage of a hydraulic system's life. Our work spans manufacturing, maintenance, repair, refurbishment, installation and recommissioning.</p><a className="text-button" href="#contact">Talk to our team <ArrowRight size={16} /></a></Reveal><Reveal className="info-card" delay={0.1}><SectionHeading eyebrow="Core capabilities" title="Built around your uptime." /><ul className="capability-list">{services.slice(0, 5).map((service) => <li key={service.title}><CheckCircle2 size={16} />{service.title}</li>)}</ul></Reveal></div>
      </section>

      <section className="services-section section-wrap" id="services">
        <Reveal><SectionHeading eyebrow="Our Services" title="Comprehensive Hydraulic Services & Maintenance">Preventive maintenance, rapid overhaul, and engineered lifecycle support to keep your critical hydraulic equipment running at peak performance.</SectionHeading></Reveal>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon
            return <Reveal key={service.title} delay={index * 0.05}>
              <article className="service-card">
                <div className="service-icon-box"><Icon size={22} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            </Reveal>
          })}
        </div>
        <Reveal delay={0.25}>
          <div className="services-expertise-card">
            <div className="expertise-badge">Specialized Expertise</div>
            <p className="expertise-text">“{expertiseText}”</p>
          </div>
        </Reveal>
      </section>

      <section className="process-section section-wrap" id="process">
        <Reveal><SectionHeading eyebrow="How we execute" title="A considered way of working." /></Reveal>
        <div className="process-grid">{[['01', 'Understand', 'We begin with the application, the constraints and the outcome you need.'], ['02', 'Engineer', 'We select, repair or configure the right hydraulic solution for the work.'], ['03', 'Deliver', 'We install, test and support the equipment through its working life.']].map(([number, title, text], index) => <Reveal key={number} delay={index * 0.05}><article className="process-card"><span>{number}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
      </section>

      <section className="customers-section" id="customers">
        <div className="section-wrap"><Reveal><SectionHeading eyebrow="Our customers" title="Trusted in good company." /></Reveal></div>
        <div className="logo-window">
          <div className="logo-track">
            <div className="logo-group">
              {customerLogos.map((logo, index) => <span className="logo-tile" key={`c1-${logo}-${index}`}><img src={`/images/Train/${logo}`} alt="Customer logo" loading="lazy" /></span>)}
            </div>
            <div className="logo-group" aria-hidden="true">
              {customerLogos.map((logo, index) => <span className="logo-tile" key={`c2-${logo}-${index}`}><img src={`/images/Train/${logo}`} alt="Customer logo" loading="lazy" /></span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section section-wrap" id="contact"><div className="contact-layout"><Reveal><SectionHeading eyebrow="Let's get to work" title={<>Have a challenge<br />in mind?</>}>Tell us what you're building, repairing or improving. We'll bring the right questions.</SectionHeading><div className="contact-details"><a href={`tel:${company.phone.replace(/\s/g, '')}`}><Phone size={18} />{company.phone}</a><a href="mailto:support.hariengineering@gmail.com"><Mail size={18} />support.hariengineering@gmail.com</a><a href="mailto:hariengineering32@gmail.com"><Mail size={18} />hariengineering32@gmail.com</a><span><MapPin size={18} />{company.address}</span></div></Reveal><Reveal className="contact-form-wrap" delay={0.1}><EnquiryForm /></Reveal></div><div className="find-us"><div className="find-us-copy"><SectionHeading eyebrow="Our location" title="Find Us" /><p>{company.address}</p><a className="button button-primary" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(company.address)}`} target="_blank" rel="noreferrer">Get Directions <ArrowUpRight size={16} /></a></div><div className="map-frame"><iframe title="Hari Engineering location map" src={`https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>

      <section className="refurb-section section-wrap" id="refurbishment">
        <Reveal><SectionHeading eyebrow="Before & after" title="Refurbishment Projects in Action">We restore worn, ageing hydraulic presses to dependable, production-ready condition. Structural repair, hydraulic overhaul, new controls, safety upgrades and a full repaint return legacy machines to service with renewed performance and years of added working life.</SectionHeading></Reveal>
        <div className="refurb-grid">
          {[['Before', '/images/before/before.png', 'Fritz Müller hydraulic press before refurbishment, worn and faded', 'Worn finish, ageing hydraulics and outdated controls.'], ['After', '/images/after/after.png', 'Fritz Müller hydraulic press after refurbishment, repainted and upgraded', 'Restored, repainted and recommissioned with upgraded safety.']].map(([label, src, alt, caption], index) => <Reveal key={label} delay={index * 0.1}>
            <figure className={`refurb-card refurb-${label.toLowerCase()}`}>
              <div className="refurb-image"><span className="refurb-badge">{label}</span><img src={src} alt={alt} loading="lazy" /></div>
              <figcaption><strong>{label} refurbishment</strong>{caption}</figcaption>
            </figure>
          </Reveal>)}
        </div>
      </section>
    </main>
    <footer><div className="footer-top"><a className="brand footer-brand" href="#home"><img className="brand-logo" src="/images/Logo.jpeg" alt="Hari Engineering logo" /><span>{company.name}<small>HYDRAULIC ENGINEERING</small></span></a><p>Integrated hydraulic engineering solutions for industry, maintenance and what comes next.</p><a className="button button-ghost light-button" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div><div className="footer-links"><div><strong>Products</strong><a href="#products">Hydraulic presses</a><a href="#products">Hydraulic jacks</a><a href="#products">Power &amp; cylinders</a></div><div><strong>Company</strong><a href="#about">About us</a><a href="#services">Services</a><a href="#customers">Customers</a></div><div><strong>Contact</strong><a href={`tel:${company.phone}`}>{company.phone}</a><a href="mailto:support.hariengineering@gmail.com">support.hariengineering@gmail.com</a><a href="mailto:hariengineering32@gmail.com">hariengineering32@gmail.com</a><span>{company.address}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Hari Engineering. All rights reserved.</span><span>Jamshedpur, Jharkhand, India</span></div></footer>
    {selectedProduct && <EnquiryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    <WhatsAppButton />
  </div>
}
