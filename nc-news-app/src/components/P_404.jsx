import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Error404() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>NCN — Not Found</title>
      </Helmet>
      <section className="container">
        <>
          <div className="card">
            <h1>🤔</h1>
            <h1>404: Page Not Found</h1>
            <center>
              <h2>How did you get here?</h2>
            </center>
            <br></br>
            <center>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to menu
              </button>
            </center>
            <br></br>
          </div>
        </>
      </section>
      <Footer />
    </>
  );
}

export default Error404;
