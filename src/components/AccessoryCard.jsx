import { ArrowUpRight } from 'lucide-react'

export default function AccessoryCard({ accessory, onEnquire }) {
  return <article className="product-card accessory-product-card">
    <div className="product-image accessory-product-image">
      <img src={accessory.image} alt={accessory.name} loading="lazy" />
      <span className="product-category">Accessories</span>
    </div>
    <div className="product-card-body">
      <h3>{accessory.name}</h3>
      <p className="product-description">{accessory.description}</p>
      <button className="text-button product-enquire" onClick={() => onEnquire({ name: accessory.name })}>Enquire Now <ArrowUpRight size={17} /></button>
    </div>
  </article>
}
