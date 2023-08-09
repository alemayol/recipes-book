import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer>
      <section className="primary-footer">
        <div className="wrapper">
          <div className="primary-footer__wrapper">
            <ul role="list" className="social-list">
              <li role="listitem">
                <a
                  href="https://linkedin.com/in/alejandro-mayol-824a16287"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBrandLinkedin size={48} />
                </a>
              </li>
              <li role="listitem">
                <a
                  href="https://github.com/alemayol"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBrandGithub size={48} />
                </a>
              </li>
            </ul>

            <p>
              Created by <span className="portfolio">Alejandro Mayol</span>
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
