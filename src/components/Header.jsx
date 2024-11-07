import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const Header = () => {
    const { cart } = useSelector((state) => state.cart)
    return (
        <Layout>
            <header className="text-gray-600 body-font ">
                <div className="container mx-auto flex  justify-between items-center">
                    <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl text-blue-500">Ecomm's</span>
                    </Link>
                    <Link to="/cart">
                        <div className="flex px-4 md:px-0">
                            <FaShoppingCart size={25} />
                            <span className="mt-[-9px]">{cart.length}</span>
                        </div>
                    </Link>
                </div>
            </header>
        </Layout>
    )
}

export default Header