import HomePage from '../pages/HomePage'
import DashBoard from '../pages/DashBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'/dashboard'} element={<DashBoard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
