import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { divIcon, icon, latLngBounds, type LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
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
import { fetchAccommodationById } from "../services/accommodation.service";
import { fetchAllRestaurants } from "../services/restaurant.service";
import type { Accommodation, HotelRoomDetail } from "../types/accommodation.types";
import type { RestaurantNearby as RestaurantNearbyRaw } from "../types/restaurant.types";
import styles from "./AccommodationDetailPage.module.css";
import restaurantMichelinStarIconUrl from "../../img/restaurant-michelin-star-icon.png";

interface NearbyRestaurant extends RestaurantNearbyRaw {
  distanceKm: number;
}

type MapCoordinate = LatLngTuple;

function distanceInKm(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLat = toRad(toLat - fromLat);
  const deltaLng = toRad(toLng - fromLng);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRad(fromLat)) *
      Math.cos(toRad(toLat)) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function MapBoundsController({
  positions,
  fitRequest,
}: {
  positions: MapCoordinate[];
  fitRequest: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (fitRequest <= 0) return;
    if (!positions.length) return;
    if (positions.length === 1) {
      map.setView(positions[0], 13);
      return;
    }
    map.fitBounds(latLngBounds(positions), {
      padding: [36, 36],
    });
  }, [map, positions, fitRequest]);

  return null;
}

function VisibleRestaurantsController({
  restaurants,
  onVisibleCountChange,
  onViewportRadiusKmChange,
}: {
  restaurants: NearbyRestaurant[];
  onVisibleCountChange: (count: number) => void;
  onViewportRadiusKmChange: (radiusKm: number) => void;
}) {
  const map = useMap();

  const restaurantPoints = useMemo<MapCoordinate[]>(
    () =>
      restaurants
        .map((restaurant) => [Number(restaurant.latitude), Number(restaurant.longitude)] as const)
        .filter(
          ([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng),
        )
        .map(([lat, lng]) => [lat, lng]),
    [restaurants],
  );

  useEffect(() => {
    const updateVisibleCount = () => {
      const bounds = map.getBounds();
      const visibleCount = restaurantPoints.filter((point) =>
        bounds.contains(point),
      ).length;
      onVisibleCountChange(visibleCount);

      const center = map.getCenter();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const viewportRadiusKm =
        Math.max(
          center.distanceTo(northEast),
          center.distanceTo(southWest),
        ) / 1000;
      onViewportRadiusKmChange(viewportRadiusKm);
    };

    updateVisibleCount();
    map.on("moveend", updateVisibleCount);
    map.on("zoomend", updateVisibleCount);

    return () => {
      map.off("moveend", updateVisibleCount);
      map.off("zoomend", updateVisibleCount);
    };
  }, [map, onVisibleCountChange, onViewportRadiusKmChange, restaurantPoints]);

  return null;
}

const hotelMarkerIcon = divIcon({
  className: "",
  html: `<div style="width:34px;height:34px;border-radius:999px;background:linear-gradient(145deg,#ff3352 0%,#b8001f 100%);color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 10px 24px rgba(184,0,31,.45);font-weight:800;font-size:12px;">H</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const restaurantMarkerImageIcon = icon({
  iconUrl: restaurantMichelinStarIconUrl,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

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
  const [nearbyRestaurants, setNearbyRestaurants] = useState<NearbyRestaurant[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [showRestaurantsMap, setShowRestaurantsMap] = useState(false);
  const [visibleRestaurantsCount, setVisibleRestaurantsCount] = useState(0);
  const [viewportRadiusKm, setViewportRadiusKm] = useState<number | null>(null);
  const [fitAllRequest, setFitAllRequest] = useState(0);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationForm, setReservationForm] = useState(initialReservationForm);
  const mapSectionRef = useRef<HTMLElement | null>(null);

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

  const hotelPosition = useMemo<MapCoordinate | null>(() => {
    if (hotelLatitude === null || hotelLongitude === null) return null;
    return [hotelLatitude, hotelLongitude];
  }, [hotelLatitude, hotelLongitude]);

  const restaurantPositions = useMemo<MapCoordinate[]>(
    () =>
      nearbyRestaurants
        .filter(
          (restaurant) =>
            Number.isFinite(Number(restaurant.latitude)) &&
            Number.isFinite(Number(restaurant.longitude)),
        )
        .map((restaurant) => [restaurant.latitude, restaurant.longitude]),
    [nearbyRestaurants],
  );

  const mapPositions = useMemo<MapCoordinate[]>(
    () => (hotelPosition ? [hotelPosition, ...restaurantPositions] : restaurantPositions),
    [hotelPosition, restaurantPositions],
  );

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
      : ["https://picsum.photos/seed/hotel-detail-page/1400/900"];
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

  useEffect(() => {
    if (
      accommodation?.source !== "hotels" ||
      hotelLatitude === null ||
      hotelLongitude === null
    ) {
      setNearbyRestaurants([]);
      return;
    }

    setLoadingRestaurants(true);
    fetchAllRestaurants()
      .then((restaurants) => {
        const candidates = restaurants
          .filter(
            (restaurant) =>
              Number.isFinite(Number(restaurant.latitude)) &&
              Number.isFinite(Number(restaurant.longitude)),
          )
          .map((restaurant) => {
            const distanceKm = distanceInKm(
              hotelLatitude,
              hotelLongitude,
              Number(restaurant.latitude),
              Number(restaurant.longitude),
            );
            return {
              ...restaurant,
              distance_km: distanceKm,
              distanceKm,
            };
          });
        candidates.sort((left, right) => left.distanceKm - right.distanceKm);
        setNearbyRestaurants(candidates);
      })
      .catch(() => setNearbyRestaurants([]))
      .finally(() => setLoadingRestaurants(false));
  }, [accommodation, hotelLatitude, hotelLongitude]);

  useEffect(() => {
    setVisibleRestaurantsCount(nearbyRestaurants.length);
    setViewportRadiusKm(null);
  }, [nearbyRestaurants.length]);

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

  function openHotelMapSection() {
    setShowRestaurantsMap(true);
    requestAnimationFrame(() => {
      mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
                  {accommodation.stars || accommodation.rating_stars
                    ? `${accommodation.stars || accommodation.rating_stars} étoiles`
                    : "Classement non renseigné"}
                </span>
              </p>
              <p className={styles.quickFact}>
                <CalendarCheck2 size={14} />
                <span>
                  {accommodation.price_from
                    ? `${accommodation.price_from} EUR / nuit`
                    : "Tarif non renseigné"}
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
                <span>{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
              </button>
            </section>

            <button
              type="button"
              className={styles.mapToggleButton}
              onClick={() => setShowRestaurantsMap((current) => !current)}
              disabled={
                accommodation.source !== "hotels" ||
                hotelLatitude === null ||
                hotelLongitude === null
              }
            >
              {showRestaurantsMap
                ? "Masquer la carte des restaurants"
                : "Voir la carte des restaurants à côté"}
            </button>
          </aside>
        </article>

        {showRestaurantsMap && (
          <section ref={mapSectionRef} className={styles.mapSection}>
            <div className={styles.mapHeader}>
              <h2 className={styles.panelTitle}>Restaurants à proximité</h2>
              {loadingRestaurants ? (
                <p className={styles.mapInfo}>Chargement des restaurants...</p>
              ) : (
                <p className={styles.mapInfo}>
                  {nearbyRestaurants.length} restaurant(s) au total ·{" "}
                  {visibleRestaurantsCount} visible(s) dans la vue
                  {viewportRadiusKm !== null
                    ? ` (~${viewportRadiusKm.toFixed(1)} km autour du centre)`
                    : ""}
                </p>
              )}
            </div>
            <div className={styles.mapLayout}>
              {hotelLatitude !== null && hotelLongitude !== null ? (
                <div className={styles.mapWrap}>
                  <div className={styles.mapToolbar}>
                    <span className={styles.mapBadge}>Vue interactive</span>
                    <div className={styles.mapToolbarActions}>
                      <button
                        type="button"
                        className={styles.mapExternalLink}
                        onClick={() => setFitAllRequest((current) => current + 1)}
                      >
                        Voir tous les restaurants
                      </button>
                      <a
                        className={styles.mapExternalLink}
                        href={`https://www.google.com/maps?q=${hotelLatitude},${hotelLongitude}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ouvrir en plein écran
                      </a>
                    </div>
                  </div>
                  {hotelPosition ? (
                    <MapContainer
                      center={hotelPosition}
                      zoom={15}
                      scrollWheelZoom
                      className={styles.map}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      />
                      <MapBoundsController
                        positions={mapPositions}
                        fitRequest={fitAllRequest}
                      />
                      <VisibleRestaurantsController
                        restaurants={nearbyRestaurants}
                        onVisibleCountChange={setVisibleRestaurantsCount}
                        onViewportRadiusKmChange={setViewportRadiusKm}
                      />
                      <Marker position={hotelPosition} icon={hotelMarkerIcon}>
                        <Popup>
                          <strong>{accommodation.name}</strong>
                          <br />
                          {accommodation.city}
                        </Popup>
                      </Marker>
                      {nearbyRestaurants.map((restaurant) => (
                        <Marker
                          key={restaurant.id}
                          position={[restaurant.latitude, restaurant.longitude]}
                          icon={restaurantMarkerImageIcon}
                        >
                          <Popup>
                            <strong>{restaurant.name}</strong>
                            <br />
                            {restaurant.city} - {restaurant.distanceKm.toFixed(1)} km
                            <br />
                            <a
                              href={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Ouvrir dans Google Maps
                            </a>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  ) : null}
                  <div className={styles.mapLegend}>
                    <span className={`${styles.legendItem} ${styles.legendHotel}`}>
                      Hôtel
                    </span>
                    <span className={`${styles.legendItem} ${styles.legendRestaurant}`}>
                      Restaurants proches
                    </span>
                  </div>
                </div>
              ) : null}
              <div className={styles.nearbyList}>
                {nearbyRestaurants.map((restaurant, index) => (
                  <article key={restaurant.id} className={styles.nearbyCard}>
                    <div className={styles.nearbyTop}>
                      <span className={styles.nearbyIndex}>{index + 1}</span>
                      <p className={styles.nearbyName}>{restaurant.name}</p>
                    </div>
                    <p className={styles.nearbyMeta}>
                      {restaurant.city} · {restaurant.distanceKm.toFixed(1)} km
                    </p>
                    <a
                      className={styles.nearbyLink}
                      href={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voir sur la carte
                    </a>
                  </article>
                ))}
                {!loadingRestaurants && nearbyRestaurants.length === 0 ? (
                  <p className={styles.text}>
                    Aucun restaurant proche trouvé pour cet hôtel.
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        )}

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
                  {accommodation.stars || accommodation.rating_stars
                    ? `${accommodation.stars || accommodation.rating_stars} étoiles`
                    : "Classement non renseigné"}
                </span>
              </p>
              <p className={styles.metaItem}>
                <CalendarCheck2 size={15} />
                <span>
                  {accommodation.price_from
                    ? `Dès ${accommodation.price_from} EUR / nuit`
                    : "Prix non renseigné"}
                </span>
              </p>
              <p className={styles.metaItem}>
                <Phone size={15} />
                <span>{accommodation.phone || "Téléphone non disponible"}</span>
              </p>
              <p className={styles.metaItem}>
                <span>
                  {accommodation.source === "hotels"
                    ? "Source: Base hotels"
                    : accommodation.source === "accommodations"
                      ? "Source: Seed accommodations"
                      : "Source non renseignée"}
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
            {(hotelAccessUrl ||
              (accommodation.source === "hotels" &&
                hotelLatitude !== null &&
                hotelLongitude !== null)) && (
              <div className={styles.roomAccessActions}>
                {accommodation.source === "hotels" &&
                hotelLatitude !== null &&
                hotelLongitude !== null ? (
                  <button
                    type="button"
                    className={`${styles.button} ${styles.roomMapButton}`}
                    onClick={openHotelMapSection}
                  >
                    <MapPin size={16} />
                    <span>Voir l'hôtel sur la carte</span>
                  </button>
                ) : null}
                {hotelAccessUrl ? (
                  <a
                    className={`${styles.button} ${styles.primaryButton} ${styles.roomAccessButton}`}
                    href={hotelAccessUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin size={16} />
                    <span>Ouvrir dans Google Maps</span>
                  </a>
                ) : null}
              </div>
            )}
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
