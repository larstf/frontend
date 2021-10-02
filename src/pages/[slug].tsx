import { NextPage, NextPageContext } from 'next';
import { useEffect } from 'react';

import core from '../core';
import NotFound from './404';

const ShortUrl: NextPage<{ url: string }> = ({ url }) => {
  useEffect(() => {
    if (url)
      window.location.href = url;
  }, []);

  if (!url)
    return <NotFound />

  return (
    <></>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { slug } = ctx.query;

  const response = await core.api.get(`urls/${slug}`);

  return {
    props: {
      url: response.data?.url ?? null,
    }
  }
}

export default ShortUrl;