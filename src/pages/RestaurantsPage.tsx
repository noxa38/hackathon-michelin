import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Search, ChevronDown, X, Utensils, Award, Coins, Globe, ConciergeBell, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fetchAllRestaurants } from '../services/restaurant.service'
import { findOrCreateList, addRestaurantToList, removeRestaurantFromList, getListRestaurants, getLists } from '../services/list.service'
import { getToken, getUser } from '../services/auth.service'
import RestaurantCard from '../components/features/RestaurantCard'
import SaveToListModal from '../components/features/SaveToListModal'
import type { Restaurant } from '../types/restaurant.types'
import styles from './RestaurantsPage.module.css'
import restaurantMichelinStarIconUrl from '../../img/restaurant-michelin-star-icon.png'
import michelinBigGourmandIconUrl from '../../img/michelin-big-gourmand-icon.png'
import michelinGreenStarIconUrl from '../../img/michelin-green-star-icon.png'

const RESTAURANTS_LIKED_LIST_NAME = 'Restaurants likés'

type DistinctionKey = '3' | '2' | '1' | 'bib' | 'green'

const DISTINCTION_OPTIONS: { value: DistinctionKey; label: string; img?: string; stars?: number }[] = [
  { value: '3',    label: '3 Étoiles',    img: restaurantMichelinStarIconUrl, stars: 3 },
  { value: '2',    label: '2 Étoiles',    img: restaurantMichelinStarIconUrl, stars: 2 },
  { value: '1',    label: '1 Étoile',     img: restaurantMichelinStarIconUrl, stars: 1 },
  { value: 'bib',  label: 'Bib Gourmand', img: michelinBigGourmandIconUrl },
  { value: 'green',label: 'Étoile Verte', img: michelinGreenStarIconUrl },
]

const PRICE_OPTIONS = [
  { value: '€',    label: '€ — Économique' },
  { value: '€€',   label: '€€ — Abordable' },
  { value: '€€€',  label: '€€€ — Modéré' },
  { value: '€€€€', label: '€€€€ — Gastronomique' },
]

const FACILITY_OPTIONS = [
  { value: 'Terrace',              label: 'Terrasse' },
  { value: 'Great view',           label: 'Belle vue' },
  { value: 'Interesting wine list',label: 'Carte des vins' },
  { value: 'Counter dining',       label: 'Comptoir' },
  { value: 'Car park',             label: 'Parking' },
  { value: 'Wheelchair access',    label: 'Accès PMR' },
  { value: 'Garden or park',       label: 'Jardin / Parc' },
  { value: 'Air conditioning',     label: 'Climatisation' },
]

const TOP_LIKED_SELECTION = [
  {
    id: 1,
    name: 'Maison Aurora',
    city: 'Lyon',
    cuisine: 'Cuisine francaise creative',
    price: '€€€€',
    stars: 3,
    likes: 1284,
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=900&fit=crop',
  },
  {
    id: 2,
    name: 'Atelier du Levant',
    city: 'Paris',
    cuisine: 'Cuisine japonaise contemporaine',
    price: '€€€',
    stars: 2,
    likes: 1072,
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop',
  },
  {
    id: 3,
    name: 'Le Jardin des Brumes',
    city: 'Annecy',
    cuisine: 'Cuisine alpine et locale',
    price: '€€€',
    stars: 1,
    likes: 964,
    photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=900&fit=crop',
  },
  {
    id: 4,
    name: 'Orizon Mare',
    city: 'Biarritz',
    cuisine: 'Cuisine marine moderne',
    price: '€€€€',
    stars: 2,
    likes: 889,
    photo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=900&fit=crop',
  },
  {
    id: 5,
    name: 'Braise et Rosée',
    city: 'Bordeaux',
    cuisine: 'Cuisine du terroir revisitee',
    price: '€€€',
    stars: 1,
    likes: 841,
    photo: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=900&fit=crop',
  },
  {
    id: 6,
    name: 'Sillage',
    city: 'Nice',
    cuisine: 'Cuisine mediterraneenne fine',
    price: '€€€€',
    stars: 2,
    likes: 804,
    photo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=900&fit=crop',
  },
  {
    id: 7,
    name: 'L Atelier des Vignes',
    city: 'Reims',
    cuisine: 'Cuisine francaise et champenoise',
    price: '€€€',
    stars: 1,
    likes: 771,
    photo: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1200&h=900&fit=crop',
  },
  {
    id: 8,
    name: 'Noctis',
    city: 'Lille',
    cuisine: 'Cuisine nordique creative',
    price: '€€€',
    stars: 1,
    likes: 739,
    photo: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&h=900&fit=crop',
  },
  {
    id: 9,
    name: 'Plein Sud',
    city: 'Marseille',
    cuisine: 'Cuisine provencale contemporaine',
    price: '€€€€',
    stars: 2,
    likes: 715,
    photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop',
  },
  {
    id: 10,
    name: 'Origine 27',
    city: 'Strasbourg',
    cuisine: 'Cuisine alsacienne elegante',
    price: '€€€',
    stars: 1,
    likes: 692,
    photo: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&h=900&fit=crop',
  },
  {
    id: 11,
    name: 'Rive Claire',
    city: 'Nantes',
    cuisine: 'Cuisine iodée et vegetale',
    price: '€€€',
    stars: 1,
    likes: 664,
    photo: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&h=900&fit=crop',
  },
  {
    id: 12,
    name: 'Mont Echo',
    city: 'Chamonix',
    cuisine: 'Cuisine alpine contemporaine',
    price: '€€€€',
    stars: 2,
    likes: 643,
    photo: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&h=900&fit=crop',
  },
]

