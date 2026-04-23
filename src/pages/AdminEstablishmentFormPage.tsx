import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Hotel, Save } from 'lucide-react'
import { getToken, getUser } from '../services/auth.service'
import {
  createHotelAsAdmin,
  fetchAccommodationById,
  updateHotelAsAdmin,
} from '../services/accommodation.service'
import {
  createRestaurantAsAdmin,
  fetchRestaurantById,
  updateRestaurantAsAdmin,
} from '../services/restaurant.service'
import styles from './AdminEstablishmentFormPage.module.css'

type EditableType = 'restaurant' | 'hotel'

interface FormData {
  name: string
  address: string
  city: string
  country: string
  latitude: string
  longitude: string
  stars: string
  phone: string
  description: string
  facilities: string
  price: string
  photoUrl: string
  location: string
  cuisine: string
  award: string
  greenStar: string
  openingHours: string
  michelinUrl: string
  websiteUrl: string
}

const initialFormData: FormData = {
  name: '',
  address: '',
  city: '',
  country: '',
  latitude: '',
  longitude: '',
  stars: '',
  phone: '',
  description: '',
  facilities: '',
  price: '',
  photoUrl: '',
  location: '',
  cuisine: '',
  award: '',
  greenStar: '0',
  openingHours: '',
  michelinUrl: '',
  websiteUrl: '',
}

function toNullableNumber(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const numericValue = Number(trimmed)
  return Number.isFinite(numericValue) ? numericValue : null
}

