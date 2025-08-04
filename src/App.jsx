import { Routes, Route } from 'react-router-dom'
import InitializeProjectSetup from 'Views/Others/InitializeProjectSetup'
import Login from 'Views/Auth/Login'
import UserAuth from 'Views/Others/UserAuth'
import Home from 'Views/Pages/Home'
import { ToastContainer } from 'react-toastify'
import NotFound from 'Views/Pages/NotFound'
import Register from 'Views/Auth/Register'
import AccountActivation from 'Views/Auth/AccountActivation'
import ChangePassword from 'Views/Auth/ChangePassword'
import ForgotPassword from 'Views/Auth/ForgotPassword'
import Layout from 'Views/Others/Layout'
import About from 'Views/Pages/About'
import Tour from 'Views/Pages/Tour'
import Gallery from 'Views/Pages/Gallery'
import Contact from 'Views/Pages/Contact'
import Profile from 'Views/Pages/Profile'
import ProfileInfo from 'Views/Pages/ProfileInfo'
import ProfileBookings from 'Views/Pages/ProfileBookings'
import ProfileHistory from 'Views/Pages/ProfileHistory'
import ProfileCart from 'Views/Pages/ProfileCart'
import ProfileNotification from 'Views/Pages/ProfileNotification'
import ProfileSettings from 'Views/Pages/ProfileSettings'
import TourDetails from 'Views/Pages/TourDetails'
import AdminAuth from 'Views/Others/AdminAuth'
import AdminLayout from 'Views/Others/AdminLayout'
import AdminHome from 'Views/Admin/AdminHome'
import Bookings from 'Views/Admin/Bookings'
import Packages from 'Views/Admin/Packages'
import Users from 'Views/Admin/Users'
import Settings from 'Views/Admin/Settings'
import AdminTourDetails from 'Views/Admin/AdminTourDetails'
import UserDetails from 'Views/Admin/UserDetails'
import AddTourForm from 'Views/Admin/AddTour'

function App() {

  return (
    <>
      <ToastContainer theme='light'pauseOnHover closeOnClick />
      <Routes>
        <Route element={<InitializeProjectSetup />}>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/account-activation' element={<AccountActivation />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='user' element={<UserAuth />}>
            <Route indexElement element={<Layout />}>
              <Route path='home' element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='tour' element={<Tour />} />
              <Route path="tour/:id" element={<TourDetails />} />
              <Route path='gallery' element={<Gallery />} />
              <Route path='contact' element={<Contact />} />
              <Route path='profile' element={<Profile />}>
              <Route index element={<ProfileInfo />} />
              <Route path='bookings' element={<ProfileBookings />} />
              <Route path='history' element={<ProfileHistory />} />
              <Route path='cart' element={<ProfileCart />} />
              <Route path='notifications' element={<ProfileNotification />} />
              <Route path='settings' element={<ProfileSettings />} />
              </Route>
            </Route>
          </Route>
          <Route path='admin' element={<AdminAuth />}>
            <Route indexElement element={<AdminLayout />}>
            <Route path='home' element={<AdminHome />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='packages' element={<Packages />} />
            <Route path='addtour' element={<AddTourForm />}/>
            <Route path='users' element={<Users />} />
            <Route path='users/:id' element={<UserDetails />} />
            <Route path='settings' element={<Settings />} />
            <Route path="packages/:id" element={<AdminTourDetails />} />

            </Route>

            </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
