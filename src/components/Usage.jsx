import { IconUserCheck, IconDeviceFloppy, IconBook } from "@tabler/icons-react";

const Usage = () => {
  return (
    <section className="wrapper">
      <div className="usage | padding-block-700 text-center">
        <h2 className="fs-secondary-heading">How does it work?</h2>
        <section className="even-columns steps | padding-block-900">
          <div className="step-item | flow fw-medium">
            <IconUserCheck size={42} stroke={2.5} />
            <p data-wide="semi">
              Create an account with an unique username and email
            </p>
          </div>
          <div className="step-item | flow fw-medium">
            <IconDeviceFloppy size={42} stroke={2.5} />
            <p data-wide="semi">
              Save the name, ingredients and preparations steps of your recipe
            </p>
          </div>
          <div className="step-item | flow fw-medium">
            <IconBook size={42} stroke={2.5} />
            <p data-wide="semi">Access your recipes at any time!</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Usage;
