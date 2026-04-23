import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Clock, Upload } from 'lucide-react'
import * as professionalService from '../../../services/professional.service'
import { useAuth } from '../../../contexts/AuthContext'
import styles from './ProfessionalRequestForm.module.css'

interface ProfessionalRequestFormProps {
  restaurants: Array<{ id: number; name: string }>
  onSuccess?: () => void
}

export default function ProfessionalRequestForm({ restaurants, onSuccess }: ProfessionalRequestFormProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [pendingRequest, setPendingRequest] = useState<{ restaurantName: string; createdAt: string } | null>(null)
  const token = localStorage.getItem('auth_token')

  useEffect(() => {
    if (!token) return
    professionalService.getMyProfessionalRequests(token)
      .then((requests) => {
        const pending = requests.find((r) => r.status === 'pending')
        if (pending) {
          setPendingRequest({
            restaurantName: (pending as unknown as { restaurantName: string }).restaurantName,
            createdAt: (pending as unknown as { createdAt: string }).createdAt,
          })
        }
      })
      .catch(() => {})
  }, [token])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProofFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!restaurantId || !proofFile) {
      setError('Veuillez sélectionner un restaurant et télécharger un document justificatif')
      return
    }

    if (!token) {
      setError('Vous devez être connecté')
      return
    }

    setLoading(true)

    try {
      // In a real app, you would upload the file to a storage service
      // For now, we'll use a mock URL
      const proofDocumentUrl = `proof_${Date.now()}_${proofFile.name}`

      await professionalService.createProfessionalRequest(token, {
        restaurantId: parseInt(restaurantId),
        proofDocumentUrl,
      })

      setSuccess(true)
      setRestaurantId('')
      setProofFile(null)
      onSuccess?.()

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (pendingRequest) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Gérer mon établissement</h2>
        <div className={`${styles.alert} ${styles.pendingAlert}`}>
          <Clock size={20} />
          <div>
            <strong>Demande en attente de validation</strong>
            <p>Vous avez soumis une demande pour <strong>{pendingRequest.restaurantName}</strong> le {new Date(pendingRequest.createdAt).toLocaleDateString('fr-FR')}. Un administrateur examinera votre demande prochainement.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gérer mon établissement</h2>
      <p className={styles.description}>
        Veuillez remplir ce formulaire pour accéder à la gestion des données de votre établissement. Mettre à jour les informations de votre établissement favorisera votre référencement.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div className={styles.alert}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {success && (
          <div className={`${styles.alert} ${styles.success}`}>
            <CheckCircle size={18} />
            Demande envoyée avec succès ! Un administrateur examinera votre demande.
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Informations personnelles</label>
          <div className={styles.infoGroup}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nom :</span>
              <span className={styles.infoValue}>{user?.lastName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Prénom :</span>
              <span className={styles.infoValue}>{user?.firstName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email :</span>
              <span className={styles.infoValue}>{user?.email}</span>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="restaurant" className={styles.label}>
            Établissement <span className={styles.required}>*</span>
          </label>
          <select
            id="restaurant"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Sélectionnez votre étabissement</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="proof" className={styles.label}>
            Acte de propriété <span className={styles.required}>*</span>
          </label>
          <div className={styles.fileInput}>
            <input
              type="file"
              id="proof"
              onChange={handleFileChange}
              className={styles.input}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              required
            />
            <div className={styles.fileLabel}>
              <Upload size={20} />
              {proofFile ? (
                <span>{proofFile.name}</span>
              ) : (
                <>
                  <span className={styles.browse}>Cliquez pour parcourir</span>
                  <span className={styles.info}>ou glissez-déposez votre fichier</span>
                </>
              )}
            </div>
          </div>
          <p className={styles.hint}>Formats acceptés : PDF, JPG, PNG, DOC (Max 5MB)</p>
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Soumettre'}
        </button>
      </form>
    </div>
  )
}
