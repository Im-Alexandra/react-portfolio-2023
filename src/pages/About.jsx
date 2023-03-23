import TimelineItem from "../components/TimelineItem";
import { useCollection } from "../hooks/useCollection";
import "./About.css";
import { motion } from "framer-motion";
import AboutMeImg from "../components/AboutMeImg";

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
  const { documents: education, error: educationError } = useCollection(
    "education",
    null,
    null,
    null
  );
  const { documents: experience, error: experienceError } = useCollection(
    "experience",
    null,
    null,
    ["order", "desc"]
  );
  const { documents: about, error: aboutError } = useCollection(
    "about",
    null,
    null,
    null
  );
  const { documents: aboutImages, error: aboutImgError } = useCollection(
    "aboutImages",
    null,
    null,
    null
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="about-container"
    >
      {/* INTRO */}
      <div className="row one test-border">
        {/* TEXT */}
        <div className="col text">
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
      <div className="row two test-border">
        {/* IMG */}
        <div className="col img-wrapper">
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
        <div className="col text">
          <h2>Education</h2>
          {education?.map((item) => (
            <TimelineItem data={item} key={item.id} type={"education"} />
          ))}
          {educationError && <p>{educationError}</p>}
        </div>
      </div>

      {/* EXPERIENCE 1 */}
      <div className="row three test-border">
        {/* TEXT */}
        <div className="col text">
          <h2>Experience</h2>
          {experience?.map((item, index) => {
            if (index < 3) {
              return (
                <TimelineItem data={item} key={item.id} type={"experience"} />
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
      <div className="row four test-border">
        {/* TEXT */}
        <div className="col text">
          {experience?.map((item, index) => {
            if (index >= 3) {
              return (
                <TimelineItem data={item} key={item.id} type={"experience"} />
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
    </motion.div>
  );
}
