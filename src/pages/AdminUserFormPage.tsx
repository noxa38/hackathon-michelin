import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { getToken, getUser } from '../services/auth.service'
import {
  createAdminManagedUser,
  getAdminUsers,
  updateAdminManagedUser,
} from '../services/professional.service'
import styles from './AdminUserFormPage.module.css'

interface FormData {
  firstName: string
  lastName: string
  username: string
  email: string
  userType: 'individual' | 'professional' | 'admin'
  password: string
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  userType: 'individual',
  password: '',
}

export default function AdminUserFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const token = getToken()
  const currentUser = getUser()

  const isEditMode = Boolean(id)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pageTitle = useMemo(
    () => (isEditMode ? 'Modifier utilisateur' : 'Créer un utilisateur'),
    [isEditMode],
  )

  useEffect(() => {
    if (!token || currentUser?.userType !== 'admin') {
      navigate('/dashboard')
    }
  }, [token, currentUser, navigate])

  useEffect(() => {
    if (!isEditMode || !token || !id) return

    const loadUser = async () => {
      try {
        setLoading(true)
        setError(null)
        const users = await getAdminUsers(token)
        const selectedUser = users.find((entry) => entry.id === Number(id))

        if (!selectedUser) {
          setError('Utilisateur introuvable')
          return
        }

        setFormData({
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          username: selectedUser.username,
          email: selectedUser.email,
          userType: selectedUser.userType,
          password: '',
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'utilisateur')
      } finally {
        setLoading(false)
      }
    }

    void loadUser()
  }, [id, isEditMode, token])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) return

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.username.trim() || !formData.email.trim()) {
      setError('Tous les champs obligatoires doivent être remplis')
      return
    }

    if (!isEditMode && !formData.password.trim()) {
      setError('Le mot de passe est requis à la création')
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        userType: formData.userType,
        password: formData.password.trim() || undefined,
      }

      if (isEditMode && id) {
        await updateAdminManagedUser(token, Number(id), payload)
      } else {
        await createAdminManagedUser(token, payload)
      }

      navigate('/admin-dashboard?tab=users')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.shell}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate('/admin-dashboard?tab=users')}
          >
            <ArrowLeft size={16} />
            Retour utilisateurs
          </button>
          <h1 className={styles.title}>{pageTitle}</h1>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {loading ? (
          <div className={styles.state}>Chargement...</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>Prénom *</label>
              <input id="firstName" className={styles.input} value={formData.firstName} onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>Nom *</label>
              <input id="lastName" className={styles.input} value={formData.lastName} onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Nom d'utilisateur *</label>
              <input id="username" className={styles.input} value={formData.username} onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email *</label>
              <input id="email" type="email" className={styles.input} value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="userType" className={styles.label}>Type de compte *</label>
              <select id="userType" className={styles.select} value={formData.userType} onChange={(e) => setFormData((prev) => ({ ...prev, userType: e.target.value as FormData['userType'] }))}>
                <option value="individual">Individual</option>
                <option value="professional">Professional</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>{isEditMode ? 'Mot de passe (optionnel)' : 'Mot de passe *'}</label>
              <input id="password" type="password" className={styles.input} value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.submitButton} disabled={submitting}>
                <Save size={16} />
                {submitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
