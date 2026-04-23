import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import AccommodationSearch from './AccommodationSearch'
import { addAccommodationToList, findOrCreateList, getListAccommodations, getLists } from '../../../services/list.service'
import type { Accommodation } from '../../../types/accommodation.types'
import styles from './AddAccommodationModal.module.css'
import accommodationMichelinStarIconUrl from '../../../assets/img/accommodation-michelin-star-icon.svg'

const ACCOMMODATIONS_LIKED_LIST_NAME = 'Hébergements likées'

function normalizeAccommodationId(value: string | number): number {
  const rawValue = String(value)
  const unprefixed = rawValue.includes('-') ? rawValue.split('-').pop() || rawValue : rawValue
  const parsed = Number(unprefixed)
  return Number.isFinite(parsed) ? parsed : 0
}

interface AddAccommodationModalProps {
  isOpen: boolean
  onClose: () => void
  token: string
  onFavoriteAdded?: () => void
}

export default function AddAccommodationModal({
  isOpen,
  onClose,
  token,
  onFavoriteAdded,
}: AddAccommodationModalProps) {
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const starsValue = selectedAccommodation?.stars ?? selectedAccommodation?.rating_stars
  const roundedStars = starsValue && Number.isFinite(starsValue)
    ? Math.min(5, Math.max(1, Math.round(starsValue)))
    : 0

  // Load user's favorite accommodation IDs on modal open
  useEffect(() => {
    if (isOpen && token) {
      const loadFavoriteIds = async () => {
        try {
          const lists = await getLists(token)
          const likedList = lists.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)
          if (!likedList) {
            setFavoriteIds([])
            return
          }
          const items = await getListAccommodations(token, likedList.id)
          setFavoriteIds(items.map((item) => normalizeAccommodationId(item.id)))
        } catch (err) {
          console.error('Error loading favorite IDs:', err)
          setFavoriteIds([])
        }
      }
      loadFavoriteIds()
    }
  }, [isOpen, token])

  const handleAddFavorite = async () => {
    if (!selectedAccommodation) return

    try {
      setIsLoading(true)
      setErrorMessage(null)
      const likedList = await findOrCreateList(token, ACCOMMODATIONS_LIKED_LIST_NAME)
      const accommodationId = normalizeAccommodationId(selectedAccommodation.id)
      const source = 'accommodation'
      await addAccommodationToList(token, likedList.id, accommodationId, source)
      setSuccessMessage(`${selectedAccommodation.name} ajouté aux favoris!`)
      setFavoriteIds([...favoriteIds, accommodationId])
      setTimeout(() => {
        setSelectedAccommodation(null)
        setSuccessMessage(null)
        onFavoriteAdded?.()
      }, 1500)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur lors de l\'ajout aux favoris'
      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const isAlreadyFavorited = selectedAccommodation
    ? favoriteIds.includes(normalizeAccommodationId(selectedAccommodation.id))
    : false

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
          <X size={24} />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>Ajouter un hébergement aux favoris</h2>
        </div>

        <div className={styles.searchSection}>
          <AccommodationSearch onSelect={setSelectedAccommodation} />
        </div>

        {selectedAccommodation && (
          <div className={styles.accommodationDetails}>
            <div className={styles.accommodationImage}>
              <img
                src={selectedAccommodation.image_url || selectedAccommodation.photo_url}
                alt={selectedAccommodation.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x150?text=Hébergement'
                }}
              />
            </div>
            <h3 className={styles.accommodationName}>{selectedAccommodation.name}</h3>
            <p className={styles.accommodationLocation}>
              {selectedAccommodation.city}{selectedAccommodation.country ? `, ${selectedAccommodation.country}` : ''}
            </p>
            {selectedAccommodation.category && (
              <p className={styles.accommodationCategory}>{selectedAccommodation.category}</p>
            )}
            {roundedStars > 0 && (
              <div className={styles.starsRow}>
                {Array.from({ length: roundedStars }, (_, i) => (
                  <img
                    key={`selected-accommodation-star-${i}`}
                    src={accommodationMichelinStarIconUrl}
                    alt="Étoile Michelin"
                    className={styles.starImg}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            className={`${styles.addButton} ${isAlreadyFavorited ? styles.addButtonDisabled : ''}`}
            onClick={handleAddFavorite}
            disabled={!selectedAccommodation || isLoading || isAlreadyFavorited}
          >
            {isLoading ? 'Ajout en cours...' : isAlreadyFavorited ? 'Déjà en favoris' : 'Ajouter aux favoris'}
          </button>
        </div>
      </div>
    </div>
  )
}
