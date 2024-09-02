import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import '@/styles/index.scss';

export const metadata: Metadata = {
  title: 'YEAHBUTDVDS',
  description:
    'Generate a DVD-style bouncing emote overlay for your live stream with a single click.',
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ''),
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
