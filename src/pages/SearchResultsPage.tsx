import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { BedDouble, Search, UtensilsCrossed } from 'lucide-react'
import { fetchAllRestaurants } from '../services/restaurant.service'
import { fetchAccommodations } from '../services/accommodation.service'
import type { Restaurant } from '../types/restaurant.types'
import type { Accommodation } from '../types/accommodation.types'
import styles from './SearchResultsPage.module.css'

type SearchType = 'restaurant' | 'accommodation' | 'all'
type UserCoords = { latitude: number; longitude: number }

const RESULTS_PER_TYPE = 3

function normalize(value: string | undefined): string {
  if (!value) return ''
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function parseSearchType(value: string | null): SearchType {
  if (value === 'restaurant' || value === 'accommodation' || value === 'all') {
    return value
  }
  return 'restaurant'
}

function getRestaurantImage(restaurant: Restaurant): string {
  const cover = restaurant.photos?.[0]?.url
  if (cover) return cover
  return `https://picsum.photos/seed/restaurant-${restaurant.id}/900/600`
}

function getAccommodationImage(accommodation: Accommodation): string {
  const cover = accommodation.image_url || accommodation.photo_url || accommodation.image_urls?.[0]
  if (cover) return cover
  return `https://picsum.photos/seed/hotel-${accommodation.id}/900/600`
}

function buildCandidatePool<T>(
  filteredItems: T[],
  allItems: T[],
  keyOf: (item: T) => string,
  minimumSize: number
): T[] {
  if (filteredItems.length > minimumSize) return filteredItems

  const seen = new Set(filteredItems.map(item => keyOf(item)))
  const additionalItems = allItems.filter(item => !seen.has(keyOf(item)))
  return [...filteredItems, ...additionalItems]
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180
}

function distanceInKm(from: UserCoords, to: { latitude?: number; longitude?: number }): number | null {
  if (typeof to.latitude !== 'number' || typeof to.longitude !== 'number') return null

  const earthRadiusKm = 6371
  const dLat = toRadians(to.latitude - from.latitude)
  const dLon = toRadians(to.longitude - from.longitude)
  const lat1 = toRadians(from.latitude)
  const lat2 = toRadians(to.latitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function restaurantRatingScore(restaurant: Restaurant): number {
  const bibBonus =
    restaurant.award.toLowerCase().includes('bib') || restaurant.award.toLowerCase().includes('gourmand')
      ? 0.5
      : 0
  const greenBonus = restaurant.green_star === 1 ? 0.5 : 0
  return restaurant.stars + bibBonus + greenBonus
}

function accommodationRatingScore(accommodation: Accommodation): number {
  return accommodation.rating_stars ?? accommodation.stars ?? 0
}

function formatDistanceLabel(distance: number | null): string | null {
  if (distance === null) return null
  if (distance < 1) return `à ${(distance * 1000).toFixed(0)} m`
  return `à ${distance.toFixed(1)} km`
}

function restaurantPriceLevel(price: string): number {
  const normalized = price.replace(/\$/g, '€')
  return (normalized.match(/€/g) ?? []).length
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restaurantPage, setRestaurantPage] = useState(0)
  const [accommodationPage, setAccommodationPage] = useState(0)
  const [userCoords, setUserCoords] = useState<UserCoords | null>(null)
  const [maxDistanceKm, setMaxDistanceKm] = useState(30)
  const [restaurantMinScore, setRestaurantMinScore] = useState(0)
  const [restaurantMaxPrice, setRestaurantMaxPrice] = useState(0)
  const [hotelMinStars, setHotelMinStars] = useState(0)
  const [hotelMaxBudget, setHotelMaxBudget] = useState(0)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const searchQuery = searchParams.get('q')?.trim() ?? ''
  const selectedType = parseSearchType(searchParams.get('type'))

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    Promise.all([fetchAllRestaurants(), fetchAccommodations()])
      .then(([restaurantData, accommodationData]) => {
        if (!mounted) return
        setRestaurants(restaurantData)
        setAccommodations(accommodationData)
      })
      .catch(() => {
        if (!mounted) return
        setError('Impossible de charger les résultats pour le moment.')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      () => {
        setUserCoords(null)
      },
      { timeout: 6000, maximumAge: 60000 }
    )
  }, [])

  const normalizedQuery = useMemo(() => normalize(searchQuery), [searchQuery])
  const queryTokens = useMemo(
    () => normalizedQuery.split(/\s+/).filter(Boolean),
    [normalizedQuery]
  )

  const queryMatchedRestaurants = useMemo(() => {
    if (queryTokens.length === 0) return restaurants
    return restaurants.filter(restaurant => {
      const searchableText = normalize(
        `${restaurant.name} ${restaurant.city} ${restaurant.cuisine} ${restaurant.address}`
      )
      return queryTokens.every(token => searchableText.includes(token))
    })
  }, [restaurants, queryTokens])

  const queryMatchedAccommodations = useMemo(() => {
    if (queryTokens.length === 0) return accommodations
    return accommodations.filter(accommodation => {
      const searchableText = normalize(
        `${accommodation.name} ${accommodation.city} ${accommodation.category} ${accommodation.address} ${accommodation.description ?? ''}`
      )
      return queryTokens.every(token => searchableText.includes(token))
    })
  }, [accommodations, queryTokens])

  const preferredRestaurants = useMemo(() => {
    return queryMatchedRestaurants.filter(restaurant => {
      const distance = userCoords ? distanceInKm(userCoords, restaurant) : null
      const matchesDistance = !distance || distance <= maxDistanceKm
      const matchesScore = restaurantRatingScore(restaurant) >= restaurantMinScore
      const matchesPrice =
        restaurantMaxPrice === 0 || restaurantPriceLevel(restaurant.price) <= restaurantMaxPrice
      return matchesDistance && matchesScore && matchesPrice
    })
  }, [queryMatchedRestaurants, userCoords, maxDistanceKm, restaurantMinScore, restaurantMaxPrice])

  const preferredAccommodations = useMemo(() => {
    return queryMatchedAccommodations.filter(accommodation => {
      const distance = userCoords ? distanceInKm(userCoords, accommodation) : null
      const matchesDistance = !distance || distance <= maxDistanceKm
      const matchesStars = accommodationRatingScore(accommodation) >= hotelMinStars
      const matchesBudget =
        hotelMaxBudget === 0 ||
        typeof accommodation.price_from !== 'number' ||
        accommodation.price_from <= hotelMaxBudget
      return matchesDistance && matchesStars && matchesBudget
    })
  }, [queryMatchedAccommodations, userCoords, maxDistanceKm, hotelMinStars, hotelMaxBudget])

  const restaurantCandidates = useMemo(
    () =>
      buildCandidatePool(
        preferredRestaurants,
        restaurants,
        item => String(item.id),
        RESULTS_PER_TYPE
      ),
    [preferredRestaurants, restaurants]
  )
  const accommodationCandidates = useMemo(
    () =>
      buildCandidatePool(
        preferredAccommodations,
        accommodations,
        item => item.id,
        RESULTS_PER_TYPE
      ),
    [preferredAccommodations, accommodations]
  )

  const preferredRestaurantIds = useMemo(
    () => new Set(preferredRestaurants.map(item => item.id)),
    [preferredRestaurants]
  )
  const preferredAccommodationIds = useMemo(
    () => new Set(preferredAccommodations.map(item => item.id)),
    [preferredAccommodations]
  )

  const rankedRestaurants = useMemo(() => {
    return [...restaurantCandidates].sort((a, b) => {
      const isPreferredA = preferredRestaurantIds.has(a.id)
      const isPreferredB = preferredRestaurantIds.has(b.id)
      if (isPreferredA !== isPreferredB) return isPreferredA ? -1 : 1

      const distanceA = userCoords ? distanceInKm(userCoords, a) : null
      const distanceB = userCoords ? distanceInKm(userCoords, b) : null

      if (distanceA !== null && distanceB !== null && distanceA !== distanceB) {
        return distanceA - distanceB
      }
      if (distanceA !== null && distanceB === null) return -1
      if (distanceA === null && distanceB !== null) return 1

      return restaurantRatingScore(b) - restaurantRatingScore(a)
    })
  }, [restaurantCandidates, userCoords, preferredRestaurantIds])

  const rankedAccommodations = useMemo(() => {
    return [...accommodationCandidates].sort((a, b) => {
      const isPreferredA = preferredAccommodationIds.has(a.id)
      const isPreferredB = preferredAccommodationIds.has(b.id)
      if (isPreferredA !== isPreferredB) return isPreferredA ? -1 : 1

      const distanceA = userCoords ? distanceInKm(userCoords, a) : null
      const distanceB = userCoords ? distanceInKm(userCoords, b) : null

      if (distanceA !== null && distanceB !== null && distanceA !== distanceB) {
        return distanceA - distanceB
      }
      if (distanceA !== null && distanceB === null) return -1
      if (distanceA === null && distanceB !== null) return 1

      return accommodationRatingScore(b) - accommodationRatingScore(a)
    })
  }, [accommodationCandidates, userCoords, preferredAccommodationIds])

  const restaurantDistanceById = useMemo(() => {
    const map = new Map<number, number | null>()
    rankedRestaurants.forEach(item => {
      map.set(item.id, userCoords ? distanceInKm(userCoords, item) : null)
    })
    return map
  }, [rankedRestaurants, userCoords])

  const accommodationDistanceById = useMemo(() => {
    const map = new Map<string, number | null>()
    rankedAccommodations.forEach(item => {
      map.set(item.id, userCoords ? distanceInKm(userCoords, item) : null)
    })
    return map
  }, [rankedAccommodations, userCoords])

  const restaurantPages = Math.max(1, Math.ceil(rankedRestaurants.length / RESULTS_PER_TYPE))
  const accommodationPages = Math.max(1, Math.ceil(rankedAccommodations.length / RESULTS_PER_TYPE))

  useEffect(() => {
    setRestaurantPage(0)
    setAccommodationPage(0)
  }, [
    searchQuery,
    selectedType,
    userCoords,
    maxDistanceKm,
    restaurantMinScore,
    restaurantMaxPrice,
    hotelMinStars,
    hotelMaxBudget,
  ])

  const visibleRestaurants = useMemo(
    () =>
      rankedRestaurants.slice(
        restaurantPage * RESULTS_PER_TYPE,
        restaurantPage * RESULTS_PER_TYPE + RESULTS_PER_TYPE
      ),
    [rankedRestaurants, restaurantPage]
  )

  const visibleAccommodations = useMemo(
    () =>
      rankedAccommodations.slice(
        accommodationPage * RESULTS_PER_TYPE,
        accommodationPage * RESULTS_PER_TYPE + RESULTS_PER_TYPE
      ),
    [rankedAccommodations, accommodationPage]
  )

  function updateType(nextType: SearchType) {
    const params = new URLSearchParams(searchParams)
    params.set('type', nextType)
    navigate(`/resultats?${params.toString()}`)
  }

  function rotateSuggestions() {
    if (selectedType === 'restaurant') {
      setRestaurantPage(prev => (prev + 1) % restaurantPages)
      return
    }
    if (selectedType === 'accommodation') {
      setAccommodationPage(prev => (prev + 1) % accommodationPages)
      return
    }
    setRestaurantPage(prev => (prev + 1) % restaurantPages)
    setAccommodationPage(prev => (prev + 1) % accommodationPages)
  }

  function generateNewSuggestions() {
    setIsFilterModalOpen(true)
  }

  function applyFiltersAndGenerate() {
    rotateSuggestions()
    setIsFilterModalOpen(false)
  }

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <p className={styles.kicker}>Résultats de recherche</p>
        <h1 className={styles.title}>
          {searchQuery ? `Résultats pour "${searchQuery}"` : 'Nos meilleures propositions'}
        </h1>
        <p className={styles.subtitle}>
          Changez le filtre si les propositions ne vous conviennent pas.
        </p>

        <div className={styles.filterSwitch} role="group" aria-label="Type de résultats">
          <button
            type="button"
            className={`${styles.filterButton} ${selectedType === 'restaurant' ? styles.filterButtonActive : ''}`}
            onClick={() => updateType('restaurant')}
          >
            <UtensilsCrossed size={14} />
            Restaurants
          </button>
          <button
            type="button"
            className={`${styles.filterButton} ${selectedType === 'accommodation' ? styles.filterButtonActive : ''}`}
            onClick={() => updateType('accommodation')}
          >
            <BedDouble size={14} />
            Hôtels
          </button>
          <button
            type="button"
            className={`${styles.filterButton} ${selectedType === 'all' ? styles.filterButtonActive : ''}`}
            onClick={() => updateType('all')}
          >
            <Search size={14} />
            Les deux
          </button>
          <button
            type="button"
            className={styles.refreshButton}
            onClick={generateNewSuggestions}
          >
            Générer + filtres
          </button>
        </div>
      </section>

      {isFilterModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsFilterModalOpen(false)}>
          <div
            className={styles.preferenceModal}
            role="dialog"
            aria-modal="true"
            aria-label="Filtres de personnalisation"
            onClick={event => event.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Affiner vos préférences</h2>
            <div className={styles.preferenceFilters}>
              <label className={styles.preferenceField}>
                Distance max
                <select value={maxDistanceKm} onChange={e => setMaxDistanceKm(Number(e.target.value))}>
                  <option value={5}>5 km</option>
                  <option value={15}>15 km</option>
                  <option value={30}>30 km</option>
                  <option value={60}>60 km</option>
                  <option value={120}>120 km</option>
                </select>
              </label>

              <label className={styles.preferenceField}>
                Niveau resto min
                <select
                  value={restaurantMinScore}
                  onChange={e => setRestaurantMinScore(Number(e.target.value))}
                >
                  <option value={0}>Tous</option>
                  <option value={1}>1 étoile+</option>
                  <option value={2}>2 étoiles+</option>
                  <option value={3}>3 étoiles</option>
                </select>
              </label>

              <label className={styles.preferenceField}>
                Budget resto max
                <select
                  value={restaurantMaxPrice}
                  onChange={e => setRestaurantMaxPrice(Number(e.target.value))}
                >
                  <option value={0}>Tous</option>
                  <option value={1}>€</option>
                  <option value={2}>€€</option>
                  <option value={3}>€€€</option>
                  <option value={4}>€€€€</option>
                </select>
              </label>

              <label className={styles.preferenceField}>
                Étoiles hôtel min
                <select value={hotelMinStars} onChange={e => setHotelMinStars(Number(e.target.value))}>
                  <option value={0}>Toutes</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5</option>
                </select>
              </label>

              <label className={styles.preferenceField}>
                Budget hôtel max
                <select value={hotelMaxBudget} onChange={e => setHotelMaxBudget(Number(e.target.value))}>
                  <option value={0}>Tous</option>
                  <option value={120}>120 EUR</option>
                  <option value={200}>200 EUR</option>
                  <option value={350}>350 EUR</option>
                  <option value={500}>500 EUR</option>
                </select>
              </label>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.modalCancel}
                onClick={() => setIsFilterModalOpen(false)}
              >
                Fermer
              </button>
              <button type="button" className={styles.modalApply} onClick={applyFiltersAndGenerate}>
                Appliquer et générer
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <p className={styles.state}>Chargement des résultats...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <section className={styles.results}>
          {(selectedType === 'restaurant' || selectedType === 'all') && (
            <div className={styles.resultBlock}>
              <div className={styles.blockHeader}>
                <h2>Restaurants</h2>
                <Link to={`/restaurants${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}>
                  Voir plus
                </Link>
              </div>
              {visibleRestaurants.length === 0 ? (
                <p className={styles.empty}>Aucun restaurant trouvé.</p>
              ) : (
                <div className={styles.cardGrid}>
                  {visibleRestaurants.map(restaurant => (
                    <article key={restaurant.id} className={styles.card}>
                      <div className={styles.media}>
                        <img
                          src={getRestaurantImage(restaurant)}
                          alt={restaurant.name}
                          loading="lazy"
                          onError={event => {
                            event.currentTarget.src = `https://picsum.photos/seed/restaurant-fallback-${restaurant.id}/900/600`
                          }}
                        />
                      </div>
                      <div className={styles.cardBody}>
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.city}</p>
                        <p>{restaurant.cuisine}</p>
                        {formatDistanceLabel(restaurantDistanceById.get(restaurant.id) ?? null) && (
                          <p className={styles.distance}>
                            {formatDistanceLabel(restaurantDistanceById.get(restaurant.id) ?? null)}
                          </p>
                        )}
                        <span>{restaurant.price}</span>
                        <Link
                          className={styles.detailButton}
                          to={`/restaurants?q=${encodeURIComponent(restaurant.name)}`}
                        >
                          Voir en détail
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {(selectedType === 'accommodation' || selectedType === 'all') && (
            <div className={styles.resultBlock}>
              <div className={styles.blockHeader}>
                <h2>Hôtels</h2>
                <Link to={`/hebergements${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}>
                  Voir plus
                </Link>
              </div>
              {visibleAccommodations.length === 0 ? (
                <p className={styles.empty}>Aucun hôtel trouvé.</p>
              ) : (
                <div className={styles.cardGrid}>
                  {visibleAccommodations.map(accommodation => (
                    <article key={accommodation.id} className={styles.card}>
                      <div className={styles.media}>
                        <img
                          src={getAccommodationImage(accommodation)}
                          alt={accommodation.name}
                          loading="lazy"
                          onError={event => {
                            event.currentTarget.src = `https://picsum.photos/seed/hotel-fallback-${accommodation.id}/900/600`
                          }}
                        />
                      </div>
                      <div className={styles.cardBody}>
                        <h3>{accommodation.name}</h3>
                        <p>{accommodation.city}</p>
                        <p>{accommodation.category || 'Hébergement'}</p>
                        {formatDistanceLabel(accommodationDistanceById.get(accommodation.id) ?? null) && (
                          <p className={styles.distance}>
                            {formatDistanceLabel(accommodationDistanceById.get(accommodation.id) ?? null)}
                          </p>
                        )}
                        <span>
                          {accommodation.price_from
                            ? `Dès ${Math.round(accommodation.price_from)} EUR`
                            : 'Prix non renseigné'}
                        </span>
                        <Link
                          className={styles.detailButton}
                          to={`/hebergements/${accommodation.id}`}
                        >
                          Voir en détail
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  )
}
