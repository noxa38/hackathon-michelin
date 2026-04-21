import { useState } from 'react'
import { Navigation, Search, Utensils, BedDouble, LayoutGrid } from 'lucide-react'
import styles from './HomePage.module.css'

type PlaceType = 'restaurant' | 'accommodation' | 'all'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<PlaceType>('restaurant')

  function handleLocate() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude)
      // TODO: fill search input with city from reverse geocoding
    })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    // TODO: navigate to results with query + selectedType
    console.log({ query, selectedType })
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Trouvez les meilleures<br />tables et adresses
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
            >
              <Navigation size={13} strokeWidth={2.5} aria-hidden />
              Utiliser ma position
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
