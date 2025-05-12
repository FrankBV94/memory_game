import type { EmojiData, SelectedCard } from "../type";

interface AssistiveTechInfoProps {
  emojisData: EmojiData[];
  matchedCards: SelectedCard[];
}

const AssistiveTechInfo: React.FC<AssistiveTechInfoProps> = ({
  emojisData,
  matchedCards,
}) => {
  return (
    <section className="sr-only" aria-live="polite" aria-atomic="true">
      <h2>Game status</h2>
      <p>Number of matched pairs: {matchedCards.length / 2}</p>
      <p>
        Number of cards left to match: {emojisData.length - matchedCards.length}
      </p>
    </section>
  );
};

export default AssistiveTechInfo;
