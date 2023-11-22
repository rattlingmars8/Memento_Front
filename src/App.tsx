import { Routes, Route } from "react-router-dom"

import "./globals.css"
import SigninForm from "./_auth/Forms/SigninForm"
import SignupForm from "./_auth/Forms/SignupForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Home } from "./_root/pages"
import ForgotForm from "./_auth/Forms/ForgotForm"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SigninForm />}/>
          <Route path="sign-up" element={<SignupForm />}/>
          <Route path="forgot-password" element={<ForgotForm />}/>
        </Route>


        <Route element={<RootLayout />}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </main>
  )
}

export default App