import { useMemo, useState } from "react";
import {
  BedDouble,
  Bookmark,
  Heart,
  RotateCw,
} from "lucide-react";
import type { Accommodation } from "../../types/accommodation.types";
import styles from "./AccommodationCard.module.css";
import accommodationMichelinStarIconUrl from "../../../img/accommodation-michelin-star-icon.svg";

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

function hashString(value: string): number {
  return [...value].reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0,
    0,
  );
}

function buildFallbackImage(name: string, city: string): string {
  const palettes: [string, string][] = [
    ["#0b1220", "#243b53"],
    ["#1f2937", "#7c2d12"],
    ["#1a1a1a", "#374151"],
    ["#0f172a", "#475569"],
    ["#2d1b30", "#5f2c82"],
  ];
  const palette = palettes[hashString(`${name}-${city}`) % palettes.length];
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  const escapedName = name
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const escapedCity = city
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette[0]}"/>
          <stop offset="100%" stop-color="${palette[1]}"/>
        </linearGradient>
      </defs>
      <rect width="900" height="560" fill="url(#bg)"/>
      <circle cx="760" cy="90" r="120" fill="rgba(255,255,255,0.08)"/>
      <text x="450" y="285" text-anchor="middle" font-size="150" font-weight="700" fill="rgba(255,255,255,0.2)" font-family="Arial,sans-serif">${initials || "H"}</text>
      <text x="60" y="470" font-size="48" font-weight="600" fill="rgba(255,255,255,0.95)" font-family="Arial,sans-serif">${escapedName}</text>
      <text x="60" y="520" font-size="30" fill="rgba(255,255,255,0.78)" font-family="Arial,sans-serif">${escapedCity}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
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
    address,
    image_url,
    photo_url,
    stars,
    rating_stars,
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
  const fallbackImage = useMemo(
    () => buildFallbackImage(name, city),
    [name, city],
  );
  const [forceFallback, setForceFallback] = useState(!coverImage);
  const [flipped, setFlipped] = useState(false);
  const currentImage = !forceFallback && coverImage ? coverImage : fallbackImage;
  const starsValue = stars ?? rating_stars;
  const roundedStars =
    starsValue && Number.isFinite(starsValue)
      ? Math.min(5, Math.max(1, Math.round(starsValue)))
      : null;

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

  return (
    <div
      className={`${styles.cardOuter} ${flipped ? styles.cardFlipped : ""} ${compact ? styles.compact : ""}`}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={styles.cardInner}>
        {/* ── FRONT ── */}
        <div className={styles.cardFront}>
          <div
            className={styles.photoArea}
            style={{ backgroundImage: `url(${currentImage})` }}
          >
            <img
              src={currentImage}
              alt=""
              className={styles.photoHidden}
              onError={() => setForceFallback(true)}
            />
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
            <p className={styles.cuisine}>{category || "Hébergement"}</p>
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
              <span>Voir l'établissement</span>
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
  );
}
