import { updateIn } from 'immutable';
import { OverlaySettings, Service, Scope } from '@/util/types';

type SetAllAction = {
  type: 'setAll';
  value: OverlaySettings;
};

type SetNumericAction = {
  type: 'setNameSize' | 'setEmoteSize' | 'setEmoteSpeed' | 'toggleEmote';
  value: number;
};

type SetBooleanAction = {
  type:
    | 'showName'
    | 'setEmoteDefault'
    | 'showHelp'
    | 'toggleAllEmotes'
    | 'toggleZeroWidth';
  value: boolean;
};

type SetGroupAction = {
  type: 'toggleEmoteGroup';
  value: boolean;
  service: Service;
  scope: Scope;
};

export type SettingsAction =
  | SetAllAction
  | SetNumericAction
  | SetBooleanAction
  | SetGroupAction;

export const settingsReducer: React.Reducer<OverlaySettings, SettingsAction> = (
  state: OverlaySettings,
  action: SettingsAction
) => {
  switch (action.type) {
    case 'setAll':
      return { ...action.value };
    case 'showName':
      return { ...state, showName: action.value };
    case 'setNameSize':
      return { ...state, nameSize: action.value };
    case 'setEmoteSize':
      return { ...state, emoteSize: action.value };
    case 'setEmoteSpeed':
      return { ...state, emoteSpeed: action.value };
    case 'setEmoteDefault':
      return { ...state, emoteDefault: action.value };
    case 'showHelp':
      return { ...state, showHelp: action.value };
    case 'toggleEmote':
      return updateIn(
        state,
        ['emotes', action.value, 'selected'],
        (selected) => !selected
      );
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
};
