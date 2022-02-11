function Loading({ isLoaded }) {
  return (
    <>
      {isLoaded ? (
        <></>
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
