const LoaderSpinner = () => {
  return (
    <div
      style={{
        borderBottom: "8px solid var(--clr-primary-500,#f3f3f3)",
        borderRight: "8px solid var(--clr-primary-500,#f3f3f3)",
        borderLeft: "8px solid var(--clr-primary-500,#f3f3f3)",
        borderTop: "8px solid var(--clr-footer, hsl(0, 40%, 50%))",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        animation: "spin 1s linear infinite",
        textAlign: "center",
      }}
      className="form-loader"
    ></div>
  );
};

export default LoaderSpinner;
