import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BedDouble, LayoutGrid, Search, Utensils } from 'lucide-react'
import RestaurantCard from '../../components/features/Restaurant/RestaurantCard'
import AccommodationCard from '../../components/features/Accommodation/AccommodationCard'
import { fetchAllRestaurants } from '../../services/restaurant.service'
import { fetchAccommodations } from '../../services/accommodation.service'
import { addAccommodationToList, addRestaurantToList, findOrCreateList, getListAccommodations, getListRestaurants, getLists, removeAccommodationFromList, removeRestaurantFromList } from '../../services/list.service'
import { getToken, getUser } from '../../services/auth.service'
import type { Restaurant } from '../../types/restaurant.types'
import type { Accommodation } from '../../types/accommodation.types'
import styles from './SearchResultsPage.module.css'

type ResultType = 'restaurant' | 'accommodation' | 'all'
const GRID_BATCH_SIZE = 5
const RESTAURANTS_LIKED_LIST_NAME = 'Restaurants likés'
const ACCOMMODATIONS_LIKED_LIST_NAME = 'Hébergements likées'

function includesText(value: string | undefined | null, term: string): boolean {
  if (!value) return false
  return value.toLowerCase().includes(term)
}

function normalizeSource(): 'accommodation' {
  return 'accommodation'
}

function getRelevanceScore(values: Array<string | undefined | null>, term: string): number {
  if (!term) return 0
  let score = 0
  values.forEach((value, index) => {
    if (!value) return
    const normalized = value.toLowerCase()
    const weight = Math.max(1, 5 - index)
    if (normalized === term) score += 120 * weight
    else if (normalized.startsWith(term)) score += 80 * weight
    else if (normalized.includes(term)) score += 40 * weight
  })
  return score
}

function getCardSpanClass(index: number): string {
  return index === 0 || index === 3 || index === 6 ? styles.cardWide : ''
}

function getCircularBatch<T>(items: T[], offset: number, batchSize: number): T[] {
  if (items.length === 0) return []
  if (items.length <= batchSize) return items

  const output: T[] = []
  for (let i = 0; i < batchSize; i += 1) {
    const index = (offset + i) % items.length
    output.push(items[index])
  }
  return output
}

function getInitialRestaurantLikeCount(restaurant: Restaurant): number {
  const starsBonus = restaurant.stars * 70
  const greenStarBonus = restaurant.green_star === 1 ? 25 : 0
  const bibBonus = restaurant.award.toLowerCase().includes('bib') || restaurant.award.toLowerCase().includes('gourmand') ? 20 : 0
  const popularitySeed = (restaurant.id * 37) % 120
  return 20 + starsBonus + greenStarBonus + bibBonus + popularitySeed
}

function getInitialAccommodationLikeCount(accommodation: Accommodation): number {
  const stars = accommodation.stars ?? accommodation.rating_stars ?? 0
  const premiumBonus = accommodation.category?.toLowerCase().includes('palace') ? 30 : 0
  const numericId = Number(normalizeAccommodationId(accommodation.id))
  const popularitySeed = (numericId * 19) % 90
  return 12 + Math.floor(stars * 20) + premiumBonus + popularitySeed
}

function normalizeAccommodationId(value: string | number): string {
  const rawValue = String(value)
  return rawValue.includes('-') ? rawValue.split('-').pop() || rawValue : rawValue
}

