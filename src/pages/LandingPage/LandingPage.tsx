import "./css/style.scss";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <section className="landing-page-main-section">
      <div className="body-wrap">
        <header className="site-header">
          <div className="container">
            <div className="site-header-inner">
              <div className="brand header-brand">
                <h1 className="m-0">
                  <a href=" ">
                    <img
                      className="header-logo-image"
                      src={require("../../Assets/images/U.png")}
                      alt="Logo"
                      width="30%"
                    />
                  </a>
                </h1>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="container">
              <div className="hero-inner">
                <div className="hero-copy">
                  <h1 className="hero-title mb-5  ">
                    It is more about the right person in the right place at the
                    right time though.
                  </h1>

                  <div className="hero-cta">
                    <button onClick={() => loginWithRedirect()}>
                      <span>Sign up</span>
                      <span>Sign up</span>
                    </button>
                  </div>
                </div>
                <div className="hero-figure anime-element">
                  <svg
                    className="placeholder"
                    width="528"
                    height="396"
                    viewBox="0 0 528 396"
                  >
                    <rect
                      width="528"
                      height="396"
                      style={{ fill: "transparent" }}
                    />
                  </svg>
                  <div
                    className="hero-figure-box hero-figure-box-01"
                    data-rotation="45deg"
                  ></div>
                  <div
                    className="hero-figure-box hero-figure-box-02"
                    data-rotation="-45deg"
                  ></div>
                  <div
                    className="hero-figure-box hero-figure-box-03"
                    data-rotation="0deg"
                  ></div>
                  <div
                    className="hero-figure-box hero-figure-box-04"
                    data-rotation="-135deg"
                  ></div>
                  <div className="hero-figure-box hero-figure-box-05"></div>
                  <div className="hero-figure-box hero-figure-box-06"></div>
                  <div className="hero-figure-box hero-figure-box-07"></div>
                  <div
                    className="hero-figure-box hero-figure-box-08"
                    data-rotation="-22deg"
                  ></div>
                  <div
                    className="hero-figure-box hero-figure-box-09"
                    data-rotation="-52deg"
                  ></div>
                  <div
                    className="hero-figure-box hero-figure-box-10"
                    data-rotation="-50deg"
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  );
};

export default LandingPage;
