import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, ChevronLeft, ChevronRight, Hotel, Pencil, Plus, Trash2 } from 'lucide-react'
import { fetchAccommodations, deleteHotelAsAdmin } from '../../../services/accommodation.service'
import { fetchAllRestaurants, deleteRestaurantAsAdmin } from '../../../services/restaurant.service'
import type { Accommodation } from '../../../types/accommodation.types'
import type { Restaurant } from '../../../types/restaurant.types'
import styles from './AdminEstablishmentsManager.module.css'

/* eslint-disable react-hooks/set-state-in-effect */

interface Props {
  token: string
}

type EstablishmentType = 'restaurant' | 'hotel'

interface EstablishmentItem {
  id: number
  type: EstablishmentType
  name: string
  city: string
  address: string
}

const ITEMS_PER_PAGE = 9

export default function AdminEstablishmentsManager({ token }: Props) {
  const navigate = useNavigate()
  const [items, setItems] = useState<EstablishmentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const loadEstablishments = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [restaurants, accommodations] = await Promise.all([
        fetchAllRestaurants(),
        fetchAccommodations(),
      ])

      const restaurantItems = restaurants.map((restaurant: Restaurant) => ({
        id: restaurant.id,
        type: 'restaurant' as const,
        name: restaurant.name,
        city: restaurant.city || '—',
        address: restaurant.address || '—',
      }))

      const hotelItems = accommodations.reduce<EstablishmentItem[]>((accumulator, accommodation: Accommodation) => {
        const parsedId = Number(accommodation.id)
        if (!Number.isFinite(parsedId)) return accumulator

        accumulator.push({
          id: parsedId,
          type: 'hotel',
          name: accommodation.name,
          city: accommodation.city || '—',
          address: accommodation.address || '—',
        })

        return accumulator
      }, [])

      const merged = [...restaurantItems, ...hotelItems].sort((left, right) => {
        const byName = left.name.localeCompare(right.name, 'fr', { sensitivity: 'base' })
        if (byName !== 0) return byName
        if (left.type === right.type) return left.id - right.id
        return left.type === 'restaurant' ? -1 : 1
      })

      setItems(merged)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des fiches')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadEstablishments()
  }, [loadEstablishments])

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const visibleItems = useMemo(
    () => items.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE),
    [items, safeCurrentPage],
  )

  async function handleDelete(item: EstablishmentItem) {
    const label = item.type === 'restaurant' ? 'ce restaurant' : 'cet hébergement'
    const confirmed = window.confirm(`Supprimer ${label} ? Cette action est irréversible.`)
    if (!confirmed) return

    try {
      if (item.type === 'restaurant') {
        await deleteRestaurantAsAdmin(token, item.id)
      } else {
        await deleteHotelAsAdmin(token, item.id)
      }

      setItems((previousItems) => previousItems.filter((entry) => !(entry.type === item.type && entry.id === item.id)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Fiches établissements</h2>
        <p className={styles.subtitle}>{items.length} établissement(s)</p>
      </div>

      {loading ? (
        <div className={styles.state}>Chargement des établissements...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : visibleItems.length === 0 ? (
        <div className={styles.state}>Aucune fiche disponible.</div>
      ) : (
        <div className={styles.list}>
          {visibleItems.map((item) => (
            <article key={`${item.type}-${item.id}`} className={styles.row}>
              <div className={styles.mainInfo}>
                <div className={styles.typeBadge}>
                  {item.type === 'restaurant' ? <Building2 size={14} /> : <Hotel size={14} />}
                  <span>{item.type === 'restaurant' ? 'Restaurant' : 'Hôtel'}</span>
                </div>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.meta}>{item.city} · {item.address}</p>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={() => navigate(`/admin-dashboard/fiches-etablissements/${item.type}/${item.id}/edit`)}
                >
                  <Pencil size={14} />
                  Modifier
                </button>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => void handleDelete(item)}
                >
                  <Trash2 size={14} />
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={safeCurrentPage === 1}
          >
            <ChevronLeft size={16} />
            Précédent
          </button>
          <span className={styles.paginationInfo}>Page {safeCurrentPage} / {totalPages}</span>
          <button
            type="button"
            className={styles.paginationButton}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safeCurrentPage === totalPages}
          >
            Suivant
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <div className={styles.footerAction}>
        <button
          type="button"
          className={styles.createButton}
          onClick={() => navigate('/admin-dashboard/fiches-etablissements/new')}
        >
          <Plus size={16} />
          Créer
        </button>
      </div>
    </div>
  )
}
