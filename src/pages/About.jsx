import TimelineItem from "../components/TimelineItem";
import { useCollection } from "../hooks/useCollection";
import "./About.css";
import { motion } from "framer-motion";
import AboutMeImg from "../components/AboutMeImg";
import Spinner from "../components/Spinner";
import { useRef, useEffect } from "react";

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export default function About() {
  const { documents: education, error: educationError, isPending: educationPending } = useCollection(
    "education",
    null,
    null,
    ["order", "desc"]
  );
  const { documents: experience, error: experienceError, isPending: experiencePending } = useCollection(
    "experience",
    null,
    null,
    ["order", "desc"]
  );
  const { documents: about, error: aboutError, isPending: aboutPending } = useCollection(
    "about",
    null,
    null,
    null
  );
  const { documents: aboutImages, error: aboutImgError, isPending: imagesPending } = useCollection(
    "aboutImages",
    null,
    null,
    null
  );

  const colOneRef = useRef(null);
  const colTwoRef = useRef(null);
  const colThreeRef = useRef(null);
  const colFourRef = useRef(null);

  useEffect(() =>{
    if (!educationPending && !experiencePending && !aboutPending && !imagesPending) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("show", entry.isIntersecting)
        })
      })
      observer.observe(colOneRef.current)
      observer.observe(colTwoRef.current)
      observer.observe(colThreeRef.current)
      observer.observe(colFourRef.current)
    }
    
  }, [educationPending, experiencePending, aboutPending, imagesPending])
  
  

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="about-container"
    >
      { !educationPending && !experiencePending && !aboutPending && !imagesPending
        ? (
      <div>
        {/* ABOUT */}
        <div className="row one">
          {/* TEXT */}
          <div ref={colOneRef} className="col text">
            <h2>About me</h2>
            {about?.map((about) =>
              about.paragraphs.map((p, index) => <p key={index}>{p}</p>)
            )}
            {aboutError && <p>{aboutError}</p>}
            <div className="links-wrapper">
              {about?.map((about) =>
                about.links.map((link, index) => (
                  <a href={link.url} key={index} target="_blank" rel="noreferrer">
                    <span className="material-symbols-outlined">{link.icon}</span>
                    <p>{link.text}</p>
                  </a>
                ))
              )}
            </div>
          </div>
          {/* IMG */}
          <div className="col img-wrapper">
            {aboutImages?.map((img) => {
              if (img.row === 1) {
                return <AboutMeImg data={img} key={img.id} />;
              } else {
                return false;
              }
            })}
            {aboutImgError && <p>{aboutImgError}</p>}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="row two">
          {/* IMG */}
          <div  className="col img-wrapper">
            {aboutImages?.map((img) => {
              if (img.row === 2) {
                return <AboutMeImg data={img} key={img.id} />;
              } else {
                return false;
              }
            })}
            {aboutImgError && <p>{aboutImgError}</p>}
          </div>
          {/* TEXT */}
          <div ref={colTwoRef} className="col text">
            <h2>Education</h2>
            {education?.map((item, index) => (
              <TimelineItem
                data={item}
                key={item.id}
                type={"education"}
                index={index}
              />
            ))}
            {educationError && <p>{educationError}</p>}
          </div>
        </div>

        {/* EXPERIENCE 1 */}
        <div className="row three">
          {/* TEXT */}
          <div ref={colThreeRef} className="col text">
            <h2>Experience</h2>
            {experience?.map((item, index) => {
              if (index < 3) {
                return (
                  <TimelineItem
                    data={item}
                    key={item.id}
                    type={"experience"}
                    index={index}
                  />
                );
              } else {
                return false;
              }
            })}
            {experienceError && <p>{experienceError}</p>}
          </div>
          {/* IMG */}
          <div className="col img-wrapper">
            {aboutImages?.map((img) => {
              if (img.row === 3) {
                return <AboutMeImg data={img} key={img.id} />;
              } else {
                return false;
              }
            })}
            {aboutImgError && <p>{aboutImgError}</p>}
          </div>
        </div>

        {/* EXPERIENCE 2 */}
        <div className="row four">
          {/* TEXT */}
          <div ref={colFourRef} className="col text">
            {experience?.map((item, index) => {
              if (index >= 3) {
                return (
                  <TimelineItem
                    data={item}
                    key={item.id}
                    type={"experience"}
                    index={index}
                  />
                );
              } else {
                return false;
              }
            })}
            {experienceError && <p>{experienceError}</p>}
          </div>
          {/* IMG */}
          <div className="col img-wrapper">
          {aboutImages?.map((img) => {
            if (img.row === 4) {
              return <AboutMeImg data={img} key={img.id} />;
            } else {
              return false;
            }
          })}
          {aboutImgError && <p>{aboutImgError}</p>}
        </div>
        </div>
      </div>
        ) : <Spinner color="black" />
      }
    </motion.div>
  );
}
