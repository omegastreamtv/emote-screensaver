import '@/styles/index.scss';

export const metadata = {
  title: 'YEAHBUTDVDS',
  description:
    'Generate a DVD-style bouncing emote overlay for your Twitch stream with a single click.',
  alternates: {
    canonical: 'https://yeahbutdvds.com',
  },
};

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default HomeLayout;
