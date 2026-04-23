import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import RestaurantsPage from './pages/RestaurantsPage'
import AccommodationsPage from './pages/AccommodationsPage'
import AccommodationDetailPage from './pages/AccommodationDetailPage'
import MyListsPage from './pages/MyListsPage'
import IntroAnimation from './components/ui/IntroAnimation'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminEstablishmentFormPage from './pages/AdminEstablishmentFormPage'
import AdminUserFormPage from './pages/AdminUserFormPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent() {
  const { isAuthenticated, loading, userType } = useAuth()

  if (loading) {
    return <Navbar />
  }

  return (
    <>
      <IntroAnimation />
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recherche" element={<SearchResultsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/hebergements" element={<AccommodationsPage />} />
        <Route path="/hebergements/:id" element={<AccommodationDetailPage />} />
        <Route path="/mes-listes" element={<MyListsPage />} />
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin-dashboard"
          element={isAuthenticated && userType === 'admin' ? <AdminDashboardPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/admin-dashboard/fiches-etablissements/new"
          element={isAuthenticated && userType === 'admin' ? <AdminEstablishmentFormPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/admin-dashboard/fiches-etablissements/:type/:id/edit"
          element={isAuthenticated && userType === 'admin' ? <AdminEstablishmentFormPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/admin-dashboard/utilisateurs/new"
          element={isAuthenticated && userType === 'admin' ? <AdminUserFormPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/admin-dashboard/utilisateurs/:id/edit"
          element={isAuthenticated && userType === 'admin' ? <AdminUserFormPage /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
