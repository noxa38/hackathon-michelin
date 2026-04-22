import { useEffect, useMemo, useState } from 'react'
import { X, Plus, Bookmark } from 'lucide-react'
import { addAccommodationToList, addRestaurantToList, createList, getLists } from '../../services/list.service'
import type { List } from '../../types/auth.types'
import styles from './SaveToListModal.module.css'

type SaveItemType = 'restaurant' | 'accommodation'
type AccommodationSource = 'hotels' | 'accommodations'

interface SaveToListModalProps {
  isOpen: boolean
  token: string | null
  itemId: number | null
  itemType: SaveItemType
  accommodationSource?: AccommodationSource
  title: string
  onClose: () => void
  onSaved?: (savedItemId: number) => void
}

export default function SaveToListModal({
  isOpen,
  token,
  itemId,
  itemType,
  accommodationSource = 'hotels',
  title,
  onClose,
  onSaved,
}: SaveToListModalProps) {
  const [lists, setLists] = useState<List[]>([])
  const [selectedListId, setSelectedListId] = useState<number | ''>('')
  const [newListName, setNewListName] = useState('')
  const [loadingLists, setLoadingLists] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = useMemo(() => {
    return Boolean(itemId) && Boolean(token) && (selectedListId !== '' || newListName.trim())
  }, [itemId, token, selectedListId, newListName])

  useEffect(() => {
    if (!isOpen || !token) return

    setLoadingLists(true)
    setError('')

    getLists(token)
      .then((loadedLists) => setLists(loadedLists))
      .catch(() => setError('Impossible de charger vos listes.'))
      .finally(() => setLoadingLists(false))
  }, [isOpen, token])

  useEffect(() => {
    if (!isOpen) {
      setSelectedListId('')
      setNewListName('')
      setError('')
      setSaving(false)
      setLoadingLists(false)
    }
  }, [isOpen])

  async function handleSave() {
    if (!token || !itemId) return

    setSaving(true)
    setError('')

    try {
      let listIdToUse: number

      if (newListName.trim()) {
        const created = await createList(token, newListName.trim())
        setLists((current) => [created, ...current])
        listIdToUse = created.id
      } else if (selectedListId !== '') {
        listIdToUse = selectedListId
      } else {
        setError('Choisissez une liste ou créez-en une nouvelle.')
        setSaving(false)
        return
      }

      if (itemType === 'restaurant') {
        await addRestaurantToList(token, listIdToUse, itemId)
      } else {
        await addAccommodationToList(token, listIdToUse, itemId, accommodationSource)
      }

      onSaved?.(itemId)
      onClose()
    } catch {
      setError("Impossible d'enregistrer cet élément dans la liste sélectionnée.")
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          {loadingLists ? (
            <p className={styles.info}>Chargement des listes...</p>
          ) : (
            <>
              <label className={styles.label} htmlFor="save-list-select">
                Choisir une liste existante
              </label>
              <select
                id="save-list-select"
                className={styles.select}
                value={selectedListId}
                onChange={(e) => setSelectedListId(e.target.value ? Number(e.target.value) : '')}
                disabled={newListName.trim().length > 0}
              >
                <option value="">Sélectionner une liste...</option>
                {lists.filter(l => l.name !== 'Restaurants likés' && l.name !== 'Hébergements likées').map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>

              <div className={styles.separator}>ou</div>

              <label className={styles.label} htmlFor="save-list-create">
                Créer une nouvelle liste
              </label>
              <div className={styles.createRow}>
                <Plus size={16} />
                <input
                  id="save-list-create"
                  className={styles.input}
                  type="text"
                  placeholder="Nom de la nouvelle liste"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
            </>
          )}

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose} disabled={saving}>
            Annuler
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={!canSubmit || saving || loadingLists}
          >
            <Bookmark size={15} />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  )
}
