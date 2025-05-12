import { decodeEntity } from "html-entities";
import type { EmojiData, SelectedCard } from "../type";

interface EmojiButtonProps {
  emoji: EmojiData;
  handleClick: () => void;
  selectedCardEntry: SelectedCard | undefined;
  matchedCardEntry: SelectedCard | undefined;
  index: number;
}

const EmojiButton: React.FC<EmojiButtonProps> = ({
  emoji,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
  index,
}) => {
  const btnContent =
    selectedCardEntry || matchedCardEntry
      ? decodeEntity(emoji.htmlCode[0])
      : "?";

  const btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  const btnAria = matchedCardEntry
    ? `${decodeEntity(emoji.name)}. Matched.`
    : selectedCardEntry
    ? `${decodeEntity(emoji.name)}. Not matched yet.`
    : "Card upside down.";

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry ? () => {} : handleClick}
      disabled={matchedCardEntry ? true : false}
      aria-label={`Position ${index + 1}: ${btnAria}`}
      aria-live="polite"
    >
      {btnContent}
    </button>
  );
};

export default EmojiButton;
