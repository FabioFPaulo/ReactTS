import { navLinks } from "../constants";

const Navbar = () => {
    return (
        <header>
            <nav>
                <img src="/logo.svg" alt="App Logo" />
                <ul>
                    {navLinks.map((item) => (
                        <li key={item.link}>
                            <a href={item.link}>{item.label}</a>
                        </li>
                    ))}
                </ul>

                <div className="flex-center gap-3">
                    <button>
                        <img src="/search.svg" alt="Search" />
                    </button>
                    <button>
                        <img src="/cart.svg" alt="Chrt" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
