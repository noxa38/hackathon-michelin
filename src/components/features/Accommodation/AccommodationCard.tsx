import React, { useMemo, useState } from "react";
import {
  BedDouble,
  Bookmark,
  Heart,
  Images,
  MapPin,
  RotateCw,
} from "lucide-react";
import type { Accommodation } from "../../../types/accommodation.types";
import styles from "./AccommodationCard.module.css";
import accommodationMichelinStarIconUrl from "../../../assets/img/accommodation-michelin-star-icon.svg";
import PhotoCarousel from "../../ui/PhotoCarousel";
import type { RestaurantPhoto } from "../../../types/restaurant.types";
import { fetchAccommodationById } from "../../../services/accommodation.service";

interface Props {
  accommodation: Accommodation;
  onViewDetails?: (id: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
  likes?: number;
  isSaved?: boolean;
  onSaveClick?: () => void;
  compact?: boolean;
  showLikeButton?: boolean;
}

function getAccommodationAwardStars(accommodation: Accommodation): number | null {
  const awardMatch = accommodation.award?.match(/(\d+)/);
  const awardValue = awardMatch ? Number(awardMatch[1]) : null;
  const fallbackValue = accommodation.stars ?? accommodation.rating_stars ?? null;
  const resolvedValue = awardValue ?? fallbackValue;
  if (!resolvedValue || !Number.isFinite(resolvedValue)) return null;
  return Math.min(5, Math.max(1, Math.round(resolvedValue)));
}

function hashString(value: string): number {
  return [...value].reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0,
    0,
  );
}

function buildFallbackImage(name: string, city: string): string {
  const seed = hashString(`${name}-${city}`);
  const images = [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop',
  ];
  return images[seed % images.length];
}

function formatPrice(price?: number): string {
  if (!price || !Number.isFinite(price) || price <= 0) {
    return "Prix non renseigné";
  }

  return `Dès ${new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)} / nuit`;
}

function formatAddress(address?: string, city?: string, country?: string): string {
  const parts = [address, city, country]
    .map((value) => value?.trim())
    .filter(Boolean)

  if (parts.length === 0) return "Adresse non renseignée"
  return parts.join(" · ")
}

function buildCarouselPhotos(accommodation: Accommodation, fallbackImage?: string): RestaurantPhoto[] {
  const roomPhotoUrls = (accommodation.room_details ?? [])
    .map((room) => room.photo_url)
    .filter((url): url is string => Boolean(url));

  const allImageUrls = [
    ...(accommodation.image_urls ?? []),
    accommodation.image_url,
    accommodation.photo_url,
    ...roomPhotoUrls,
    fallbackImage,
  ].filter((url): url is string => Boolean(url && url.trim().length > 0));

  const uniqueUrls = Array.from(new Set(allImageUrls));
  return uniqueUrls.map((url, index) => ({
    url,
    position: index + 1,
    caption: `${accommodation.name} - photo ${index + 1}`,
  }));
}

