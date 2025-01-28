import {
    FaFacebook,
    FaTwitter,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="bg-neutral text-neutral-content p-10">
                <div className="flex justify-center pb-12">
                    <img src="/assets/logo-footer.png" alt="" srcSet="" />
                </div>
                <div className="mx-auto flex flex-col lg:flex-row justify-evenly pb-12">
                    {/* Left */}
                    <div className="pb-3">
                        <div className="flex flex-row gap-2 items-center pb-3">
                            <h2 className="text-opacity-90 font-bold text-lg">Contact Information</h2>
                        </div>
                        <div className="space-y-2 text-opacity-[70%]">
                            <p>Location: Jhenaidah-7300, BD</p>
                            <p>Phone: +8801755926275</p>
                            <p>Email: rasheduzzamanelite@gmail.com</p>
                            <p>Openings Hours: 9.00 AM to 5.00 PM</p>

                            <div className="flex gap-6 py-3">
                                <a href="https://www.facebook.com/elite1122" target="_blank" aria-label="Facebook">
                                    <FaFacebook className="text-3xl"></FaFacebook>
                                </a>
                                <a href="https://x.com/rz_elite_" target="_blank" aria-label="Twitter">
                                    <FaTwitter className="text-3xl"></FaTwitter>
                                </a>
                                <a href="https://www.youtube.com/@learnwithelite5162" target="_blank" aria-label="YouTube">
                                    <FaYoutube className="text-3xl"></FaYoutube>
                                </a>
                                <a href="https://www.instagram.com/_rz.elite_/" target="_blank" aria-label="Instagram">
                                    <FaInstagram className="text-3xl"></FaInstagram>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pb-3">
                        <h2 className="text-opacity-90 font-bold text-lg pb-3">Quick Links</h2>
                        <div className="text-opacity-70 flex flex-col space-y-2">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/allArticles'>All Articles</Link></li>
                        </div>
                    </div>
                </div>
                <div className="border-b-2 mb-5"></div>
                <div className="w-full mx-auto flex justify-center items-center pb-5">
                    <p className="text-center">Copyright © {new Date().getFullYear()} - All rights reserved by Rasheduzzaman Elite</p>
                </div>

            </footer>
        </div>
    );
};

export default Footer;