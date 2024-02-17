import clsx from 'clsx';

import { Typography } from '@/components/UI/Typography';

import GhLogo from '@/assets/svg/ghLogo.svg';

import s from './PersonDescription.module.scss';

export default function PersonDescription({
  name,
  role,
  bio,
  contributions,
  link,
  className,
}: {
  name: string;
  role: string;
  bio: string;
  contributions: string[];
  link: string;
  className?: string;
}) {
  return (
    <div className={clsx(s.person, className)}>
      <div className={s.personBlock}>
        <Typography variant="caption" className={clsx(s.title, s.name)}>
          name
        </Typography>
        <Typography variant="h5">{name}</Typography>
      </div>
      <div className={s.personBlock}>
        <Typography variant="caption" className={clsx(s.title, s.job)}>
          job title
        </Typography>
        <Typography variant="h5">{role}</Typography>
      </div>
      <div className={s.personBlock}>
        <Typography variant="caption" className={clsx(s.title, s.bio)}>
          short bio
        </Typography>
        <Typography variant="h5">{bio}</Typography>
      </div>
      <div className={s.personBlock}>
        <Typography variant="caption" className={clsx(s.title, s.contributions)}>
          significant contributions
        </Typography>
        <ul className={s.tasksList}>
          {contributions.map((item, index) => (
            <Typography key={index} variant="h5" as="li" className={s.listItem}>
              {item}
            </Typography>
          ))}
        </ul>
      </div>
      <a
        href={`https://github.com/${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(s.personBlock, s.link)}
      >
        <GhLogo />
        <Typography variant="captionBold">@{link}</Typography>
      </a>
    </div>
  );
}
