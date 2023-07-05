import { OverlaySettings, Service, Scope } from '@/util/types';

type SetAllAction = {
  type: 'setAll';
  value: OverlaySettings;
};

type SetNumericAction = {
  type: 'setTextSize' | 'setEmoteSize' | 'setEmoteSpeed' | 'toggleEmote';
  value: number;
};

type SetBooleanAction = {
  type: 'setEmoteDefault' | 'showHelp' | 'toggleAllEmotes' | 'toggleZeroWidth';
  value: boolean;
};

type SetGroupAction = {
  type: 'toggleEmoteGroup';
  value: boolean;
  service: Service;
  scope: Scope;
};

type Action =
  | SetAllAction
  | SetNumericAction
  | SetBooleanAction
  | SetGroupAction;

function overlaySettingsReducer(
  state: OverlaySettings,
  action: Action
): OverlaySettings {
  switch (action.type) {
    case 'setAll':
      return { ...action.value };
    case 'setTextSize':
      return { ...state, textSize: action.value };
    case 'setEmoteSize':
      return { ...state, emoteSize: action.value };
    case 'setEmoteSpeed':
      return { ...state, emoteSpeed: action.value };
    case 'setEmoteDefault':
      return { ...state, emoteDefault: action.value };
    case 'showHelp':
      return { ...state, showHelp: action.value };
    case 'toggleEmote':
      const emotes = [...state.emotes];
      emotes[action.value].selected = !emotes[action.value].selected;

      return { ...state, emotes };
    case 'toggleAllEmotes':
      return {
        ...state,
        emotes: state.emotes.map((emote) => ({
          ...emote,
          selected: action.value,
        })),
      };
    case 'toggleEmoteGroup':
      return {
        ...state,
        emotes: state.emotes.map((emote) => ({
          ...emote,
          selected:
            emote.service === action.service && emote.scope === action.scope
              ? action.value
              : emote.selected,
        })),
      };
    case 'toggleZeroWidth':
      return {
        ...state,
        emotes: state.emotes.map((emote) => ({
          ...emote,
          selected: emote.zeroWidth ? action.value : emote.selected,
        })),
      };
    default:
      return state;
  }
}

export default overlaySettingsReducer;
