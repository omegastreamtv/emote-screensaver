import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import '@/styles/index.scss';

export const metadata: Metadata = {
  title: 'Emote Screensaver',
  description:
    'A livestream overlay generator that displays a random emote from a channel in bouncing DVD screensaver style.',
  keywords: [
    'overlay',
    'emote',
    'bounce',
    'livestream',
    'streaming',
    'OBS',
    'Twitch',
    'YouTube',
  ],
  authors: [{ name: 'OmegaStream' }],
  metadataBase: new URL(process.env.BASE_URL as string),
};

function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XQYWC05W0V" />
    </html>
  );
}

export default RootLayout;
