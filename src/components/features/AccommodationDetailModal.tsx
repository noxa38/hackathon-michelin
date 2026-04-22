import { X, Heart, Share2, MapPin, Tag, Phone, Globe, Star } from 'lucide-react'
import type { Accommodation } from '../../types/accommodation.types'
import styles from './AccommodationDetailModal.module.css'

interface AccommodationDetailModalProps {
  accommodation: Accommodation | null
  isOpen: boolean
  onClose: () => void
  isLiked?: boolean
  onLikeToggle?: () => void
}

export default function AccommodationDetailModal({
  accommodation,
  isOpen,
  onClose,
  isLiked = false,
  onLikeToggle
}: AccommodationDetailModalProps) {
  if (!isOpen || !accommodation) return null

  const {
    name,
    address,
    city,
    country,
    phone,
    website_url,
    photo_url,
    image_url,
    stars,
    rating_stars,
    price_from,
    facilities,
    description,
    category,
  } = accommodation

  const coverImage = image_url || photo_url
  const hasPhoto = coverImage && coverImage !== 'N/A'

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
          <X size={24} />
        </button>

        {/* Photo */}
        {hasPhoto && (
          <div className={styles.photoSection}>
            <img 
              src={coverImage} 
              alt={name}
              className={styles.mainPhoto}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x300?text=Hébergement'
              }}
            />
          </div>
        )}

        <div className={styles.content}>
          {/* Header avec titre et actions */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>{name}</h1>
              <p className={styles.location}>
                <MapPin size={16} />
                {city}{country ? `, ${country}` : ''}
              </p>
              {category && (
                <p className={styles.category}>{category}</p>
              )}
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} ${isLiked ? styles.actionButtonActive : ''}`}
                onClick={onLikeToggle}
                aria-label="Aimer cet hébergement"
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button
                className={styles.actionButton}
                aria-label="Partager"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Étoiles et prix */}
          <div className={styles.ratingSection}>
            {stars && (
              <div className={styles.starsContainer}>
                {Array.from({ length: stars }, (_, i) => (
                  <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
            )}
            {price_from && (
              <p className={styles.price}>
                À partir de <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price_from)}</span> / nuit
              </p>
            )}
          </div>

          {/* Informations principales */}
          <div className={styles.infoGrid}>
            {rating_stars && (
              <div className={styles.infoCard}>
                <Star size={18} />
                <div>
                  <p className={styles.infoLabel}>Note</p>
                  <p className={styles.infoValue}>{rating_stars}/5</p>
                </div>
              </div>
            )}

            {category && (
              <div className={styles.infoCard}>
                <Tag size={18} />
                <div>
                  <p className={styles.infoLabel}>Type</p>
                  <p className={styles.infoValue}>{category}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className={styles.contactSection}>
            {address && (
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <div>
                  <p className={styles.contactLabel}>Adresse</p>
                  <p className={styles.contactValue}>{address}</p>
                </div>
              </div>
            )}

            {phone && (
              <div className={styles.contactItem}>
                <Phone size={16} />
                <div>
                  <p className={styles.contactLabel}>Téléphone</p>
                  <a href={`tel:${phone}`} className={styles.contactLink}>
                    {phone}
                  </a>
                </div>
              </div>
            )}

            {website_url && website_url !== 'N/A' && (
              <div className={styles.contactItem}>
                <Globe size={16} />
                <div>
                  <p className={styles.contactLabel}>Site web</p>
                  <a href={website_url} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    Visiter le site
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Équipements */}
          {facilities && (
            <div className={styles.facilitiesSection}>
              <h2 className={styles.sectionTitle}>Équipements</h2>
              <p className={styles.facilities}>{facilities}</p>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>À propos</h2>
              <p className={styles.description}>{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
