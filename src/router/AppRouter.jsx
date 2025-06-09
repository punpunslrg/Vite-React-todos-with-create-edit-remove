import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import MainLayout from '../layout/MainLayout'
import NotePage from '../pages/NotePage'
import RegisterPage from '../pages/RegisterPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<NotePage />}/>
          <Route path='register' element={<RegisterPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
