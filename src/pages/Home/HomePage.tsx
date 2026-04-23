import { useState } from 'react'
import { Navigation, Search, Utensils, BedDouble, LayoutGrid } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'

type PlaceType = 'restaurant' | 'accommodation' | 'all'

export default function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<PlaceType>('all')
  const [isLocating, setIsLocating] = useState(false)

  async function handleLocate() {
    if (!navigator.geolocation || isLocating) return

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=fr`
          )

          if (!response.ok) {
            throw new Error('Reverse geocoding failed')
          }

          const data = await response.json() as {
            display_name?: string
            address?: {
              city?: string
              town?: string
              village?: string
              municipality?: string
              county?: string
              state?: string
            }
          }

          const localizedQuery =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.municipality ||
            data.address?.county ||
            data.address?.state ||
            data.display_name?.split(',')[0] ||
            ''

          setQuery(localizedQuery)

          if (localizedQuery) {
            const searchParams = new URLSearchParams({
              query: localizedQuery,
              type: selectedType,
            })
            navigate(`/recherche?${searchParams.toString()}`)
          }
        } catch {
          // Keep silent to avoid blocking user; they can still search manually.
        } finally {
          setIsLocating(false)
        }
      },
      () => {
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const searchParams = new URLSearchParams({
      query: query.trim(),
      type: selectedType,
    })
    navigate(`/recherche?${searchParams.toString()}`)
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Découvrez les meilleures adresses, autour de vous et aux quatre coins du monde.
          </h1>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            {/* Filtres de type — au-dessus de la barre */}
            <div className={styles.typeFilters}>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'restaurant' ? styles.active : ''}`}
                onClick={() => setSelectedType('restaurant')}
                aria-pressed={selectedType === 'restaurant'}
              >
                <Utensils size={14} aria-hidden />
                Restaurant
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'accommodation' ? styles.active : ''}`}
                onClick={() => setSelectedType('accommodation')}
                aria-pressed={selectedType === 'accommodation'}
              >
                <BedDouble size={14} aria-hidden />
                Hébergement
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedType('all')}
                aria-pressed={selectedType === 'all'}
              >
                <LayoutGrid size={14} aria-hidden />
                Tout
              </button>
            </div>

            {/* Barre de recherche + bouton Rechercher */}
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>
                <Search size={20} aria-hidden />
              </span>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Restaurant, ville, adresse…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Recherche"
              />
              <div className={styles.searchButtonWrapper}>
                <button type="submit" className={styles.searchButton}>
                  <Search size={16} aria-hidden />
                  <span>Rechercher</span>
                </button>
              </div>
            </div>

            {/* Localiser — lien texte sous la barre */}
            <button
              type="button"
              className={styles.locateLink}
              onClick={handleLocate}
              disabled={isLocating}
            >
              <Navigation size={13} strokeWidth={2.5} aria-hidden />
              {isLocating ? 'Localisation en cours…' : 'Me localiser'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
