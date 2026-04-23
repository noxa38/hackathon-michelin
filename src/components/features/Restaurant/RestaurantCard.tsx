import { useState } from 'react'
import { Heart, Bookmark, CalendarCheck, Clock, Images, RotateCw } from 'lucide-react'
import type { Restaurant } from '../../../types/restaurant.types'
import styles from './RestaurantCard.module.css'
import PhotoCarousel from '../../ui/PhotoCarousel'
import restaurantMichelinStarIconUrl from '../../../assets/img/restaurant-michelin-star-icon.png'
import michelinBigGourmandIconUrl from '../../../assets/img/michelin-big-gourmand-icon.png'
import michelinGreenStarIconUrl from '../../../assets/img/michelin-green-star-icon.png'

interface Props {
  restaurant: Restaurant
  likes?: number
  onLikeChange?: (restaurantId: number, nextLiked: boolean) => void
  isLiked?: boolean
  isSaved?: boolean
  onSaveClick?: (restaurantId: number) => void
  compact?: boolean
  showLikeButton?: boolean
}

const CUISINE_COLORS: [string, string][] = [
  ['Japanese', '#7c2d12'],
  ['Indian', '#92400e'],
  ['Seafood', '#164e63'],
  ['French', '#1e3a5f'],
  ['Creative', '#1c1c3a'],
  ['Regional', '#14532d'],
  ['Farm', '#166534'],
]

function getCardColor(cuisine: string): string {
  const lower = cuisine.toLowerCase()
  for (const [key, color] of CUISINE_COLORS) {
    if (lower.includes(key.toLowerCase())) return color
  }
  return '#1A1A1A'
}

function normalizePriceDisplay(value: string): string {
  return value
    .replace(/â‚¬/g, '€')
    .replace(/€/g, '€')
}

function buildRestaurantFallbackImage(restaurantId: number, cuisine: string, city: string): string {
  void cuisine
  void city
  const images = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop',
  ]
  return images[restaurantId % images.length]
}

function formatCityCountry(city?: string, country?: string, location?: string): string {
  const trimmedCity = city?.trim() ?? ''
  const trimmedCountry = country?.trim() ?? ''

  if (trimmedCity && trimmedCountry) return `${trimmedCity} · ${trimmedCountry}`
  if (trimmedCity) return trimmedCity
  if (trimmedCountry) return trimmedCountry

  if (location?.trim()) {
    const parts = location
      .split(',')
      .map(part => part.trim())
      .filter(Boolean)
    if (parts.length > 1) return `${parts[0]} · ${parts[parts.length - 1]}`
    if (parts.length === 1) return parts[0]
  }

  return 'Ville non renseignée'
}

function AwardBadge({ stars, award, green_star }: { stars: number; award: string; green_star: number }) {
  const isBib = award.toLowerCase().includes('bib') || award.toLowerCase().includes('gourmand')
  return (
    <div className={styles.awardRow}>
      {stars >= 1 && (
        <div className={styles.starsRow}>
          {Array.from({ length: stars }, (_, i) => (
            <img key={i} src={restaurantMichelinStarIconUrl} alt="Étoile Michelin" className={styles.starImg} />
          ))}
        </div>
      )}
      {stars === 0 && isBib && (
        <img src={michelinBigGourmandIconUrl} alt="Bib Gourmand" className={styles.bibImg} />
      )}
      {stars === 0 && !isBib && green_star !== 1 && (
        <span className={`${styles.award} ${styles.awardSelected}`}>{award}</span>
      )}
      {green_star === 1 && (
        <img src={michelinGreenStarIconUrl} alt="Étoile Verte Michelin" className={styles.greenStarImg} />
      )}
    </div>
  )
}

