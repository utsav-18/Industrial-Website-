import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'

function formatCategory(category) {
  // Shorten common long category names for the badge
  const map = {
    'Hydraulic Presses': 'Hydraulic Press',
    'Hydraulic Jacks': 'Hydraulic Jack',
    'Power & Cylinders': 'Power & Cylinders',
    'Hand Pumps': 'Hand Pump',
    'Accessories': 'Accessory',
  }
  return map[category] || category
}

export default function ProductCard({ product, onEnquire }) {
  const [expanded, setExpanded] = useState(false)
  return <article className="product-card">
    <div className="product-image"><img src={product.image} alt={product.name} loading="lazy" /><span className="product-category">{formatCategory(product.category)}</span></div>
    <div className="product-card-body"><p className="product-description">{product.application}</p><h3>{product.name}</h3>
      <div className="feature-list">{product.features.slice(0, 2).map((feature) => <span key={feature}>{feature}</span>)}</div>
      <button className="spec-toggle" onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide specifications' : 'View specifications'} <ChevronDown className={expanded ? 'rotate' : ''} size={16} /></button>
      {expanded && <div className="specs">{product.specs.map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}</div>}
      <button className="text-button" onClick={() => onEnquire(product)}>Enquire Now <ArrowUpRight size={16} /></button>
    </div>
  </article>
}
