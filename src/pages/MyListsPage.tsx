import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, Hotel, UtensilsCrossed } from 'lucide-react'
import * as authService from '../services/auth.service'
import RestaurantDetailModal from '../components/features/RestaurantDetailModal'
import { getListAccommodations, getListRestaurants, getLists } from '../services/list.service'
import type { List } from '../types/auth.types'
import type { Accommodation } from '../types/accommodation.types'
import type { Restaurant } from '../types/restaurant.types'
import styles from './MyListsPage.module.css'

interface ListCounts {
  restaurants: number
  accommodations: number
  total: number
}

const RESTAURANTS_LIKED_LIST_NAME = 'Restaurants likés'
const ACCOMMODATIONS_LIKED_LIST_NAME = 'Hébergements likées'

function MyListsPage() {
  const navigate = useNavigate()
  const [lists, setLists] = useState<List[]>([])
  const [countsByListId, setCountsByListId] = useState<Record<number, ListCounts>>({})
  const [selectedListId, setSelectedListId] = useState<number | null>(null)
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>([])
  const [selectedAccommodations, setSelectedAccommodations] = useState<Accommodation[]>([])
  const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState<Restaurant | null>(null)
  const [isRestaurantDetailOpen, setIsRestaurantDetailOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [error, setError] = useState('')

  const token = authService.getToken()

  useEffect(() => {
    const currentToken = token
    if (!currentToken) {
      navigate('/auth?message=lists')
      return
    }
    const authToken: string = currentToken

    async function loadListsPage() {
      try {
        setLoading(true)
        const userLists = await getLists(authToken)
        setLists(userLists)

        const countsEntries = await Promise.all(
          userLists.map(async (list) => {
            const [restaurants, accommodations] = await Promise.all([
              getListRestaurants(authToken, list.id).catch(() => []),
              getListAccommodations(authToken, list.id).catch(() => []),
            ])

            return [
              list.id,
              {
                restaurants: restaurants.length,
                accommodations: accommodations.length,
                total: restaurants.length + accommodations.length,
              },
            ] as const
          })
        )

        setCountsByListId(Object.fromEntries(countsEntries))

        if (userLists.length > 0) {
          setSelectedListId(userLists[0].id)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Impossible de charger les listes')
      } finally {
        setLoading(false)
      }
    }

    loadListsPage()
  }, [token, navigate])

  useEffect(() => {
    const currentToken = token
    if (!currentToken || !selectedListId) return
    const authToken: string = currentToken
    const listId: number = selectedListId

    async function loadListDetails() {
      try {
        setDetailsLoading(true)
        const [restaurants, accommodations] = await Promise.all([
          getListRestaurants(authToken, listId).catch(() => []),
          getListAccommodations(authToken, listId).catch(() => []),
        ])
        setSelectedRestaurants(restaurants as Restaurant[])
        setSelectedAccommodations(accommodations as Accommodation[])
      } finally {
        setDetailsLoading(false)
      }
    }

    loadListDetails()
  }, [token, selectedListId])

  const selectedList = useMemo(
    () => lists.find((list) => list.id === selectedListId) || null,
    [lists, selectedListId]
  )

  return (
    <>
    <RestaurantDetailModal
      restaurant={selectedRestaurantDetail}
      isOpen={isRestaurantDetailOpen}
      onClose={() => {
        setIsRestaurantDetailOpen(false)
        setSelectedRestaurantDetail(null)
      }}
    />
    <main className={styles.container}>
      <section className={styles.header}>
        <h1>Mes listes</h1>
        <p>Toutes vos listes personnalisées et vos éléments likés sont affichés ici.</p>
      </section>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <p className={styles.info}>Chargement de vos listes...</p>
      ) : lists.length === 0 ? (
        <div className={styles.emptyState}>
          <Bookmark size={34} />
          <p>Vous n&apos;avez encore aucune liste.</p>
        </div>
      ) : (
        <div className={styles.layout}>
          <aside className={styles.listPanel}>
            {lists.map((list) => {
              const counts = countsByListId[list.id] || { restaurants: 0, accommodations: 0, total: 0 }
              return (
                <button
                  key={list.id}
                  className={`${styles.listButton} ${selectedListId === list.id ? styles.listButtonActive : ''}`}
                  onClick={() => setSelectedListId(list.id)}
                >
                  <div className={styles.listButtonTop}>
                    <span className={styles.listName}>{list.name}</span>
                    <span className={styles.totalBadge}>{counts.total}</span>
                  </div>
                  <div className={styles.listCounts}>
                    <span>
                      <UtensilsCrossed size={14} /> {counts.restaurants}
                    </span>
                    <span>
                      <Hotel size={14} /> {counts.accommodations}
                    </span>
                  </div>
                </button>
              )
            })}
          </aside>

          <section className={styles.detailsPanel}>
            {selectedList && (
              <>
                <h2>{selectedList.name}</h2>
                {detailsLoading ? (
                  <p className={styles.info}>Chargement des éléments...</p>
                ) : (
                  <>
                    {selectedList.name !== ACCOMMODATIONS_LIKED_LIST_NAME && (
                      <div className={styles.group}>
                        <h3>Restaurants</h3>
                        {selectedRestaurants.length === 0 ? (
                          <p className={styles.muted}>Aucun restaurant dans cette liste.</p>
                        ) : (
                          <ul className={styles.items}>
                            {selectedRestaurants.map((restaurant) => (
                              <li
                                key={`restaurant-${restaurant.id}`}
                                className={`${styles.item} ${styles.itemClickable}`}
                                onClick={() => {
                                  setSelectedRestaurantDetail(restaurant)
                                  setIsRestaurantDetailOpen(true)
                                }}
                              >
                                <strong>{restaurant.name}</strong>
                                <span>{restaurant.city}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {selectedList.name !== RESTAURANTS_LIKED_LIST_NAME && (
                      <div className={styles.group}>
                        <h3>Hébergements</h3>
                        {selectedAccommodations.length === 0 ? (
                          <p className={styles.muted}>Aucun hébergement dans cette liste.</p>
                        ) : (
                          <ul className={styles.items}>
                            {selectedAccommodations.map((accommodation) => (
                              <li key={`accommodation-${accommodation.id}`} className={styles.item}>
                                <strong>{accommodation.name}</strong>
                                <span>{accommodation.city}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </main>
    </>
  )
}

export default MyListsPage
