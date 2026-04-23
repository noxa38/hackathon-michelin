import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  Heart,
  MapPin,
  Phone,
  Search,
  Star,
  Tags,
  X,
} from "lucide-react";

const TOP_LIKED_ACCOMMODATIONS = [
  {
    id: 1,
    name: "Le Grand Siècle",
    city: "Paris",
    category: "Palace",
    stars: 5,
    likes: 1342,
    price: "Dès 980 € / nuit",
    photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=900&fit=crop",
  },
  {
    id: 2,
    name: "Villa Rocabella",
    city: "Nice",
    category: "Boutique Hôtel",
    stars: 5,
    likes: 1104,
    price: "Dès 620 € / nuit",
    photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop",
  },
  {
    id: 3,
    name: "Chalet des Cimes",
    city: "Megève",
    category: "Chalet de luxe",
    stars: 5,
    likes: 987,
    price: "Dès 740 € / nuit",
    photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=900&fit=crop",
  },
  {
    id: 4,
    name: "Domaine des Landes",
    city: "Bordeaux",
    category: "Château",
    stars: 4,
    likes: 892,
    price: "Dès 450 € / nuit",
    photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=900&fit=crop",
  },
  {
    id: 5,
    name: "L'Oiseau Blanc",
    city: "Lyon",
    category: "Hôtel de caractère",
    stars: 4,
    likes: 834,
    price: "Dès 390 € / nuit",
    photo: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&h=900&fit=crop",
  },
  {
    id: 6,
    name: "Résidence Côté Mer",
    city: "Biarritz",
    category: "Boutique Hôtel",
    stars: 4,
    likes: 768,
    price: "Dès 310 € / nuit",
    photo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop",
  },
  {
    id: 7,
    name: "Mas Provençal",
    city: "Aix-en-Provence",
    category: "Maison d'hôtes",
    stars: 4,
    likes: 712,
    price: "Dès 280 € / nuit",
    photo: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop",
  },
  {
    id: 8,
    name: "Le Manoir Breton",
    city: "Quimper",
    category: "Manoir",
    stars: 4,
    likes: 681,
    price: "Dès 260 € / nuit",
    photo: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=1200&h=900&fit=crop",
  },
  {
    id: 9,
    name: "Suite Altitude",
    city: "Annecy",
    category: "Resort",
    stars: 5,
    likes: 655,
    price: "Dès 820 € / nuit",
    photo: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=900&fit=crop",
  },
  {
    id: 10,
    name: "Palais des Sables",
    city: "Marseille",
    category: "Palace",
    stars: 5,
    likes: 629,
    price: "Dès 1100 € / nuit",
    photo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=900&fit=crop",
  },
];

import {
  fetchAccommodationById,
  fetchAccommodations,
} from "../services/accommodation.service";
import {
  getListAccommodations,
  findOrCreateList,
  addAccommodationToList,
  removeAccommodationFromList,
  getLists,
} from "../services/list.service";
import { getToken, getUser } from "../services/auth.service";
import type { Accommodation } from "../types/accommodation.types";
import AccommodationCard from "../components/features/AccommodationCard";
import SaveToListModal from "../components/features/SaveToListModal";
import styles from "./AccommodationsPage.module.css";
import accommodationMichelinStarIconUrl from '../../img/accommodation-michelin-star-icon.svg';

const ACCOMMODATIONS_LIKED_LIST_NAME = "Hébergements likées";

