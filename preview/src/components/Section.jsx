import React from 'react'

export default function Section({ title, description, children }) {
  return (
    <section className="preview-section">
      <h2 className="section-header">{title}</h2>
      {description && <p className="preview-section-desc">{description}</p>}
      {children}
    </section>
  )
}
