import React, { useState, useEffect } from 'react'
import { Header } from '@pkg/ui/index.js'
import Setup from './pages/Setup.jsx'
import UI from './pages/UI.jsx'
import Inputs from './pages/Inputs.jsx'
import Charts from './pages/Charts.jsx'
import Colors from './pages/Colors.jsx'
import Typography from './pages/Typography.jsx'

const NAV_ITEMS = [
  { id: 'setup',      label: 'SETUP',      href: '#setup'      },
  { id: 'ui',         label: 'UI',         href: '#ui'         },
  { id: 'inputs',     label: 'INPUTS',     href: '#inputs'     },
  { id: 'charts',     label: 'CHARTS',     href: '#charts'     },
  { id: 'colors',     label: 'COLORS',     href: '#colors'     },
  { id: 'typography', label: 'TYPOGRAPHY', href: '#typography' },
]

const PAGES = { setup: Setup, ui: UI, inputs: Inputs, charts: Charts, colors: Colors, typography: Typography }

function getHash() {
  const hash = window.location.hash.slice(1)
  return PAGES[hash] ? hash : 'setup'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getHash)

  useEffect(() => {
    const handle = () => {
      setCurrentPage(getHash())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', handle)
    return () => window.removeEventListener('hashchange', handle)
  }, [])

  const Page = PAGES[currentPage]

  return (
    <div className="preview-wrapper">
      <Header
        appTitle="Observable Themes"
        appDescription="Modular CSS, React components, and utilities for Observable Framework projects. Includes input controls, chart containers, a color system, and typography."
        navItems={NAV_ITEMS}
        currentPage={currentPage}
      />
      <main>
        <Page />
      </main>
    </div>
  )
}