export default function AccommodationCard({
  accommodation,
  onViewDetails,
  isFavorited = false,
  onToggleFavorite,
  likes,
  isSaved = false,
  onSaveClick,
  compact = false,
  showLikeButton = true,
}: Props) {
  const {
    id,
    name,
    city,
    category,
    award,
    address,
    image_url,
    photo_url,
    price_from,
    description,
    facilities,
  } = accommodation;
  const rawCoverImage =
    image_url
    || photo_url
    || (accommodation as Accommodation & { photo?: string; image?: string; imageUrl?: string }).photo
    || (accommodation as Accommodation & { photo?: string; image?: string; imageUrl?: string }).image
    || (accommodation as Accommodation & { photo?: string; image?: string; imageUrl?: string }).imageUrl;
  const coverImage = rawCoverImage && rawCoverImage !== "N/A" ? rawCoverImage : undefined;
  const carouselPhotos = useMemo<RestaurantPhoto[]>(
    () => buildCarouselPhotos(accommodation, coverImage),
    [accommodation, coverImage],
  );
  const fallbackImage = useMemo(
    () => buildFallbackImage(name, city),
    [name, city],
  );
  const [forceFallback, setForceFallback] = useState(!coverImage);
  const [flipped, setFlipped] = useState(false);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [lazyLoadedPhotos, setLazyLoadedPhotos] = useState<RestaurantPhoto[] | null>(null);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const currentImage = !forceFallback && coverImage ? coverImage : fallbackImage;
  const effectiveCarouselPhotos = lazyLoadedPhotos && lazyLoadedPhotos.length > 0
    ? lazyLoadedPhotos
    : carouselPhotos;
  const roundedStars = getAccommodationAwardStars(accommodation);
  const addressLabel = formatAddress(address, city, accommodation.country);

  // Pre-fetch full photo list in background so badge count shows immediately
  React.useEffect(() => {
    if (lazyLoadedPhotos !== null) return;
    if (carouselPhotos.length > 1) return;
    let cancelled = false;
    fetchAccommodationById(String(id))
      .then((detail) => {
        if (cancelled) return;
        const detailed = buildCarouselPhotos(detail, coverImage);
        if (detailed.length > 0) setLazyLoadedPhotos(detailed);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const facilityList = useMemo(
    () =>
      facilities
        ? facilities
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
            .slice(0, 4)
        : [],
    [facilities],
  );

  function handleFlip(e: React.MouseEvent) {
    e.stopPropagation();
    setFlipped(true);
  }

  function handleUnflip(e: React.MouseEvent) {
    e.stopPropagation();
    setFlipped(false);
  }

  async function handlePhotoClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (effectiveCarouselPhotos.length > 1) {
      setCarouselOpen(true);
      return;
    }

    if (isLoadingPhotos) return;

    try {
      setIsLoadingPhotos(true);
      const detailedAccommodation = await fetchAccommodationById(String(id));
      const detailedPhotos = buildCarouselPhotos(detailedAccommodation, coverImage);
      if (detailedPhotos.length > 0) {
        setLazyLoadedPhotos(detailedPhotos);
        setCarouselOpen(true);
      }
    } catch {
      if (effectiveCarouselPhotos.length > 0) {
        setCarouselOpen(true);
      }
    } finally {
      setIsLoadingPhotos(false);
    }
  }

  return (
    <>
      <div
        className={`${styles.cardOuter} ${flipped ? styles.cardFlipped : ""} ${compact ? styles.compact : ""}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={styles.cardInner}>
        {/* ── FRONT ── */}
        <div className={styles.cardFront}>
          <div
            className={`${styles.photoArea} ${effectiveCarouselPhotos.length > 0 ? styles.photoAreaClickable : ""}`}
            style={{ backgroundImage: `url(${currentImage})` }}
            onClick={handlePhotoClick}
            role={effectiveCarouselPhotos.length > 0 ? "button" : undefined}
            aria-label={effectiveCarouselPhotos.length > 0 ? `Voir les photos de ${name}` : undefined}
          >
            <img
              src={currentImage}
              alt=""
              className={styles.photoHidden}
              onError={() => setForceFallback(true)}
            />
            {effectiveCarouselPhotos.length > 1 && (
              <div className={styles.photoCountBadge}>
                <Images size={12} />
                <span>{effectiveCarouselPhotos.length}</span>
              </div>
            )}
            {effectiveCarouselPhotos.length > 0 && (
              <div className={styles.photoHint}>Cliquer pour voir les photos</div>
            )}
          </div>

          <div className={styles.frontContent}>
            {roundedStars && (
              <div className={styles.frontStarsWrap}>
                {Array.from({ length: roundedStars }, (_, i) => (
                  <img
                    key={i}
                    src={accommodationMichelinStarIconUrl}
                    alt="Étoile Michelin hébergement"
                    className={styles.frontStarImg}
                  />
                ))}
              </div>
            )}
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.infoRow}><span>{city}</span></p>
            <p className={`${styles.infoRow} ${styles.addressRow}`}>
              <MapPin size={13} />
              <span>{addressLabel}</span>
            </p>
            <p className={styles.cuisine}>{award || category || "Hébergement"}</p>
            <button className={styles.moreBtn} onClick={(e) => { e.stopPropagation(); handleFlip(e); }}>
              <RotateCw size={12} /><span>En savoir plus</span>
            </button>
            <div className={styles.frontBottom}>
              <span className={styles.price}>{formatPrice(price_from)}</span>
              {showLikeButton && onToggleFavorite && (
                <button
                  type="button"
                  className={`${styles.likeBtn} ${isFavorited ? styles.likedActive : ""}`}
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                  aria-label={isFavorited ? "Retirer des likes" : "Liker"}
                >
                  <Heart size={14} fill={isFavorited ? "currentColor" : "none"} />
                  {likes !== undefined && <span>{likes}</span>}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className={styles.cardBack}>
          <div className={styles.backHeader}>
            <h3 className={styles.backName}>{name}</h3>
            <button className={styles.backFlipBtn} onClick={(e) => { e.stopPropagation(); handleUnflip(e); }} aria-label="Retourner">
              <RotateCw size={14} />
            </button>
          </div>

          {address && (
            <p className={styles.backAddress}>{address}</p>
          )}

          {description && (
            <p className={styles.backDescription}>{description}</p>
          )}

          {facilityList.length > 0 && (
            <ul className={styles.backFacilities}>
              {facilityList.map((f) => (
                <li key={f} className={styles.backFacilityItem}>{f}</li>
              ))}
            </ul>
          )}

          <div className={styles.backActions}>
            <button
              className={styles.backCta}
              type="button"
              onClick={(e) => { e.stopPropagation(); onViewDetails?.(String(id)); }}
            >
              <BedDouble size={14} />
              <span>Voir plus de détails</span>
            </button>
            {onSaveClick && (
              <button
                type="button"
                className={`${styles.backSaveBtn} ${isSaved ? styles.backSaveBtnActive : ""}`}
                onClick={(e) => { e.stopPropagation(); onSaveClick(); }}
                aria-label={isSaved ? "Déjà enregistré" : "Enregistrer"}
                title={isSaved ? "Déjà enregistré" : "Enregistrer"}
              >
                <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
      {carouselOpen && effectiveCarouselPhotos.length > 0 && (
        <PhotoCarousel
          photos={effectiveCarouselPhotos}
          restaurantName={name}
          onClose={() => setCarouselOpen(false)}
        />
      )}
    </>
  );
}
