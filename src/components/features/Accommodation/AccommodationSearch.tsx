import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { fetchAccommodations } from '../../../services/accommodation.service'
import type { Accommodation } from '../../../types/accommodation.types'
import styles from './AccommodationSearch.module.css'

/* eslint-disable react-hooks/set-state-in-effect */

interface AccommodationSearchProps {
  onSelect: (accommodation: Accommodation) => void
}

export default function AccommodationSearch({ onSelect }: AccommodationSearchProps) {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load all accommodations on mount
  useEffect(() => {
    const loadAccommodations = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchAccommodations()
        setAccommodations(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load accommodations'
        setError(errorMessage)
        console.error('Error loading accommodations:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAccommodations()
  }, [])

  // Filter accommodations based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAccommodations(accommodations.slice(0, 8))
    } else {
      const filtered = accommodations.filter(a =>
        a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.country?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredAccommodations(filtered.slice(0, 8))
    }
  }, [searchTerm, accommodations])

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelectAccommodation = (accommodation: Accommodation) => {
    onSelect(accommodation)
    setSearchTerm('')
    setIsOpen(false)
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.searchInputWrapper}>
        <Search size={20} className={styles.searchIcon} />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Chercher un hébergement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={() => {
              setSearchTerm('')
              searchInputRef.current?.focus()
            }}
            aria-label="Effacer la recherche"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.resultsContainer}>
          {isLoading && <p className={styles.message}>Chargement des hébergements...</p>}
          {error && <p className={styles.errorMessage}>Erreur: {error}</p>}
          {!isLoading && filteredAccommodations.length === 0 && (
            <p className={styles.message}>Aucun hébergement trouvé</p>
          )}
          {!isLoading && filteredAccommodations.length > 0 && (
            <ul className={styles.resultsList}>
              {filteredAccommodations.map((accommodation) => (
                <li key={accommodation.id} className={styles.resultItem}>
                  <button
                    className={styles.resultButton}
                    onClick={() => handleSelectAccommodation(accommodation)}
                  >
                    <div className={styles.resultImage}>
                      {accommodation.image_url && accommodation.image_url !== 'N/A' ? (
                        <img
                          src={accommodation.image_url}
                          alt={accommodation.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60x60?text=Hébergement'
                          }}
                        />
                      ) : (
                        <div className={styles.placeholderImage} />
                      )}
                    </div>
                    <div className={styles.resultContent}>
                      <h3 className={styles.resultName}>{accommodation.name}</h3>
                      <p className={styles.resultLocation}>
                        {accommodation.city}{accommodation.country ? `, ${accommodation.country}` : ''}
                      </p>
                      {accommodation.category && (
                        <p className={styles.resultCategory}>{accommodation.category}</p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
