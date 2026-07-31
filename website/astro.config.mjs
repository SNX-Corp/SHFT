// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://teamshiftfrc.com',
  output: 'static',
  redirects: {
    // /logos was an unlinked second copy of the mark gallery and had already
    // drifted, still calling the retired S-mark the primary logo. The marks and
    // the production files live on /brand, so the old URL points there.
    '/logos': '/brand#downloads',
  },
});
