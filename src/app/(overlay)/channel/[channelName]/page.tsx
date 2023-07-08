import Overlay from '@/components/overlay/Overlay';
import { getTwitchId } from '@/util/channel';
import getEmotes from '@/util/emotes';

type Props = {
  params: {
    channelName: string;
  };
};

async function OverlayPage({ params }: Props) {
  if (params.channelName) {
    const channelId = await getTwitchId(params.channelName);
    const emotes = await getEmotes(channelId as string);

    return <Overlay channelName={params.channelName} emotes={emotes} />;
  }
}

export default OverlayPage;
