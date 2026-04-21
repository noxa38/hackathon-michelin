import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import RestaurantsPage from './pages/RestaurantsPage'
import AccommodationsPage from './pages/AccommodationsPage'
import MyListsPage from './pages/MyListsPage'
import IntroAnimation from './components/ui/IntroAnimation'

function App() {
  return (
    <BrowserRouter>
      <IntroAnimation />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/hebergements" element={<AccommodationsPage />} />
        <Route path="/mes-listes" element={<MyListsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
