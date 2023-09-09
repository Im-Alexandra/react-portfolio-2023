import "./AboutMeImg.css";

export default function AboutMeImg({ data, row }) {
  return (
    <div>
      <div className="color">{data.text && <span>#{data.text}</span>}</div>
      <div
        className="picture"
        style={{ backgroundImage: "url(" + data.img + ")" }}
      ></div>
    </div>
  );
}
