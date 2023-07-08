import '@/styles/index.scss';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function OverlayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default OverlayLayout;
