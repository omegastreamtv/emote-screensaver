import { Metadata } from 'next';

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
    </html>
  );
}

export default RootLayout;
