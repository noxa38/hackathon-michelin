import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import RestaurantsPage from './pages/RestaurantsPage'
import AccommodationsPage from './pages/AccommodationsPage'
import AccommodationDetailPage from './pages/AccommodationDetailPage'
import MyListsPage from './pages/MyListsPage'
import IntroAnimation from './components/ui/IntroAnimation'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Navbar />
  }

  return (
    <>
      <IntroAnimation />
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
