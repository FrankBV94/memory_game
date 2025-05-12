import type { EmojiData, SelectedCard } from "../type";
import EmojiButton from "./EmojiCard";

interface MemoryCardProps {
  handleClick: (name: string, index: number) => void;
  data: EmojiData[];
  selectedCards: SelectedCard[];
  matchedCards: SelectedCard[];
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  handleClick,
  data,
  selectedCards,
  matchedCards,
}) => {
  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find(
      (emoji) => emoji.index === index
    );
    const matchedCardEntry = matchedCards.find(
      (emoji) => emoji.index === index
    );

    const cardStyle = matchedCardEntry
      ? "card-item--matched"
      : selectedCardEntry
      ? "card-item--selected"
      : "";

    return (
      <li key={index} className={`card-item ${cardStyle}`}>
        <EmojiButton
          emoji={emoji}
          handleClick={() => handleClick(emoji.name, index)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
          index={index}
        />
      </li>
    );
  });

  return <ul className="card-container mt-32">{cardEl}</ul>;
};

export default MemoryCard;
