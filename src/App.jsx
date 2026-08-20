import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Charging from './pages/Charging'
import StationDetail from './pages/StationDetail'
import Wash from './pages/Wash'
import BookingFlow from './pages/BookingFlow'
import Subscribe from './pages/Subscribe'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/charge" element={<Charging />} />
        <Route path="/charge/:id" element={<StationDetail />} />
        <Route path="/wash" element={<Wash />} />
        <Route path="/wash/book/:id" element={<BookingFlow />} />
        <Route path="/wash/rebook" element={<BookingFlow />} />
        <Route path="/wash/subscribe" element={<Subscribe />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
