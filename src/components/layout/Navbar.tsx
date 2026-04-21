import { useState } from 'react'
import { UserCircle, Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="/" className={styles.logo}>
          Michelin Guide
        </a>

        {/* Navigation desktop */}
        <nav className={styles.nav} aria-label="Navigation principale">
          <a href="/restaurants" className={styles.navLink}>Restaurants</a>
          <a href="/hebergements" className={styles.navLink}>Hébergements</a>
          <a href="/mes-listes" className={styles.navLink}>Mes listes</a>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.profileButton} aria-label="Mon profil">
            <UserCircle size={28} />
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className={styles.menuButton}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Menu mobile">
          <a href="/restaurants" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Restaurants
          </a>
          <a href="/hebergements" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Hébergements
          </a>
          <a href="/mes-listes" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            Mes listes
          </a>
        </nav>
      )}
    </header>
  )
}
