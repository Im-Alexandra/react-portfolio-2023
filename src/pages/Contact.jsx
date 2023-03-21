import { useCollection } from "../hooks/useCollection";
import "./Contact.css";

export default function Contact() {
  const { documents, error } = useCollection(
    "contact",
    ["display", "==", true],
    null,
    ["order", "asc"]
  );
  return (
    <div className="contact">
      {documents?.map((item) => (
        <div className="wrapper" key={item.id}>
          <img
            src={require(`../assets/icons/${item.type}.png`)}
            alt={item.type}
            className="icon"
          />
          <p>{item.value}</p>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}
