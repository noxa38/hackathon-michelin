import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Search, ChevronDown, X, Utensils, Award, Coins, Globe, ConciergeBell } from 'lucide-react'
import { fetchAllRestaurants } from '../services/restaurant.service'
import RestaurantCard from '../components/features/RestaurantCard'
import type { Restaurant } from '../types/restaurant.types'
import styles from './RestaurantsPage.module.css'

type DistinctionKey = '3' | '2' | '1' | 'bib' | 'green'

const DISTINCTION_OPTIONS: { value: DistinctionKey; label: string; img?: string; stars?: number }[] = [
  { value: '3',    label: '3 Étoiles',    img: '/etoile-michelin.png', stars: 3 },
  { value: '2',    label: '2 Étoiles',    img: '/etoile-michelin.png', stars: 2 },
  { value: '1',    label: '1 Étoile',     img: '/etoile-michelin.png', stars: 1 },
  { value: 'bib',  label: 'Bib Gourmand', img: '/Michelin_Big_gourmand.png' },
  { value: 'green',label: 'Étoile Verte', img: '/MICHELINGreenStar_green.png' },
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

function extractCountry(location: string): string {
  const parts = location.split(',')
  return parts[parts.length - 1].trim()
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
      .then(setRestaurants)
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
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.title}>Restaurants</h1>
        {!loading && !error && (
          <p className={styles.subtitle}>{restaurants.length} établissements · {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</p>
        )}
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
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
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
