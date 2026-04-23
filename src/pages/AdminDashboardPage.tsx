import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Users,
  Building2,
  Hotel,
  AlertCircle,
  Home,
  FileText,
  User,
  Edit2,
  LogOut,
  Mail,
  Calendar,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import * as authService from '../services/auth.service'
import * as professionalService from '../services/professional.service'
import AdminEstablishmentsManager from '../components/features/AdminEstablishmentsManager'
import AdminUsersManager from '../components/features/AdminUsersManager'
import ProfessionalRequestsManager from '../components/features/ProfessionalRequestsManager'
import { type User as UserType } from '../types/auth.types'
import { type AdminStatistics } from '../types/professional.types'
import styles from './AdminDashboardPage.module.css'

type AdminTab = 'home' | 'requests' | 'establishments' | 'users' | 'profile'

function getTabFromQuery(value: string | null): AdminTab {
  if (value === 'requests') return 'requests'
  if (value === 'establishments') return 'establishments'
  if (value === 'users') return 'users'
  if (value === 'profile') return 'profile'
  return 'home'
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromQuery = getTabFromQuery(searchParams.get('tab'))
  const { user, logout, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState<AdminTab>(tabFromQuery)
  const [profileUser, setProfileUser] = useState<UserType | null>(user)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({ firstName: '', lastName: '', email: '' })
  const [statistics, setStatistics] = useState<AdminStatistics | null>(null)
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0)
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const token = localStorage.getItem('auth_token')

  useEffect(() => {
    if (tabFromQuery !== activeTab) {
      setActiveTab(tabFromQuery)
    }
  }, [tabFromQuery, activeTab])

  function handleTabChange(tab: AdminTab) {
    setActiveTab(tab)
    if (tab === 'home') {
      setSearchParams({})
      return
    }
    setSearchParams({ tab })
  }

  useEffect(() => {
    if (token) {
      fetchStatistics()
      fetchProfile()
    }
  }, [token, refreshKey])

  useEffect(() => {
    if (user) {
      setProfileUser(user)
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      })
    }
  }, [user])

  const fetchStatistics = async () => {
    try {
      setLoadingStats(true)
      const stats = await professionalService.getAdminStatistics(token!)
      setStatistics(stats)

      const requests = await professionalService.getProfessionalRequests(token!)
      setPendingRequestsCount(requests.filter((request) => request.status === 'pending').length)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics')
    } finally {
      setLoadingStats(false)
    }
  }

  const fetchProfile = async () => {
    try {
      setLoadingProfile(true)
      const adminProfile = await authService.getProfile(token!)
      setProfileUser(adminProfile)
      setProfileData({
        firstName: adminProfile.firstName || '',
        lastName: adminProfile.lastName || '',
        email: adminProfile.email || '',
      })
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setLoadingProfile(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!token) return

    try {
      const updatedUser = await authService.updateProfile(token, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
      })
      setProfileUser(updatedUser)
      updateUser(updatedUser)
      setEditingProfile(false)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  const handleRequestsUpdated = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  if (!token) {
    return (
      <main className={styles.main}>
        <div className={styles.error}>
          <AlertCircle size={32} />
          <p>Vous devez être connecté</p>
        </div>
      </main>
    )
  }

  const displayUser = profileUser || user
  const initials = `${displayUser?.firstName?.[0] || ''}${displayUser?.lastName?.[0] || ''}` || 'A'

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>
                {displayUser?.firstName} {displayUser?.lastName}
              </h3>
              <p className={styles.userRole}>Administrateur</p>
            </div>
          </div>

          <nav className={styles.nav}>
            <button
              className={`${styles.navButton} ${activeTab === 'home' ? styles.navButtonActive : ''}`}
              onClick={() => handleTabChange('home')}
            >
              <Home size={18} />
              Tableau de bord
            </button>

            <button
              className={`${styles.navButton} ${activeTab === 'requests' ? styles.navButtonActive : ''}`}
              onClick={() => handleTabChange('requests')}
            >
              <FileText size={18} />
              Demandes administratives
            </button>

            <button
              className={`${styles.navButton} ${activeTab === 'establishments' ? styles.navButtonActive : ''}`}
              onClick={() => handleTabChange('establishments')}
            >
              <Building2 size={18} />
              Fiches établissements
            </button>

            <button
              className={`${styles.navButton} ${activeTab === 'users' ? styles.navButtonActive : ''}`}
              onClick={() => handleTabChange('users')}
            >
              <Users size={18} />
              Utilisateurs
            </button>

            <button
              className={`${styles.navButton} ${activeTab === 'profile' ? styles.navButtonActive : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <User size={18} />
              Mon profil
            </button>
          </nav>

          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={18} />
            Déconnexion
          </button>
        </aside>

        <section className={styles.content}>
          {error && (
            <div className={styles.alert}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {activeTab === 'home' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Tableau de bord</h2>
              </div>

              {loadingStats ? (
                <div className={styles.loading}>
                  <div className={styles.spinner} aria-label="Chargement" />
                  <p>Chargement des statistiques...</p>
                </div>
              ) : statistics ? (
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Users size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>Utilisateurs</p>
                      <p className={styles.statValue}>{statistics.totalUsers}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Building2 size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>Restaurants</p>
                      <p className={styles.statValue}>{statistics.totalRestaurants}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Hotel size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>Hébergements</p>
                      <p className={styles.statValue}>{Number(statistics.totalAccommodations ?? 0)}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FileText size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>Demandes administratives</p>
                      <p className={styles.statValue}>{pendingRequestsCount}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {activeTab === 'requests' && token && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Demandes administratives</h2>
              </div>

              <ProfessionalRequestsManager
                token={token}
                onRequestsUpdated={handleRequestsUpdated}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Mon profil</h2>
              </div>

              {loadingProfile ? (
                <div className={styles.loading}>
                  <div className={styles.spinner} aria-label="Chargement" />
                  <p>Chargement du profil...</p>
                </div>
              ) : displayUser ? (
                <div className={styles.profileCard}>
                  <div className={styles.profileCardHeader}>
                    <div className={styles.profileAvatar}>
                      {displayUser.firstName?.[0]}
                      {displayUser.lastName?.[0]}
                    </div>
                    <div>
                      <p className={styles.profileCardTitle}>{displayUser.firstName} {displayUser.lastName}</p>
                      <p className={styles.profileCardSubtitle}>@{displayUser.username}</p>
                    </div>
                  </div>

                  <div className={styles.profileInfo}>
                    {editingProfile ? (
                      <>
                        <div className={styles.profileFields}>
                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Prénom</span>
                            <input
                              type="text"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                              className={styles.profileInput}
                            />
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Nom</span>
                            <input
                              type="text"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                              className={styles.profileInput}
                            />
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Pseudo</span>
                            <input
                              type="text"
                              value={displayUser.username}
                              disabled
                              className={styles.profileInput}
                            />
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Email</span>
                            <input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              className={styles.profileInput}
                            />
                          </div>
                        </div>

                        <div className={styles.profileActions}>
                          <button
                            className={styles.profileSaveButton}
                            onClick={handleSaveProfile}
                          >
                            Enregistrer
                          </button>
                          <button
                            className={styles.profileCancelButton}
                            onClick={() => setEditingProfile(false)}
                          >
                            Annuler
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.profileFields}>
                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Prénom</span>
                            <span className={styles.profileValue}>{displayUser.firstName}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Nom</span>
                            <span className={styles.profileValue}>{displayUser.lastName}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Pseudo</span>
                            <span className={styles.profileValue}>{displayUser.username}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.fieldLabelWithIcon}>
                              <Mail size={14} />
                              Email
                            </span>
                            <span className={styles.profileValue}>{displayUser.email}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.fieldLabelWithIcon}>
                              <Calendar size={14} />
                              Membre depuis
                            </span>
                            <span className={styles.profileValue}>{new Date(displayUser.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>

                        <button
                          className={styles.editProfileButton}
                          onClick={() => setEditingProfile(true)}
                        >
                          <Edit2 size={16} />
                          Modifier
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {activeTab === 'establishments' && token && (
            <div className={styles.tabContent}>
              <AdminEstablishmentsManager token={token} />
            </div>
          )}

          {activeTab === 'users' && token && (
            <div className={styles.tabContent}>
              <AdminUsersManager token={token} currentUserId={displayUser?.id} />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
