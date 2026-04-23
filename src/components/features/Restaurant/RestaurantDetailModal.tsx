import { useState } from 'react'
import { X, Heart, Share2, MapPin, Clock, Phone, Globe, Utensils, Award } from 'lucide-react'
import type { Restaurant } from '../../../types/restaurant.types'
import PhotoCarousel from '../../ui/PhotoCarousel'
import styles from './RestaurantDetailModal.module.css'

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null
  isOpen: boolean
  onClose: () => void
  isLiked?: boolean
  onLikeToggle?: () => void
}

export default function RestaurantDetailModal({
  restaurant,
  isOpen,
  onClose,
  isLiked = false,
  onLikeToggle
}: RestaurantDetailModalProps) {
  const [showCarousel, setShowCarousel] = useState(false)

  if (!isOpen || !restaurant) return null

  const { name, address, city, phone_number, website_url, price, cuisine, stars, green_star, award, opening_hours, description, photos } = restaurant
  const hasPhotos = photos && photos.length > 0

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
          <X size={24} />
        </button>

        {/* Photos */}
        {hasPhotos && (
          <div 
            className={styles.photoSection}
            onClick={() => setShowCarousel(true)}
            role="button"
            tabIndex={0}
          >
            <img 
              src={photos[0].url} 
              alt={name}
              className={styles.mainPhoto}
            />
            {photos.length > 1 && (
              <div className={styles.photoCount}>
                +{photos.length - 1}
              </div>
            )}
          </div>
        )}

        {showCarousel && hasPhotos && (
          <PhotoCarousel
            photos={photos}
            restaurantName={name}
            onClose={() => setShowCarousel(false)}
          />
        )}

        <div className={styles.content}>
          {/* Header avec titre et actions */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>{name}</h1>
              <p className={styles.location}>
                <MapPin size={16} />
                {city}
              </p>
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} ${isLiked ? styles.actionButtonActive : ''}`}
                onClick={onLikeToggle}
                aria-label="Aimer ce restaurant"
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

          {/* Distinctions Michelin */}
          <div className={styles.distinctions}>
            {stars > 0 && (
              <div className={styles.distinction}>
                {Array.from({ length: stars }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            )}
            {green_star === 1 && (
              <div className={styles.distinction}>
                🌿 Étoile Verte
              </div>
            )}
            {award && !award.toLowerCase().includes('n/a') && (
              <div className={styles.distinction}>
                {award}
              </div>
            )}
          </div>

          {/* Informations principales */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <Utensils size={18} />
              <div>
                <p className={styles.infoLabel}>Cuisine</p>
                <p className={styles.infoValue}>{cuisine}</p>
              </div>
            </div>

            {price && (
              <div className={styles.infoCard}>
                <Award size={18} />
                <div>
                  <p className={styles.infoLabel}>Gamme de prix</p>
                  <p className={styles.infoValue}>{price}</p>
                </div>
              </div>
            )}

            {opening_hours && (
              <div className={styles.infoCard}>
                <Clock size={18} />
                <div>
                  <p className={styles.infoLabel}>Horaires</p>
                  <p className={styles.infoValue}>{opening_hours}</p>
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

            {phone_number && (
              <div className={styles.contactItem}>
                <Phone size={16} />
                <div>
                  <p className={styles.contactLabel}>Téléphone</p>
                  <a href={`tel:${phone_number}`} className={styles.contactLink}>
                    {phone_number}
                  </a>
                </div>
              </div>
            )}

            {website_url && (
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
