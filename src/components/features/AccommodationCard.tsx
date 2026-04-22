import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BedDouble,
  Bookmark,
  Building2,
  Heart,
  MapPin,
  Tag,
} from "lucide-react";
import type { Accommodation } from "../../types/accommodation.types";
import styles from "./AccommodationCard.module.css";

interface Props {
  accommodation: Accommodation;
  onViewDetails?: (id: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
  likes?: number;
  isSaved?: boolean;
  onSaveClick?: () => void;
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
  likes = 0,
  isSaved = false,
  onSaveClick,
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
  } = accommodation;
  const coverImage = image_url || photo_url;
  const fallbackImage = useMemo(
    () => buildFallbackImage(name, city),
    [name, city],
  );
  const [forceFallback, setForceFallback] = useState(!coverImage);
  const currentImage = !forceFallback && coverImage ? coverImage : fallbackImage;
  const starsValue = stars ?? rating_stars;
  const roundedStars =
    starsValue && Number.isFinite(starsValue)
      ? Math.min(5, Math.max(1, Math.round(starsValue)))
      : null;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          className={styles.image}
          src={currentImage}
          alt={name}
          loading="lazy"
          onError={() => setForceFallback(true)}
        />
        <div className={styles.overlay} />
        <p className={styles.category}>{category || "Hébergement"}</p>
        {roundedStars && (
          <p
            className={styles.stars}
            aria-label={`${roundedStars} étoile${roundedStars > 1 ? "s" : ""} Michelin`}
          >
            {Array.from({ length: roundedStars }).map((_, index) => (
              <span key={`star-${id}-${index}`} className={styles.michelinStar}>
                ✶
              </span>
            ))}
          </p>
        )}
        <p className={styles.cityPill}>
          <MapPin size={13} />
          <span>{city}</span>
        </p>
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.iconWrap}>
            <Building2 size={16} />
          </span>
          <h2 className={styles.name}>{name}</h2>
        </div>

        <p className={styles.info}>
          <Tag size={14} />
          <span>{address}</span>
        </p>

        <div className={styles.cardBottom}>
          <p className={styles.price}>{formatPrice(price_from)}</p>
          {onToggleFavorite && (
            <div className={styles.quickActions}>
              <button
                type="button"
                className={`${styles.heartBtn} ${isFavorited ? styles.heartBtnActive : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                aria-label={isFavorited ? "Retirer des likes" : "Liker"}
              >
                <Heart size={14} fill={isFavorited ? "currentColor" : "none"} />
                <span>{likes}</span>
              </button>

              <button
                type="button"
                className={`${styles.saveBtn} ${isSaved ? styles.saveBtnActive : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveClick?.();
                }}
                aria-label={isSaved ? "Déjà enregistré" : "Enregistrer"}
                title={isSaved ? "Déjà enregistré" : "Enregistrer"}
              >
                <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>
          )}
        </div>

        <button
          className={styles.cta}
          type="button"
          onClick={() => onViewDetails?.(String(id))}
        >
          <BedDouble size={15} />
          <span>Voir l'établissement</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}
