const settingsReducer = (state, action) => {
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
    case 'toggleHelp':
      return { ...state, showHelp: action.value };
    case 'toggleEmote':
      let emotes = [...state.emotes];
      emotes[action.value].selected = !emotes[action.value].selected;

      return { ...state, emotes };
    case 'toggleAllEmotes':
      return {
        ...state,
        emotes: state.emotes.map((emote) => ({
          ...emote,
          selected: action.state,
        })),
      };
    case 'toggleEmoteGroup':
      return {
        ...state,
        emotes: state.emotes.map((emote) => ({
          ...emote,
          selected:
            emote.service === action.service && emote.scope === action.scope
              ? action.state
              : emote.selected,
        })),
      };
    case 'toggleZeroWidth':
      return {
        ...state,
        emotes: state.emotes.map((emote) => ({
          ...emote,
          selected: emote.zeroWidth ? action.state : emote.selected,
        })),
      };
    default:
      return state;
  }
};

export default settingsReducer;
