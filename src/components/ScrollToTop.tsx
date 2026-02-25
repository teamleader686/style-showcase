import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Replace hash with pathname if it exists to strictly start from the top
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname);
        }

        // Scroll to the top of the page smoothly
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
