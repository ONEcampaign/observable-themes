import * as React from "react"
import { NavMenu } from "./NavMenu.js"

/**
 * Page header with app title, description, and responsive navigation.
 * @param {Object} props
 * @param {string} props.appTitle - Application name displayed as an `<h1>`
 * @param {string} [props.appDescription] - Short description shown below the title row; basic HTML (e.g. `<b>`, `<a>`) is supported
 * @param {{ id: string, label: string, href: string }[]} [props.navItems=[]] - Navigation links
 * @param {string} [props.currentPage] - The `id` of the currently active page
 * @param {string} [props.descriptionMaxWidth] - Custom max-width for the description (e.g. `"800px"`); defaults to `600px`
 */
export function Header({ appTitle, appDescription, navItems, currentPage, descriptionMaxWidth }) {
  return (
    <div className="app-header">
      <div className="title-row">
        <h1 className="app-title">{appTitle}</h1>
        <NavMenu navItems={navItems} currentPage={currentPage} />
      </div>
      <div className="description" style={descriptionMaxWidth ? { maxWidth: descriptionMaxWidth } : undefined}>
        <p className="plain-text" dangerouslySetInnerHTML={{ __html: appDescription }} />
      </div>
    </div>
  )
}