export default function SearchResultsPage() {
  const navigate = useNavigate()
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
  const [likesByRestaurantId, setLikesByRestaurantId] = useState<Record<number, number>>({})
  const [likesByAccommodationId, setLikesByAccommodationId] = useState<Record<number, number>>({})
  const [likedRestaurantIds, setLikedRestaurantIds] = useState<Set<number>>(new Set())
  const [likedAccommodationIds, setLikedAccommodationIds] = useState<string[]>([])
  const [restaurantOffset, setRestaurantOffset] = useState(0)
  const [accommodationOffset, setAccommodationOffset] = useState(0)

  const hasQuery = query.length > 0
  const normalizedQuery = query.toLowerCase()

  const filteredRestaurants = useMemo(() => {
    const list = normalizedQuery
      ? restaurants.filter((restaurant) => (
      includesText(restaurant.name, normalizedQuery)
      || includesText(restaurant.city, normalizedQuery)
      || includesText(restaurant.address, normalizedQuery)
      || includesText(restaurant.location, normalizedQuery)
      || includesText(restaurant.cuisine, normalizedQuery)
    ))
      : restaurants

    return [...list].sort((a, b) => {
      const scoreA = getRelevanceScore([a.name, a.city, a.address, a.location, a.cuisine], normalizedQuery)
      const scoreB = getRelevanceScore([b.name, b.city, b.address, b.location, b.cuisine], normalizedQuery)
      return scoreB - scoreA
    })
  }, [restaurants, normalizedQuery])

  const filteredAccommodations = useMemo(() => {
    const list = normalizedQuery
      ? accommodations.filter((accommodation) => (
      includesText(accommodation.name, normalizedQuery)
      || includesText(accommodation.city, normalizedQuery)
      || includesText(accommodation.address, normalizedQuery)
      || includesText(accommodation.country, normalizedQuery)
      || includesText(accommodation.category, normalizedQuery)
    ))
      : accommodations

    return [...list].sort((a, b) => {
      const scoreA = getRelevanceScore([a.name, a.city, a.address, a.country, a.category], normalizedQuery)
      const scoreB = getRelevanceScore([b.name, b.city, b.address, b.country, b.category], normalizedQuery)
      return scoreB - scoreA
    })
  }, [accommodations, normalizedQuery])

  const visibleRestaurants = getCircularBatch(filteredRestaurants, restaurantOffset, GRID_BATCH_SIZE)
  const visibleAccommodations = getCircularBatch(filteredAccommodations, accommodationOffset, GRID_BATCH_SIZE)

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
      const normalizedAccommodations = accommodationData.map((acc) => ({
        ...acc,
        source: normalizeSource(),
      }))
      setAccommodations(normalizedAccommodations)
      setLikesByRestaurantId(
        restaurantData.reduce<Record<number, number>>((acc, restaurant) => {
          acc[restaurant.id] = getInitialRestaurantLikeCount(restaurant)
          return acc
        }, {})
      )
      setLikesByAccommodationId(
        normalizedAccommodations.reduce<Record<number, number>>((acc, accommodation) => {
          acc[Number(normalizeAccommodationId(accommodation.id))] = getInitialAccommodationLikeCount(accommodation)
          return acc
        }, {})
      )

      const token = getToken()
      if (token) {
        const lists = await getLists(token).catch(() => [])
        const likedRestaurantList = lists.find((list) => list.name === RESTAURANTS_LIKED_LIST_NAME)
        const likedAccommodationList = lists.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)

        if (likedRestaurantList) {
          const likedRestaurants = await getListRestaurants(token, likedRestaurantList.id).catch(() => [])
          setLikedRestaurantIds(new Set(likedRestaurants.map((restaurant) => restaurant.id)))
        } else {
          setLikedRestaurantIds(new Set())
        }

        if (likedAccommodationList) {
          const likedAccommodations = await getListAccommodations(token, likedAccommodationList.id).catch(() => [])
          setLikedAccommodationIds(likedAccommodations.map((accommodation) => normalizeAccommodationId(accommodation.id)))
        } else {
          setLikedAccommodationIds([])
        }
      } else {
        setLikedRestaurantIds(new Set())
        setLikedAccommodationIds([])
      }

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void runSearch()
    // Data is loaded once, then filtering is done client-side for fast refinement.
  }, [])

  function updateType(nextType: ResultType) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('type', nextType)
    setSearchParams(nextParams)
    setRestaurantOffset(0)
    setAccommodationOffset(0)
  }

  function handleRestaurantLikeChange(restaurantId: number, nextLiked: boolean) {
    const token = getToken()
    const user = getUser()
    if (!token || user?.userType === 'admin') {
      navigate('/auth?message=lists')
      return
    }

    setLikesByRestaurantId((current) => {
      const currentLikes = current[restaurantId] ?? 0
      return {
        ...current,
        [restaurantId]: nextLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
      }
    })
    setLikedRestaurantIds((current) => {
      const next = new Set(current)
      if (nextLiked) next.add(restaurantId)
      else next.delete(restaurantId)
      return next
    })

    if (nextLiked) {
      findOrCreateList(token, RESTAURANTS_LIKED_LIST_NAME)
        .then((list) => addRestaurantToList(token, list.id, restaurantId))
        .catch(() => {})
      return
    }

    getLists(token)
      .then((lists) => {
        const likedList = lists.find((list) => list.name === RESTAURANTS_LIKED_LIST_NAME)
        if (likedList) return removeRestaurantFromList(token, likedList.id, restaurantId)
        return undefined
      })
      .catch(() => {})
  }

  async function handleAccommodationLikeToggle(accommodation: Accommodation) {
    const token = getToken()
    const user = getUser()
    if (!token || user?.userType === 'admin') {
      navigate('/auth?message=lists')
      return
    }

    const normalizedId = normalizeAccommodationId(accommodation.id)
    const numericId = Number(normalizedId)
    const isCurrentlyLiked = likedAccommodationIds.includes(normalizedId)
    const previousLikes = likesByAccommodationId[numericId] ?? 0

    setLikedAccommodationIds((current) => (
      isCurrentlyLiked ? current.filter((id) => id !== normalizedId) : [...current, normalizedId]
    ))
    setLikesByAccommodationId((current) => ({
      ...current,
      [numericId]: isCurrentlyLiked ? Math.max(0, previousLikes - 1) : previousLikes + 1,
    }))

    try {
      if (isCurrentlyLiked) {
        const lists = await getLists(token)
        const likedList = lists.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)
        if (likedList) {
          await removeAccommodationFromList(token, likedList.id, numericId)
        }
      } else {
        const likedList = await findOrCreateList(token, ACCOMMODATIONS_LIKED_LIST_NAME)
        await addAccommodationToList(token, likedList.id, numericId, accommodation.source || 'accommodation')
      }
    } catch {
      setLikedAccommodationIds((current) => (
        isCurrentlyLiked ? [...current, normalizedId] : current.filter((id) => id !== normalizedId)
      ))
      setLikesByAccommodationId((current) => ({
        ...current,
        [numericId]: previousLikes,
      }))
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Nos sélections : l&apos;essentiel pour décider sans hésiter</h1>

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
        {!hasQuery && (
          <div className={styles.state}>Saisissez une recherche pour afficher des résultats.</div>
        )}

        {hasQuery && !loaded && !loading && (
          <div className={styles.state}>Lancez une recherche pour afficher les résultats.</div>
        )}
        {hasQuery && loading && (
          <div className={`${styles.state} ${styles.stateLoading}`}>
            <div className={styles.spinner} aria-label="Chargement" />
          </div>
        )}
        {hasQuery && error && <div className={styles.state}>{error}</div>}

        {hasQuery && loaded && !loading && !error && (
          <>
            {(selectedType === 'restaurant' || selectedType === 'all') && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Restaurants</h2>
                  <p>{filteredRestaurants.length} trouvé(s)</p>
                </div>
                {filteredRestaurants.length === 0 ? (
                  <p className={styles.empty}>Aucun restaurant trouvé.</p>
                ) : (
                  <>
                    <div className={styles.resultsGrid}>
                      {visibleRestaurants.map((restaurant, index) => (
                        <div
                          key={`search-resto-${restaurant.id}`}
                          className={`${styles.cardShell} ${getCardSpanClass(index)}`.trim()}
                        >
                          <RestaurantCard
                            restaurant={restaurant}
                            likes={likesByRestaurantId[restaurant.id] ?? getInitialRestaurantLikeCount(restaurant)}
                            onLikeChange={handleRestaurantLikeChange}
                            isLiked={likedRestaurantIds.has(restaurant.id)}
                          />
                        </div>
                      ))}
                    </div>
                    {filteredRestaurants.length > GRID_BATCH_SIZE && (
                      <button
                        className={styles.moreButton}
                        onClick={() => {
                          setRestaurantOffset((prev) => {
                            if (filteredRestaurants.length === 0) return 0
                            return (prev + GRID_BATCH_SIZE) % filteredRestaurants.length
                          })
                        }}
                      >
                        Proposez moi d'autres adresses
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
                  <p>{filteredAccommodations.length} trouvé(s)</p>
                </div>
                {filteredAccommodations.length === 0 ? (
                  <p className={styles.empty}>Aucun hébergement trouvé.</p>
                ) : (
                  <>
                    <div className={styles.resultsGrid}>
                      {visibleAccommodations.map((accommodation, index) => (
                        <div
                          key={`search-acc-${accommodation.id}`}
                          className={`${styles.cardShell} ${getCardSpanClass(index)}`.trim()}
                        >
                          <AccommodationCard
                            accommodation={accommodation}
                            compact
                            isFavorited={likedAccommodationIds.includes(normalizeAccommodationId(accommodation.id))}
                            onToggleFavorite={() => void handleAccommodationLikeToggle(accommodation)}
                            likes={likesByAccommodationId[Number(normalizeAccommodationId(accommodation.id))] ?? getInitialAccommodationLikeCount(accommodation)}
                          />
                        </div>
                      ))}
                    </div>
                    {filteredAccommodations.length > GRID_BATCH_SIZE && (
                      <button
                        className={styles.moreButton}
                        onClick={() => {
                          setAccommodationOffset((prev) => {
                            if (filteredAccommodations.length === 0) return 0
                            return (prev + GRID_BATCH_SIZE) % filteredAccommodations.length
                          })
                        }}
                      >
                        Proposez moi d'autres adresses
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
