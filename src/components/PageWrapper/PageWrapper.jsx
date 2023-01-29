import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function PageWrapper({ isLoggedIn, children }) {
    return <>
    <Header isLoggedIn={isLoggedIn} />
     {children}
    <Footer />
    </>
}