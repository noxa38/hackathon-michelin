import { useState, useEffect, useRef } from 'react'
import { Search, X, Plus } from 'lucide-react'
import { fetchAllRestaurants } from '../../../services/restaurant.service'
import type { Restaurant } from '../../../types/restaurant.types'
import styles from './RestaurantSearch.module.css'

/* eslint-disable react-hooks/set-state-in-effect */

interface RestaurantSearchProps {
  onSelectRestaurant: (restaurant: Restaurant) => void
  favoritesIds?: number[]
}

export default function RestaurantSearch({ onSelectRestaurant, favoritesIds = [] }: RestaurantSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Load all restaurants on component mount
  useEffect(() => {
    async function loadRestaurants() {
      try {
        setLoadError(null)
        const data = await fetchAllRestaurants()
        if (!Array.isArray(data)) {
          throw new Error('Format de réponse invalide')
        }
        setRestaurants(data)
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Erreur lors du chargement des restaurants'
        console.error('Failed to load restaurants:', error)
        setLoadError(errorMsg)
        setRestaurants([])
      } finally {
        setLoading(false)
      }
    }
    loadRestaurants()
  }, [])

  // Filter restaurants based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRestaurants([])
      setShowResults(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = restaurants.filter(
      restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.city.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query)
    )
    setFilteredRestaurants(filtered)
    setShowResults(true)
  }, [searchQuery, restaurants])

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    onSelectRestaurant(restaurant)
    setSearchQuery('')
    setShowResults(false)
  }

  const isFavorited = (restaurantId: number) => favoritesIds.includes(restaurantId)

  if (loadError) {
    return (
      <div className={styles.searchContainer}>
        <div className={styles.errorMessage}>
          <p>Erreur : {loadError}</p>
          <p style={{ fontSize: '0.85rem', marginTop: '8px', color: '#666' }}>
            Assurez-vous que vous êtes bien connecté et que le serveur est actif.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={searchRef} className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Rechercher un restaurant..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={styles.searchInput}
          disabled={loading || restaurants.length === 0}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('')
              setShowResults(false)
            }}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.loadingMessage}>
          Chargement des restaurants...
        </div>
      )}

      {showResults && filteredRestaurants.length > 0 && (
        <div className={styles.resultsDropdown}>
          {filteredRestaurants.slice(0, 8).map(restaurant => (
            <div
              key={restaurant.id}
              className={`${styles.resultItem} ${isFavorited(restaurant.id) ? styles.favorited : ''}`}
            >
              <div className={styles.resultInfo} onClick={() => handleSelectRestaurant(restaurant)}>
                <div className={styles.resultName}>{restaurant.name}</div>
                <div className={styles.resultMeta}>
                  {restaurant.city} • {restaurant.cuisine}
                </div>
              </div>
              <button
                className={`${styles.addButton} ${isFavorited(restaurant.id) ? styles.added : ''}`}
                onClick={() => handleSelectRestaurant(restaurant)}
                title={isFavorited(restaurant.id) ? 'Déjà en favoris' : 'Ajouter en favoris'}
              >
                <Plus size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showResults && searchQuery && filteredRestaurants.length === 0 && !loading && (
        <div className={styles.noResults}>
          Aucun restaurant trouvé
        </div>
      )}
    </div>
  )
}
