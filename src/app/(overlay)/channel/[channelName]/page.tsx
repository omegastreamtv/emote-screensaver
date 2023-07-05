import Overlay from '@/components/overlay/Overlay';
import { getTwitchId } from '@/util/channel';
import getEmotes from '@/util/emotes';

type Props = {
  searchParams?: Record<string, string>;
};

async function OverlayPage({ searchParams }: Props) {
  if (searchParams?.channelName) {
    const channelId = await getTwitchId(searchParams.channelName);
    const emotes = await getEmotes(channelId as string);

    return <Overlay channelName={searchParams.channelName} emotes={emotes} />;
  }
}

export default OverlayPage;
