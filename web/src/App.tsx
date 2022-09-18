import "./styles/main.css";
import { useState, useEffect } from "react";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog"; // * as para importar todos os componentes
import { Input } from "./components/Form/Input";
import { GameController } from "phosphor-react";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>
              <Dialog.Content>
                <form className="mt-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="game" className="font-semibold">
                      Qual o game?
                    </label>
                    <input
                      id="game"
                      placeholder="Qual o game deseja jogar?"
                      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                    ></input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Seu nome (ou nickname)</label>
                    <Input
                      name="name"
                      id="name"
                      placeholder="Como te chamam dentro do game?"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                      <Input
                        name="yearsPlaying"
                        id="yearsPlaying"
                        type="number"
                        placeholder="Tudo bem ser ZERO"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="discord">Qual o seu Discord?</label>
                      <Input
                        name="discord"
                        id="discord"
                        type="text"
                        placeholder="Usuario#0000"
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="weekDays">Quando costuma jogar?</label>
                      <div className="flex gap-1">
                        <button className="w-8 h-8" title="Domingo">
                          D
                        </button>
                        <button className="w-8 h-8" title="Segunda">
                          S
                        </button>
                        <button className="w-8 h-8" title="Terça">
                          T
                        </button>
                        <button className="w-8 h-8" title="Quarta">
                          Q
                        </button>
                        <button className="w-8 h-8" title="Quinta">
                          Q
                        </button>
                        <button className="w-8 h-8" title="Sexta">
                          S
                        </button>
                        <button className="w-8 h-8" title="Sabado">
                          S
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="hourStart">Qual horário do dia?</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          name="hourStart"
                          id="hourStart"
                          type="time"
                          placeholder="De"
                        />
                        <Input
                          name="hourEnd"
                          id="hourEnd"
                          type="time"
                          placeholder="Até"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mt-2 flex items-center gap-2 text-sm">
                      Costumo me conectar ao chat de voz
                    </label>
                  </div>

                  <footer className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                    >
                      <GameController className="w-6 h-6" />
                      Encontrar duo
                    </button>
                  </footer>
                </form>
              </Dialog.Content>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
