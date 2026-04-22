import { UserCircle, Utensils, BedDouble, Bookmark, Home, LogOut, LogIn } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './Navbar.module.css'

interface Props {
  isAuthenticated?: boolean
}

export default function Navbar({ isAuthenticated = false }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const desktopLinks = [
    { to: '/restaurants', label: 'Restaurants' },
    { to: '/hebergements', label: 'Hébergements' },
    ...(isAuthenticated ? [{ to: '/dashboard', label: 'Mes listes' }] : []),
  ]

  const mobileLinks = [
    { to: '/', label: 'Accueil', icon: Home },
    { to: '/restaurants', label: 'Restaurants', icon: Utensils },
    { to: '/hebergements', label: 'Hébergements', icon: BedDouble },
    isAuthenticated
      ? { to: '/dashboard', label: 'Mes listes', icon: Bookmark }
      : { to: '/auth', label: 'Connexion', icon: LogIn },
  ]

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
            {desktopLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to !== '/hebergements'}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
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
        {mobileLinks.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.bottomItemActive : ''}`}
              aria-label={link.label}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

