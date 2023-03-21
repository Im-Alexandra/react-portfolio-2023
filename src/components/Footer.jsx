import "./Footer.css";
import { useCollection } from "../hooks/useCollection";

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
          <div key={item.id} className="icon">
            <a href={item.link} target="_blank" rel="noreferrer">
              <img
                src={require(`../assets/icons/${item.type}.png`)}
                alt={item.type}
              />
            </a>
          </div>
        ))}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
