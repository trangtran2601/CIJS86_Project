import Header from '../Common/Header';
import Footer from '../Common/Footer';


const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
