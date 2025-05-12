import '@mantine/core/styles.css';

import { Shell } from '@/components/Shell/Shell';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Labor Landscapes</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/student-project-2025-cross-atlantic-labor-landscapes/favicon.svg" />
        {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""></script> */}
      </Head>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </MantineProvider>
  );
}
