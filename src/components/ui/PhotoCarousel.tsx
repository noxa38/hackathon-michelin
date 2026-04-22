import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { RestaurantPhoto } from '../../types/restaurant.types'
import styles from './PhotoCarousel.module.css'

interface Props {
  photos: RestaurantPhoto[]
  restaurantName: string
  startIndex?: number
  onClose: () => void
}

export default function PhotoCarousel({ photos, restaurantName, startIndex = 0, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(() => setCurrent(i => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  const photo = photos[current]

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label={`Photos de ${restaurantName}`}>
      <div className={styles.modal}>
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {/* Counter */}
        <div className={styles.counter}>{current + 1} / {photos.length}</div>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            key={photo.url}
            src={photo.url}
            alt={photo.caption ?? restaurantName}
            className={styles.image}
          />
          {photo.caption && (
            <div className={styles.caption}>{photo.caption}</div>
          )}
        </div>

        {/* Navigation */}
        {photos.length > 1 && (
          <>
            <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev} aria-label="Photo précédente">
              <ChevronLeft size={28} />
            </button>
            <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label="Photo suivante">
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Dots */}
        {photos.length > 1 && (
          <div className={styles.dots}>
            {photos.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Title */}
        <div className={styles.title}>{restaurantName}</div>
      </div>
    </div>,
    document.body
  )
}
