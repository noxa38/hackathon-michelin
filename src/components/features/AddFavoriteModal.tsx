import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import RestaurantSearch from './RestaurantSearch'
import * as favoriteService from '../../services/favorite.service'
import type { Restaurant } from '../../types/restaurant.types'
import styles from './AddFavoriteModal.module.css'

interface AddFavoriteModalProps {
  isOpen: boolean
  onClose: () => void
  token: string | null
  onFavoriteAdded?: () => void
}

export default function AddFavoriteModal({ isOpen, onClose, token, onFavoriteAdded }: AddFavoriteModalProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [favoritesIds, setFavoritesIds] = useState<number[]>([])

  // Load user's favorite IDs on mount
  useEffect(() => {
    if (isOpen && token) {
      loadFavoriteIds()
    }
  }, [isOpen, token])

  const loadFavoriteIds = async () => {
    try {
      const ids = await favoriteService.getUserFavoriteIds(token!)
      setFavoritesIds(ids)
    } catch (err) {
      console.error('Failed to load favorite IDs:', err)
    }
  }

  const handleAddFavorite = async () => {
    if (!selectedRestaurant || !token) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await favoriteService.addFavorite(token, selectedRestaurant.id)
      setSuccess(`${selectedRestaurant.name} ajouté en favoris !`)
      setFavoritesIds([...favoritesIds, selectedRestaurant.id])
      onFavoriteAdded?.()
      
      setTimeout(() => {
        setSelectedRestaurant(null)
        setSuccess('')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Ajouter un restaurant en favoris</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <RestaurantSearch
            onSelectRestaurant={setSelectedRestaurant}
            favoritesIds={favoritesIds}
          />

          {selectedRestaurant && (
            <div className={styles.selectedRestaurant}>
              <div className={styles.restaurantCard}>
                <div className={styles.restaurantInfo}>
                  <h3>{selectedRestaurant.name}</h3>
                  <p className={styles.cuisine}>{selectedRestaurant.cuisine}</p>
                  <p className={styles.location}>
                    {selectedRestaurant.city} • {selectedRestaurant.address}
                  </p>
                  {selectedRestaurant.stars > 0 && (
                    <p className={styles.stars}>
                      {'⭐'.repeat(selectedRestaurant.stars)}
                    </p>
                  )}
                  {selectedRestaurant.description && (
                    <p className={styles.description}>{selectedRestaurant.description.substring(0, 150)}...</p>
                  )}
                </div>
              </div>

              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}

              <button
                onClick={handleAddFavorite}
                disabled={loading || favoritesIds.includes(selectedRestaurant.id)}
                className={styles.addButton}
              >
                {loading ? 'Ajout en cours...' : favoritesIds.includes(selectedRestaurant.id) ? '✓ Déjà en favoris' : '+ Ajouter en favoris'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
