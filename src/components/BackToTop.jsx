function BackToTop() {
  return (
    <button
      onClick={(event) => {
        window.scrollTo(0, 0);
      }}
    >
      Back to top
    </button>
  );
}

export default BackToTop;
