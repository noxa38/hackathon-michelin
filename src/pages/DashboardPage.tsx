import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, Edit2, Trash2, User, Mail, Calendar, AlertCircle, Bookmark, Home, Heart, UtensilsCrossed, Building2, Users, UserPlus, Search } from 'lucide-react'
import * as authService from '../services/auth.service'
import * as listService from '../services/list.service'
import * as accommodationService from '../services/accommodation.service'
import * as favoriteService from '../services/favorite.service'
import * as professionalService from '../services/professional.service'
import * as friendService from '../services/friend.service'
import { fetchAllRestaurants } from '../services/restaurant.service'
import { useAuth } from '../contexts/AuthContext'
import ProfessionalRequestForm from '../components/features/ProfessionalRequestForm'
import RestaurantCard from '../components/features/RestaurantCard'
import AccommodationCard from '../components/features/AccommodationCard'
import AddFavoriteModal from '../components/features/AddFavoriteModal'
import AddAccommodationModal from '../components/features/AddAccommodationModal'
import RestaurantDetailModal from '../components/features/RestaurantDetailModal'
import AccommodationDetailModal from '../components/features/AccommodationDetailModal'
import type { User as UserType, List } from '../types/auth.types'
import type { Restaurant } from '../types/restaurant.types'
import type { Accommodation } from '../types/accommodation.types'
import type { ProfessionalRestaurant } from '../types/professional.types'
import type { FriendListItem, FriendPublicProfile, FriendSearchResult } from '../types/friend.types'
import styles from './DashboardPage.module.css'

const RESTAURANTS_LIKED_LIST_NAME = 'Restaurants likés'
const ACCOMMODATIONS_LIKED_LIST_NAME = 'Hébergements likées'

function getInitialDashboardRestaurantLikeCount(restaurant: Restaurant): number {
  const starsBonus = restaurant.stars * 70
  const greenStarBonus = restaurant.green_star === 1 ? 25 : 0
  const bibBonus = restaurant.award.toLowerCase().includes('bib') || restaurant.award.toLowerCase().includes('gourmand') ? 20 : 0
  const popularitySeed = (restaurant.id * 37) % 120
  return 20 + starsBonus + greenStarBonus + bibBonus + popularitySeed
}

function getInitialDashboardAccommodationLikeCount(accommodation: Accommodation): number {
  const stars = accommodation.stars ?? accommodation.rating_stars ?? 0
  const premiumBonus = accommodation.category?.toLowerCase().includes('palace') ? 30 : 0
  const rawId = String(accommodation.id)
  const normalizedId = rawId.includes('-') ? rawId.split('-').pop() ?? rawId : rawId
  const numericId = Number(normalizedId)
  const popularitySeed = Number.isFinite(numericId) ? (numericId * 19) % 90 : 0
  return 12 + Math.floor(stars * 20) + premiumBonus + popularitySeed
}

type DashboardTab = 'home' | 'lists' | 'friends' | 'profile' | 'pro-request' | 'pro-management'

interface ManagedEstablishmentFormData {
  name: string
  address: string
  city: string
  country: string
  cuisine: string
  phone_number: string
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { logout, userType } = useAuth()
  const [user, setUser] = useState<UserType | null>(null)
  const [lists, setLists] = useState<List[]>([])
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<DashboardTab>('home')
  const [newListName, setNewListName] = useState('')
  const [showNewListForm, setShowNewListForm] = useState(false)
  const [selectedList, setSelectedList] = useState<List | null>(null)
  const [selectedListRestaurants, setSelectedListRestaurants] = useState<Restaurant[]>([])
  const [selectedListAccommodations, setSelectedListAccommodations] = useState<Accommodation[]>([])
  const [selectedListLoading, setSelectedListLoading] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' })
  const [restaurantsThisYear, setRestaurantsThisYear] = useState(0)
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [likedRestaurants, setLikedRestaurants] = useState(0)
  const [favorites, setFavorites] = useState<Restaurant[]>([])
  const [isAddFavoriteModalOpen, setIsAddFavoriteModalOpen] = useState(false)
  const [accommodationFavorites, setAccommodationFavorites] = useState<Accommodation[]>([])
  const [likedAccommodations, setLikedAccommodations] = useState(0)
  const [isAddAccommodationModalOpen, setIsAddAccommodationModalOpen] = useState(false)
  const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState<Restaurant | null>(null)
  const [isRestaurantDetailOpen, setIsRestaurantDetailOpen] = useState(false)
  const [selectedAccommodationDetail, setSelectedAccommodationDetail] = useState<Accommodation | null>(null)
  const [isAccommodationDetailOpen, setIsAccommodationDetailOpen] = useState(false)
  const [managedEstablishments, setManagedEstablishments] = useState<ProfessionalRestaurant[]>([])
  const [editingEstablishmentId, setEditingEstablishmentId] = useState<number | null>(null)
  const [editingListId, setEditingListId] = useState<number | null>(null)
  const [editingListName, setEditingListName] = useState('')
  const [friendSearch, setFriendSearch] = useState('')
  const [friendSearchResults, setFriendSearchResults] = useState<FriendSearchResult[]>([])
  const [friendSearchLoading, setFriendSearchLoading] = useState(false)
  const [friends, setFriends] = useState<FriendListItem[]>([])
  const [selectedFriendProfile, setSelectedFriendProfile] = useState<FriendPublicProfile | null>(null)
  const [friendProfileLoading, setFriendProfileLoading] = useState(false)
  const [establishmentFormData, setEstablishmentFormData] = useState<ManagedEstablishmentFormData>({
    name: '',
    address: '',
    city: '',
    country: '',
    cuisine: '',
    phone_number: '',
  })

