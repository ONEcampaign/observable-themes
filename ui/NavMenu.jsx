import * as React from "react"

/**
 * Responsive navigation menu. Renders a horizontal link list on large screens and
 * an animated burger menu on smaller screens. Closes on outside click or Escape.
 * @param {Object} props
 * @param {{ id: string, label: string, href: string }[]} props.navItems - Navigation links
 * @param {string} props.currentPage - The `id` of the currently active page
 */
export function NavMenu({ navItems, currentPage }) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div className="nav-menu">
      {/* Desktop */}
      <nav className="desktop-nav nav-text" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = item.id === currentPage
          return (
            <a
              key={item.id}
              href={item.href}
              className="nav-link"
              aria-current={isActive ? "page" : undefined}
            >
              {/* Color on <span>, not <a>, to avoid a[href] specificity conflict with Framework */}
              <span className={`nav-link-label${isActive ? " is-active" : " is-inactive"}`}>
                {item.label}
              </span>
              <span
                aria-hidden
                className={`nav-link-bar${isActive ? " is-active" : " is-inactive"}`}
              />
            </a>
          )
        })}
      </nav>

      {/* Mobile burger */}
      <div className="mobile-nav-wrap" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="burger"
        >
          <svg className="burger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round" strokeLinejoin="round" d="M4 6h16"
              style={{
                transformBox: "fill-box", transformOrigin: "center",
                transition: "transform 200ms cubic-bezier(0.4,0,0.2,1)",
                transform: open ? "translateY(6px) rotate(45deg)" : "none"
              }}
            />
            <path
              strokeLinecap="round" strokeLinejoin="round" d="M4 12h16"
              style={{
                transformBox: "fill-box", transformOrigin: "center",
                transition: "opacity 200ms ease, transform 300ms cubic-bezier(0.4,0,0.2,1)",
                opacity: open ? 0 : 1,
                transform: open ? "scaleX(0.4)" : "none"
              }}
            />
            <path
              strokeLinecap="round" strokeLinejoin="round" d="M4 18h16"
              style={{
                transformBox: "fill-box", transformOrigin: "center",
                transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
                transform: open ? "translateY(-6px) rotate(-45deg)" : "none"
              }}
            />
          </svg>
        </button>
        <nav
          className={`mobile-panel nav-text-mobile${open ? " is-open" : " is-closed"}`}
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const isActive = item.id === currentPage
            return (
              <a
                key={item.id}
                href={item.href}
                className="mobile-nav-link"
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {/* Color on <span>, not <a>, to avoid a[href] specificity conflict with Framework */}
                <span className={`mobile-nav-link-label${isActive ? " is-active" : " is-inactive"}`}>
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={`mobile-nav-link-bar${isActive ? " is-active" : " is-inactive"}`}
                />
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
