import { useCollection } from "../hooks/useCollection";
import "./Contact.css";
import { motion } from "framer-motion";

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

const childrenVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: { opacity: 0 },
};

export default function Contact() {
  const { documents, error } = useCollection(
    "contact",
    ["display", "==", true],
    null,
    ["order", "asc"]
  );
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="contact"
    >
      {documents &&
        documents.map((item) => (
          <motion.div
            variants={childrenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="wrapper"
            key={item.id}
          >
            <img
              src={require(`../assets/icons/${item.type}.png`)}
              alt={item.type}
              className="icon"
            />
            <p>{item.value}</p>
          </motion.div>
        ))}
      {error && <p>{error}</p>}
    </motion.div>
  );
}
