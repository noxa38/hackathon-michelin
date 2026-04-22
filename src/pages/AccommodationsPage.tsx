import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Database,
  Heart,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  Star,
  Tags,
  X,
} from "lucide-react";
import {
  fetchAccommodationById,
  fetchAccommodations,
} from "../services/accommodation.service";
import type { Accommodation } from "../types/accommodation.types";
import AccommodationCard from "../components/features/AccommodationCard";
import styles from "./AccommodationsPage.module.css";

function normalizeForSearch(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function AccommodationsPage() {
  const ITEMS_PER_PAGE = 9;
  const initialReservationForm = {
    fullName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    notes: "",
  };
  const navigate = useNavigate();
  const heroFallbackPhotos = useMemo(
    () => [
      "https://picsum.photos/seed/michelin-hotel-1/1200/900",
      "https://picsum.photos/seed/michelin-hotel-2/1200/900",
      "https://picsum.photos/seed/michelin-hotel-3/1200/900",
      "https://picsum.photos/seed/michelin-hotel-4/1200/900",
    ],
    [],
  );
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailFlipped, setDetailFlipped] = useState(false);
  const [reservationAccommodation, setReservationAccommodation] =
    useState<Accommodation | null>(null);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationForm, setReservationForm] = useState(initialReservationForm);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("accommodation-favorites");
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchAccommodations()
      .then(setAccommodations)
      .catch(() =>
        setError(
          "Impossible de charger les hébergements. Vérifiez que le serveur est démarré.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "accommodation-favorites",
      JSON.stringify(favoriteIds),
    );
  }, [favoriteIds]);

  const isAnyModalOpen = useMemo(
    () =>
      detailLoading ||
      Boolean(detailError) ||
      Boolean(selectedAccommodation) ||
      Boolean(reservationAccommodation),
    [detailError, detailLoading, reservationAccommodation, selectedAccommodation],
  );

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    if (!isAnyModalOpen) return;

    const scrollY = window.scrollY;
    const previousStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = previousStyles.overflow;
      document.body.style.position = previousStyles.position;
      document.body.style.top = previousStyles.top;
      document.body.style.left = previousStyles.left;
      document.body.style.right = previousStyles.right;
      document.body.style.width = previousStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [isAnyModalOpen]);

  const categories = useMemo(() => {
    const allCategories = accommodations
      .map((a) => a.category)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return ["all", ...new Set(allCategories)];
  }, [accommodations]);

  const cities = useMemo(() => {
    const allCities = accommodations
      .map((a) => a.city)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return ["", ...new Set(allCities)];
  }, [accommodations]);
  const destinationsCount = useMemo(
    () => cities.filter(Boolean).length,
    [cities],
  );
  const premiumCount = useMemo(
    () =>
      accommodations.filter(
        (accommodation) =>
          (accommodation.stars ?? accommodation.rating_stars ?? 0) >= 4,
      ).length,
    [accommodations],
  );

  const filtered = accommodations.filter((a) => {
    const normalizedQuery = normalizeForSearch(query);
    const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
    const searchableText = normalizeForSearch(
      [
        a.name,
        a.address,
        a.city,
        a.category,
        a.country,
        a.description,
        a.facilities,
      ].join(" "),
    );

    const matchesQuery =
      queryTokens.length === 0 ||
      queryTokens.every((token) => searchableText.includes(token));
    const matchesCity =
      !city || normalizeForSearch(a.city) === normalizeForSearch(city);
    const matchesCategory =
      category === "all" ||
      normalizeForSearch(a.category) === normalizeForSearch(category);
    const matchesSource = source === "all" || a.source === source;
    const currentRating = a.rating_stars ?? a.stars ?? 0;
    const matchesRating = currentRating >= Number(minRating);

    return (
      matchesQuery &&
      matchesCity &&
      matchesCategory &&
      matchesSource &&
      matchesRating
    );
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedAccommodations = filtered.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );
  const visiblePages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let start = Math.max(1, safeCurrentPage - 2);
    let end = Math.min(totalPages, safeCurrentPage + 2);

    if (start === 1) end = 5;
    if (end === totalPages) start = totalPages - 4;

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [safeCurrentPage, totalPages]);

  const heroPhotos = useMemo(() => {
    const photos = accommodations
      .map((a) => a.image_url || a.photo_url)
      .filter((value): value is string => Boolean(value))
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .slice(0, 4);
    return photos.length >= 4 ? photos : heroFallbackPhotos;
  }, [accommodations, heroFallbackPhotos]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, city, category, source, minRating]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const selectedServices = useMemo(() => {
    if (!selectedAccommodation?.facilities) return [];
    return selectedAccommodation.facilities
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean);
  }, [selectedAccommodation]);

  async function handleViewDetails(id: string) {
    setDetailError(null);
    setDetailLoading(true);
    try {
      const details = await fetchAccommodationById(id);
      setSelectedAccommodation(details);
      setDetailFlipped(false);
    } catch {
      setDetailError("Impossible de charger le détail de l'établissement.");
      setSelectedAccommodation(null);
    } finally {
      setDetailLoading(false);
    }
  }

  function closeModal() {
    setSelectedAccommodation(null);
    setDetailError(null);
    setDetailFlipped(false);
  }

  function toggleFavorite(id: string) {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }

  function handleReservation(accommodation: Accommodation) {
    setReservationAccommodation(accommodation);
    setReservationSubmitted(false);
    setReservationForm(initialReservationForm);
  }

  function closeReservationModal() {
    setReservationAccommodation(null);
    setReservationSubmitted(false);
  }

  function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReservationSubmitted(true);
  }

  function openDetailedPage(id: string) {
    closeModal();
    navigate(`/hebergements/${id}`);
  }

  function resetFilters() {
    setQuery("");
    setCity("");
    setCategory("all");
    setSource("all");
    setMinRating("0");
  }

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.headerShell}>
          <div className={styles.headerContent}>
            <span className={styles.kicker}>Selection prestige</span>
            <h1 className={styles.title}>Hébergements</h1>
            <p className={styles.lead}>
              Des adresses élégantes sélectionnées pour prolonger l'expérience
              gastronomique.
            </p>
            {!loading && !error && (
              <p className={styles.subtitle}>
                <span className={styles.subtitleValue}>
                  {accommodations.length}
                </span>{" "}
                adresses disponibles
              </p>
            )}
            {!loading && !error && (
              <div className={styles.headerStats}>
                <p className={styles.statCard}>
                  <span className={styles.statValue}>{destinationsCount}</span>
                  <span className={styles.statLabel}>destinations</span>
                </p>
                <p className={styles.statCard}>
                  <span className={styles.statValue}>{premiumCount}</span>
                  <span className={styles.statLabel}>hôtels premium</span>
                </p>
                <p className={styles.statCard}>
                  <span className={styles.statValue}>{filtered.length}</span>
                  <span className={styles.statLabel}>résultats visibles</span>
                </p>
              </div>
            )}
          </div>

          <div className={styles.headerGallery} aria-hidden="true">
            <div className={styles.headerPhotoCard}>
              <img
                className={styles.headerPhoto}
                src={heroPhotos[0]}
                alt=""
                loading="lazy"
              />
              <span className={styles.galleryBadge}>Escapade d'exception</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.toolbar}>
        <div className={styles.toolbarHeader}>
          <p className={styles.toolbarTitle}>
            <SlidersHorizontal size={15} />
            Filtres avancés
          </p>
          <button
            type="button"
            className={styles.resetFiltersButton}
            onClick={resetFilters}
          >
            <X size={14} />
            Réinitialiser
          </button>
        </div>

        <label className={styles.searchWrap}>
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un hébergement..."
            aria-label="Recherche d'hébergements"
          />
        </label>

        <label className={styles.filterWrap}>
          <span className={styles.filterLabel}>
            <MapPin size={14} />
            Ville
          </span>
          <select
            className={styles.select}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Filtrer par ville"
          >
            <option value="">Toutes les villes</option>
            {cities.filter(Boolean).map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filterWrap}>
          <span className={styles.filterLabel}>
            <Tags size={14} />
            Catégorie
          </span>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filtrer par catégorie"
          >
            <option value="all">Toutes les catégories</option>
            {categories
              .filter((c) => c !== "all")
              .map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
          </select>
        </label>

        <label className={styles.filterWrap}>
          <span className={styles.filterLabel}>
            <Database size={14} />
            Source
          </span>
          <select
            className={styles.select}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            aria-label="Filtrer par source"
          >
            <option value="all">Toutes les sources</option>
            <option value="hotels">Base hotels</option>
            <option value="accommodations">Seed accommodations</option>
          </select>
        </label>

        <label className={styles.filterWrap}>
          <span className={styles.filterLabel}>
            <Star size={14} />
            Note minimale
          </span>
          <select
            className={styles.select}
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            aria-label="Filtrer par note minimale"
          >
            <option value="0">Toutes les notes</option>
            <option value="3">3+ étoiles</option>
            <option value="4">4+ étoiles</option>
            <option value="5">5 étoiles</option>
          </select>
        </label>
      </section>

      {loading && (
        <div className={styles.state}>
          <div className={styles.loadingShell} role="status" aria-live="polite">
            <div className={styles.loadingCard}>
              <div className={styles.loadingLogoWrap} aria-hidden="true">
                <div className={styles.loadingRing} />
                <div className={styles.loadingLogo}>
                  <span className={styles.loadingLogoInner}>
                    MICHELIN GUIDE
                  </span>
                </div>
              </div>
              <p className={styles.loadingTitle}>
                Recherche des meilleures adresses...
              </p>
              <p className={styles.loadingText}>
                Preparation de votre selection d'hebergements.
              </p>
              <div className={styles.loadingTrack} aria-hidden="true">
                <span className={styles.loadingBar} />
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className={styles.empty}>
              Aucun hébergement ne correspond à vos filtres.
            </p>
          ) : (
            <>
              <section className={styles.grid}>
                {paginatedAccommodations.map((accommodation) => (
                  <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </section>

              {totalPages > 1 && (
                <nav className={styles.pagination} aria-label="Pagination des hébergements">
                  <button
                    type="button"
                    className={styles.paginationButton}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={safeCurrentPage === 1}
                    aria-label="Page précédente"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className={styles.paginationPages}>
                    {visiblePages.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        className={`${styles.paginationButton} ${
                          pageNumber === safeCurrentPage
                            ? styles.paginationButtonActive
                            : ""
                        }`}
                        onClick={() => setCurrentPage(pageNumber)}
                        aria-current={
                          pageNumber === safeCurrentPage ? "page" : undefined
                        }
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.paginationButton}
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={safeCurrentPage === totalPages}
                    aria-label="Page suivante"
                  >
                    <ChevronRight size={16} />
                  </button>
                </nav>
              )}
            </>
          )}
        </>
      )}

      {(detailLoading || detailError || selectedAccommodation) && (
        <div
          className={styles.modalBackdrop}
          onClick={closeModal}
          role="presentation"
        >
          <article
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Détails de l'hébergement"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            {detailLoading && (
              <p className={styles.modalLoading}>Chargement des détails...</p>
            )}

            {detailError && <p className={styles.modalError}>{detailError}</p>}

            {selectedAccommodation && (
              <div className={styles.detailCardOuter}>
                <div
                  className={`${styles.detailCardInner} ${
                    detailFlipped ? styles.detailFlipped : ""
                  }`}
                >
                  <section className={styles.detailCardFront}>
                    <section className={styles.detailLayout}>
                      <aside className={styles.detailVisualColumn}>
                        <div className={styles.detailVisualCard}>
                          <img
                            className={styles.detailVisualImage}
                            src={
                              selectedAccommodation.image_urls?.[0] ||
                              selectedAccommodation.image_url ||
                              selectedAccommodation.photo_url ||
                              "https://picsum.photos/seed/hotel-detail/1200/700"
                            }
                            alt={selectedAccommodation.name}
                          />
                          <div className={styles.detailVisualOverlay} />
                          <div className={styles.detailVisualContent}>
                            <span className={styles.detailCategoryPill}>
                              {selectedAccommodation.category || "Hébergement"}
                            </span>
                            <h2 className={styles.detailTitle}>
                              {selectedAccommodation.name}
                            </h2>
                            <p className={styles.detailAddress}>
                              <MapPin size={15} />
                              <span>
                                {selectedAccommodation.address},{" "}
                                {selectedAccommodation.city}
                                {selectedAccommodation.country
                                  ? `, ${selectedAccommodation.country}`
                                  : ""}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className={styles.detailActions}>
                          <button
                            type="button"
                            className={`${styles.actionButton} ${styles.primaryAction}`}
                            onClick={() =>
                              handleReservation(selectedAccommodation)
                            }
                          >
                            <CalendarCheck2 size={16} />
                            <span>Réservation</span>
                          </button>
                          <button
                            type="button"
                            className={`${styles.actionButton} ${
                              favoriteIds.includes(selectedAccommodation.id)
                                ? styles.favoriteActive
                                : ""
                            }`}
                            onClick={() =>
                              toggleFavorite(selectedAccommodation.id)
                            }
                          >
                            <Heart size={16} />
                            <span>
                              {favoriteIds.includes(selectedAccommodation.id)
                                ? "Retirer des favoris"
                                : "Ajouter aux favoris"}
                            </span>
                          </button>
                        </div>
                      </aside>

                      <div className={styles.detailInfoColumn}>
                        <div className={styles.detailMetaGrid}>
                          <p className={styles.metaCard}>
                            <MapPin size={15} />
                            <span>{selectedAccommodation.city}</span>
                          </p>
                          <p className={styles.metaCard}>
                            <Star size={15} />
                            <span>
                              {selectedAccommodation.stars ||
                              selectedAccommodation.rating_stars
                                ? `${selectedAccommodation.stars || selectedAccommodation.rating_stars} étoiles`
                                : "Classement non renseigné"}
                            </span>
                          </p>
                          <p className={styles.metaCard}>
                            <CalendarCheck2 size={15} />
                            <span>
                              {selectedAccommodation.price_from
                                ? `Dès ${selectedAccommodation.price_from} EUR / nuit`
                                : "Prix non renseigné"}
                            </span>
                          </p>
                          <p className={styles.metaCard}>
                            <Phone size={15} />
                            <span>
                              {selectedAccommodation.phone ||
                                "Téléphone non disponible"}
                            </span>
                          </p>
                          <p className={styles.metaCard}>
                            <MapPin size={15} />
                            <span>
                              {selectedAccommodation.country ||
                                "Pays non renseigné"}
                            </span>
                          </p>
                        </div>

                        <section className={styles.detailSection}>
                          <h3 className={styles.detailSectionTitle}>Aperçu</h3>
                          <p className={styles.modalText}>
                            {selectedAccommodation.description
                              ? `${selectedAccommodation.description.slice(0, 200)}${
                                  selectedAccommodation.description.length > 200
                                    ? "..."
                                    : ""
                                }`
                              : "Description non disponible pour cet établissement."}
                          </p>
                        </section>

                        <section className={styles.detailSection}>
                          <h3 className={styles.detailSectionTitle}>
                            Services clés
                          </h3>
                          <div className={styles.servicesList}>
                            {(selectedServices.length > 0
                              ? selectedServices.slice(0, 6)
                              : ["Informations non disponibles"]
                            ).map((service) => (
                              <span key={service} className={styles.serviceTag}>
                                {service}
                              </span>
                            ))}
                          </div>
                        </section>

                        <button
                          type="button"
                          className={styles.flipButton}
                          onClick={() => setDetailFlipped(true)}
                        >
                          Voir plus de détails
                        </button>
                        <button
                          type="button"
                          className={styles.detailPageButton}
                          onClick={() =>
                            openDetailedPage(selectedAccommodation.id)
                          }
                        >
                          Ouvrir la fiche détaillée
                        </button>
                      </div>
                    </section>
                  </section>

                  <section className={styles.detailCardBack}>
                    <section className={styles.detailSection}>
                      <h3 className={styles.detailSectionTitle}>
                        Fiche complète
                      </h3>
                      <div className={styles.detailMetaGrid}>
                        <p className={styles.metaCard}>
                          <Star size={15} />
                          <span>
                            {selectedAccommodation.stars ||
                            selectedAccommodation.rating_stars
                              ? `${selectedAccommodation.stars || selectedAccommodation.rating_stars} étoiles`
                              : "Classement non renseigné"}
                          </span>
                        </p>
                        <p className={styles.metaCard}>
                          <CalendarCheck2 size={15} />
                          <span>
                            {selectedAccommodation.price_from
                              ? `Dès ${selectedAccommodation.price_from} EUR / nuit`
                              : "Prix non renseigné"}
                          </span>
                        </p>
                        <p className={styles.metaCard}>
                          <MapPin size={15} />
                          <span>{selectedAccommodation.city}</span>
                        </p>
                        <p className={styles.metaCard}>
                          <MapPin size={15} />
                          <span>
                            {selectedAccommodation.country ||
                              "Pays non renseigné"}
                          </span>
                        </p>
                        <p className={styles.metaCard}>
                          <Heart size={15} />
                          <span>
                            {selectedAccommodation.category ||
                              "Catégorie non renseignée"}
                          </span>
                        </p>
                        <p className={styles.metaCard}>
                          <span>
                            {selectedAccommodation.source === "hotels"
                              ? "Source: Base hotels"
                              : selectedAccommodation.source ===
                                  "accommodations"
                                ? "Source: Seed accommodations"
                                : "Source non renseignée"}
                          </span>
                        </p>
                      </div>
                    </section>

                    <section className={styles.detailSection}>
                      <h3 className={styles.detailSectionTitle}>Services</h3>
                      <div className={styles.servicesList}>
                        {(selectedServices.length > 0
                          ? selectedServices
                          : ["Informations non disponibles"]
                        ).map((service) => (
                          <span key={service} className={styles.serviceTag}>
                            {service}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className={styles.detailSection}>
                      <h3 className={styles.detailSectionTitle}>Description</h3>
                      <p className={styles.modalText}>
                        {selectedAccommodation.description ||
                          "Description non disponible pour cet établissement."}
                      </p>
                    </section>

                    <section className={styles.detailSection}>
                      <h3 className={styles.detailSectionTitle}>
                        Informations utiles
                      </h3>
                      <div className={styles.detailMetaGrid}>
                        <p
                          className={`${styles.metaCard} ${styles.metaCardWide}`}
                        >
                          <MapPin size={15} />
                          <span>
                            {selectedAccommodation.address},{" "}
                            {selectedAccommodation.city}
                            {selectedAccommodation.country
                              ? `, ${selectedAccommodation.country}`
                              : ""}
                          </span>
                        </p>
                        <p className={styles.metaCard}>
                          <Phone size={15} />
                          <span>
                            {selectedAccommodation.phone ||
                              "Téléphone non disponible"}
                          </span>
                        </p>
                      </div>
                    </section>

                    <div className={styles.detailActions}>
                      <button
                        type="button"
                        className={`${styles.actionButton} ${styles.primaryAction}`}
                        onClick={() => handleReservation(selectedAccommodation)}
                      >
                        <CalendarCheck2 size={16} />
                        <span>Réservation</span>
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionButton} ${
                          favoriteIds.includes(selectedAccommodation.id)
                            ? styles.favoriteActive
                            : ""
                        }`}
                        onClick={() => toggleFavorite(selectedAccommodation.id)}
                      >
                        <Heart size={16} />
                        <span>
                          {favoriteIds.includes(selectedAccommodation.id)
                            ? "Retirer des favoris"
                            : "Ajouter aux favoris"}
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.flipButton}
                      onClick={() => setDetailFlipped(false)}
                    >
                      Revenir a l'aperçu
                    </button>
                    <button
                      type="button"
                      className={styles.detailPageButton}
                      onClick={() => openDetailedPage(selectedAccommodation.id)}
                    >
                      Ouvrir la fiche détaillée
                    </button>
                  </section>
                </div>
              </div>
            )}
          </article>
        </div>
      )}

      {reservationAccommodation && (
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
              className={styles.closeButton}
              onClick={closeReservationModal}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <h2 className={styles.reservationTitle}>Demande de réservation</h2>
            <p className={styles.reservationSubtitle}>
              {reservationAccommodation.name} - {reservationAccommodation.city}
            </p>

            {reservationSubmitted ? (
              <div className={styles.reservationSuccess}>
                <p>
                  Votre demande a bien été envoyée. Nous vous recontacterons
                  rapidement par email.
                </p>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.primaryAction}`}
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
                    className={styles.actionButton}
                    onClick={closeReservationModal}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`${styles.actionButton} ${styles.primaryAction}`}
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
