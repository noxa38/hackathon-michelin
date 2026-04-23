import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BedDouble, LayoutGrid, Search, Utensils } from 'lucide-react'
import RestaurantCard from '../components/features/RestaurantCard'
import AccommodationCard from '../components/features/AccommodationCard'
import { fetchAllRestaurants } from '../services/restaurant.service'
import { fetchAccommodations } from '../services/accommodation.service'
import type { Restaurant } from '../types/restaurant.types'
import type { Accommodation } from '../types/accommodation.types'
import styles from './SearchResultsPage.module.css'

type ResultType = 'restaurant' | 'accommodation' | 'all'
const BATCH_SIZE = 5

function includesText(value: string | undefined | null, term: string): boolean {
  if (!value) return false
  return value.toLowerCase().includes(term)
}

function normalizeSource(value: string | undefined): 'hotels' | 'accommodations' {
  return value === 'accommodations' ? 'accommodations' : 'hotels'
}

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('query') || '').trim()
  const selectedTypeParam = searchParams.get('type') || 'all'
  const selectedType: ResultType = selectedTypeParam === 'restaurant' || selectedTypeParam === 'accommodation' || selectedTypeParam === 'all'
    ? selectedTypeParam
    : 'all'

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [restaurantOffset, setRestaurantOffset] = useState(0)
  const [accommodationOffset, setAccommodationOffset] = useState(0)

  const normalizedQuery = query.toLowerCase()

  const filteredRestaurants = useMemo(() => {
    if (!normalizedQuery) return restaurants
    return restaurants.filter((restaurant) => (
      includesText(restaurant.name, normalizedQuery)
      || includesText(restaurant.city, normalizedQuery)
      || includesText(restaurant.address, normalizedQuery)
      || includesText(restaurant.location, normalizedQuery)
      || includesText(restaurant.cuisine, normalizedQuery)
    ))
  }, [restaurants, normalizedQuery])

  const filteredAccommodations = useMemo(() => {
    if (!normalizedQuery) return accommodations
    return accommodations.filter((accommodation) => (
      includesText(accommodation.name, normalizedQuery)
      || includesText(accommodation.city, normalizedQuery)
      || includesText(accommodation.address, normalizedQuery)
      || includesText(accommodation.country, normalizedQuery)
      || includesText(accommodation.category, normalizedQuery)
    ))
  }, [accommodations, normalizedQuery])

  const visibleRestaurants = filteredRestaurants.slice(restaurantOffset, restaurantOffset + BATCH_SIZE)
  const visibleAccommodations = filteredAccommodations.slice(accommodationOffset, accommodationOffset + BATCH_SIZE)

  async function runSearch() {
    setError(null)
    setLoading(true)
    setLoaded(false)
    setRestaurantOffset(0)
    setAccommodationOffset(0)

    try {
      const [restaurantData, accommodationData] = await Promise.all([
        fetchAllRestaurants(),
        fetchAccommodations(),
      ])
      setRestaurants(restaurantData)
      setAccommodations(accommodationData.map((acc) => ({
        ...acc,
        source: normalizeSource(acc.source),
      })))
      setLoaded(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    void runSearch()
  }

  useEffect(() => {
    void runSearch()
    // query and selected type come from URL; reload results when these change.
  }, [query, selectedType])

  function updateType(nextType: ResultType) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('type', nextType)
    setSearchParams(nextParams)
    setRestaurantOffset(0)
    setAccommodationOffset(0)
  }

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Résultats de recherche</h1>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.typeFilters}>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'restaurant' ? styles.active : ''}`}
                onClick={() => updateType('restaurant')}
              >
                <Utensils size={14} />
                Restaurants
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'accommodation' ? styles.active : ''}`}
                onClick={() => updateType('accommodation')}
              >
                <BedDouble size={14} />
                Hébergements
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${selectedType === 'all' ? styles.active : ''}`}
                onClick={() => updateType('all')}
              >
                <LayoutGrid size={14} />
                Tout
              </button>
            </div>

            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="search"
                className={styles.searchInput}
                value={query}
                placeholder="Rechercher par restaurant, hébergement, ville ou adresse"
                onChange={(e) => {
                  const nextParams = new URLSearchParams(searchParams)
                  nextParams.set('query', e.target.value)
                  setSearchParams(nextParams)
                }}
              />
              <button type="submit" className={styles.searchButton}>Rechercher</button>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.content}>
        {!loaded && !loading && (
          <div className={styles.state}>Lancez une recherche pour afficher les résultats.</div>
        )}
        {loading && <div className={styles.state}>Recherche en cours...</div>}
        {error && <div className={styles.state}>{error}</div>}

        {loaded && !loading && !error && (
          <>
            {(selectedType === 'restaurant' || selectedType === 'all') && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Restaurants</h2>
                  <p>{filteredRestaurants.length} résultat(s)</p>
                </div>
                {filteredRestaurants.length === 0 ? (
                  <p className={styles.empty}>Aucun restaurant trouvé.</p>
                ) : (
                  <>
                    <div className={styles.grid}>
                      {visibleRestaurants.map((restaurant) => (
                        <RestaurantCard
                          key={`search-resto-${restaurant.id}`}
                          restaurant={restaurant}
                          onLikeChange={() => {}}
                          likes={0}
                        />
                      ))}
                    </div>
                    {(restaurantOffset + BATCH_SIZE) < filteredRestaurants.length && (
                      <button
                        className={styles.moreButton}
                        onClick={() => setRestaurantOffset((prev) => prev + BATCH_SIZE)}
                      >
                        Voir d'autres restaurants
                      </button>
                    )}
                  </>
                )}
              </section>
            )}

            {(selectedType === 'accommodation' || selectedType === 'all') && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Hébergements</h2>
                  <p>{filteredAccommodations.length} résultat(s)</p>
                </div>
                {filteredAccommodations.length === 0 ? (
                  <p className={styles.empty}>Aucun hébergement trouvé.</p>
                ) : (
                  <>
                    <div className={styles.grid}>
                      {visibleAccommodations.map((accommodation) => (
                        <AccommodationCard
                          key={`search-acc-${accommodation.id}`}
                          accommodation={accommodation}
                          likes={0}
                        />
                      ))}
                    </div>
                    {(accommodationOffset + BATCH_SIZE) < filteredAccommodations.length && (
                      <button
                        className={styles.moreButton}
                        onClick={() => setAccommodationOffset((prev) => prev + BATCH_SIZE)}
                      >
                        Voir d'autres hébergements
                      </button>
                    )}
                  </>
                )}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  )
}
