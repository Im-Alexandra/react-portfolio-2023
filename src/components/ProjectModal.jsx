import "./ProjectModal.css";
import closeIcon from "../assets/icons/closeWhite.svg";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedPlaceholder from "./AnimatedPlaceholder";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { opacity: 0 },
};

export default function ProjectModal({ data, handleClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const delay = 1.5;

  useEffect(() => {
    let timer1 = setTimeout(() => setIsLoading(false), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      className="modal-backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal-content-wrapper"
        style={{ backgroundColor: data.color }}
      >
        <img
          src={closeIcon}
          alt="close"
          className="modal-close"
          onClick={() => handleClick(null)}
        />
        <h1>{data.title}</h1>
        <ul className="tags mt-16">
          {data.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
        {/* LOADING SKELETON */}
        {isLoading && (
          <div className="modal-content">
            {/* VIDEO */}
            {data.video && (
              <AnimatedPlaceholder type={"video"} classes={"mt-32 mb-32"} />
            )}
            {/* TOP IMG */}
            {data.topImg && (
              <AnimatedPlaceholder type={"top-img"} classes={"mt-32 mb-32"} />
            )}
            {/* CONTENT */}
            {data.content.map((content, index) => (
              <div key={index}>
                {content.text && (
                  <AnimatedPlaceholder type={"text"} classes={"mt-16"} />
                )}
                {content.img_src && (
                  <AnimatedPlaceholder type={"img"} classes={"mt-16 mb-32"} />
                )}
              </div>
            ))}
            {/* LINKS */}
            <h2 className="mt-32">Project links</h2>
            {data.links && (
              <AnimatedPlaceholder type={"links"} classes={"mt-16 mb-32"} />
            )}
          </div>
        )}
        {/* ACTUAL CONTENT */}
        <AnimatePresence>
          {!isLoading && (
            <motion.div
              className="modal-content"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* VIDEO */}
              {data.video && (
                <iframe
                  className="mt-32 mb-32"
                  src={data.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              {/* TOP IMG */}
              {data.topImg && (
                <img
                  src={data.topImg}
                  alt={data.title}
                  className="mt-32 mb-32"
                />
              )}
              {/* CONTENT */}
              {data.content.map((content, index) => (
                <div key={index}>
                  <p className="mt-16">{content.text}</p>
                  {content.img_src && (
                    <img
                      src={content.img_src}
                      alt={data.title}
                      className="mt-16 mb-32"
                    />
                  )}
                </div>
              ))}
              {/* LINKS */}
              <h2 className="mt-32">Project links</h2>
              <div className="links mt-16 mb-32">
                {data.links.map((link) => (
                  <a
                    href={link.url}
                    className="link-wrapper"
                    key={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined">
                      {link.icon}
                    </span>
                    <p>{link.text}</p>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.querySelector("#modal")
  );
}
