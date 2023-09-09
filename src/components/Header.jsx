import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header-box-desktop">
          <h1>Alexandra</h1>
          <h1>Labusová</h1>
        </div>
        <h1 className="portfolio">Portfolio.</h1>
        <div className="header-img"></div>
        <div className="header-box-mobile">
          <h1>Alexandra</h1>
          <h1>Labusová</h1>
        </div>
      </div>
    </div>
  );
}
