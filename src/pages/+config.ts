// /pages/+config.ts

import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

export default {
  favicon: '/Eva.png',
  extends: [vikeReact],
  prerender: true,
  ssr: false,
} satisfies Config;
