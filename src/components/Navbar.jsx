import "./Navbar.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.2 },
  },
  exit: { opacity: 0 },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: { opacity: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("");
  const location = useLocation();

  const updateMenu = () => {
    if (!isOpen) {
      setMenuClass("open");
      setIsOpen(true);
    } else {
      setMenuClass("closed");
      setIsOpen(false);
    }
  };
  return (
    <div className={`navbar-container ${menuClass}`}>
      <nav>
        <div className={`burger-menu ${menuClass}`} onClick={updateMenu}>
          <div></div>
        </div>
      </nav>
      {isOpen && (
        <div className={`menu ${menuClass}`}>
          <AnimatePresence>
            <motion.ul
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.li key={1} variants={menuItemVariants}>
                <Link to="/about" onClick={updateMenu}>
                  About me
                  {location.pathname === "/about" && (
                    <span className="underline"></span>
                  )}
                </Link>
              </motion.li>
              <motion.li key={2} variants={menuItemVariants}>
                <Link to="/contact" onClick={updateMenu}>
                  Contact
                  {location.pathname === "/contact" && (
                    <span className="underline"></span>
                  )}
                </Link>
              </motion.li>
              <motion.li key={3} variants={menuItemVariants}>
                <Link to="/" onClick={updateMenu}>
                  Portfolio
                  {location.pathname === "/" && (
                    <span className="underline"></span>
                  )}
                </Link>
              </motion.li>
            </motion.ul>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
