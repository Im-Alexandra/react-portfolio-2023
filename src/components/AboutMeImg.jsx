import "./AboutMeImg.css";
import { useRef, useEffect } from "react";

export default function AboutMeImg({ data, row }) {
  const colorRef = useRef(null);
  const pictureRef = useRef(null);

  useEffect(() =>{
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("show", entry.isIntersecting)
        })
      })
      observer.observe(colorRef.current)
      observer.observe(pictureRef.current)
  }, [])


  return (
    <div>
      <div ref={colorRef} className="color">{data.text && <span>#{data.text}</span>}</div>
      <div
      ref={pictureRef}
        className="picture"
        style={{ backgroundImage: "url(" + data.img + ")" }}
      ></div>
    </div>
  );
}
