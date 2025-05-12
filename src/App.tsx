import { useEffect, useState } from "react";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import ErrorCard from "./components/ErrorCard";
import Form from "./components/Form";
import GameOver from "./components/GameOver";
import Header from "./components/Header";
import MemoryCard from "./components/MemoryCard";
import type { EmojiData, SelectedCard } from "./type";

export default function App() {
  const initialFormData = { category: "animals-and-nature", number: 10 };

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [emojisData, setEmojisData] = useState<EmojiData[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [matchedCards, setMatchedCards] = useState<SelectedCard[]>([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards]);

  function handleFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  async function startGame(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://emojihub.yurace.pro/api/all/category/${formData.category}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }

      const data = await response.json();
      const dataSlice = await getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);

      setEmojisData(emojisArray);
      setIsGameOn(true);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsFirstRender(false);
    }
  }

  async function getDataSlice(data: EmojiData[]) {
    const randomIndices = getRandomIndices(data);

    const dataSlice = randomIndices.reduce(
      (array: EmojiData[], index: number) => {
        array.push(data[index]);
        return array;
      },
      []
    );

    return dataSlice;
  }

  function getRandomIndices(data: EmojiData[]) {
    const randomIndicesArray: number[] = [];

    for (let i = 0; i < formData.number / 2; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }

    return randomIndicesArray;
  }

  async function getEmojisArray(data: EmojiData[]) {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }

    return pairedEmojisArray;
  }

  function turnCard(name: string, index: number) {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function resetGame() {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
  }

  function resetError() {
    setIsError(false);
  }

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="flex flex-col w-full min-h-screen justify-center">
        <Header />
        <main className="flex flex-col h-full items-center justify-center gap-4 p-8">
          {!isGameOn && !isError && (
            <Form
              handleSubmit={startGame}
              handleChange={handleFormChange}
              isFirstRender={isFirstRender}
            />
          )}
          {isGameOn && !areAllCardsMatched && (
            <AssistiveTechInfo
              emojisData={emojisData}
              matchedCards={matchedCards}
            />
          )}
          {areAllCardsMatched && <GameOver handleClick={resetGame} />}
          {isGameOn && (
            <MemoryCard
              handleClick={turnCard}
              data={emojisData}
              selectedCards={selectedCards}
              matchedCards={matchedCards}
            />
          )}
          {isError && <ErrorCard handleClick={resetError} />}
        </main>
      </div>
    </div>
  );
}
