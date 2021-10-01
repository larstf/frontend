import Head from 'next/head';
import React, { FC } from 'react';

import { colors, pr } from '../constants';

const NextHead: FC = ({ children }) => {
  return (
    <Head>
      <title>lars.tf</title>
      <meta name="robots" content="index, follow, archive" key="robots" />
      <meta name="theme-color" content={colors.BRAND} key="theme-color" />
      <meta property="og:url" content="https://lars.tf" key="url" />
      <meta property="og:title" content="lars.tf" key="title" />
      <meta property="og:description" content={pr.description} key="description" />
      <meta property="og:type" content="website" key="type" />
      <meta property="og:locale" content="en_EN" key="locale" />
      <meta property="og:site_name" content="lars.tf" key="site-name" />
      <meta name="twitter:card" content="summary_large_image" />

      {children}
    </Head>
  )
}

export default NextHead;