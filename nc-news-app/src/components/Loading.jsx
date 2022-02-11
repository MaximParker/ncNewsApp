function Loading({ isLoaded }) {
  return (
    <>
      {isLoaded ? (
        <p>loaded :)</p>
      ) : (
        <img
          className="Loading"
          src="../../LoadingSpinner.png"
          alt="logo"
        ></img>
      )}
    </>
  );
}

export default Loading;
