import { css } from 'styled-components';

import { SIZES } from '../constants';

export const media = Object.keys(SIZES).reduce((acc: { [k: string]: any }, label) => {
  acc[label] = (...args: any) => css`
    @media only screen and (max-width: ${SIZES[label] / 16}em) {
      ${/* @ts-ignore */ 
        css(...args)
      }
    }
  `;
  return acc
}, {});

export const CDN = (path: string) => 
  `${process.env.NEXT_PUBLIC_CDN_HOST}${path}`;