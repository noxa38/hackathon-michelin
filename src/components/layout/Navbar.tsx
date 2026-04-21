import { UserCircle, Utensils, BedDouble, Bookmark, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <>
      {/* Barre du haut — desktop uniquement */}
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>Michelin Guide</Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            <Link to="/restaurants" className={`${styles.navLink} ${pathname === '/restaurants' ? styles.navLinkActive : ''}`}>Restaurants</Link>
            <Link to="/hebergements" className={`${styles.navLink} ${pathname === '/hebergements' ? styles.navLinkActive : ''}`}>Hébergements</Link>
            <Link to="/mes-listes" className={`${styles.navLink} ${pathname === '/mes-listes' ? styles.navLinkActive : ''}`}>Mes listes</Link>
          </nav>

          <button className={styles.profileButton} aria-label="Mon profil">
            <UserCircle size={26} />
          </button>
        </div>
      </header>

      {/* Barre du bas — mobile uniquement */}
      <nav className={styles.bottomNav} aria-label="Navigation principale">
        <Link to="/" className={`${styles.bottomItem} ${pathname === '/' ? styles.bottomItemActive : ''}`} aria-label="Accueil">
          <Home size={22} />
        </Link>
        <Link to="/restaurants" className={`${styles.bottomItem} ${pathname === '/restaurants' ? styles.bottomItemActive : ''}`} aria-label="Restaurants">
          <Utensils size={22} />
        </Link>
        <Link to="/hebergements" className={`${styles.bottomItem} ${pathname === '/hebergements' ? styles.bottomItemActive : ''}`} aria-label="Hébergements">
          <BedDouble size={22} />
        </Link>
        <Link to="/mes-listes" className={`${styles.bottomItem} ${pathname === '/mes-listes' ? styles.bottomItemActive : ''}`} aria-label="Mes listes">
          <Bookmark size={22} />
        </Link>
        <Link to="/profil" className={`${styles.bottomItem} ${pathname === '/profil' ? styles.bottomItemActive : ''}`} aria-label="Mon profil">
          <UserCircle size={22} />
        </Link>
      </nav>
    </>
  )
}
