import { Navigate, Route, Routes } from "react-router-dom"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import { LoginPage } from "../auth"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"


export const AppRouter = () => {


    const { status, checkAuthToken } = useAuthStore()
    // const authStatus = 'not-authenticated'


    useEffect(() => {
        checkAuthToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (status === 'checking') {
        return (
            <h3>Loading...</h3>
        )
    }



    return (
        <>
            <Routes>
                {
                    status === 'authenticated' ? (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to='/' />} />
                        </>
                    )
                        : (
                            <>
                                <Route path="/auth/*" element={<LoginPage />} />
                                <Route path="/*" element={<Navigate to='/auth/login' />} />
                            </>
                        )
                }
            </Routes>
        </>
    )
}
