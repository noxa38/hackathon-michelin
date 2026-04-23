import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react'
import * as professionalService from '../../../services/professional.service'
import { type ProfessionalRequest } from '../../../types/professional.types'
import styles from './ProfessionalRequestsManager.module.css'

/* eslint-disable react-hooks/set-state-in-effect */

interface ProfessionalRequestsManagerProps {
  token: string
  onRequestsUpdated?: () => void
}

export default function ProfessionalRequestsManager({ 
  token, 
  onRequestsUpdated 
}: ProfessionalRequestsManagerProps) {
  const [requests, setRequests] = useState<ProfessionalRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [rejectionReasons, setRejectionReasons] = useState<Record<number, string>>({})

  async function fetchRequests() {
    try {
      setLoading(true)
      const data = await professionalService.getProfessionalRequests(token)
      setRequests(data)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApprove = async (requestId: number) => {
    try {
      setProcessingId(requestId)
      await professionalService.approveProfessionalRequest(token, requestId)
      await fetchRequests()
      onRequestsUpdated?.()
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve request')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (requestId: number) => {
    const reason = rejectionReasons[requestId]
    if (!reason.trim()) {
      setError('Veuillez fournir une raison de rejet')
      return
    }

    try {
      setProcessingId(requestId)
      await professionalService.rejectProfessionalRequest(token, requestId, reason)
      await fetchRequests()
      setRejectionReasons({ ...rejectionReasons, [requestId]: '' })
      onRequestsUpdated?.()
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject request')
    } finally {
      setProcessingId(null)
    }
  }

  const isValidUrl = (value: string) => {
    try {
      const parsed = new URL(value)
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
      return false
    }
  }

  const formatDate = (value?: string) => {
    if (!value) return 'Non renseigné'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('fr-FR')
  }

  const getStatusLabel = (status?: ProfessionalRequest['status']) => {
    if (status === 'approved') return 'Approuvée'
    if (status === 'rejected') return 'Rejetée'
    return 'En attente'
  }

  const getStatusClass = (status?: ProfessionalRequest['status']) => {
    if (status === 'approved') return styles.statusApproved
    if (status === 'rejected') return styles.statusRejected
    return styles.statusPending
  }

  const pendingRequests = requests.filter((request) => request.status === 'pending')
  const historyRequests = requests.filter((request) => request.status !== 'pending')

  const renderRequestDetails = (request: ProfessionalRequest) => (
    <div className={styles.cardContent}>
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>ID demande</span>
          <span className={styles.detailValue}>#{request.id}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Statut</span>
          <span className={styles.detailValue}>{getStatusLabel(request.status)}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Demandeur</span>
          <span className={styles.detailValue}>{request.firstName} {request.lastName}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Dernière mise à jour</span>
          <span className={styles.detailValue}>{formatDate(request.updatedAt)}</span>
        </div>
      </div>

      {request.rejectionReason && (
        <div className={styles.rejectReasonBox}>
          <span className={styles.detailLabel}>Motif actuel de rejet</span>
          <p className={styles.rejectReasonText}>{request.rejectionReason}</p>
        </div>
      )}

      <div className={styles.proofSection}>
        <label className={styles.label}>Document Justificatif :</label>
        {isValidUrl(request.proofDocumentUrl) ? (
          <a
            href={request.proofDocumentUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.proofLink}
          >
            Ouvrir le justificatif
          </a>
        ) : (
          <p className={styles.proof}>{request.proofDocumentUrl}</p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => handleApprove(request.id)}
          disabled={processingId === request.id}
          className={`${styles.button} ${styles.approve}`}
        >
          <CheckCircle size={18} />
          Approuver
        </button>

        <div className={styles.rejectSection}>
          <textarea
            value={rejectionReasons[request.id] || ''}
            onChange={(e) =>
              setRejectionReasons({
                ...rejectionReasons,
                [request.id]: e.target.value,
              })
            }
            placeholder="Raison de rejet..."
            className={styles.textarea}
          />
          <button
            onClick={() => handleReject(request.id)}
            disabled={processingId === request.id}
            className={`${styles.button} ${styles.reject}`}
          >
            <XCircle size={18} />
            Rejeter
          </button>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader size={32} className={styles.spinner} />
        <p>Chargement des demandes...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Demandes administratives</h2>

      {error && (
        <div className={styles.alert}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <section className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>Demandes en attente</h3>

        {pendingRequests.length === 0 ? (
          <div className={styles.empty}>
            <CheckCircle size={48} />
            <h3>Aucune demande en attente</h3>
            <p>Toutes les demandes ont été traitées</p>
          </div>
        ) : (
          <div className={styles.list}>
            {pendingRequests.map((request) => (
              <div key={request.id} className={styles.card}>
                <div
                  className={styles.cardHeader}
                  onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedId(expandedId === request.id ? null : request.id)
                    }
                  }}
                >
                  <div className={styles.info}>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Demandeur</span>
                        <span className={styles.infoValue}>
                          {request.firstName} {request.lastName}
                        </span>
                      </div>

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email</span>
                        <span className={styles.infoValue}>{request.email || 'Non renseigné'}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Établissement</span>
                        <span className={styles.infoValue}>{request.restaurantName || 'Non renseigné'}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Date de demande</span>
                        <span className={styles.infoValue}>{formatDate(request.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.toggleButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedId(expandedId === request.id ? null : request.id)
                    }}
                    aria-label={expandedId === request.id ? 'Réduire la demande' : 'Développer la demande'}
                  >
                    {expandedId === request.id ? '▼' : '▶'}
                  </button>
                </div>

                {expandedId === request.id && renderRequestDetails(request)}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>Historique des demandes</h3>

        {historyRequests.length === 0 ? (
          <p className={styles.historyEmpty}>Aucun historique pour le moment.</p>
        ) : (
          <div className={styles.list}>
            {historyRequests.map((request) => (
              <div key={request.id} className={styles.card}>
                <div
                  className={`${styles.cardHeader} ${styles.condensedHeader}`}
                  onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedId(expandedId === request.id ? null : request.id)
                    }
                  }}
                >
                  <div className={styles.condensedRow}>
                    <span className={styles.condensedItem}><strong>ID:</strong> #{request.id}</span>
                    <span className={styles.condensedItem}><strong>Date:</strong> {formatDate(request.createdAt)}</span>
                    <span className={styles.condensedItem}><strong>Resto:</strong> {request.restaurantName || 'Non renseigné'}</span>
                    <span className={`${styles.statusBadge} ${getStatusClass(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </div>
                  <button
                    className={styles.toggleButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedId(expandedId === request.id ? null : request.id)
                    }}
                    aria-label={expandedId === request.id ? 'Réduire la demande' : 'Développer la demande'}
                  >
                    {expandedId === request.id ? '▼' : '▶'}
                  </button>
                </div>

                {expandedId === request.id && renderRequestDetails(request)}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
