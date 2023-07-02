import HomeForm from '@/components/HomeForm';
import Link from 'next/link';

function Index() {
  return (
    <>
      <h4 className="mb-5 text-center">
        Generate a DVD-style bouncing emote overlay for your Twitch stream with
        a single click.
      </h4>
      <HomeForm />
      <div className="footer body-text text-black-50 text-center">
        <Link
          href="https://github.com/Mahcks/YEAHBUTDVDs"
          target="_blank"
          rel="noreferrer"
          prefetch={false}
        >
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_44605.png"
            alt="GitHub logo"
            className="mb-3"
          />
        </Link>
        <p>
          <span>Made with </span>
          <img
            src="https://static-cdn.jtvnw.net/emoticons/v2/300272604/static/light/1.0"
            alt="esfandL"
            title="esfandL"
            className="inline-icon"
          />
          <span> by </span>
          <Link
            href="https://twitch.tv/chudbungus"
            target="_blank"
            rel="noreferrer"
            prefetch={false}
          >
            Chud Bungus
          </Link>
          <span> and </span>
          <Link
            href="https://github.com/mahcks"
            target="_blank"
            rel="noreferrer"
            prefetch={false}
          >
            Mahcksimus
          </Link>
          <span>.</span>
        </p>
      </div>
    </>
  );
}

export default Index;
