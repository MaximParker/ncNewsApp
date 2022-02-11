import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Error500() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>NCN — Error</title>
      </Helmet>
      <section className="container">
        <>
          <div className="card">
            <h1>😞</h1>
            <h1>500: Internal Server Error</h1>
            <center>
              <h2>Something went wrong!</h2>
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

export default Error500;