  const token = authService.getToken()

  async function loadAccommodationFavoritesFromLikedList(currentToken: string, currentLists?: List[]) {
    const listsData = currentLists || await listService.getLists(currentToken)
    const likedList = listsData.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)
    if (!likedList) {
      setAccommodationFavorites([])
      return
    }
    const items = await listService.getListAccommodations(currentToken, likedList.id)
    setAccommodationFavorites(items as Accommodation[])
  }

  async function loadLikedStats(currentToken: string, currentLists?: List[]) {
    const listsData = currentLists || await listService.getLists(currentToken)

    const likedRestaurantsList = listsData.find((list) => list.name === RESTAURANTS_LIKED_LIST_NAME)
    if (likedRestaurantsList) {
      try {
        const likedRestaurantsItems = await listService.getListRestaurants(currentToken, likedRestaurantsList.id)
        setLikedRestaurants(likedRestaurantsItems.length)
      } catch (err) {
        console.error('Failed to load restaurant liked count:', err)
        setLikedRestaurants(0)
      }
    } else {
      setLikedRestaurants(0)
    }

    const likedAccommodationsList = listsData.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)
    if (likedAccommodationsList) {
      try {
        const likedAccommodationsItems = await listService.getListAccommodations(currentToken, likedAccommodationsList.id)
        setLikedAccommodations(likedAccommodationsItems.length)
      } catch (err) {
        console.error('Failed to load accommodation liked count:', err)
        setLikedAccommodations(0)
      }
    } else {
      setLikedAccommodations(0)
    }
  }

  useEffect(() => {
    if (userType === 'admin') {
      navigate('/admin-dashboard')
    }
  }, [userType, navigate])

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
        await loadLikedStats(token!, listsData)
        const friendsData = await friendService.getFriends(token!).catch(() => [])
        setFriends(friendsData)

        const restaurantsData = await accommodationService.fetchAccommodations()
        setRestaurants(restaurantsData)
        const allRestaurants = await fetchAllRestaurants().catch(() => [])
        
        try {
          const favoritesData = await favoriteService.getUserFavorites(token!)
          const favoritesWithPhotos = favoritesData.map((favorite) => {
            const enriched = allRestaurants.find((restaurant) => restaurant.id === favorite.id)
            return enriched ? { ...favorite, photos: enriched.photos } : favorite
          })
          setFavorites(favoritesWithPhotos)
        } catch (err) {
          console.error('Failed to load favorites:', err)
          setFavorites([])
        }

        try {
          await loadAccommodationFavoritesFromLikedList(token!, listsData)
        } catch (err) {
          console.error('Failed to load accommodation favorites:', err)
          setAccommodationFavorites([])
        }

        if (userData.userType === 'professional') {
          await loadManagedEstablishments(token!)
        } else {
          setManagedEstablishments([])
        }

        setRestaurantsThisYear(Math.floor(Math.random() * 20) + 5)
        setTotalRestaurants(Math.floor(Math.random() * 50) + 15)
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
      const updatedLists = lists.filter(l => l.id !== listId)
      setLists(updatedLists)
      setSelectedList(null)
      setSelectedListRestaurants([])
      setSelectedListAccommodations([])
      await loadLikedStats(token, updatedLists)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  async function handleRenameList(listId: number) {
    if (!token || !editingListName.trim()) { setEditingListId(null); return }
    try {
      const updated = await listService.updateList(token, listId, { name: editingListName })
      setLists(lists.map(l => l.id === listId ? { ...l, name: updated.name } : l))
      if (selectedList?.id === listId) setSelectedList(prev => prev ? { ...prev, name: updated.name } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du renommage')
    } finally {
      setEditingListId(null)
    }
  }

  async function handleRemoveRestaurantFromList(listId: number, restaurantId: number) {
    if (!token) return
    try {
      await listService.removeRestaurantFromList(token, listId, restaurantId)
      setSelectedListRestaurants(prev => prev.filter(r => r.id !== restaurantId))
      setLists(prev => prev.map(l => l.id === listId ? { ...l, itemCount: Math.max(0, (l.itemCount || 1) - 1), restaurantCount: Math.max(0, (l.restaurantCount || 1) - 1) } : l))
      await loadLikedStats(token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  async function handleRemoveAccommodationFromList(listId: number, accommodationId: number | string) {
    if (!token) return
    // Strip h- or a- prefix to get the raw numeric DB id
    const numericId = Number(String(accommodationId).replace(/^[ha]-/, ''))
    try {
      await listService.removeAccommodationFromList(token, listId, numericId)
      setSelectedListAccommodations(prev => prev.filter(a => String(a.id) !== String(accommodationId)))
      setLists(prev => prev.map(l => l.id === listId ? { ...l, itemCount: Math.max(0, (l.itemCount ?? 0) - 1), accommodationCount: Math.max(0, (l.accommodationCount ?? 0) - 1) } : l))
      await loadLikedStats(token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  async function handleSelectList(list: List) {
    if (!token) return

    setSelectedList(list)
    setSelectedListLoading(true)

    try {
      const [restaurantsInList, accommodationsInList] = await Promise.all([
        listService.getListRestaurants(token, list.id).catch(() => []),
        listService.getListAccommodations(token, list.id).catch(() => []),
      ])

      setSelectedListRestaurants(restaurantsInList as Restaurant[])
      setSelectedListAccommodations(accommodationsInList as Accommodation[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des détails de la liste')
      setSelectedListRestaurants([])
      setSelectedListAccommodations([])
    } finally {
      setSelectedListLoading(false)
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

  function handleAddFavoriteClick() {
    if (favorites.length >= 4) return
    setIsAddFavoriteModalOpen(true)
  }

  function handleAddAccommodationClick() {
    if (accommodationFavorites.length >= 4) return
    setIsAddAccommodationModalOpen(true)
  }

  async function handleRemoveFavorite(restaurantId: number) {
    if (!token) return
    try {
      await favoriteService.removeFavorite(token, restaurantId)
      setFavorites(prev => prev.filter(fav => fav.id !== restaurantId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  async function handleRemoveAccommodationFavorite(accommodationId: number | string) {
    if (!token) return
    const likedList = lists.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)
    if (!likedList) return

    const numericId = Number(String(accommodationId).replace(/^[ha]-/, ''))
    if (!Number.isFinite(numericId)) return

    try {
      await listService.removeAccommodationFromList(token, likedList.id, numericId)
      setAccommodationFavorites(prev => prev.filter(fav => String(fav.id) !== String(accommodationId)))
      const updatedLists = lists.map((list) => list.id === likedList.id
        ? {
            ...list,
            itemCount: Math.max(0, (list.itemCount ?? 0) - 1),
            accommodationCount: Math.max(0, (list.accommodationCount ?? 0) - 1),
          }
        : list)
      setLists(updatedLists)
      await loadLikedStats(token, updatedLists)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  async function handleFavoriteAdded() {
    if (!token) return
    try {
      const favoritesData = await favoriteService.getUserFavorites(token!)
      const allRestaurants = await fetchAllRestaurants().catch(() => [])
      const favoritesWithPhotos = favoritesData.map((favorite) => {
        const enriched = allRestaurants.find((restaurant) => restaurant.id === favorite.id)
        return enriched ? { ...favorite, photos: enriched.photos } : favorite
      })
      setFavorites(favoritesWithPhotos)
    } catch (err) {
      console.error('Failed to reload favorites:', err)
    }
  }

  async function handleSearchFriends(e: React.FormEvent) {
    e.preventDefault()
    if (!token || !friendSearch.trim()) {
      setFriendSearchResults([])
      return
    }

    setFriendSearchLoading(true)
    try {
      const users = await friendService.searchUsers(token, friendSearch.trim())
      setFriendSearchResults(users)
    } catch {
      setFriendSearchResults([])
    } finally {
      setFriendSearchLoading(false)
    }
  }

  async function handleAddFriend(friendId: number) {
    if (!token) return
    try {
      await friendService.addFriend(token, friendId)
      const refreshedFriends = await friendService.getFriends(token)
      setFriends(refreshedFriends)
      setFriendSearchResults((current) => current.map((entry) => (
        entry.id === friendId ? { ...entry, isFriend: true } : entry
      )))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de l\'ami')
    }
  }

  async function handleOpenFriendProfile(friendId: number) {
    if (!token) return
    setFriendProfileLoading(true)
    try {
      const profile = await friendService.getFriendPublicProfile(token, friendId)
      setSelectedFriendProfile(profile)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du profil ami')
      setSelectedFriendProfile(null)
    } finally {
      setFriendProfileLoading(false)
    }
  }

  function isRestaurantLikedByCurrentUser(restaurantId: number) {
    return favorites.some((favorite) => favorite.id === restaurantId)
  }

  function isAccommodationLikedByCurrentUser(accommodationId: string | number) {
    return accommodationFavorites.some((favorite) => String(favorite.id) === String(accommodationId))
  }

  async function handleFriendRestaurantLikeChange(restaurantId: number, nextLiked: boolean) {
    if (!token) return

    try {
      if (nextLiked) {
        await favoriteService.addFavorite(token, restaurantId)
      } else {
        await favoriteService.removeFavorite(token, restaurantId)
      }
      await handleFavoriteAdded()
      await loadLikedStats(token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour du like')
    }
  }

  async function handleFriendAccommodationLikeToggle(accommodation: Accommodation) {
    if (!token) return

    const isLiked = isAccommodationLikedByCurrentUser(accommodation.id)
    const numericId = Number(String(accommodation.id).replace(/^[ha]-/, ''))
    if (!Number.isFinite(numericId)) return

    try {
      if (isLiked) {
        const likedList = lists.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)
        if (likedList) {
          await listService.removeAccommodationFromList(token, likedList.id, numericId)
        }
      } else {
        const likedList = await listService.findOrCreateList(token, ACCOMMODATIONS_LIKED_LIST_NAME)
        await listService.addAccommodationToList(token, likedList.id, numericId, accommodation.source || 'hotels')
      }

      const updatedLists = await listService.getLists(token)
      setLists(updatedLists)
      await loadAccommodationFavoritesFromLikedList(token, updatedLists)
      await loadLikedStats(token, updatedLists)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour du like')
    }
  }

  async function handleAccommodationFavoriteAdded() {
    if (!token) return
    try {
      await loadAccommodationFavoritesFromLikedList(token!)
    } catch (err) {
      console.error('Failed to reload accommodation favorites:', err)
    }
  }

  async function loadManagedEstablishments(currentToken: string) {
    try {
      const managedRestaurants = await professionalService.getProfessionalRestaurants(currentToken)
      setManagedEstablishments(managedRestaurants)
    } catch (err) {
      console.error('Failed to load managed establishments:', err)
      setManagedEstablishments([])
    }
  }

  function getEstablishmentRestaurantId(establishment: ProfessionalRestaurant): number {
    return establishment.restaurant_id || establishment.restaurantId || establishment.id
  }

  function startEditEstablishment(establishment: ProfessionalRestaurant) {
    setEditingEstablishmentId(getEstablishmentRestaurantId(establishment))
    setEstablishmentFormData({
      name: establishment.name || '',
      address: establishment.address || '',
      city: establishment.city || '',
      country: establishment.country || '',
      cuisine: establishment.cuisine || '',
      phone_number: establishment.phone_number || '',
    })
  }

  function cancelEditEstablishment() {
    setEditingEstablishmentId(null)
    setEstablishmentFormData({
      name: '',
      address: '',
      city: '',
      country: '',
      cuisine: '',
      phone_number: '',
    })
  }

  async function handleSaveEstablishment() {
    if (!token || editingEstablishmentId == null) return

    try {
      await professionalService.updateProfessionalRestaurant(token, editingEstablishmentId, {
        name: establishmentFormData.name.trim(),
        address: establishmentFormData.address.trim(),
        city: establishmentFormData.city.trim(),
        country: establishmentFormData.country.trim(),
        cuisine: establishmentFormData.cuisine.trim(),
        phone_number: establishmentFormData.phone_number.trim(),
      })

      await loadManagedEstablishments(token)
      cancelEditEstablishment()
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l\'établissement')
    }
  }

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} aria-label="Chargement" />
        </div>
      </main>
    )
  }

  return (
    <>
      <AddFavoriteModal
        isOpen={isAddFavoriteModalOpen}
        onClose={() => setIsAddFavoriteModalOpen(false)}
        token={token || ''}
        onFavoriteAdded={handleFavoriteAdded}
      />
      <AddAccommodationModal
        isOpen={isAddAccommodationModalOpen}
        onClose={() => setIsAddAccommodationModalOpen(false)}
        token={token || ''}
        onFavoriteAdded={handleAccommodationFavoriteAdded}
      />
      <RestaurantDetailModal
        restaurant={selectedRestaurantDetail}
        isOpen={isRestaurantDetailOpen}
        onClose={() => {
          setIsRestaurantDetailOpen(false)
          setSelectedRestaurantDetail(null)
        }}
      />
      <AccommodationDetailModal
        accommodation={selectedAccommodationDetail}
        isOpen={isAccommodationDetailOpen}
        onClose={() => {
          setIsAccommodationDetailOpen(false)
          setSelectedAccommodationDetail(null)
        }}
      />
      <main className={styles.main}>
        <div className={styles.container}>
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
              </div>
            </div>

            <nav className={styles.nav}>
              <button
                className={`${styles.navButton} ${activeTab === 'home' ? styles.navButtonActive : ''}`}
                onClick={() => setActiveTab('home')}
              >
                <Home size={18} />
                Tableau de bord
              </button>
              <button
                className={`${styles.navButton} ${activeTab === 'lists' ? styles.navButtonActive : ''}`}
                onClick={() => setActiveTab('lists')}
              >
                <Bookmark size={18} />
                Mes listes
              </button>

              {userType === 'professional' && (
                <button
                  className={`${styles.navButton} ${activeTab === 'pro-management' ? styles.navButtonActive : ''}`}
                  onClick={() => setActiveTab('pro-management')}
                >
                  <Building2 size={18} />
                  Mon établissement
                </button>
              )}

              <button
                className={`${styles.navButton} ${activeTab === 'friends' ? styles.navButtonActive : ''}`}
                onClick={() => setActiveTab('friends')}
              >
                <Users size={18} />
                Mes amis
              </button>
              <button
                className={`${styles.navButton} ${activeTab === 'profile' ? styles.navButtonActive : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} />
                Mon profil
              </button>
            </nav>

            {userType === 'individual' && (
              <button
                className={`${styles.sidebarLinkButton} ${activeTab === 'pro-request' ? styles.sidebarLinkButtonActive : ''}`}
                onClick={() => setActiveTab('pro-request')}
              >
                <Building2 size={16} />
                Gérer un établissement
              </button>
            )}

            <button className={styles.logoutButton} onClick={handleLogout}>
              <LogOut size={18} />
              Déconnexion
            </button>
          </aside>

          <section className={styles.content}>
            {error && (
              <div className={styles.errorBox}>
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {activeTab === 'home' && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Tableau de bord</h2>
                </div>

                <div className={styles.statsLayout}>
                  <div className={styles.statsMainCard}>
                    <div className={styles.statsMainHeader}>
                      <div className={styles.statIcon}>
                        <UtensilsCrossed size={32} />
                      </div>
                      <div>
                        <p className={styles.statsMainTitle}>Restaurants visités</p>
                      </div>
                    </div>

                    <div className={styles.statsDualValues}>
                      <div className={styles.statsDualItem}>
                        <p className={styles.statsDualLabel}>Cette année</p>
                        <p className={styles.statsDualValue}>{restaurantsThisYear}</p>
                      </div>
                      <div className={styles.statsDualDivider} />
                      <div className={styles.statsDualItem}>
                        <p className={styles.statsDualLabel}>Au total</p>
                        <p className={styles.statsDualValue}>{totalRestaurants}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.statsMainCard}>
                    <div className={styles.statsMainHeader}>
                      <div className={styles.statIcon}>
                        <Heart size={32} />
                      </div>
                      <div>
                        <p className={styles.statsMainTitle}>Likés</p>
                      </div>
                    </div>

                    <div className={styles.statsDualValues}>
                      <div className={styles.statsDualItem}>
                        <p className={styles.statsDualLabel}>Restaurants</p>
                        <p className={styles.statsDualValue}>{likedRestaurants}</p>
                      </div>
                      <div className={styles.statsDualDivider} />
                      <div className={styles.statsDualItem}>
                        <p className={styles.statsDualLabel}>Hébergements</p>
                        <p className={styles.statsDualValue}>{likedAccommodations}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.favoritesSection}>
                  <div className={styles.favoritesHeader}>
                    <div>
                      <h3 className={styles.sectionSubtitle}>Mes restaurants préférés</h3>
                      <p className={styles.favoritesLimitNote}>4 items maximum</p>
                    </div>
                    <button
                      className={styles.addButton}
                      onClick={handleAddFavoriteClick}
                      disabled={favorites.length >= 4}
                      title={favorites.length >= 4 ? 'Limite atteinte (4 max)' : 'Ajouter'}
                    >
                      <Plus size={18} />
                      Ajouter
                    </button>
                  </div>

                  {favorites.length === 0 ? (
                    <div className={styles.emptyState}>
                      <Heart size={48} />
                      <p>Aucun restaurant préféré</p>
                      <p className={styles.emptySubtext}>Ajoutez vos restaurants préférés</p>
                    </div>
                  ) : (
                    <div className={`${styles.favoritesGrid} ${styles.listCardsGrid}`}>
                      {favorites.slice(0, 4).map(fav => (
                        <div key={fav.id} className={styles.listCardWrapper}>
                          <button
                            type="button"
                            className={styles.favoriteCardRemove}
                            title="Retirer des favoris"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveFavorite(fav.id)
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                          <RestaurantCard
                            restaurant={fav}
                            compact={true}
                            showLikeButton={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.favoritesSection}>
                  <div className={styles.favoritesHeader}>
                    <div>
                      <h3 className={styles.sectionSubtitle}>Mes hébergements préférés</h3>
                      <p className={styles.favoritesLimitNote}>4 items maximum</p>
                    </div>
                    <button
                      className={styles.addButton}
                      onClick={handleAddAccommodationClick}
                      disabled={accommodationFavorites.length >= 4}
                      title={accommodationFavorites.length >= 4 ? 'Limite atteinte (4 max)' : 'Ajouter'}
                    >
                      <Plus size={18} />
                      Ajouter
                    </button>
                  </div>

                  {accommodationFavorites.length === 0 ? (
                    <div className={styles.emptyState}>
                      <Heart size={48} />
                      <p>Aucun hébergement préféré</p>
                      <p className={styles.emptySubtext}>Ajoutez vos hébergements préférés</p>
                    </div>
                  ) : (
                    <div className={`${styles.favoritesGrid} ${styles.listCardsGrid}`}>
                      {accommodationFavorites.slice(0, 4).map(fav => (
                        <div key={fav.id} className={styles.listCardWrapper}>
                          <button
                            type="button"
                            className={styles.favoriteCardRemove}
                            title="Retirer des favoris"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveAccommodationFavorite(fav.id)
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                          <AccommodationCard
                            accommodation={fav}
                            compact={true}
                            showLikeButton={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

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
                  <div className={styles.listsLayout}>
                    <aside className={styles.listsPanel}>
                      <div className={styles.listsPanelHeader}>
                        <span>Listes</span>
                        <span className={styles.listsPanelBadge}>{lists.length}</span>
                      </div>
                      {lists.map(list => (
                        <div
                          key={list.id}
                          className={`${styles.listRow} ${selectedList?.id === list.id ? styles.listRowActive : ''}`}
                          onClick={() => { if (editingListId !== list.id) handleSelectList(list) }}
                        >
                          <div className={styles.listRowMain}>
                            {editingListId === list.id ? (
                              <input
                                autoFocus
                                className={styles.listRenameInput}
                                value={editingListName}
                                onChange={e => setEditingListName(e.target.value)}
                                onBlur={() => handleRenameList(list.id)}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') handleRenameList(list.id)
                                  if (e.key === 'Escape') setEditingListId(null)
                                }}
                                onClick={e => e.stopPropagation()}
                              />
                            ) : (
                              <span className={styles.listRowName}>{list.name}</span>
                            )}
                            {list.itemCount ? (
                              <span className={styles.listRowBadge}>{list.itemCount}</span>
                            ) : null}
                          </div>
                          <div className={styles.listRowActions}>
                            <button
                              className={styles.listRowAction}
                              onClick={e => {
                                e.stopPropagation()
                                handleDeleteList(list.id)
                              }}
                              title="Supprimer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </aside>

                    <div className={styles.listsDetail}>
                      {selectedList ? (
                        <div className={styles.listsDetailInner}>
                          <div className={styles.selectedListDetails}>
                            <h3>Détails de "{selectedList.name}"</h3>
                            <p>
                              {(selectedListRestaurants.length + selectedListAccommodations.length) || 0} élément
                              {(selectedListRestaurants.length + selectedListAccommodations.length) !== 1 ? 's' : ''}
                            </p>
                            <p className={styles.detailsDate}>
                              Créée le {new Date(selectedList.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>

                          {selectedListLoading ? (
                            <p className={styles.detailsDate}>Chargement du contenu...</p>
                          ) : (
                            <div className={styles.selectedListGroups}>
                              {selectedList.name !== ACCOMMODATIONS_LIKED_LIST_NAME && (
                                <div className={styles.selectedListGroup}>
                                  <h4 className={styles.selectedListGroupTitle}>Restaurants</h4>
                                  {selectedListRestaurants.length === 0 ? (
                                    <p className={styles.selectedListEmpty}>Aucun restaurant dans cette liste.</p>
                                  ) : (
                                    <div className={styles.listCardsGrid}>
                                      {selectedListRestaurants.map((restaurant) => (
                                        <div key={`dashboard-list-restaurant-${restaurant.id}`} className={styles.listCardWrapper}>
                                          <RestaurantCard
                                            restaurant={restaurant}
                                            compact={true}
                                            likes={getInitialDashboardRestaurantLikeCount(restaurant)}
                                            isLiked={true}
                                            onLikeChange={() => handleRemoveRestaurantFromList(selectedList!.id, restaurant.id)}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {selectedList.name !== RESTAURANTS_LIKED_LIST_NAME && (
                                <div className={styles.selectedListGroup}>
                                  <h4 className={styles.selectedListGroupTitle}>Hébergements</h4>
                                  {selectedListAccommodations.length === 0 ? (
                                    <p className={styles.selectedListEmpty}>Aucun hébergement dans cette liste.</p>
                                  ) : (
                                    <div className={styles.listCardsGrid}>
                                      {selectedListAccommodations.map((accommodation) => (
                                        <div key={`dashboard-list-accommodation-${accommodation.id}`} className={styles.listCardWrapper}>
                                          <AccommodationCard
                                            accommodation={accommodation}
                                            compact={true}
                                            likes={getInitialDashboardAccommodationLikeCount(accommodation)}
                                            isFavorited={true}
                                            onToggleFavorite={() => handleRemoveAccommodationFromList(selectedList!.id, accommodation.id)}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={styles.listsDetailEmpty}>
                          <Bookmark size={32} />
                          <p>Sélectionnez une liste pour voir son contenu</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pro-request' && userType === 'individual' && (
              <div className={styles.tabContent}>
                <ProfessionalRequestForm 
                  restaurants={restaurants}
                  onSuccess={() => {
                    setError('')
                  }}
                />
              </div>
            )}

            {activeTab === 'pro-management' && userType === 'professional' && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Mon établissement</h2>
                </div>

                {managedEstablishments.length === 0 ? (
                  <div className={styles.emptyState}>
                    <Building2 size={48} />
                    <p>Aucun établissement associé</p>
                    <p className={styles.emptySubtext}>Votre établissement apparaîtra ici après validation de votre demande</p>
                  </div>
                ) : (
                  <div className={styles.establishmentsGrid}>
                    {managedEstablishments.map((establishment, index) => (
                      <div key={getEstablishmentRestaurantId(establishment) || index} className={styles.establishmentCard}>
                        <h3 className={styles.establishmentTitle}>
                          {establishment.name || `Établissement #${getEstablishmentRestaurantId(establishment) || index + 1}`}
                        </h3>

                        {editingEstablishmentId === getEstablishmentRestaurantId(establishment) ? (
                          <div className={styles.establishmentFields}>
                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Nom</span>
                              <input
                                type="text"
                                value={establishmentFormData.name}
                                onChange={(e) => setEstablishmentFormData({ ...establishmentFormData, name: e.target.value })}
                                className={styles.establishmentInput}
                              />
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Adresse</span>
                              <input
                                type="text"
                                value={establishmentFormData.address}
                                onChange={(e) => setEstablishmentFormData({ ...establishmentFormData, address: e.target.value })}
                                className={styles.establishmentInput}
                              />
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Ville</span>
                              <input
                                type="text"
                                value={establishmentFormData.city}
                                onChange={(e) => setEstablishmentFormData({ ...establishmentFormData, city: e.target.value })}
                                className={styles.establishmentInput}
                              />
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Pays</span>
                              <input
                                type="text"
                                value={establishmentFormData.country}
                                onChange={(e) => setEstablishmentFormData({ ...establishmentFormData, country: e.target.value })}
                                className={styles.establishmentInput}
                              />
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Cuisine</span>
                              <input
                                type="text"
                                value={establishmentFormData.cuisine}
                                onChange={(e) => setEstablishmentFormData({ ...establishmentFormData, cuisine: e.target.value })}
                                className={styles.establishmentInput}
                              />
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Téléphone</span>
                              <input
                                type="text"
                                value={establishmentFormData.phone_number}
                                onChange={(e) => setEstablishmentFormData({ ...establishmentFormData, phone_number: e.target.value })}
                                className={styles.establishmentInput}
                              />
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Distinction</span>
                              <span className={styles.establishmentValue}>
                                {establishment.award || 'Non renseignée'}
                              </span>
                            </div>

                            <div className={styles.establishmentActions}>
                              <button className={styles.profileSaveButton} onClick={handleSaveEstablishment}>
                                Enregistrer
                              </button>
                              <button className={styles.profileCancelButton} onClick={cancelEditEstablishment}>
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.establishmentFields}>
                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Adresse</span>
                              <span className={styles.establishmentValue}>
                                {establishment.address || 'Non renseignée'}
                              </span>
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Ville</span>
                              <span className={styles.establishmentValue}>
                                {establishment.city || 'Non renseignée'}
                              </span>
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Pays</span>
                              <span className={styles.establishmentValue}>
                                {establishment.country || 'Non renseigné'}
                              </span>
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Cuisine</span>
                              <span className={styles.establishmentValue}>
                                {establishment.cuisine || 'Non renseignée'}
                              </span>
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Téléphone</span>
                              <span className={styles.establishmentValue}>
                                {establishment.phone_number || 'Non renseigné'}
                              </span>
                            </div>

                            <div className={styles.establishmentField}>
                              <span className={styles.establishmentLabel}>Distinction</span>
                              <span className={styles.establishmentValue}>
                                {establishment.award || 'Non renseignée'}
                              </span>
                            </div>

                            <div className={styles.establishmentActions}>
                              <button
                                className={styles.editProfileButton}
                                onClick={() => startEditEstablishment(establishment)}
                              >
                                <Edit2 size={16} />
                                Modifier
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Mon profil</h2>
                </div>

                {user && (
                  <div className={styles.profileCard}>
                    <div className={styles.profileCardHeader}>
                      <div className={styles.profileAvatar}>
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </div>
                      <div>
                        <p className={styles.profileCardTitle}>{user.firstName} {user.lastName}</p>
                        <p className={styles.profileCardSubtitle}>@{user.username}</p>
                      </div>
                    </div>

                    {editingProfile ? (
                      <>
                        <div className={styles.profileFields}>
                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Prénom</span>
                            <input
                              type="text"
                              value={profileData.firstName}
                              onChange={e => setProfileData({...profileData, firstName: e.target.value})}
                              className={styles.establishmentInput}
                            />
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Nom</span>
                            <input
                              type="text"
                              value={profileData.lastName}
                              onChange={e => setProfileData({...profileData, lastName: e.target.value})}
                              className={styles.establishmentInput}
                            />
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Pseudo</span>
                            <input
                              type="text"
                              value={profileData.username}
                              disabled
                              className={styles.establishmentInput}
                              title="Le pseudo ne peut pas être modifié"
                            />
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Email</span>
                            <input
                              type="email"
                              value={profileData.email}
                              onChange={e => setProfileData({...profileData, email: e.target.value})}
                              className={styles.establishmentInput}
                            />
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Mot de passe</span>
                            <input
                              type="password"
                              placeholder="Laissez vide pour ne pas changer"
                              value={profileData.password}
                              onChange={e => setProfileData({...profileData, password: e.target.value})}
                              className={styles.establishmentInput}
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
                            <span className={styles.profileValue}>{user.firstName}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Nom</span>
                            <span className={styles.profileValue}>{user.lastName}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.profileLabel}>Pseudo</span>
                            <span className={styles.profileValue}>{user.username}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.fieldLabelWithIcon}>
                              <Mail size={14} />
                              Email
                            </span>
                            <span className={styles.profileValue}>{user.email}</span>
                          </div>

                          <div className={styles.profileField}>
                            <span className={styles.fieldLabelWithIcon}>
                              <Calendar size={14} />
                              Membre depuis
                            </span>
                            <span className={styles.profileValue}>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>

                        <div className={styles.profileActions}>
                          <button
                            className={styles.editProfileButton}
                            onClick={() => setEditingProfile(true)}
                          >
                            <Edit2 size={16} />
                            Modifier
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'friends' && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Mes amis</h2>
                </div>

                <form className={styles.friendSearchForm} onSubmit={handleSearchFriends}>
                  <div className={styles.friendSearchInputWrap}>
                    <Search size={16} />
                    <input
                      value={friendSearch}
                      onChange={(e) => setFriendSearch(e.target.value)}
                      placeholder="Rechercher un profil (pseudo, prénom, nom)"
                      className={styles.friendSearchInput}
                    />
                  </div>
                  <button className={styles.addButton} type="submit">Rechercher</button>
                </form>

                {friendSearchLoading && <p className={styles.detailsDate}>Recherche en cours...</p>}

                {friendSearchResults.length > 0 && (
                  <div className={styles.friendSearchResults}>
                    {friendSearchResults.map((entry) => (
                      <div key={`friend-search-${entry.id}`} className={styles.friendSearchCard}>
                        <div>
                          <p className={styles.friendSearchName}>{entry.firstName} {entry.lastName}</p>
                          <p className={styles.friendSearchMeta}>@{entry.username}</p>
                        </div>
                        <button
                          type="button"
                          className={styles.friendAddButton}
                          onClick={() => handleAddFriend(entry.id)}
                          disabled={entry.isFriend}
                        >
                          <UserPlus size={14} />
                          {entry.isFriend ? 'Déjà ami' : 'Ajouter'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.friendsLayout}>
                  <aside className={styles.friendsPanel}>
                    <div className={styles.listsPanelHeader}>
                      <span>Amis</span>
                      <span className={styles.listsPanelBadge}>{friends.length}</span>
                    </div>
                    {friends.length === 0 ? (
                      <p className={styles.friendsEmpty}>Aucun ami pour le moment.</p>
                    ) : (
                      friends.map((friend) => (
                        <button
                          key={`friend-item-${friend.id}`}
                          type="button"
                          className={`${styles.friendRow} ${selectedFriendProfile?.user.id === friend.id ? styles.friendRowActive : ''}`}
                          onClick={() => handleOpenFriendProfile(friend.id)}
                        >
                          <span>{friend.firstName} {friend.lastName}</span>
                          <span className={styles.friendRowUsername}>@{friend.username}</span>
                        </button>
                      ))
                    )}
                  </aside>

                  <div className={styles.friendsDetail}>
                    {friendProfileLoading && <p className={styles.detailsDate}>Chargement du profil...</p>}

                    {!friendProfileLoading && !selectedFriendProfile && (
                      <div className={styles.listsDetailEmpty}>
                        <Users size={32} />
                        <p>Sélectionnez un ami pour voir son profil public.</p>
                      </div>
                    )}

                    {!friendProfileLoading && selectedFriendProfile && (
                      <div className={styles.listsDetailInner}>
                        <div className={styles.selectedListDetails}>
                          <h3>{selectedFriendProfile.user.firstName} {selectedFriendProfile.user.lastName}</h3>
                          <p>@{selectedFriendProfile.user.username}</p>
                          <p className={styles.detailsDate}>Membre depuis {new Date(selectedFriendProfile.user.createdAt).toLocaleDateString('fr-FR')}</p>
                        </div>

                        <div className={styles.statsLayout}>
                          <div className={styles.statsMainCard}>
                            <div className={styles.statsMainHeader}>
                              <div className={styles.statIcon}><Heart size={26} /></div>
                              <div>
                                <p className={styles.statsMainTitle}>Statistiques</p>
                              </div>
                            </div>
                            <div className={styles.statsDualValues}>
                              <div className={styles.statsDualItem}>
                                <p className={styles.statsDualLabel}>Restaurants likés</p>
                                <p className={styles.statsDualValue}>{selectedFriendProfile.stats.likedRestaurants}</p>
                              </div>
                              <div className={styles.statsDualDivider} />
                              <div className={styles.statsDualItem}>
                                <p className={styles.statsDualLabel}>Hébergements likés</p>
                                <p className={styles.statsDualValue}>{selectedFriendProfile.stats.likedAccommodations}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.selectedListGroups}>
                          <div className={styles.selectedListGroup}>
                            <h4 className={styles.selectedListGroupTitle}>Restaurants préférés</h4>
                            {selectedFriendProfile.favoriteRestaurants.length === 0 ? (
                              <p className={styles.selectedListEmpty}>Aucun restaurant préféré public.</p>
                            ) : (
                              <div className={styles.listCardsGrid}>
                                {selectedFriendProfile.favoriteRestaurants.map((restaurant) => (
                                  <div key={`friend-resto-${restaurant.id}`} className={styles.listCardWrapper}>
                                    <RestaurantCard
                                      restaurant={restaurant}
                                      compact
                                      likes={getInitialDashboardRestaurantLikeCount(restaurant)}
                                      isLiked={isRestaurantLikedByCurrentUser(restaurant.id)}
                                      onLikeChange={handleFriendRestaurantLikeChange}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className={styles.selectedListGroup}>
                            <h4 className={styles.selectedListGroupTitle}>Hébergements préférés</h4>
                            {selectedFriendProfile.favoriteAccommodations.length === 0 ? (
                              <p className={styles.selectedListEmpty}>Aucun hébergement préféré public.</p>
                            ) : (
                              <div className={styles.listCardsGrid}>
                                {selectedFriendProfile.favoriteAccommodations.map((accommodation) => (
                                  <div key={`friend-acc-${accommodation.id}`} className={styles.listCardWrapper}>
                                    <AccommodationCard
                                      accommodation={accommodation}
                                      compact
                                      likes={getInitialDashboardAccommodationLikeCount(accommodation)}
                                      isFavorited={isAccommodationLikedByCurrentUser(accommodation.id)}
                                      onToggleFavorite={() => handleFriendAccommodationLikeToggle(accommodation)}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
