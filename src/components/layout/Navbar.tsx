import { UserCircle, Utensils, BedDouble, Bookmark, Home } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <>
      {/* Barre du haut — desktop uniquement */}
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="/" className={styles.logo}>Michelin Guide</a>

          <nav className={styles.nav} aria-label="Navigation principale">
            <a href="/restaurants" className={styles.navLink}>Restaurants</a>
            <a href="/hebergements" className={styles.navLink}>Hébergements</a>
            <a href="/mes-listes" className={styles.navLink}>Mes listes</a>
          </nav>

          <button className={styles.profileButton} aria-label="Mon profil">
            <UserCircle size={26} />
          </button>
        </div>
      </header>

      {/* Barre du bas — mobile uniquement */}
      <nav className={styles.bottomNav} aria-label="Navigation principale">
        <a href="/" className={styles.bottomItem} aria-label="Accueil">
          <Home size={22} />
        </a>
        <a href="/restaurants" className={styles.bottomItem} aria-label="Restaurants">
          <Utensils size={22} />
        </a>
        <a href="/hebergements" className={styles.bottomItem} aria-label="Hébergements">
          <BedDouble size={22} />
        </a>
        <a href="/mes-listes" className={styles.bottomItem} aria-label="Mes listes">
          <Bookmark size={22} />
        </a>
        <a href="/profil" className={styles.bottomItem} aria-label="Mon profil">
          <UserCircle size={22} />
        </a>
      </nav>
    </>
  )
}
