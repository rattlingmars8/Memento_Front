import { Routes, Route } from "react-router-dom"

import "./globals.css"
import SigninForm from "./_auth/Forms/SigninForm"
import SignupForm from "./_auth/Forms/SignupForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { CreatePost, Explore, Home, People, PostDetails, Profile, Saved, UpdatePost } from "./_root/pages"
import ForgotForm from "./_auth/Forms/ForgotForm"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SigninForm />}/>
          <Route path="sign-up" element={<SignupForm />}/>
          <Route path="forgot-password" element={<ForgotForm />}/>
          {/* Todo: Reset Password Route+Form */}
        </Route>


        <Route element={<RootLayout />}>
          <Route index element={<Home />}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/people" element={<People/>}/>
          <Route path="/Saved" element={<Saved/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:id" element={<UpdatePost/>}/>
          <Route path="/post/:id" element={<PostDetails/>}/>
          <Route path="/profile/:id/*" element={<Profile/>}/> 
          {/* Todo: Update Profile Data */}
        </Route>
      </Routes>
    </main>
  )
}

export default App