import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import RestaurantsPage from './pages/RestaurantsPage'
import IntroAnimation from './components/ui/IntroAnimation'

function App() {
  return (
    <BrowserRouter>
      <IntroAnimation />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
