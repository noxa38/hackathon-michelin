import { useEffect, useMemo, useState } from 'react'
import { MapPin, Phone, Search, Star, X } from 'lucide-react'
import { fetchAccommodationById, fetchAccommodations } from '../services/accommodation.service'
import type { Accommodation } from '../types/accommodation.types'
import AccommodationCard from '../components/features/AccommodationCard'
import styles from './AccommodationsPage.module.css'

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [detailSpinKey, setDetailSpinKey] = useState(0)

  useEffect(() => {
    fetchAccommodations()
      .then(setAccommodations)
      .catch(() =>
        setError('Impossible de charger les hébergements. Vérifiez que le serveur est démarré.')
      )
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const allCategories = accommodations
      .map(a => a.category)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
    return ['all', ...new Set(allCategories)]
  }, [accommodations])

  const cities = useMemo(() => {
    const allCities = accommodations
      .map(a => a.city)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
    return ['', ...new Set(allCities)]
  }, [accommodations])

  const filtered = accommodations.filter(a => {
    const normalizedQuery = query.trim().toLowerCase()
    const matchesQuery =
      !normalizedQuery ||
      a.name.toLowerCase().includes(normalizedQuery) ||
      a.address.toLowerCase().includes(normalizedQuery)
    const matchesCity = !city || a.city === city
    const matchesCategory = category === 'all' || a.category === category
    return matchesQuery && matchesCity && matchesCategory
  })

  async function handleViewDetails(id: number) {
    setDetailError(null)
    setDetailLoading(true)
    try {
      const details = await fetchAccommodationById(id)
      setSelectedAccommodation(details)
      setDetailSpinKey(k => k + 1)
    } catch {
      setDetailError("Impossible de charger le détail de l'établissement.")
      setSelectedAccommodation(null)
    } finally {
      setDetailLoading(false)
    }
  }

  function closeModal() {
    setSelectedAccommodation(null)
    setDetailError(null)
  }

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.title}>Hébergements</h1>
        <p className={styles.lead}>
          Des adresses élégantes sélectionnées pour prolonger l'expérience gastronomique.
        </p>
        {!loading && !error && (
          <p className={styles.subtitle}>{accommodations.length} adresses disponibles</p>
        )}
      </section>

      <section className={styles.toolbar}>
        <label className={styles.searchWrap}>
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un hébergement..."
            aria-label="Recherche d'hébergements"
          />
        </label>

        <select
          className={styles.select}
          value={city}
          onChange={e => setCity(e.target.value)}
          aria-label="Filtrer par ville"
        >
          <option value="">Toutes les villes</option>
          {cities
            .filter(Boolean)
            .map(cityName => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
        </select>

        <select
          className={styles.select}
          value={category}
          onChange={e => setCategory(e.target.value)}
          aria-label="Filtrer par catégorie"
        >
          <option value="all">Toutes les catégories</option>
          {categories
            .filter(c => c !== 'all')
            .map(categoryName => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
        </select>
      </section>

      {loading && (
        <div className={styles.state}>
          <div className={styles.spinner} aria-label="Chargement" />
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className={styles.empty}>Aucun hébergement ne correspond à vos filtres.</p>
          ) : (
            <section className={styles.grid}>
              {filtered.map(accommodation => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </section>
          )}
        </>
      )}

      {(detailLoading || detailError || selectedAccommodation) && (
        <div className={styles.modalBackdrop} onClick={closeModal} role="presentation">
          <article
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Détails de l'hébergement"
            onClick={e => e.stopPropagation()}
          >
            <button type="button" className={styles.closeButton} onClick={closeModal} aria-label="Fermer">
              <X size={18} />
            </button>

            {detailLoading && <p className={styles.modalLoading}>Chargement des détails...</p>}

            {detailError && <p className={styles.modalError}>{detailError}</p>}

            {selectedAccommodation && (
              <div key={detailSpinKey} className={styles.detailCard360}>
                <div className={styles.modalContent}>
                  <h2>{selectedAccommodation.name}</h2>
                  <p className={styles.modalCategory}>{selectedAccommodation.category || 'Hébergement'}</p>

                  <p className={styles.modalInfo}>
                    <MapPin size={15} />
                    <span>
                      {selectedAccommodation.address}, {selectedAccommodation.city}
                      {selectedAccommodation.country ? `, ${selectedAccommodation.country}` : ''}
                    </span>
                  </p>

                  {selectedAccommodation.stars ? (
                    <p className={styles.modalInfo}>
                      <Star size={15} />
                      <span>{selectedAccommodation.stars} étoiles</span>
                    </p>
                  ) : null}

                  {selectedAccommodation.phone ? (
                    <p className={styles.modalInfo}>
                      <Phone size={15} />
                      <span>{selectedAccommodation.phone}</span>
                    </p>
                  ) : null}

                  {selectedAccommodation.price_from ? (
                    <p className={styles.modalPrice}>À partir de {selectedAccommodation.price_from} EUR / nuit</p>
                  ) : null}

                  {selectedAccommodation.facilities ? (
                    <p className={styles.modalText}>
                      <strong>Services :</strong> {selectedAccommodation.facilities}
                    </p>
                  ) : null}

                  {selectedAccommodation.description ? (
                    <p className={styles.modalText}>{selectedAccommodation.description}</p>
                  ) : (
                    <p className={styles.modalText}>Description non disponible pour cet établissement.</p>
                  )}
                </div>
              </div>
            )}
          </article>
        </div>
      )}
    </main>
  )
}