function normalizeForSearch(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getInitialAccommodationLikeCount(accommodation: Accommodation): number {
  const stars = accommodation.stars ?? accommodation.rating_stars ?? 0;
  const premiumBonus = accommodation.category?.toLowerCase().includes("palace") ? 30 : 0;
  const popularitySeed = (Number(accommodation.id) * 19) % 90;
  return 12 + Math.floor(stars * 20) + premiumBonus + popularitySeed;
}

function normalizeAccommodationId(value: string | number): string {
  const rawValue = String(value)
  return rawValue.includes('-') ? rawValue.split('-').pop() || rawValue : rawValue
}

function toAccommodationNumericId(value: string | number): number {
  return Number(normalizeAccommodationId(value))
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
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [cityFilters, setCityFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [sourceFilters, setSourceFilters] = useState<string[]>([]);
  const [minRating, setMinRating] = useState("0");
  const [openMenu, setOpenMenu] = useState<
    "city" | "category" | "source" | "rating" | null
  >(null);
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
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [likesById, setLikesById] = useState<Record<number, number>>({});
  const [savedAccommodationIds, setSavedAccommodationIds] = useState<Set<number>>(new Set());
  const [saveTargetAccommodationId, setSaveTargetAccommodationId] = useState<number | null>(null);
  const [saveTargetAccommodationSource, setSaveTargetAccommodationSource] = useState<"hotels" | "accommodations">("hotels");
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const menuRefs = useMemo(
    () => ({
      city: cityRef,
      category: categoryRef,
      source: sourceRef,
      rating: ratingRef,
    }),
    [],
  );
  const closeAllFilters = useCallback(() => setOpenMenu(null), []);

  useEffect(() => {
    const token = getToken();
    fetchAccommodations()
      .then((loadedAccommodations) => {
        setAccommodations(loadedAccommodations)
        const initialLikes = loadedAccommodations.reduce<Record<number, number>>((acc, accommodation) => {
          acc[Number(accommodation.id)] = getInitialAccommodationLikeCount(accommodation)
          return acc
        }, {})
        setLikesById(initialLikes)
      })
      .catch(() =>
        setError(
          "Impossible de charger les hébergements. Vérifiez que le serveur est démarré.",
        ),
      )
      .finally(() => setLoading(false));

    if (token) {
      getLists(token)
        .then(async (lists) => {
          const likedList = lists.find((list) => list.name === ACCOMMODATIONS_LIKED_LIST_NAME)
          if (likedList) {
            const likedAccommodations = await getListAccommodations(token, likedList.id).catch(() => [])
            setFavoriteIds(likedAccommodations.map((accommodation) => normalizeAccommodationId(accommodation.id)))
          }

          const listsForSave = lists.filter((list) => list.name !== ACCOMMODATIONS_LIKED_LIST_NAME)
          const accommodationsByList = await Promise.all(
            listsForSave.map((list) => getListAccommodations(token, list.id).catch(() => []))
          )
          const ids = new Set<number>()
          accommodationsByList.flat().forEach((accommodation) => {
            const parsedId = toAccommodationNumericId(accommodation.id)
            if (Number.isFinite(parsedId)) ids.add(parsedId)
          })
          setSavedAccommodationIds(ids)
        })
        .catch(() => {})
    }
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const activeMenu = openMenu;
    function handleOutsideClick(event: MouseEvent) {
      const activeRef = menuRefs[activeMenu];
      if (
        activeRef?.current &&
        !activeRef.current.contains(event.target as Node)
      ) {
        closeAllFilters();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closeAllFilters, menuRefs, openMenu]);

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
      cityFilters.length === 0 ||
      cityFilters.some(
        (cityName) =>
          normalizeForSearch(a.city) === normalizeForSearch(cityName),
      );
    const matchesCategory =
      categoryFilters.length === 0 ||
      categoryFilters.some(
        (categoryName) =>
          normalizeForSearch(a.category) === normalizeForSearch(categoryName),
      );
    const matchesSource =
      sourceFilters.length === 0 ||
      sourceFilters.some((sourceName) => a.source === sourceName);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [query, cityFilters, categoryFilters, sourceFilters, minRating]);

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

  async function toggleFavorite(id: string) {
    const token = getToken();
    const user = getUser();
    const numId = Number(id);
    if (!token || user?.userType === 'admin') {
      navigate('/auth?message=lists')
      return
    }

    const isCurrentlyFavorited = favoriteIds.includes(id);
    const previousLikes = likesById[numId] ?? 0;
    const nextLikes = isCurrentlyFavorited
      ? Math.max(0, previousLikes - 1)
      : previousLikes + 1;

    setFavoriteIds((current) =>
      isCurrentlyFavorited
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
    setLikesById((current) => ({
      ...current,
      [numId]: nextLikes,
    }));

    try {
      if (isCurrentlyFavorited) {
        const lists = await getLists(token);
        const likedList = lists.find((l: { name: string }) => l.name === ACCOMMODATIONS_LIKED_LIST_NAME);
        if (likedList) {
          await removeAccommodationFromList(token, likedList.id, numId);
        }
      } else {
        const likedList = await findOrCreateList(token, ACCOMMODATIONS_LIKED_LIST_NAME);
        await addAccommodationToList(token, likedList.id, numId, 'hotels');
      }
    } catch {
      // Rollback optimistic update on error
      setFavoriteIds((current) =>
        isCurrentlyFavorited
          ? [...current, id]
          : current.filter((favoriteId) => favoriteId !== id),
      );
      setLikesById((current) => ({
        ...current,
        [numId]: previousLikes,
      }));
    }
  }

  function handleOpenSaveModal(accommodationId: number, accommodationSource: "hotels" | "accommodations" = "hotels") {
    const token = getToken();
    const user = getUser();
    if (!token || user?.userType === 'admin') {
      navigate('/auth?message=lists')
      return
    }

    setSaveTargetAccommodationId(accommodationId)
    setSaveTargetAccommodationSource(accommodationSource)
    setSaveModalOpen(true)
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
    setCityFilters([]);
    setCategoryFilters([]);
    setSourceFilters([]);
    setMinRating("0");
    closeAllFilters();
  }

  function toggleDropdown(
    target: "city" | "category" | "source" | "rating",
  ) {
    setOpenMenu((current) => (current === target ? null : target));
  }

  function makeToggle<T>(setter: React.Dispatch<React.SetStateAction<T[]>>) {
    return (value: T) =>
      setter((current) =>
        current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      );
  }

  const hasFilters =
    query.trim().length > 0 ||
    cityFilters.length > 0 ||
    categoryFilters.length > 0 ||
    sourceFilters.length > 0 ||
    minRating !== "0";

  return (
    <>
      <SaveToListModal
        isOpen={saveModalOpen}
        token={getToken()}
        itemId={saveTargetAccommodationId}
        itemType="accommodation"
        accommodationSource={saveTargetAccommodationSource}
        title="Enregistrer cet hébergement"
        onClose={() => {
          setSaveModalOpen(false)
          setSaveTargetAccommodationId(null)
          setSaveTargetAccommodationSource('hotels')
        }}
        onSaved={(savedId) => {
          setSavedAccommodationIds((current) => {
            const next = new Set(current)
            next.add(savedId)
            return next
          })
        }}
      />
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.headerShell}>
          <div className={styles.headerContent}>
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
                hébergements
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
        </div>

        <div className={styles.headerCarouselWrap}>
          <div className={styles.headerGallery} aria-hidden="true">
          <div className={styles.headerCarousel}>
            <span className={styles.galleryBadge}>Sélection des hébergements les plus likés</span>
            <div className={styles.carouselTrack}>
              {TOP_LIKED_ACCOMMODATIONS.map((item) => (
                <article key={item.id} className={styles.carouselCard}>
                  <img
                    className={styles.carouselPhoto}
                    src={item.photo}
                    alt=""
                    loading="lazy"
                  />
                  <div className={styles.carouselOverlay}>
                    <div className={styles.carouselStars}>
                      {Array.from({ length: item.stars }, (_, index) => (
                        <img
                          key={`${item.id}-star-${index}`}
                          src={accommodationMichelinStarIconUrl}
                          alt=""
                          className={styles.carouselStarImg}
                        />
                      ))}
                    </div>
                    <p className={styles.carouselName}>{item.name}</p>
                    <p className={styles.carouselMeta}>
                      {item.city} · {item.category}
                    </p>
                    <div className={styles.carouselBottom}>
                      <span className={styles.carouselPrice}>{item.price}</span>
                      <span className={styles.carouselLikes}>
                        <Heart size={12} />
                        <span>{item.likes}</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      <div className={styles.filterBar}>
        <div className={styles.searchBar}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Nom, ville, catégorie..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Rechercher un hébergement"
          />
          {query && (
            <button
              className={styles.searchClear}
              onClick={() => setQuery("")}
              aria-label="Effacer"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <DropdownFilter
          ref={cityRef}
          icon={<MapPin size={14} />}
          label="Ville"
          count={cityFilters.length}
          isOpen={openMenu === "city"}
          onToggle={() => toggleDropdown("city")}
          onClear={() => setCityFilters([])}
          scrollable
        >
          {cities
            .filter(Boolean)
            .map((cityName) => (
              <label
                key={cityName}
                className={`${styles.dropdownItem} ${
                  cityFilters.includes(cityName) ? styles.dropdownItemChecked : ""
                }`}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={cityFilters.includes(cityName)}
                  onChange={() => makeToggle(setCityFilters)(cityName)}
                />
                <span>{cityName}</span>
              </label>
            ))}
        </DropdownFilter>

        <DropdownFilter
          ref={categoryRef}
          icon={<Tags size={14} />}
          label="Catégorie"
          count={categoryFilters.length}
          isOpen={openMenu === "category"}
          onToggle={() => toggleDropdown("category")}
          onClear={() => setCategoryFilters([])}
          scrollable
        >
          {categories
            .filter((value) => value !== "all")
            .map((categoryName) => (
              <label
                key={categoryName}
                className={`${styles.dropdownItem} ${
                  categoryFilters.includes(categoryName)
                    ? styles.dropdownItemChecked
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={categoryFilters.includes(categoryName)}
                  onChange={() => makeToggle(setCategoryFilters)(categoryName)}
                />
                <span>{categoryName}</span>
              </label>
            ))}
        </DropdownFilter>

        <DropdownFilter
          ref={sourceRef}
          icon={<Database size={14} />}
          label="Source"
          count={sourceFilters.length}
          isOpen={openMenu === "source"}
          onToggle={() => toggleDropdown("source")}
          onClear={() => setSourceFilters([])}
        >
          {[
            { value: "hotels", label: "Base hotels" },
            { value: "accommodations", label: "Seed accommodations" },
          ].map((sourceOption) => (
            <label
              key={sourceOption.value}
              className={`${styles.dropdownItem} ${
                sourceFilters.includes(sourceOption.value)
                  ? styles.dropdownItemChecked
                  : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={sourceFilters.includes(sourceOption.value)}
                onChange={() => makeToggle(setSourceFilters)(sourceOption.value)}
              />
              <span>{sourceOption.label}</span>
            </label>
          ))}
        </DropdownFilter>

        <DropdownFilter
          ref={ratingRef}
          icon={<Star size={14} />}
          label="Note"
          count={minRating !== "0" ? 1 : 0}
          isOpen={openMenu === "rating"}
          onToggle={() => toggleDropdown("rating")}
          onClear={() => setMinRating("0")}
        >
          {[
            { value: "3", label: "3+ étoiles" },
            { value: "4", label: "4+ étoiles" },
            { value: "5", label: "5 étoiles" },
          ].map((ratingOption) => (
            <label
              key={ratingOption.value}
              className={`${styles.dropdownItem} ${
                minRating === ratingOption.value ? styles.dropdownItemChecked : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={minRating === ratingOption.value}
                onChange={() =>
                  setMinRating((current) =>
                    current === ratingOption.value ? "0" : ratingOption.value,
                  )
                }
              />
              <span>{ratingOption.label}</span>
            </label>
          ))}
        </DropdownFilter>

        {hasFilters && (
          <button className={styles.resetAll} onClick={resetFilters}>
            <X size={13} /> Tout effacer
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.state}>
          <div className={styles.spinner} aria-label="Chargement" />
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
                    isFavorited={favoriteIds.includes(String(accommodation.id))}
                    onToggleFavorite={() => toggleFavorite(String(accommodation.id))}
                    likes={likesById[Number(accommodation.id)] ?? getInitialAccommodationLikeCount(accommodation)}
                    isSaved={savedAccommodationIds.has(Number(accommodation.id))}
                    onSaveClick={() => handleOpenSaveModal(Number(accommodation.id), accommodation.source || 'hotels')}
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
                            openDetailedPage(String(selectedAccommodation.id))
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
                      onClick={() => openDetailedPage(String(selectedAccommodation.id))}
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
    </>
  );
}

interface DropdownFilterProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
  scrollable?: boolean;
  children: React.ReactNode;
}

const DropdownFilter = forwardRef<HTMLDivElement, DropdownFilterProps>(
  (
    { icon, label, count, isOpen, onToggle, onClear, scrollable, children },
    ref,
  ) => (
    <div className={styles.dropdown} ref={ref}>
      <button
        type="button"
        className={`${styles.dropdownTrigger} ${
          count > 0 ? styles.dropdownActive : ""
        }`}
        onClick={onToggle}
      >
        {icon}
        <span>{label}</span>
        {count > 0 && <span className={styles.badge}>{count}</span>}
        <ChevronDown
          size={13}
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`${styles.dropdownMenu} ${
            scrollable ? styles.dropdownMenuScrollable : ""
          }`}
        >
          {children}
          {count > 0 && (
            <button className={styles.clearOption} onClick={onClear}>
              <X size={11} /> Réinitialiser
            </button>
          )}
        </div>
      )}
    </div>
  ),
);

DropdownFilter.displayName = "DropdownFilter";