function extractCountry(location: string): string {
  const parts = location.split(',')
  return parts[parts.length - 1].trim()
}

function getInitialLikeCount(restaurant: Restaurant): number {
  const starsBonus = restaurant.stars * 70
  const greenStarBonus = restaurant.green_star === 1 ? 25 : 0
  const bibBonus = restaurant.award.toLowerCase().includes('bib') || restaurant.award.toLowerCase().includes('gourmand') ? 20 : 0
  const popularitySeed = (restaurant.id * 37) % 120
  return 20 + starsBonus + greenStarBonus + bibBonus + popularitySeed
}

function useClickOutside(
  refs: Record<string, React.RefObject<HTMLElement | null>>,
  openMenu: string | null,
  onClose: () => void
) {
  useEffect(() => {
    if (!openMenu) return
    function handle(e: MouseEvent) {
      const activeRef = refs[openMenu!]
      if (activeRef?.current && !activeRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [openMenu, refs, onClose])
}

type OpenMenu = 'distinction' | 'cuisine' | 'price' | 'country' | 'facility' | null

export default function RestaurantsPage() {
  const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [distinctionFilters, setDistinctionFilters] = useState<DistinctionKey[]>([])
  const [cuisineFilters, setCuisineFilters] = useState<string[]>([])
  const [priceFilters, setPriceFilters] = useState<string[]>([])
  const [countryFilters, setCountryFilters] = useState<string[]>([])
  const [facilityFilters, setFacilityFilters] = useState<string[]>([])
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const [likesById, setLikesById] = useState<Record<number, number>>({})
  const [likedRestaurantIds, setLikedRestaurantIds] = useState<Set<number>>(new Set())
  const [savedRestaurantIds, setSavedRestaurantIds] = useState<Set<number>>(new Set())
  const [saveTargetRestaurantId, setSaveTargetRestaurantId] = useState<number | null>(null)
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const distinctionRef = useRef<HTMLDivElement>(null)
  const cuisineRef     = useRef<HTMLDivElement>(null)
  const priceRef       = useRef<HTMLDivElement>(null)
  const countryRef     = useRef<HTMLDivElement>(null)
  const facilityRef    = useRef<HTMLDivElement>(null)

  const menuRefs = useMemo(() => ({
    distinction: distinctionRef,
    cuisine:     cuisineRef,
    price:       priceRef,
    country:     countryRef,
    facility:    facilityRef,
  }), [])

  const closeAll = useCallback(() => setOpenMenu(null), [])
  useClickOutside(menuRefs, openMenu, closeAll)

  function toggle(menu: OpenMenu) {
    setOpenMenu(prev => prev === menu ? null : menu)
  }

  useEffect(() => {
    fetchAllRestaurants()
      .then(data => {
        setRestaurants(data)
        const initialLikes = data.reduce<Record<number, number>>((acc, restaurant) => {
          acc[restaurant.id] = getInitialLikeCount(restaurant)
          return acc
        }, {})
        setLikesById(initialLikes)
        const token = getToken()
        if (token) {
          getLists(token)
            .then(async (lists) => {
              const likedList = lists.find((list) => list.name === RESTAURANTS_LIKED_LIST_NAME)
              if (likedList) {
                const likedRestaurants = await getListRestaurants(token, likedList.id).catch(() => [])
                setLikedRestaurantIds(new Set(likedRestaurants.map((restaurant) => restaurant.id)))
              }

              const listsForSave = lists.filter((list) => list.name !== RESTAURANTS_LIKED_LIST_NAME)
              const restaurantsByList = await Promise.all(
                listsForSave.map((list) => getListRestaurants(token, list.id).catch(() => []))
              )
              const ids = new Set<number>()
              restaurantsByList.flat().forEach((restaurant) => {
                if (typeof restaurant.id === 'number') ids.add(restaurant.id)
              })
              setSavedRestaurantIds(ids)
            })
            .catch(() => {})
        }
      })
      .catch(() => setError('Impossible de charger les restaurants. Vérifiez que le serveur est démarré.'))
      .finally(() => setLoading(false))
  }, [])

  const cuisineOptions = useMemo(() => {
    const set = new Set<string>()
    restaurants.forEach(r => r.cuisine.split(',').forEach(c => { const t = c.trim(); if (t) set.add(t) }))
    return Array.from(set).sort()
  }, [restaurants])

  const countryOptions = useMemo(() => {
    const set = new Set<string>()
    restaurants.forEach(r => { if (r.location) set.add(extractCountry(r.location)) })
    return Array.from(set).sort()
  }, [restaurants])

  const destinationsCount = useMemo(() => countryOptions.length, [countryOptions])

  const starredCount = useMemo(
    () => restaurants.filter(restaurant => restaurant.stars >= 1).length,
    [restaurants]
  )

  const greenStarCount = useMemo(
    () => restaurants.filter(restaurant => restaurant.green_star === 1).length,
    [restaurants]
  )

  const handleLikeChange = useCallback((restaurantId: number, nextLiked: boolean) => {
    const token = getToken()
    const user = getUser()
    if (!token || user?.userType === 'admin') {
      navigate('/auth?message=lists')
      return
    }

    setLikesById(prev => {
      const currentLikes = prev[restaurantId] ?? 0
      return {
        ...prev,
        [restaurantId]: nextLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
      }
    })
    setLikedRestaurantIds(prev => {
      const next = new Set(prev)
      if (nextLiked) next.add(restaurantId)
      else next.delete(restaurantId)
      return next
    })
    if (nextLiked) {
      findOrCreateList(token, RESTAURANTS_LIKED_LIST_NAME)
        .then(list => addRestaurantToList(token, list.id, restaurantId))
        .catch(() => {})
    } else {
      getLists(token)
        .then(lists => {
          const likedList = lists.find((l: { name: string }) => l.name === RESTAURANTS_LIKED_LIST_NAME)
          if (likedList) return removeRestaurantFromList(token, likedList.id, restaurantId)
        })
        .catch(() => {})
    }
  }, [navigate])

  function handleOpenSaveModal(restaurantId: number) {
    const token = getToken()
    const user = getUser()
    if (!token || user?.userType === 'admin') {
      navigate('/auth?message=lists')
      return
    }

    setSaveTargetRestaurantId(restaurantId)
    setSaveModalOpen(true)
  }

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      if (distinctionFilters.length > 0) {
        const ok = distinctionFilters.some(f => {
          if (f === '3') return r.stars === 3
          if (f === '2') return r.stars === 2
          if (f === '1') return r.stars === 1
          if (f === 'bib') return r.award.toLowerCase().includes('bib') || r.award.toLowerCase().includes('gourmand')
          if (f === 'green') return r.green_star === 1
          return false
        })
        if (!ok) return false
      }
      if (cuisineFilters.length > 0) {
        if (!cuisineFilters.some(c => r.cuisine.toLowerCase().includes(c.toLowerCase()))) return false
      }
      if (priceFilters.length > 0) {
        // normalise $$$$ → €€€€ pour Dubai
        const normalizedPrice = r.price.replace(/\$/g, '€')
        if (!priceFilters.some(p => normalizedPrice === p || r.price === p)) return false
      }
      if (countryFilters.length > 0) {
        if (!countryFilters.includes(extractCountry(r.location))) return false
      }
      if (facilityFilters.length > 0) {
        if (!facilityFilters.every(f => r.facilities.includes(f))) return false
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        if (!r.name.toLowerCase().includes(q) && !r.city.toLowerCase().includes(q) && !r.cuisine.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [restaurants, distinctionFilters, cuisineFilters, priceFilters, countryFilters, facilityFilters, search])

  function makeToggle<T>(setter: React.Dispatch<React.SetStateAction<T[]>>) {
    return (v: T) => setter(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  }

  const hasFilters = distinctionFilters.length + cuisineFilters.length + priceFilters.length + countryFilters.length + facilityFilters.length > 0 || search.trim().length > 0

  function resetAll() {
    setDistinctionFilters([]); setCuisineFilters([]); setPriceFilters([])
    setCountryFilters([]); setFacilityFilters([]); setSearch('')
  }

  return (
    <>
    <SaveToListModal
      isOpen={saveModalOpen}
      token={getToken()}
      itemId={saveTargetRestaurantId}
      itemType="restaurant"
      title="Enregistrer ce restaurant"
      onClose={() => {
        setSaveModalOpen(false)
        setSaveTargetRestaurantId(null)
      }}
      onSaved={(savedId) => {
        setSavedRestaurantIds((current) => {
          const next = new Set(current)
          next.add(savedId)
          return next
        })
      }}
    />
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.headerShell}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Restaurants</h1>
            <p className={styles.lead}>
              Des tables d'exception pour vivre l'experience Michelin dans les plus belles destinations.
            </p>
            {!loading && !error && (
              <>
                <p className={styles.subtitle}>
                  <span className={styles.subtitleValue}>{restaurants.length}</span>
                  <span>restaurants</span>
                </p>
                <div className={styles.headerStats}>
                  <p className={styles.statCard}>
                    <span className={styles.statValue}>{destinationsCount}</span>
                    <span className={styles.statLabel}>destinations</span>
                  </p>
                  <p className={styles.statCard}>
                    <span className={styles.statValue}>{starredCount}</span>
                    <span className={styles.statLabel}>restaurants étoilés</span>
                  </p>
                  <p className={styles.statCard}>
                    <span className={styles.statValue}>{greenStarCount}</span>
                    <span className={styles.statLabel}>étoiles vertes</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.headerCarouselWrap}>
          <div className={styles.headerGallery} aria-hidden="true">
            <div className={styles.headerCarousel}>
              <span className={styles.galleryBadge}>Sélection des restaurant les plus likés</span>
              <div className={styles.carouselTrack}>
                {TOP_LIKED_SELECTION.map((restaurant) => (
                  <article key={restaurant.id} className={styles.carouselCard}>
                    <img
                      className={styles.carouselPhoto}
                      src={restaurant.photo}
                      alt=""
                      loading="lazy"
                    />
                    <div className={styles.carouselOverlay}>
                      <div className={styles.carouselStars}>
                        {Array.from({ length: restaurant.stars }, (_, i) => (
                          <img key={i} src={restaurantMichelinStarIconUrl} alt="" className={styles.carouselStarImg} />
                        ))}
                      </div>
                      <p className={styles.carouselName}>{restaurant.name}</p>
                      <p className={styles.carouselMeta}>{restaurant.city}</p>
                      <p className={styles.carouselMeta}>{restaurant.cuisine}</p>
                      <div className={styles.carouselBottom}>
                        <span className={styles.carouselPrice}>{restaurant.price}</span>
                        <span className={styles.carouselLikes}>
                          <Heart size={12} />
                          <span>{restaurant.likes}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.filterBar}>
        {/* Recherche */}
        <div className={styles.searchBar}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Nom, ville, cuisine…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Rechercher un restaurant"
          />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch('')} aria-label="Effacer">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Distinction */}
        <DropdownFilter
          ref={distinctionRef}
          icon={<Award size={14} />}
          label="Distinction"
          count={distinctionFilters.length}
          isOpen={openMenu === 'distinction'}
          onToggle={() => toggle('distinction')}
          onClear={() => setDistinctionFilters([])}
        >
          {DISTINCTION_OPTIONS.map(opt => (
            <label key={opt.value} className={`${styles.dropdownItem} ${distinctionFilters.includes(opt.value) ? styles.dropdownItemChecked : ''}`}>
              <input type="checkbox" className={styles.checkbox} checked={distinctionFilters.includes(opt.value)} onChange={() => makeToggle(setDistinctionFilters)(opt.value)} />
              <span className={styles.dropdownItemContent}>
                {opt.stars !== undefined
                  ? <span className={styles.miniStars}>{Array.from({ length: opt.stars }, (_, i) => <img key={i} src={opt.img} alt="" className={styles.miniStarImg} />)}</span>
                  : <img src={opt.img} alt="" className={styles.miniDistinctionImg} />
                }
                <span>{opt.label}</span>
              </span>
            </label>
          ))}
        </DropdownFilter>

        {/* Cuisine */}
        <DropdownFilter
          ref={cuisineRef}
          icon={<Utensils size={14} />}
          label="Cuisine"
          count={cuisineFilters.length}
          isOpen={openMenu === 'cuisine'}
          onToggle={() => toggle('cuisine')}
          onClear={() => setCuisineFilters([])}
          scrollable
        >
          {cuisineOptions.map(c => (
            <label key={c} className={`${styles.dropdownItem} ${cuisineFilters.includes(c) ? styles.dropdownItemChecked : ''}`}>
              <input type="checkbox" className={styles.checkbox} checked={cuisineFilters.includes(c)} onChange={() => makeToggle(setCuisineFilters)(c)} />
              <span>{c}</span>
            </label>
          ))}
        </DropdownFilter>

        {/* Prix */}
        <DropdownFilter
          ref={priceRef}
          icon={<Coins size={14} />}
          label="Prix"
          count={priceFilters.length}
          isOpen={openMenu === 'price'}
          onToggle={() => toggle('price')}
          onClear={() => setPriceFilters([])}
        >
          {PRICE_OPTIONS.map(opt => (
            <label key={opt.value} className={`${styles.dropdownItem} ${priceFilters.includes(opt.value) ? styles.dropdownItemChecked : ''}`}>
              <input type="checkbox" className={styles.checkbox} checked={priceFilters.includes(opt.value)} onChange={() => makeToggle(setPriceFilters)(opt.value)} />
              <span className={styles.priceLabel}>{opt.label}</span>
            </label>
          ))}
        </DropdownFilter>

        {/* Pays */}
        <DropdownFilter
          ref={countryRef}
          icon={<Globe size={14} />}
          label="Pays"
          count={countryFilters.length}
          isOpen={openMenu === 'country'}
          onToggle={() => toggle('country')}
          onClear={() => setCountryFilters([])}
          scrollable
        >
          {countryOptions.map(c => (
            <label key={c} className={`${styles.dropdownItem} ${countryFilters.includes(c) ? styles.dropdownItemChecked : ''}`}>
              <input type="checkbox" className={styles.checkbox} checked={countryFilters.includes(c)} onChange={() => makeToggle(setCountryFilters)(c)} />
              <span>{c}</span>
            </label>
          ))}
        </DropdownFilter>

        {/* Services */}
        <DropdownFilter
          ref={facilityRef}
          icon={<ConciergeBell size={14} />}
          label="Services"
          count={facilityFilters.length}
          isOpen={openMenu === 'facility'}
          onToggle={() => toggle('facility')}
          onClear={() => setFacilityFilters([])}
          scrollable
        >
          {FACILITY_OPTIONS.map(opt => (
            <label key={opt.value} className={`${styles.dropdownItem} ${facilityFilters.includes(opt.value) ? styles.dropdownItemChecked : ''}`}>
              <input type="checkbox" className={styles.checkbox} checked={facilityFilters.includes(opt.value)} onChange={() => makeToggle(setFacilityFilters)(opt.value)} />
              <span>{opt.label}</span>
            </label>
          ))}
        </DropdownFilter>

        {hasFilters && (
          <button className={styles.resetAll} onClick={resetAll}>
            <X size={13} /> Tout effacer
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.state}>
          <div className={styles.spinner} aria-label="Chargement" />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className={styles.empty}>Aucun restaurant pour ces filtres.</p>
          ) : (
            <div className={styles.grid}>
              {filtered.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  likes={likesById[restaurant.id] ?? getInitialLikeCount(restaurant)}
                  onLikeChange={handleLikeChange}
                  isLiked={likedRestaurantIds.has(restaurant.id)}
                  isSaved={savedRestaurantIds.has(restaurant.id)}
                  onSaveClick={handleOpenSaveModal}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
    </>
  )
}

// ── Composant dropdown réutilisable ──────────────────────────
import { forwardRef } from 'react'

interface DropdownFilterProps {
  icon: React.ReactNode
  label: string
  count: number
  isOpen: boolean
  onToggle: () => void
  onClear: () => void
  scrollable?: boolean
  children: React.ReactNode
}

const DropdownFilter = forwardRef<HTMLDivElement, DropdownFilterProps>(
  ({ icon, label, count, isOpen, onToggle, onClear, scrollable, children }, ref) => {
    return (
      <div className={styles.dropdown} ref={ref}>
        <button
          className={`${styles.dropdownTrigger} ${count > 0 ? styles.dropdownActive : ''}`}
          onClick={onToggle}
        >
          {icon}
          <span>{label}</span>
          {count > 0 && <span className={styles.badge}>{count}</span>}
          <ChevronDown size={13} className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`} />
        </button>

        {isOpen && (
          <div className={`${styles.dropdownMenu} ${scrollable ? styles.dropdownMenuScrollable : ''}`}>
            {children}
            {count > 0 && (
              <button className={styles.clearOption} onClick={onClear}>
                <X size={11} /> Réinitialiser
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
)