function toNullableString(value: string): string | null {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

export default function AdminEstablishmentFormPage() {
  const navigate = useNavigate()
  const { type, id } = useParams<{ type?: string; id?: string }>()
  const token = getToken()
  const currentUser = getUser()

  const isEditMode = Boolean(type && id)
  const initialType: EditableType = type === 'hotel' ? 'hotel' : 'restaurant'
  const [establishmentType, setEstablishmentType] = useState<EditableType>(initialType)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pageTitle = useMemo(() => {
    if (isEditMode) {
      return establishmentType === 'restaurant' ? 'Modifier le restaurant' : 'Modifier l\'hébergement'
    }
    return 'Créer un établissement'
  }, [establishmentType, isEditMode])

  useEffect(() => {
    if (!token || currentUser?.userType !== 'admin') {
      navigate('/dashboard')
    }
  }, [token, currentUser, navigate])

  useEffect(() => {
    if (!isEditMode || !token || !id) return

    const loadDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        if (type === 'hotel') {
          const accommodation = await fetchAccommodationById(id)
          setEstablishmentType('hotel')
          setFormData({
            ...initialFormData,
            name: accommodation.name ?? '',
            address: accommodation.address ?? '',
            city: accommodation.city ?? '',
            country: accommodation.country ?? '',
            latitude: accommodation.latitude != null ? String(accommodation.latitude) : '',
            longitude: accommodation.longitude != null ? String(accommodation.longitude) : '',
            stars: accommodation.stars != null ? String(accommodation.stars) : '',
            phone: accommodation.phone ?? '',
            description: accommodation.description ?? '',
            facilities: accommodation.facilities ?? '',
            price: accommodation.price_from != null ? String(accommodation.price_from) : '',
            photoUrl: accommodation.photo_url ?? accommodation.image_url ?? '',
          })
          return
        }

        const restaurantId = Number(id)
        const restaurant = await fetchRestaurantById(restaurantId)
        setEstablishmentType('restaurant')
        setFormData({
          ...initialFormData,
          name: restaurant.name ?? '',
          address: restaurant.address ?? '',
          location: restaurant.location ?? '',
          city: restaurant.city ?? '',
          country: (restaurant as { country?: string }).country ?? '',
          price: restaurant.price ?? '',
          cuisine: restaurant.cuisine ?? '',
          longitude: restaurant.longitude != null ? String(restaurant.longitude) : '',
          latitude: restaurant.latitude != null ? String(restaurant.latitude) : '',
          phone: restaurant.phone_number ?? '',
          michelinUrl: restaurant.michelin_url ?? '',
          websiteUrl: restaurant.website_url ?? '',
          award: restaurant.award ?? '',
          stars: restaurant.stars != null ? String(restaurant.stars) : '',
          greenStar: restaurant.green_star != null ? String(restaurant.green_star) : '0',
          facilities: restaurant.facilities ?? '',
          description: restaurant.description ?? '',
          openingHours: restaurant.opening_hours ?? '',
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la fiche')
      } finally {
        setLoading(false)
      }
    }

    void loadDetails()
  }, [id, isEditMode, token, type])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) return

    if (!formData.name.trim()) {
      setError('Le nom est requis')
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      if (establishmentType === 'restaurant') {
        const payload = {
          name: formData.name.trim(),
          address: toNullableString(formData.address),
          location: toNullableString(formData.location),
          city: toNullableString(formData.city),
          country: toNullableString(formData.country),
          price: toNullableString(formData.price),
          cuisine: toNullableString(formData.cuisine),
          longitude: toNullableNumber(formData.longitude),
          latitude: toNullableNumber(formData.latitude),
          phone_number: toNullableString(formData.phone),
          michelin_url: toNullableString(formData.michelinUrl),
          website_url: toNullableString(formData.websiteUrl),
          award: toNullableString(formData.award),
          stars: toNullableNumber(formData.stars),
          green_star: toNullableNumber(formData.greenStar),
          facilities: toNullableString(formData.facilities),
          description: toNullableString(formData.description),
          opening_hours: toNullableString(formData.openingHours),
        }

        if (isEditMode && id) {
          await updateRestaurantAsAdmin(token, Number(id), payload)
        } else {
          await createRestaurantAsAdmin(token, payload)
        }
      } else {
        const payload = {
          name: formData.name.trim(),
          address: toNullableString(formData.address),
          city: toNullableString(formData.city),
          country: toNullableString(formData.country),
          latitude: toNullableNumber(formData.latitude),
          longitude: toNullableNumber(formData.longitude),
          stars: toNullableNumber(formData.stars),
          phone: toNullableString(formData.phone),
          description: toNullableString(formData.description),
          facilities: toNullableString(formData.facilities),
          price_from: toNullableNumber(formData.price),
          photo_url: toNullableString(formData.photoUrl),
        }

        if (isEditMode && id) {
          await updateHotelAsAdmin(token, Number(id), payload)
        } else {
          await createHotelAsAdmin(token, payload)
        }
      }

      navigate('/admin-dashboard?tab=establishments')
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
            onClick={() => navigate('/admin-dashboard?tab=establishments')}
          >
            <ArrowLeft size={16} />
            Retour aux fiches
          </button>
          <h1 className={styles.title}>{pageTitle}</h1>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {loading ? (
          <div className={styles.state}>Chargement...</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {!isEditMode && (
              <div className={styles.fieldFull}>
                <label className={styles.label}>Type d'établissement</label>
                <div className={styles.typeSwitch}>
                  <button
                    type="button"
                    className={`${styles.typeButton} ${establishmentType === 'restaurant' ? styles.typeButtonActive : ''}`}
                    onClick={() => setEstablishmentType('restaurant')}
                  >
                    <Building2 size={16} />
                    Restaurant
                  </button>
                  <button
                    type="button"
                    className={`${styles.typeButton} ${establishmentType === 'hotel' ? styles.typeButtonActive : ''}`}
                    onClick={() => setEstablishmentType('hotel')}
                  >
                    <Hotel size={16} />
                    Hôtel
                  </button>
                </div>
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Nom *</label>
              <input id="name" className={styles.input} value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="city" className={styles.label}>Ville</label>
              <input id="city" className={styles.input} value={formData.city} onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))} />
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="address" className={styles.label}>Adresse</label>
              <input id="address" className={styles.input} value={formData.address} onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="country" className={styles.label}>Pays</label>
              <input id="country" className={styles.input} value={formData.country} onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>Téléphone</label>
              <input id="phone" className={styles.input} value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="stars" className={styles.label}>Étoiles</label>
              <input id="stars" className={styles.input} value={formData.stars} onChange={(e) => setFormData((prev) => ({ ...prev, stars: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="price" className={styles.label}>{establishmentType === 'restaurant' ? 'Prix' : 'Prix à partir de'}</label>
              <input id="price" className={styles.input} value={formData.price} onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="latitude" className={styles.label}>Latitude</label>
              <input id="latitude" className={styles.input} value={formData.latitude} onChange={(e) => setFormData((prev) => ({ ...prev, latitude: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label htmlFor="longitude" className={styles.label}>Longitude</label>
              <input id="longitude" className={styles.input} value={formData.longitude} onChange={(e) => setFormData((prev) => ({ ...prev, longitude: e.target.value }))} />
            </div>

            {establishmentType === 'restaurant' ? (
              <>
                <div className={styles.field}>
                  <label htmlFor="location" className={styles.label}>Localisation</label>
                  <input id="location" className={styles.input} value={formData.location} onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="cuisine" className={styles.label}>Cuisine</label>
                  <input id="cuisine" className={styles.input} value={formData.cuisine} onChange={(e) => setFormData((prev) => ({ ...prev, cuisine: e.target.value }))} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="award" className={styles.label}>Distinction</label>
                  <input id="award" className={styles.input} value={formData.award} onChange={(e) => setFormData((prev) => ({ ...prev, award: e.target.value }))} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="greenStar" className={styles.label}>Green Star (0 ou 1)</label>
                  <input id="greenStar" className={styles.input} value={formData.greenStar} onChange={(e) => setFormData((prev) => ({ ...prev, greenStar: e.target.value }))} />
                </div>

                <div className={styles.fieldFull}>
                  <label htmlFor="openingHours" className={styles.label}>Horaires d'ouverture</label>
                  <input id="openingHours" className={styles.input} value={formData.openingHours} onChange={(e) => setFormData((prev) => ({ ...prev, openingHours: e.target.value }))} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="michelinUrl" className={styles.label}>URL Michelin</label>
                  <input id="michelinUrl" className={styles.input} value={formData.michelinUrl} onChange={(e) => setFormData((prev) => ({ ...prev, michelinUrl: e.target.value }))} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="websiteUrl" className={styles.label}>Site web</label>
                  <input id="websiteUrl" className={styles.input} value={formData.websiteUrl} onChange={(e) => setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))} />
                </div>
              </>
            ) : (
              <div className={styles.fieldFull}>
                <label htmlFor="photoUrl" className={styles.label}>Photo URL</label>
                <input id="photoUrl" className={styles.input} value={formData.photoUrl} onChange={(e) => setFormData((prev) => ({ ...prev, photoUrl: e.target.value }))} />
              </div>
            )}

            <div className={styles.fieldFull}>
              <label htmlFor="facilities" className={styles.label}>Services / Installations</label>
              <textarea id="facilities" className={styles.textarea} rows={3} value={formData.facilities} onChange={(e) => setFormData((prev) => ({ ...prev, facilities: e.target.value }))} />
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <textarea id="description" className={styles.textarea} rows={5} value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} />
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
