'use client';

import { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

import Overlay from '@/components/overlay/Overlay';
import Loading from './loading';
import { getTwitchId } from '@/util/channel';
import getEmotes from '@/util/emotes';
import { Emote } from '@/util/types';

function OverlayPage() {
  const [emotes, setEmotes] = useState<Emote[]>();

  const channelName = useSearchParams().get('name');

  if (!channelName) {
    redirect('/');
  }

  useEffect(() => {
    (async function () {
      const channelId = await getTwitchId(channelName);
      const emotes = await getEmotes(channelId as string);

      setEmotes(emotes);
    })();
  }, [channelName]);

  if (!emotes) {
    return <Loading />;
  }

  return <Overlay channelName={channelName} emotes={emotes} />;
}

export default OverlayPage;
