import "./AnimatedPlaceholder.css";

export default function AnimatedPlaceholder(props) {
  return (
    <div className={`animated-placeholder ${props.type} ${props.classes}`}>
      &nbsp;
    </div>
  );
}
