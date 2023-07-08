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
      <body>
        <main
          id="home"
          className="d-flex justify-content-center align-items-center vw-100 vh-100"
        >
          <div id="content">
            <div className="mb-5">
              <img src="https://i.imgur.com/Nu9SaDH.png" alt="YEAHBUTDVDS" />
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

export default HomeLayout;
