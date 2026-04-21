import { useEffect, useState } from 'react'
import { fetchAllRestaurants } from '../services/restaurant.service'
import RestaurantCard from '../components/features/RestaurantCard'
import type { Restaurant } from '../types/restaurant.types'
import styles from './RestaurantsPage.module.css'

type AwardFilter = 'all' | '3' | '1' | 'selected'

const FILTERS: { value: AwardFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: '3', label: '3 Étoiles' },
  { value: '1', label: '1 Étoile' },
  { value: 'selected', label: 'Sélection' },
]

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<AwardFilter>('all')

  useEffect(() => {
    fetchAllRestaurants()
      .then(setRestaurants)
      .catch(() => setError('Impossible de charger les restaurants. Vérifiez que le serveur est démarré.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = restaurants.filter(r => {
    if (filter === 'all') return true
    if (filter === '3') return r.stars === 3
    if (filter === '1') return r.stars === 1
    if (filter === 'selected') return r.stars === 0
    return true
  })

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.title}>Restaurants</h1>
        {!loading && !error && (
          <p className={styles.subtitle}>{restaurants.length} établissements sélectionnés</p>
        )}
      </section>

      <div className={styles.filters} role="group" aria-label="Filtrer par distinction">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
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
            <p className={styles.empty}>Aucun restaurant pour ce filtre.</p>
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
