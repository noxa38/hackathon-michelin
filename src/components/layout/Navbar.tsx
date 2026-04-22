import { UserCircle, Utensils, BedDouble, Bookmark, Home, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './Navbar.module.css'

interface Props {
  isAuthenticated?: boolean
}

export default function Navbar({ isAuthenticated = false }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/auth')
  }

  return (
    <>
      {/* Barre du haut — desktop uniquement */}
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>Michelin Guide</Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            <Link to="/restaurants" className={`${styles.navLink} ${pathname === '/restaurants' ? styles.navLinkActive : ''}`}>Restaurants</Link>
            <Link to="/hebergements" className={`${styles.navLink} ${pathname === '/hebergements' ? styles.navLinkActive : ''}`}>Hébergements</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className={`${styles.navLink} ${pathname === '/dashboard' ? styles.navLinkActive : ''}`}>Mes listes</Link>
            )}
          </nav>

          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                {pathname !== '/dashboard' && (
                  <Link to="/dashboard" className={styles.profileButton} aria-label="Mon profil">
                    <UserCircle size={26} />
                  </Link>
                )}
                <button className={styles.logoutButton} onClick={handleLogout} aria-label="Déconnexion">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link to="/auth" className={styles.loginButton}>
                Connexion
              </Link>
            )}
          </div>
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
        {isAuthenticated && (
          <Link to="/dashboard" className={`${styles.bottomItem} ${pathname === '/dashboard' ? styles.bottomItemActive : ''}`} aria-label="Dashboard">
            <Bookmark size={22} />
          </Link>
        )}
        <Link to={isAuthenticated ? '/dashboard' : '/auth'} className={`${styles.bottomItem} ${pathname === '/dashboard' || pathname === '/auth' ? styles.bottomItemActive : ''}`} aria-label="Mon profil">
          <UserCircle size={22} />
        </Link>
      </nav>
    </>
  )
}

