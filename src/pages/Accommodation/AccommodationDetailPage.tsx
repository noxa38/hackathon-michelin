import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarCheck2,
  Globe2,
  Heart,
  MapPin,
  Phone,
  Star,
  X,
} from "lucide-react";
import { fetchAccommodationById } from "../../services/accommodation.service";
import type { Accommodation, HotelRoomDetail } from "../../types/accommodation.types";
import styles from "./AccommodationDetailPage.module.css";

function getAccommodationAwardStars(accommodation: Accommodation): number {
  const awardMatch = accommodation.award?.match(/(\d+)/)
  const awardValue = awardMatch ? Number(awardMatch[1]) : null
  const fallbackValue = accommodation.stars ?? accommodation.rating_stars ?? null
  const resolvedValue = awardValue ?? fallbackValue ?? 0
  return Number.isFinite(resolvedValue) ? Math.max(0, Math.min(5, Math.round(resolvedValue))) : 0
}

function formatAccommodationPrice(price?: number): string {
  if (!price || !Number.isFinite(price) || price <= 0) return 'Prix non renseigné'
  return `Dès ${new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)} / nuit`
}

/* eslint-disable react-hooks/set-state-in-effect */

export default function AccommodationDetailPage() {
  const initialReservationForm = {
    fullName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    notes: "",
  };
  const { id } = useParams<{ id: string }>();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationForm, setReservationForm] = useState(initialReservationForm);

  const hotelLatitude = useMemo(() => {
    const parsed = Number(accommodation?.latitude);
    return Number.isFinite(parsed) ? parsed : null;
  }, [accommodation?.latitude]);

  const hotelLongitude = useMemo(() => {
    const parsed = Number(accommodation?.longitude);
    return Number.isFinite(parsed) ? parsed : null;
  }, [accommodation?.longitude]);

  const hotelAccessUrl = useMemo(() => {
    if (hotelLatitude !== null && hotelLongitude !== null) {
      return `https://www.google.com/maps/dir/?api=1&destination=${hotelLatitude},${hotelLongitude}`;
    }

    const destination = [
      accommodation?.name,
      accommodation?.address,
      accommodation?.city,
      accommodation?.country,
    ]
      .filter(Boolean)
      .join(", ");

    if (!destination) return null;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  }, [
    accommodation?.address,
    accommodation?.city,
    accommodation?.country,
    accommodation?.name,
    hotelLatitude,
    hotelLongitude,
  ]);

  useEffect(() => {
    if (!id) {
      setError("Identifiant d'hébergement invalide.");
      setLoading(false);
      return;
    }

    fetchAccommodationById(id)
      .then((data) => setAccommodation(data))
      .catch(() => setError("Impossible de charger la fiche détaillée."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("accommodation-favorites");
      const favorites = raw ? (JSON.parse(raw) as string[]) : [];
      setIsFavorite(favorites.includes(id));
    } catch {
      setIsFavorite(false);
    }
  }, [id]);

  const services = useMemo(() => {
    if (!accommodation?.facilities) return [];
    return accommodation.facilities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [accommodation]);

  const galleryImages = useMemo(() => {
    if (!accommodation) return [];
    const rawImages: string[] = accommodation.image_urls?.length
      ? accommodation.image_urls
      : [accommodation.image_url, accommodation.photo_url].filter(
          (value): value is string => Boolean(value),
        );
    const uniqueImages: string[] = Array.from(new Set(rawImages));
    return uniqueImages.length > 0
      ? uniqueImages
      : [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&h=900&fit=crop',
        ];
  }, [accommodation]);

  const roomDetails = useMemo<HotelRoomDetail[]>(
    () => accommodation?.room_details ?? [],
    [accommodation],
  );
  const roomPhotoCount = useMemo(
    () => roomDetails.filter((room) => Boolean(room.photo_url)).length,
    [roomDetails],
  );

  useEffect(() => {
    if (galleryImages.length > 0) {
      setSelectedImage(galleryImages[0]);
    }
  }, [galleryImages]);

  function handleReservation() {
    setReservationOpen(true);
    setReservationSubmitted(false);
    setReservationForm(initialReservationForm);
  }

  function closeReservationModal() {
    setReservationOpen(false);
    setReservationSubmitted(false);
  }

  function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReservationSubmitted(true);
  }

  function toggleFavorite() {
    if (!accommodation || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("accommodation-favorites");
      const current = raw ? (JSON.parse(raw) as string[]) : [];
      const accommodationIdStr = String(accommodation.id);
      const next = current.includes(accommodationIdStr)
        ? current.filter((favoriteId) => favoriteId !== accommodationIdStr)
        : [...current, accommodationIdStr];
      window.localStorage.setItem("accommodation-favorites", JSON.stringify(next));
      setIsFavorite(next.includes(accommodationIdStr));
    } catch {
      // no-op
    }
  }

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={`${styles.state} ${styles.stateLoading}`}>
          <div className={styles.spinner} aria-label="Chargement" />
        </div>
      </main>
    );
  }

  if (error || !accommodation) {
    return (
      <main className={styles.main}>
        <div className={styles.stateError}>{error || "Hébergement introuvable."}</div>
        <Link to="/hebergements" className={styles.backLink}>
          <ArrowLeft size={15} />
          <span>Retour aux hébergements</span>
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <header className={styles.pageHeader}>
          <Link to="/hebergements" className={styles.backLink}>
            <ArrowLeft size={15} />
            <span>Retour aux hébergements</span>
          </Link>
        </header>

        <article className={styles.heroLayout}>
          <section className={styles.mediaPanel}>
            <div className={styles.hero}>
              <img
                className={styles.heroImage}
                src={selectedImage}
                alt={accommodation.name}
              />
            </div>
            <section className={styles.galleryStrip}>
              {galleryImages.map((imageUrl, index) => (
                <button
                  key={`${imageUrl}-${index}`}
                  type="button"
                  className={`${styles.thumbButton} ${
                    imageUrl === selectedImage ? styles.thumbButtonActive : ""
                  }`}
                  onClick={() => setSelectedImage(imageUrl)}
                  aria-label={`Voir photo ${index + 1}`}
                >
                  <img
                    className={styles.thumbImage}
                    src={imageUrl}
                    alt=""
                    loading="lazy"
                  />
                </button>
              ))}
            </section>
          </section>

          <aside className={styles.summaryPanel}>
            <p className={styles.badge}>{accommodation.category || "Hébergement"}</p>
            <h1 className={styles.title}>{accommodation.name}</h1>
            <p className={styles.address}>
              <MapPin size={15} />
              <span>
                {accommodation.address}, {accommodation.city}
                {accommodation.country ? `, ${accommodation.country}` : ""}
              </span>
            </p>
            <div className={styles.quickFacts}>
              <p className={styles.quickFact}>
                <Star size={14} />
                <span>
                  {accommodation.award || getAccommodationAwardStars(accommodation)
                    ? accommodation.award || `${getAccommodationAwardStars(accommodation)} étoiles`
                    : "Classement non renseigné"}
                </span>
              </p>
              <p className={styles.quickFact}>
                <CalendarCheck2 size={14} />
                <span>
                  {formatAccommodationPrice(accommodation.price_from)}
                </span>
              </p>
              <p className={styles.quickFact}>
                <Building2 size={14} />
                <span>{roomDetails.length} types de chambres</span>
              </p>
              <p className={styles.quickFact}>
                <MapPin size={14} />
                <span>{roomPhotoCount} photos de chambres</span>
              </p>
            </div>

            <section className={styles.actions}>
              <button
                type="button"
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={handleReservation}
              >
                <CalendarCheck2 size={16} />
                <span>Réservation</span>
              </button>
              <button
                type="button"
                className={`${styles.button} ${isFavorite ? styles.favoriteActive : ""}`}
                onClick={toggleFavorite}
              >
                <Heart size={16} />
                <span>{isFavorite ? "Liké" : "Like"}</span>
              </button>
              {hotelAccessUrl ? (
                <a
                  className={`${styles.button} ${styles.mapQuickLinkButton} ${styles.actionFullWidth}`}
                  href={hotelAccessUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={16} />
                  <span>Ouvrir dans Google Maps</span>
                </a>
              ) : (
                <button
                  type="button"
                  className={`${styles.mapQuickLinkButton} ${styles.actionFullWidth}`}
                  disabled
                >
                  <MapPin size={16} />
                  <span>Google Maps indisponible</span>
                </button>
              )}
            </section>
          </aside>
        </article>

        <section className={styles.grid}>
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Informations</h2>
            <div className={styles.metaGrid}>
              <p className={styles.metaItem}>
                <Building2 size={15} />
                <span>{accommodation.city}</span>
              </p>
              <p className={styles.metaItem}>
                <Globe2 size={15} />
                <span>{accommodation.country || "Pays non renseigné"}</span>
              </p>
              <p className={styles.metaItem}>
                <Star size={15} />
                <span>
                  {accommodation.award || getAccommodationAwardStars(accommodation)
                    ? accommodation.award || `${getAccommodationAwardStars(accommodation)} étoiles`
                    : "Classement non renseigné"}
                </span>
              </p>
              <p className={styles.metaItem}>
                <CalendarCheck2 size={15} />
                <span>
                  {formatAccommodationPrice(accommodation.price_from)}
                </span>
              </p>
              <p className={styles.metaItem}>
                <Phone size={15} />
                <span>{accommodation.phone || "Téléphone non disponible"}</span>
              </p>
              <p className={styles.metaItem}>
                <span>
                  Source: accommodation
                </span>
              </p>
            </div>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Description</h2>
            <p className={styles.text}>
              {accommodation.description ||
                "Description non disponible pour cet établissement."}
            </p>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Services</h2>
            <div className={styles.services}>
              {(services.length > 0 ? services : ["Informations non disponibles"]).map(
                (service) => (
                  <span key={service} className={styles.serviceTag}>
                    {service}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Chambres & tarifs</h2>
            {roomDetails.length === 0 ? (
              <p className={styles.text}>Aucune information de chambre disponible.</p>
            ) : (
              <div className={styles.roomList}>
                {roomDetails.map((room, index) => {
                  const amenities = room.amenities
                    ? room.amenities
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    : [];

                  return (
                    <article key={`${room.room_type}-${index}`} className={styles.roomCard}>
                      {room.photo_url ? (
                        <img
                          className={styles.roomImage}
                          src={room.photo_url}
                          alt={room.room_type}
                          loading="lazy"
                        />
                      ) : null}
                      <div className={styles.roomBody}>
                        <div className={styles.roomHead}>
                          <h3 className={styles.roomTitle}>{room.room_type}</h3>
                          <div className={styles.roomMeta}>
                            {room.price_per_night ? (
                              <span>{room.price_per_night} EUR / nuit</span>
                            ) : (
                              <span>Tarif non renseigné</span>
                            )}
                            {room.capacity ? <span>{room.capacity} pers.</span> : null}
                          </div>
                        </div>
                        <p className={styles.roomDescription}>
                          {room.description || "Description de chambre non disponible."}
                        </p>
                        {amenities.length > 0 ? (
                          <div className={styles.services}>
                            {amenities.slice(0, 8).map((amenity) => (
                              <span key={amenity} className={styles.serviceTag}>
                                {amenity}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </section>

      {reservationOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={closeReservationModal}
          role="presentation"
        >
          <article
            className={styles.reservationModal}
            role="dialog"
            aria-modal="true"
            aria-label="Formulaire de réservation"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseButton}
              onClick={closeReservationModal}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <h2 className={styles.reservationTitle}>Demande de réservation</h2>
            <p className={styles.reservationSubtitle}>
              {accommodation.name} - {accommodation.city}
            </p>

            {reservationSubmitted ? (
              <div className={styles.reservationSuccess}>
                <p>
                  Votre demande a bien été envoyée. Nous vous recontacterons
                  rapidement par email.
                </p>
                <button
                  type="button"
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={closeReservationModal}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form className={styles.reservationForm} onSubmit={submitReservation}>
                <label className={styles.reservationField}>
                  Nom complet
                  <input
                    type="text"
                    required
                    value={reservationForm.fullName}
                    onChange={(event) =>
                      setReservationForm((current) => ({
                        ...current,
                        fullName: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className={styles.reservationField}>
                  Email
                  <input
                    type="email"
                    required
                    value={reservationForm.email}
                    onChange={(event) =>
                      setReservationForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>
                <div className={styles.reservationDateGrid}>
                  <label className={styles.reservationField}>
                    Date d'arrivée
                    <input
                      type="date"
                      required
                      value={reservationForm.checkIn}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          checkIn: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.reservationField}>
                    Date de départ
                    <input
                      type="date"
                      required
                      value={reservationForm.checkOut}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          checkOut: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
                <label className={styles.reservationField}>
                  Nombre de voyageurs
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={reservationForm.guests}
                    onChange={(event) =>
                      setReservationForm((current) => ({
                        ...current,
                        guests: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className={styles.reservationField}>
                  Message (optionnel)
                  <textarea
                    rows={4}
                    value={reservationForm.notes}
                    onChange={(event) =>
                      setReservationForm((current) => ({
                        ...current,
                        notes: event.target.value,
                      }))
                    }
                  />
                </label>

                <div className={styles.reservationActions}>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={closeReservationModal}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`${styles.button} ${styles.primaryButton}`}
                  >
                    Envoyer la demande
                  </button>
                </div>
              </form>
            )}
          </article>
        </div>
      )}
    </main>
  );
}
