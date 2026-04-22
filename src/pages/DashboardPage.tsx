import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  User,
  Mail,
  Calendar,
  AlertCircle,
  Bookmark,
  ChevronRight,
  Home,
  Heart,
  TrendingUp,
  UtensilsCrossed,
  Star,
} from 'lucide-react'
import * as authService from '../services/auth.service'
import * as listService from '../services/list.service'
import { useAuth } from '../contexts/AuthContext'
import type { User as UserType, List } from '../types/auth.types'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [user, setUser] = useState<UserType | null>(null)
  const [lists, setLists] = useState<List[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'home' | 'lists' | 'profile'>('home')
  const [newListName, setNewListName] = useState('')
  const [showNewListForm, setShowNewListForm] = useState(false)
  const [selectedList, setSelectedList] = useState<List | null>(null)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' })
  const [restaurantsThisYear, setRestaurantsThisYear] = useState(0)
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [likedRestaurants, setLikedRestaurants] = useState(0)
  const [favorites, setFavorites] = useState<any[]>([])
  const [showAddFavorite, setShowAddFavorite] = useState(false)
  const [favoriteName, setFavoriteName] = useState('')
  const [favoriteCuisine, setFavoriteCuisine] = useState('')

  const token = authService.getToken()

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }

    async function loadData() {
      try {
        const userData = await authService.getProfile(token!)
        setUser(userData)
        setProfileData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          username: userData.username || '',
          email: userData.email || '',
          password: ''
        })

        const listsData = await listService.getLists(token!)
        setLists(listsData)
        
        // TODO: Fetch statistics from backend
        // For now, calculate from lists data or use mock data
        setRestaurantsThisYear(Math.floor(Math.random() * 20) + 5)
        setTotalRestaurants(Math.floor(Math.random() * 50) + 15)
        setLikedRestaurants(Math.floor(Math.random() * 30) + 5)
        
        // Load favorites from localStorage or backend
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement')
        logout()
        navigate('/auth')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [token, navigate, logout])

  async function handleCreateList(e: React.FormEvent) {
    e.preventDefault()
    if (!newListName.trim() || !token) return

    try {
      const newList = await listService.createList(token, newListName)
      setLists([newList, ...lists])
      setNewListName('')
      setShowNewListForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    }
  }

  async function handleDeleteList(listId: number) {
    if (!token || !confirm('Êtes-vous sûr ?')) return

    try {
      await listService.deleteList(token, listId)
      setLists(lists.filter(l => l.id !== listId))
      setSelectedList(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  function handleLogout() {
    logout()
    navigate('/auth')
  }

  async function handleSaveProfile() {
    if (!token) return
    try {
      await authService.updateProfile(token, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email
      })
      setUser(prev => prev ? {
        ...prev,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email
      } : null)
      setEditingProfile(false)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
    }
  }

  function handleAddFavorite() {
    if (!favoriteName.trim()) return
    
    const newFavorite = {
      id: Date.now(),
      name: favoriteName,
      cuisine: favoriteCuisine || 'Non spécifiée',
      rating: 0,
      visits: 0
    }
    
    const updatedFavorites = [...favorites, newFavorite].slice(-4) // Keep only last 4
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    
    setFavoriteName('')
    setFavoriteCuisine('')
    setShowAddFavorite(false)
  }

  function handleRemoveFavorite(id: number) {
    const updatedFavorites = favorites.filter(fav => fav.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.loadingContainer}>
          <p>Chargement...</p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Barre latérale */}
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>
                {user?.firstName} {user?.lastName}
              </h3>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
          </div>

          <nav className={styles.nav}>
            <button
              className={`${styles.navButton} ${activeTab === 'home' ? styles.navButtonActive : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={18} />
              Accueil
            </button>
            <button
              className={`${styles.navButton} ${activeTab === 'lists' ? styles.navButtonActive : ''}`}
              onClick={() => setActiveTab('lists')}
            >
              <Bookmark size={18} />
              Mes listes
            </button>
            <button
              className={`${styles.navButton} ${activeTab === 'profile' ? styles.navButtonActive : ''}`}
              onClick={() => setActiveTab('profile')}
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

        {/* Contenu principal */}
        <section className={styles.content}>
          {error && (
            <div className={styles.errorBox}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Onglet Accueil */}
          {activeTab === 'home' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Tableau de bord</h2>
              </div>

              {/* Statistiques */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <UtensilsCrossed size={32} />
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Cette année</p>
                    <p className={styles.statValue}>{restaurantsThisYear}</p>
                    <p className={styles.statUnit}>restaurants</p>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <TrendingUp size={32} />
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Au total</p>
                    <p className={styles.statValue}>{totalRestaurants}</p>
                    <p className={styles.statUnit}>restaurants</p>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <Heart size={32} />
                  </div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Likés</p>
                    <p className={styles.statValue}>{likedRestaurants}</p>
                    <p className={styles.statUnit}>restaurants</p>
                  </div>
                </div>
              </div>

              {/* Restaurants Préférés */}
              <div className={styles.favoritesSection}>
                <div className={styles.favoritesHeader}>
                  <h3 className={styles.sectionSubtitle}>Mes restaurants préférés</h3>
                  <button
                    className={styles.addButton}
                    onClick={() => setShowAddFavorite(!showAddFavorite)}
                    disabled={favorites.length >= 4}
                  >
                    <Plus size={18} />
                    {favorites.length < 4 ? 'Ajouter' : 'Max atteint'}
                  </button>
                </div>

                {showAddFavorite && favorites.length < 4 && (
                  <form onSubmit={(e) => { e.preventDefault(); handleAddFavorite(); }} className={styles.addFavoriteForm}>
                    <input
                      type="text"
                      placeholder="Nom du restaurant..."
                      value={favoriteName}
                      onChange={e => setFavoriteName(e.target.value)}
                      className={styles.formInput}
                      autoFocus
                    />
                    <input
                      type="text"
                      placeholder="Type de cuisine (optionnel)..."
                      value={favoriteCuisine}
                      onChange={e => setFavoriteCuisine(e.target.value)}
                      className={styles.formInput}
                    />
                    <div className={styles.formButtons}>
                      <button type="submit" className={styles.formSubmit}>
                        Ajouter
                      </button>
                      <button
                        type="button"
                        className={styles.formCancel}
                        onClick={() => setShowAddFavorite(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                )}

                {favorites.length === 0 ? (
                  <div className={styles.emptyState}>
                    <Star size={48} />
                    <p>Aucun restaurant préféré</p>
                    <p className={styles.emptySubtext}>Ajoutez vos restaurants préférés</p>
                  </div>
                ) : (
                  <div className={styles.favoritesGrid}>
                    {favorites.map(fav => (
                      <div key={fav.id} className={styles.favoriteCard}>
                        <div className={styles.favoriteHeader}>
                          <div className={styles.favoriteName}>{fav.name}</div>
                          <button
                            className={styles.removeFavoriteButton}
                            onClick={() => handleRemoveFavorite(fav.id)}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className={styles.favoriteCuisine}>{fav.cuisine}</p>
                        <div className={styles.favoriteStats}>
                          <span>Visites: {fav.visits}</span>
                          <span>Note: {fav.rating}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Onglet Listes */}
          {activeTab === 'lists' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Mes listes</h2>
                <button
                  className={styles.addButton}
                  onClick={() => setShowNewListForm(!showNewListForm)}
                >
                  <Plus size={18} />
                  Nouvelle liste
                </button>
              </div>

              {showNewListForm && (
                <form onSubmit={handleCreateList} className={styles.newListForm}>
                  <input
                    type="text"
                    placeholder="Nom de la liste..."
                    value={newListName}
                    onChange={e => setNewListName(e.target.value)}
                    className={styles.formInput}
                    autoFocus
                  />
                  <div className={styles.formButtons}>
                    <button type="submit" className={styles.formSubmit}>
                      Créer
                    </button>
                    <button
                      type="button"
                      className={styles.formCancel}
                      onClick={() => setShowNewListForm(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}

              {lists.length === 0 ? (
                <div className={styles.emptyState}>
                  <Bookmark size={48} />
                  <p>Aucune liste enregistrée !</p>
                </div>
              ) : (
                <div className={styles.listGrid}>
                  {lists.map(list => (
                    <div
                      key={list.id}
                      className={`${styles.listCard} ${
                        selectedList?.id === list.id ? styles.listCardSelected : ''
                      }`}
                      onClick={() => setSelectedList(list)}
                    >
                      <div className={styles.listCardHeader}>
                        <div className={styles.listCardTitle}>
                          <h3>{list.name}</h3>
                          {list.restaurantCount && (
                            <span className={styles.restaurantCount}>
                              {list.restaurantCount}
                            </span>
                          )}
                        </div>
                        <div className={styles.listCardActions}>
                          <button
                            className={styles.actionButton}
                            onClick={e => {
                              e.stopPropagation()
                              // TODO: Implémenter l'édition
                            }}
                            title="Éditer"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className={styles.actionButton}
                            onClick={e => {
                              e.stopPropagation()
                              handleDeleteList(list.id)
                            }}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      {list.description && (
                        <p className={styles.listCardDescription}>{list.description}</p>
                      )}
                      <div className={styles.listCardFooter}>
                        <span className={styles.listCardDate}>
                          {new Date(list.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedList && (
                <div className={styles.selectedListDetails}>
                  <h3>Détails de "{selectedList.name}"</h3>
                  <p>
                    {selectedList.restaurantCount || 0} restaurant
                    {selectedList.restaurantCount !== 1 ? 's' : ''}
                  </p>
                  <p className={styles.detailsDate}>
                    Créée le {new Date(selectedList.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Onglet Profil */}
          {activeTab === 'profile' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Mon profil</h2>
              </div>

              {user && (
                <div className={styles.profileCard}>
                  <div className={styles.profileAvatar}>
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>

                  <div className={styles.profileInfo}>
                    {editingProfile ? (
                      <>
                        <div className={styles.profileField}>
                          <label>Prénom</label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={e => setProfileData({...profileData, firstName: e.target.value})}
                            className={styles.profileInput}
                          />
                        </div>

                        <div className={styles.profileField}>
                          <label>Nom</label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={e => setProfileData({...profileData, lastName: e.target.value})}
                            className={styles.profileInput}
                          />
                        </div>

                        <div className={styles.profileField}>
                          <label>Pseudo</label>
                          <input
                            type="text"
                            value={profileData.username}
                            disabled
                            className={styles.profileInput}
                            title="Le pseudo ne peut pas être modifié"
                          />
                        </div>

                        <div className={styles.profileField}>
                          <label>Email</label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={e => setProfileData({...profileData, email: e.target.value})}
                            className={styles.profileInput}
                          />
                        </div>

                        <div className={styles.profileField}>
                          <label>Mot de passe</label>
                          <input
                            type="password"
                            placeholder="Laissez vide pour ne pas changer"
                            value={profileData.password}
                            onChange={e => setProfileData({...profileData, password: e.target.value})}
                            className={styles.profileInput}
                          />
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
                        <div className={styles.profileField}>
                          <label>Prénom</label>
                          <p>{user.firstName}</p>
                        </div>

                        <div className={styles.profileField}>
                          <label>Nom</label>
                          <p>{user.lastName}</p>
                        </div>

                        <div className={styles.profileField}>
                          <label>Pseudo</label>
                          <p>{user.username}</p>
                        </div>

                        <div className={styles.profileField}>
                          <label className={styles.fieldLabelWithIcon}>
                            <Mail size={16} />
                            Email
                          </label>
                          <p>{user.email}</p>
                        </div>

                        <div className={styles.profileField}>
                          <label className={styles.fieldLabelWithIcon}>
                            <Calendar size={16} />
                            Membre depuis
                          </label>
                          <p>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
                        </div>

                        <button
                          className={styles.editProfileButton}
                          onClick={() => setEditingProfile(true)}
                        >
                          <Edit2 size={18} />
                          Éditer le profil
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
