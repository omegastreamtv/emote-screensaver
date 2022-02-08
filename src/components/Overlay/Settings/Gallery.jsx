const EmoteGallery = ({ emotes, toggleEmote }) => (
  <div id="gallery">
    {emotes.map((emote, i) => (
      <div
        key={`${emote.name}_${i}`}
        className={`emote${emote.selected ? ' selected' : ''}`}
        onClick={() => toggleEmote(i)}
      >
        <img src={emote.url} className="h-auto m-auto" alt={emote.name} />
        <p className="emote-name text-center mb-0">{emote.name}</p>
      </div>
    ))}
  </div>
);

export default EmoteGallery;
