import "./Portfolio.css";
import { useCollection } from "../hooks/useCollection";
import PortfolioItem from "../components/PortfolioItem";
import { useState } from "react";
import ProjectModal from "../components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export default function Portfolio() {
  const [showModal, setShowModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [displayProject, setDisplayProject] = useState(null);
  const [underlineColor, setUnderlineColor] = useState("#e26f4f");
  const colorOptions = [
    "#e26f4f",
    "#c07546",
    "#a52b2a",
    "#302d2e",
    "#764348",
    "#de8e2c",
    "#c84533",
    "#c85121",
    "#012a37",
  ];

  const { documents, error } = useCollection(
    "items",
    ["archived", "==", false],
    null,
    ["order", "asc"]
  );
  const { documents: filters, error: filterError } = useCollection(
    "filters",
    null,
    null,
    ["order", "asc"]
  );

  const filteredProjects = documents?.filter((project) => {
    if (currentFilter === "All") {
      return true;
    } else {
      return project.tags.includes(currentFilter);
    }
  });

  const handleClick = (data) => {
    if (!showModal) {
      document.querySelector("#root").classList.add("stop-scrolling");
    } else {
      document.querySelector("#root").classList.remove("stop-scrolling");
    }
    setShowModal(!showModal);
    setDisplayProject({ ...data });
  };

  const handleFiltersClick = (newFilter) => {
    setCurrentFilter(newFilter);
    let randColorIndex = Math.floor(Math.random() * colorOptions.length);
    setUnderlineColor(colorOptions[randColorIndex]);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="portfolio-container "
    >
      <ul className="filters-wrapper">
        {filters?.map((f) => (
          <li key={f.name} onClick={() => handleFiltersClick(f.name)}>
            <span>{f.name}</span>
            {currentFilter === f.name && (
              <motion.span
                transition={{ duration: 0.4, delay: 0.1 }}
                layoutId="rect1"
                className="underline"
                style={{ backgroundColor: underlineColor }}
              ></motion.span>
            )}
          </li>
        ))}
        {filterError && <p>{filterError}</p>}
      </ul>

      <div className="portfolio-items-wrapper">
        <AnimatePresence>
          {filteredProjects?.map((item) => (
            <PortfolioItem
              data={item}
              key={item.id}
              handleClick={handleClick}
            />
          ))}
        </AnimatePresence>
      </div>
      {error && <p>{error}</p>}

      <AnimatePresence>
        {showModal && (
          <ProjectModal data={displayProject} handleClick={handleClick} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
