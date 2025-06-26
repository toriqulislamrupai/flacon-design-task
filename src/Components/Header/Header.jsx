import { Link } from "react-router-dom";



const Header = () => {
    return (
        <div>
            <h2>Header</h2>
            <div className="flex gap-2">
<Link to="/">Home </Link>
<Link to="/about">About</Link>
            </div>
            
        </div>
    );
};

export default Header;