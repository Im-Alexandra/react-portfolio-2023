import "./Portfolio.css";
import { useCollection } from "../hooks/useCollection";
import PortfolioItem from "../components/PortfolioItem";
import { useState } from "react";
import ProjectModal from "../components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [showModal, setShowModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [displayProject, setDisplayProject] = useState(null);

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

  return (
    <div className="portfolio-container ">
      <ul className="filters-wrapper">
        {filters?.map((f) => (
          <li key={f.name} onClick={() => setCurrentFilter(f.name)}>
            <span>{f.name}</span>
            {currentFilter === f.name && (
              <motion.span
                transition={{ duration: 0.4, delay: 0.1 }}
                layoutId="rect1"
                className="underline"
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
    </div>
  );
}
