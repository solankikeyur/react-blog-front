const Loader = () => {
  return (
    <div style={{display:"flex", flexDirection: "row", justifyContent: "center"}} >
      <div className="spinner-border text-primary mb-4 mt-4" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
