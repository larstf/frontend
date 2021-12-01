import { NextPage, NextPageContext } from 'next';
import styled, { CSSProperties } from 'styled-components';
import { createRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import core from '../../core';
import NotFound from '../404';
import { CDN } from '../../lib/utils';
import NextHead from '../../components/NextHead';
import { colors, layout } from '../../constants';
import Navigation from '../../components/Navigation';

const ImagePage: NextPage<{ image?: { id: string, extension: string } }> = ({ image }) => {
  const imageWrapperRef = createRef<HTMLDivElement>();
  const [big, setBig] = useState(false);
  const [imageStyles, setImageStyles] = useState<CSSProperties>({});

  useEffect(() => {
    if (!image)
      return;

    setImageStyles({
      background: `url(${CDN(`/images/${image?.id}.${image?.extension}`)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    });
  }, [image]);
  
  if (!image)
    return <NotFound />

  return (
    <>
      <NextHead>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content={CDN(`/images/${image.id}.${image.extension}`)} />
        <meta property="og:image" content={CDN(`/images/${image.id}.${image.extension}`)} />
        <meta property="og:image:secure_url" content={CDN(`/images/${image.id}.${image.extension}`)} />
        <meta name="theme-color" content={colors.BRAND} />
        <meta property="og:url" content="https://lars.tf"/>
        <meta property="og:locale" content="en_EN"/>
        <meta property="og:site_name" content="lars.tf"/>
        <title>Images - lars.tf</title>
      </NextHead>
      <Container>
        <Navigation url="/" />
        <Center>
          <ImageWrapper style={imageStyles} onClick={() => setBig(true)} />
        </Center>
      </Container>
      {big &&
        <Overlay onClick={() => setBig(false)}>
          <AnimatePresence>
            <OverlayImage
              key="image"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              ref={imageWrapperRef}
              style={{ ...imageStyles, width: '80vw', height: '80vh', cursor: 'inherit', backgroundSize: 'contain' }} />
          </AnimatePresence>
        </Overlay>
      }
    </>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const response = await core.api.get(`images/${ctx.query.slug}`);

  return {
    props: {
      image: response.status === 200 ? response.data : null,
    }
  }
}

const Container = styled(layout.container)`
  padding: 2rem 2vw;
  display: grid;
  grid-template-rows: 54px auto;
  height: 100vh;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ImageWrapper = styled.div`
  max-width: 800px;
  height: 500px;
  width: 100%;
  border-radius: 8px;
  cursor: zoom-in;
`;

const Overlay = styled('div')`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .8);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
`;

const OverlayImage = styled(motion.div)`
  height: 400px;
  background: ${colors.SEC_BG};
  border-radius: 10px;
  cursor: zoom-in;
`;

export default ImagePage;