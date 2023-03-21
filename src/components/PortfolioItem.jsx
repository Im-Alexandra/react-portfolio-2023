import "./PortfolioItem.css";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, scale: 0, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 },
  },
  exit: {
    opacity: 0,
  },
  transition: { duration: 0.5 },
};

export default function PortfolioItem({ data, handleClick }) {
  return (
    <motion.div
      className="portfolio-item"
      style={{ backgroundColor: data.color }}
      variants={itemVariants}
      initial={"hidden"}
      animate={"visible"}
      exit={"exit"}
      layout
      /*       whileHover={{
        scale: [null, 1.1],
        transition: { duration: 0.4, type: "spring", bounce: 0.5, delay: 0 },
      }} */
      /* transition={{ duration: 0.7, type: "spring", bounce: 0.5 }} */
      onClick={() => handleClick(data)}
    >
      <h3 style={{ color: "white" }}>{data.title}</h3>
    </motion.div>
  );
}
