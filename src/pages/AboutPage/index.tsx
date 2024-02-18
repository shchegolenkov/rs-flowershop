import clsx from 'clsx';

import PersonDescription from './PersonDescription/PersonDescription';
import { teamMembers } from './teamMembers';

import { Typography } from '@/components/UI/Typography';

import RsLogo from '@/assets/svg/rs_school_js.svg';

import s from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <main>
      <section className={s.grid}>
        <div className={clsx(s.textBlock, s.rsBlock)}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://rs.school/js/"
            className={s.logoLink}
          >
            <RsLogo />
          </a>
          <div className={s.textWrapper}>
            <Typography variant="h2">About Us</Typography>
            <Typography>How we created Rolling Scopes Flowers</Typography>
          </div>
        </div>
        <div className={clsx(s.imageBlock, s.rsBlockImage)}></div>
      </section>
      <section className={clsx(s.textBlock, s.aboutBlock)}>
        <Typography variant="overline">our project</Typography>
        <Typography variant="h3" className={s.aboutTitle}>
          About Project
        </Typography>
        <Typography className={s.aboutText}>
          Our eCommerce application aims to revolutionize the online shopping experience by
          providing a user-friendly platform that offers a vast range of products from various
          categories. It caters to a wide audience of shoppers who prefer the convenience of online
          shopping and the ability to explore an extensive catalog of products.
        </Typography>
      </section>
      {teamMembers.map((member, index) => (
        <section key={index} className={clsx(s.grid, s.persons)}>
          <PersonDescription
            name={member.name}
            role={member.role}
            bio={member.bio}
            contributions={member.contributions}
            link={member.link}
            className={s.textBlock}
          />
          <div className={clsx(s.imageBlock, s[`${member.imageTag}Img`])}></div>
        </section>
      ))}
      <section className={clsx(s.textBlock, s.collaborationBlock)}>
        <Typography variant="h3" className={s.collaborationTitle}>
          Collaboration
        </Typography>
        <Typography className={s.collaborationText}>
          Our team demonstrated great collaboration skills throughout project. We started by
          establishing a clear vision for the project. Continuous communication via messaging
          platforms and video calls helped us to share updates & new ideas. This communication
          ensured that everyone was aligned and working towards the same objectives. We divided each
          sprint into smaller tasks and assigned them based on individual strengths and experience.
          During the development our team utilized collaborative tools such as Git & GitHub
          following Git Flow methodology. This streamlined the development process and minimized
          conflicts. Our team conducted regular code reviews to ensure code quality and consistency.
          We provided constructive feedback and suggestions to each other, promoting knowledge
          sharing and continuous improvement. Code reviews also helped identify and resolve any
          issues or bugs early on.
        </Typography>
      </section>
    </main>
  );
};

export default AboutPage;
