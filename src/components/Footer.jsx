import "./Footer.css";
import { useCollection } from "../hooks/useCollection";
import { motion } from "framer-motion";

export default function Footer() {
  const { documents, error } = useCollection(
    "someLinks",
    ["display", "==", true],
    null,
    ["order", "asc"]
  );
  return (
    <div className="footer">
      <div className="icons-wrapper">
        {documents?.map((item) => (
          <motion.div
            key={item.id}
            className="icon"
            whileHover={{
              scale: 1.2,
              y: -5,
              transition: { duration: 0.3 },
            }}
          >
            <a href={item.link} target="_blank" rel="noreferrer">
              <img
                src={require(`../assets/icons/${item.type}.png`)}
                alt={item.type}
              />
            </a>
          </motion.div>
        ))}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
