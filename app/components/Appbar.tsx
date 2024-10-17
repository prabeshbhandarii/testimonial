import { useSession } from "next-auth/react"
import { useState } from "react"
import { Logout } from "./Logout"
import { Login } from "./Login"
import { GoToDashboard } from "./GoToDashboard"
import { Menu, X } from "lucide-react"

const Appbar = () => {
    const session = useSession()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header>
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <img 
                            className="mr-3 h-6 sm:h-9" 
                            src="https://flowbite.com/docs/images/logo.svg" 
                            alt="Testimonial Logo" 
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Testimonial
                        </span>
                    </a>
                    
                    {/* Mobile menu button */}
                    <button 
                        onClick={toggleMobileMenu}
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Toggle mobile menu</span>
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Navigation menu - desktop and mobile */}
                    <div className={`${
                        isMobileMenuOpen ? 'block' : 'hidden'
                    } w-full lg:block lg:w-auto lg:order-1`}>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {!session.data?.user && <Login />}
                            {session.data?.user && (
                                <>
                                    <Logout />
                                    <GoToDashboard />
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Appbar