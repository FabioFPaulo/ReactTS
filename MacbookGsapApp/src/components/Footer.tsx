import { footerLinks } from "../constants";

const Footer = () => {
    return (
        <footer>
            <div className="info">
                <p>
                    More wait to shop: Find an Apple Store or other retailer
                    near you. Or call 000000 000 0000
                </p>
                <img
                    src={import.meta.env.BASE_URL + "logo.svg"}
                    alt="Apple logo"
                />
            </div>

            <hr />

            <div className="links">
                <p></p>
                <ul>
                    {footerLinks.map((link) => (
                        <li key={link.label}>
                            <a href={link.link}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
