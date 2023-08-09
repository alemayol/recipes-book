import CtaButton from "./CtaButton";

const CtA = () => {
  return (
    <section className="cta | padding-block-700 ">
      <div className="wrapper cta-wrapper | even-columns ">
        <div>
          <p className="fs-secondary-heading">
            Never lose another recipe again.
          </p>
        </div>
        <div>
          <CtaButton />
        </div>
      </div>
    </section>
  );
};

export default CtA;
