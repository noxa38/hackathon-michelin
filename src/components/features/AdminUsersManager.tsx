import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2, UserRound } from 'lucide-react'
import { deleteAdminManagedUser, getAdminUsers } from '../../services/professional.service'
import type { AdminManagedUser } from '../../types/professional.types'
import styles from './AdminUsersManager.module.css'

interface Props {
  token: string
  currentUserId?: number
}

const ITEMS_PER_PAGE = 9

export default function AdminUsersManager({ token, currentUserId }: Props) {
  const navigate = useNavigate()
  const [items, setItems] = useState<AdminManagedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const users = await getAdminUsers(token)
      setItems(users)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des utilisateurs')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

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

  async function handleDelete(item: AdminManagedUser) {
    if (item.id === currentUserId) {
      setError('Vous ne pouvez pas supprimer votre propre compte')
      return
    }

    const confirmed = window.confirm('Supprimer cet utilisateur ? Cette action est irréversible.')
    if (!confirmed) return

    try {
      await deleteAdminManagedUser(token, item.id)
      setItems((previousItems) => previousItems.filter((entry) => entry.id !== item.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Utilisateurs</h2>
        <p className={styles.subtitle}>{items.length} utilisateur(s)</p>
      </div>

      {loading ? (
        <div className={styles.state}>Chargement des utilisateurs...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : visibleItems.length === 0 ? (
        <div className={styles.state}>Aucun utilisateur disponible.</div>
      ) : (
        <div className={styles.list}>
          {visibleItems.map((item) => (
            <article key={item.id} className={styles.row}>
              <div className={styles.mainInfo}>
                <div className={styles.typeBadge}>
                  <UserRound size={14} />
                  <span>{item.userType}</span>
                </div>
                <h3 className={styles.name}>{item.firstName} {item.lastName}</h3>
                <p className={styles.meta}>@{item.username} · {item.email}</p>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={() => navigate(`/admin-dashboard/utilisateurs/${item.id}/edit`)}
                >
                  <Pencil size={14} />
                  Modifier
                </button>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => void handleDelete(item)}
                  disabled={item.id === currentUserId}
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
          onClick={() => navigate('/admin-dashboard/utilisateurs/new')}
        >
          <Plus size={16} />
          Créer
        </button>
      </div>
    </div>
  )
}
