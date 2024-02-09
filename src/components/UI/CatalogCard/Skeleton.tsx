import React from 'react';

import ContentLoader from 'react-content-loader';

import s from './CatalogCard.module.scss';

export const Skeleton = () => (
  <div className={s.card}>
    <ContentLoader
      speed={2}
      viewBox="0 0 400 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="422" rx="10" ry="10" width="95" height="30" />
      <rect x="120" y="415" rx="21" ry="21" width="152" height="45" />
      <rect x="0" y="0" rx="0" ry="0" width="400" height="280" />
      <rect x="20" y="300" rx="0" ry="0" width="180" height="24" />
      <rect x="20" y="365" rx="0" ry="0" width="75" height="24" />
      <rect x="343" y="344" rx="0" ry="0" width="38" height="38" />
      <rect x="20" y="338" rx="0" ry="0" width="230" height="16" />
    </ContentLoader>
  </div>
);
