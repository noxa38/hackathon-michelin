import { useState } from 'react'
import { Heart, Bookmark, CalendarCheck, Leaf, MapPin, Clock } from 'lucide-react'
import type { Restaurant } from '../../types/restaurant.types'
import styles from './RestaurantCard.module.css'

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

function AwardBadge({ stars, award }: { stars: number; award: string }) {
  const stars3 = stars >= 3
  const stars2 = stars === 2
  const stars1 = stars === 1
  if (stars3) return <span className={`${styles.award} ${styles.award3}`}>{'★'.repeat(3)} 3 Étoiles</span>
  if (stars2) return <span className={`${styles.award} ${styles.award2}`}>{'★'.repeat(2)} 2 Étoiles</span>
  if (stars1) return <span className={`${styles.award} ${styles.award1}`}>★ 1 Étoile</span>
  return <span className={`${styles.award} ${styles.awardSelected}`}>{award}</span>
}

export default function RestaurantCard({ restaurant }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(() => Math.floor(Math.random() * 300 + 20))

  const { name, address, price, cuisine, description, stars, award, green_star } = restaurant

  function handleLike(e: React.MouseEvent) {
    e.stopPropagation()
    setLikes(l => liked ? l - 1 : l + 1)
    setLiked(l => !l)
  }

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation()
    setSaved(s => !s)
  }

  return (
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
            className={styles.photoArea}
            style={{ background: `linear-gradient(145deg, ${getCardColor(cuisine)}, #000)` }}
          >
            <span className={styles.photoInitial}>{name.charAt(0)}</span>
            {green_star === 1 && (
              <span className={styles.greenStarBadge}>
                <Leaf size={11} />
                Étoile Verte
              </span>
            )}
            <div className={styles.photoHint}>Cliquer pour plus de détails</div>
          </div>

          <div className={styles.frontContent}>
            <AwardBadge stars={stars} award={award} />

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
            <AwardBadge stars={stars} award={award} />
            <h2 className={styles.backName}>{name}</h2>
            <p className={styles.backCuisine}>{cuisine} · {price}</p>
          </div>

          <p className={styles.backDescription}>{description}</p>

          <div className={styles.backActions}>
            <button
              className={styles.btnReserve}
              onClick={e => e.stopPropagation()}
            >
              <CalendarCheck size={15} />
              Réserver
            </button>
            <button
              className={`${styles.btnFav} ${liked ? styles.likedActive : ''}`}
              onClick={handleLike}
            >
              <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
              {liked ? 'Retiré' : 'Favoris'}
            </button>
            <button
              className={`${styles.btnSave} ${saved ? styles.savedActive : ''}`}
              onClick={handleSave}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Enregistré' : 'Enregistrer'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

