import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import styles from './HomePage.module.css'

type PlaceType = 'restaurant' | 'accommodation'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<PlaceType[]>(['restaurant'])

  function toggleType(type: PlaceType) {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.length > 1 ? prev.filter(t => t !== type) : prev
        : [...prev, type]
    )
  }

  function handleLocate() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude)
      // TODO: fill search input with city from reverse geocoding
    })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    // TODO: navigate to results with query + selectedTypes
    console.log({ query, selectedTypes })
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Trouvez les meilleures<br />tables et adresses
          </h1>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            {/* Barre de recherche + bouton Localiser */}
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
              <button
                type="button"
                className={styles.locateButton}
                onClick={handleLocate}
                aria-label="Localiser"
              >
                <MapPin size={18} aria-hidden />
                <span>Localiser</span>
              </button>
            </div>

            {/* Filtres de type */}
            <div className={styles.typeFilters}>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedTypes.includes('restaurant') ? styles.active : ''}`}
                onClick={() => toggleType('restaurant')}
                aria-pressed={selectedTypes.includes('restaurant')}
              >
                Restaurant
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedTypes.includes('accommodation') ? styles.active : ''}`}
                onClick={() => toggleType('accommodation')}
                aria-pressed={selectedTypes.includes('accommodation')}
              >
                Hébergement
              </button>
            </div>

            <button type="submit" className={styles.searchButton}>
              Rechercher
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
