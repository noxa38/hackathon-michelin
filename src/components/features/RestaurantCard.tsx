import { useState } from 'react'
import { Heart, Bookmark, CalendarCheck, MapPin, Clock, Images } from 'lucide-react'
import type { Restaurant } from '../../types/restaurant.types'
import styles from './RestaurantCard.module.css'
import PhotoCarousel from '../ui/PhotoCarousel'

interface Props {
  restaurant: Restaurant
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

function AwardBadge({ stars, award, green_star }: { stars: number; award: string; green_star: number }) {
  const isBib = award.toLowerCase().includes('bib') || award.toLowerCase().includes('gourmand')
  return (
    <div className={styles.awardRow}>
      {stars >= 1 && (
        <div className={styles.starsRow}>
          {Array.from({ length: stars }, (_, i) => (
            <img key={i} src="/etoile-michelin.png" alt="Étoile Michelin" className={styles.starImg} />
          ))}
        </div>
      )}
      {stars === 0 && isBib && (
        <img src="/Michelin_Big_gourmand.png" alt="Bib Gourmand" className={styles.bibImg} />
      )}
      {stars === 0 && !isBib && green_star !== 1 && (
        <span className={`${styles.award} ${styles.awardSelected}`}>{award}</span>
      )}
      {green_star === 1 && (
        <img src="/MICHELINGreenStar_green.png" alt="Étoile Verte Michelin" className={styles.greenStarImg} />
      )}
    </div>
  )
}

export default function RestaurantCard({ restaurant }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(() => Math.floor(Math.random() * 300 + 20))
  const [carouselOpen, setCarouselOpen] = useState(false)

  const { name, address, price, cuisine, description, opening_hours, stars, award, green_star, photos } = restaurant
  const hasPhotos = photos && photos.length > 0
  const coverPhoto = hasPhotos ? photos[0].url : null

  function handleLike(e: React.MouseEvent) {
    e.stopPropagation()
    setLikes(l => liked ? l - 1 : l + 1)
    setLiked(l => !l)
  }

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation()
    setSaved(s => !s)
  }

  function handlePhotoClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (hasPhotos) setCarouselOpen(true)
  }

  return (
    <>
    <div
      className={styles.cardOuter}
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
              {hasPhotos ? 'Cliquer pour voir les photos' : 'Cliquer pour plus de détails'}
            </div>
          </div>

          <div className={styles.frontContent}>
            <AwardBadge stars={stars} award={award} green_star={green_star} />

            <h2 className={styles.name}>{name}</h2>

            <p className={styles.infoRow}>
              <MapPin size={12} className={styles.infoIcon} />
              <span>{address}</span>
            </p>
            <p className={styles.infoRow}>
              <Clock size={12} className={styles.infoIcon} />
              <span>Voir les horaires</span>
            </p>

            <p className={styles.cuisine}>{cuisine}</p>

            <div className={styles.frontBottom}>
              <span className={styles.price}>{price}</span>
              <button
                className={`${styles.likeBtn} ${liked ? styles.likedActive : ''}`}
                onClick={handleLike}
                aria-label="Liker ce restaurant"
              >
                <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
                <span>{likes}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── FACE ARRIÈRE ── */}
        <div className={styles.cardBack}>
          <div className={styles.backHeader}>
            <AwardBadge stars={stars} award={award} green_star={green_star} />
            <h2 className={styles.backName}>{name}</h2>
            <p className={styles.backCuisine}>{cuisine} · {price}</p>
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
              className={`${styles.btnSave} ${saved ? styles.savedActive : ''}`}
              onClick={e => { e.stopPropagation(); handleSave(e) }}
              aria-label={saved ? 'Retirer des enregistrements' : 'Enregistrer'}
              title={saved ? 'Retirer des enregistrements' : 'Enregistrer'}
            >
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
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