export default function RestaurantCard({
  restaurant,
  likes,
  onLikeChange,
  isLiked = false,
  isSaved = false,
  onSaveClick,
  compact = false,
  showLikeButton = true,
}: Props) {
  const [flipped, setFlipped] = useState(false)
  const [carouselOpen, setCarouselOpen] = useState(false)

  const { name, address, city, country, location, price, cuisine, description, opening_hours, stars, award, green_star, photos } = restaurant
  const displayPrice = normalizePriceDisplay(price)
  const cityCountry = formatCityCountry(city, country, location)
  const generatedFallbackCover = buildRestaurantFallbackImage(restaurant.id, cuisine, city)
  const fallbackCoverPhoto = (
    restaurant as Restaurant & { photo_url?: string; image_url?: string; photo?: string }
  ).photo_url
    ?? (restaurant as Restaurant & { photo_url?: string; image_url?: string; photo?: string }).image_url
    ?? (restaurant as Restaurant & { photo_url?: string; image_url?: string; photo?: string }).photo
  const hasPhotos = photos && photos.length > 0
  const coverPhoto = hasPhotos ? photos[0].url : fallbackCoverPhoto ?? generatedFallbackCover

  function handleLike(e: React.MouseEvent) {
    e.stopPropagation()
    onLikeChange?.(restaurant.id, !isLiked)
  }

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation()
    onSaveClick?.(restaurant.id)
  }

  function handlePhotoClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (hasPhotos) setCarouselOpen(true)
  }

  function handleMoreClick(e: React.MouseEvent) {
    e.stopPropagation()
    setFlipped(true)
  }

  return (
    <>
    <div
      className={`${styles.cardOuter} ${compact ? styles.compact : ''}`}
      onClick={() => setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-label={`Voir les détails de ${name}`}
      onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
    >
      <div className={`${styles.cardInner} ${flipped ? styles.flipped : ''}`}>

        {/* ── FACE AVANT ── */}
        <div className={styles.cardFront}>
          <div
            className={`${styles.photoArea} ${hasPhotos ? styles.photoAreaClickable : ''}`}
            style={coverPhoto
              ? { backgroundImage: `url(${coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : { background: `linear-gradient(145deg, ${getCardColor(cuisine)}, #000)` }
            }
            onClick={handlePhotoClick}
            role={hasPhotos ? 'button' : undefined}
            aria-label={hasPhotos ? `Voir les photos de ${name}` : undefined}
          >
            {!coverPhoto && <span className={styles.photoInitial}>{name.charAt(0)}</span>}
            {hasPhotos && (
              <div className={styles.photoCountBadge}>
                <Images size={12} />
                <span>{photos!.length}</span>
              </div>
            )}
            <div className={styles.photoHint}>
              {hasPhotos ? 'Cliquer pour voir les photos' : 'Cliquer pour voir les details'}
            </div>
          </div>

          <div className={styles.frontContent}>
            <div className={styles.frontAwardWrap}>
              <AwardBadge stars={stars} award={award} green_star={green_star} />
            </div>

            <h2 className={styles.name}>{name}</h2>

            <p className={styles.infoRow}>
              <span>{address}</span>
            </p>

            <p className={styles.infoRow}>
              <span>{cityCountry}</span>
            </p>

            <p className={styles.cuisine}>{cuisine}</p>

            <button
              type="button"
              className={styles.moreBtn}
              onClick={handleMoreClick}
              aria-label={`En savoir plus sur ${name}`}
            >
              <RotateCw size={12} />
              <span>En savoir plus</span>
            </button>

            <div className={styles.frontBottom}>
              <span className={styles.price}>{displayPrice}</span>
              {showLikeButton && onLikeChange && (
                <button
                  className={`${styles.likeBtn} ${isLiked ? styles.likedActive : ''}`}
                  onClick={handleLike}
                  aria-label="Liker ce restaurant"
                >
                  <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                  {likes !== undefined && <span>{likes}</span>}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── FACE ARRIÈRE ── */}
        <div className={styles.cardBack}>
          <div className={styles.backHeader}>
            <AwardBadge stars={stars} award={award} green_star={green_star} />
            <h2 className={styles.backName}>{name}</h2>
            <p className={styles.backCuisine}>{cuisine} · {displayPrice}</p>
          </div>

          <p className={styles.backDescription}>{description}</p>

          {opening_hours && (() => {
            const DAYS = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'] as const
            // JS getDay(): 0=Sun,1=Mon…6=Sat → index dans DAYS (Lun=0…Dim=6)
            const jsToIdx = [6,0,1,2,3,4,5]
            const todayKey = DAYS[jsToIdx[new Date().getDay()]]
            let schedule: Record<string, string> | null = null
            try { schedule = JSON.parse(opening_hours) } catch { schedule = null }

            if (!schedule) return (
              <div className={styles.backHours}>
                <Clock size={13} className={styles.backHoursIcon} />
                <span>{opening_hours}</span>
              </div>
            )

            if (compact) {
              const todayHours = schedule[todayKey] ?? '—'
              return (
                <div className={styles.backHours}>
                  <Clock size={13} className={styles.backHoursIcon} />
                  <span>Aujourd&apos;hui ({todayKey}) : {todayHours}</span>
                </div>
              )
            }

            return (
              <div className={styles.scheduleSection}>
                <div className={styles.scheduleHeader}>
                  <Clock size={11} className={styles.scheduleIcon} />
                  <span>Horaires d&apos;ouverture</span>
                </div>
                <div className={styles.scheduleGrid}>
                  {DAYS.map(day => {
                    const hours = schedule![day] ?? '—'
                    const isClosed = hours === 'fermé'
                    const isToday = day === todayKey
                    return (
                      <div
                        key={day}
                        className={[
                          styles.scheduleRow,
                          isToday ? styles.scheduleRowToday : '',
                          isClosed ? styles.scheduleRowClosed : '',
                        ].filter(Boolean).join(' ')}
                      >
                        <span className={styles.scheduleDayName}>{day}</span>
                        <span className={styles.scheduleDayHours}>{hours}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          <div className={styles.backActions}>
            <button
              className={styles.btnReserve}
              onClick={e => e.stopPropagation()}
            >
              <CalendarCheck size={15} />
              Réserver
            </button>
            <button
              className={`${styles.btnSave} ${isSaved ? styles.savedActive : ''}`}
              onClick={e => { e.stopPropagation(); handleSave(e) }}
              aria-label={isSaved ? 'Déjà enregistré' : 'Enregistrer'}
              title={isSaved ? 'Déjà enregistré' : 'Enregistrer'}
            >
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

      </div>
    </div>

    {carouselOpen && hasPhotos && (
      <PhotoCarousel
        photos={photos!}
        restaurantName={name}
        onClose={() => setCarouselOpen(false)}
      />
    )}
  </>
  )
}

