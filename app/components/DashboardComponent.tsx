import AppbarClient from "@/app/components/AppbarClient"
import PrivateRoute from "@/app/components/PrivateRoute"
import Footer from "@/app/components/Footer"
import Overview from "@/app/components/Overview"
import Spaces from "@/app/components/Spaces"

export default function DashboardComponent({children}: {children: React.ReactNode}){
    return (
        <PrivateRoute>
            <AppbarClient />
            <div className="max-w-5xl mx-auto px-4 py-8">
                <Overview />
                <hr />
                <Spaces />
                {children}
                <hr />
            </div>
            <Footer />
        </PrivateRoute>
    )
}