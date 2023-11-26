import ReadMoreReadLess from "./ReadMoreReadLess";
import "./TimelineItem.css";

export default function TimelineItem({ data, type, index }) {
  const dateOptions = { month: "short", year: "numeric" };
  return (
    <div className="timeline-container" id={`item${index}`}>
      <div className="date-wrapper">
        <p>{data.start.toDate().toLocaleDateString("en-GB", dateOptions)}</p>
        <p>-</p>
        {data.end !== "Current position" && (
          <p>{data.end.toDate().toLocaleDateString("en-GB", dateOptions)}</p>
        )}
        {data.end === "Current position" && <p>Present</p>}
      </div>

      {/* EDUCATION SPECIFIC */}
      {type === "education" && (
        <>
          <div className="headline">
            <p>{data.school}</p>
          </div>
          <div className="subheadline">
            <p>{data.degree}</p>
          </div>
        </>
      )}

      {/* EXPERIENCE SPECIFIC */}
      {type === "experience" && (
        <>
          <div className="headline">
            <p>{data.position}</p>
          </div>
          <div className="subheadline">
            <p>{data.company}</p>
            <p>-</p>
            <p>{data.type}</p>
          </div>
        </>
      )}

      <div className="skills-wrapper">
        <p>Skills:</p>
        {data.skills?.map((skill) => (
          <p key={skill}>{skill},</p>
        ))}
      </div>
      <div className="description-wrapper">
        <ReadMoreReadLess index={index}>{data.description}</ReadMoreReadLess>
        {/* <p>{data.description}</p> */}
      </div>
      <div className="timeline">
        <div className="dot"></div>
      </div>
    </div>
  );
}
