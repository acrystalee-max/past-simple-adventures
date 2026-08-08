import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import { useProgress } from "./hooks/useProgress";
import VerbRunner from "./games/VerbRunner/VerbRunner";
import VerbBattle from "./games/VerbBattle/VerbBattle";
import TimeDetective from "./games/TimeDetective/TimeDetective";
import CustomGame from "./games/CustomGame/CustomGame";
import hero from "./assets/past-simple-adventures-hero.png";
import runner from "./assets/verb-runner.png";
import battle from "./assets/verb-battle.png";
import detective from "./assets/time-detective.png";
const worlds = [
  [
    "Verb Runner",
    "Master regular verbs",
    "Race through the glowing gates",
    runner,
  ],
  [
    "Irregular Verb Battle",
    "Match magical verb pairs",
    "Defeat the grammar monsters",
    battle,
  ],
  [
    "Time Detective",
    "Build past-tense stories",
    "Solve the missing gear mystery",
    detective,
  ],
  [
    "Make Your Own Game",
    "Create your own challenge",
    "Add questions and rename your game",
    hero,
  ],
];
export default function App() {
  const { progress, setProgress, win, reset } = useProgress();
  const [screen, setScreen] = useState(() => location.hash.slice(1) || "home"),
    [nameOpen, setNameOpen] = useState(false);
  useEffect(() => {
    location.hash = screen === "home" ? "" : screen;
  }, [screen]);
  const sound = () => {
    if (!progress.sound) return;
    const c = new AudioContext(),
      o = c.createOscillator(),
      g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    g.gain.value = 0.05;
    o.start();
    o.stop(c.currentTime + 0.12);
  };
  const done = (i) => (coins, stars) => {
    win(i, coins, stars);
    setScreen(i === 2 ? "final" : "map");
  };
  const bar = <TopBar progress={progress} onMap={() => setScreen("map")} />;
  if (screen === "runner")
    return (
      <>
        {bar}
        <VerbRunner
          finish={done(0)}
          advance={(coins, stars) => {
            win(0, coins, stars);
            setScreen("battle");
          }}
          back={() => setScreen("map")}
          sound={sound}
        />
      </>
    );
  if (screen === "battle")
    return (
      <>
        {bar}
        <VerbBattle
          finish={done(1)}
          advance={(coins, stars) => {
            win(1, coins, stars);
            setScreen("detective");
          }}
          back={() => setScreen("map")}
          sound={sound}
        />
      </>
    );
  if (screen === "detective")
    return (
      <>
        {bar}
        <TimeDetective finish={done(2)} back={() => setScreen("map")} />
      </>
    );
  if (screen === "custom")
    return (
      <>
        {bar}
        <CustomGame back={() => setScreen("map")} />
      </>
    );
  if (screen === "final")
    return (
      <Final
        progress={progress}
        replay={() => {
          reset();
          setScreen("map");
        }}
      />
    );
  if (screen === "map")
    return (
      <>
        {bar}
        <main className="map">
          <section className="mapIntro">
            <div>
              <span className="eyebrow">THE TIME TRAIL</span>
              <h1>Choose your next adventure</h1>
              <p>Complete each story world, or build your own game.</p>
            </div>
            <div className="profile">
              <button onClick={() => setNameOpen(true)}>
                <i>{progress.name[0]}</i>
                <span>
                  {progress.name}
                  <small>TIME SCOUT</small>
                </span>{" "}
                ✎
              </button>
              <div className="parts">
                {progress.parts.map((x, i) => (
                  <span className={x ? "found" : ""} key={i}>
                    {["⚙", "◇", "◷"][i]}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section className="storyBrief" aria-label="The Time Trail story">
            <div className="storyLead">
              <span className="eyebrow">YOUR MISSION</span>
              <h2>The past is disappearing</h2>
              <p>
                Lord Forgetful shattered the Time Machine and hid its three
                power parts across broken worlds. Without the machine, memories
                fade, stories lose their endings, and the future can no longer
                move forward. Master the Past Simple, restore each world, and
                bring time back before everything that happened is forgotten.
              </p>
            </div>
          </section>
          <div className="progress">
            <i
              style={{
                width: `${(progress.completed.filter(Boolean).length / 3) * 100}%`,
              }}
            />
            <b>{progress.completed.filter(Boolean).length}/3 worlds restored</b>
          </div>
          <section className="worlds">
            {worlds.map((w, i) => {
              const custom = i === 3,
                unlocked = custom || progress.unlockedAll || i === 0 || progress.completed[i - 1],
                title = custom
                  ? localStorage.getItem("custom-title") || w[0]
                  : w[0];
              return (
                <button
                  className={"world " + (!unlocked ? "locked" : "")}
                  disabled={!unlocked}
                  onClick={() =>
                    setScreen(["runner", "battle", "detective", "custom"][i])
                  }
                  key={w[0]}
                >
                  <img src={w[3]} />
                  <div className="shade" />
                  <span className="number">0{i + 1}</span>
                  {progress.completed[i] && (
                    <span className="complete">✓ COMPLETE</span>
                  )}
                  <div className="worldText">
                    <small>{w[1]}</small>
                    <h2>{title}</h2>
                    <p>{w[2]}</p>
                    <b>
                      {custom
                        ? "OPEN GAME STUDIO →"
                        : unlocked
                          ? progress.completed[i]
                            ? "PLAY AGAIN →"
                            : "ENTER WORLD →"
                          : "🔒 COMPLETE WORLD 0" + i}
                    </b>
                  </div>
                </button>
              );
            })}
          </section>
          <div className="mapActions">
            <button
              className="unlockAll"
              onClick={() => setProgress((p) => ({ ...p, unlockedAll: !p.unlockedAll }))}
            >
              {progress.unlockedAll ? "Use Story Progression" : "Unlock All Levels"}
            </button>
            <button
              className="reset"
              onClick={() => confirm("Reset all progress?") && reset()}
            >
              Reset Progress
            </button>
          </div>
          {nameOpen && (
            <div className="modal">
              <form
                className="dialog"
                onSubmit={(e) => {
                  e.preventDefault();
                  setProgress((p) => ({
                    ...p,
                    name: e.target.name.value || "Time Scout",
                  }));
                  setNameOpen(false);
                }}
              >
                <button
                  type="button"
                  className="x"
                  onClick={() => setNameOpen(false)}
                >
                  ×
                </button>
                <h2>Your scout name</h2>
                <input name="name" defaultValue={progress.name} />
                <button>Save name</button>
              </form>
            </div>
          )}
        </main>
      </>
    );
  return (
    <main className="hero" style={{ backgroundImage: `url(${hero})` }}>
      <div className="heroShade" />
      <div className="heroCopy">
        <span className="eyebrow">A PAST SIMPLE QUEST</span>
        <h1>
          Past Simple
          <br />
          <em>Adventures</em>
        </h1>
        <p>Learn the past. Unlock the adventure!</p>
        <button onClick={() => setScreen("map")}>
          START ADVENTURE <b>→</b>
        </button>
        <small>Three story worlds · One custom game · One time machine</small>
      </div>
      <a
        className="creator"
        href="https://vk.ru/gamesandworksheets"
        target="_blank"
        rel="noreferrer"
      >
        <i>↗</i>
        <span>
          DEVELOPER<b>Games & Worksheets</b>
        </span>
      </a>
    </main>
  );
}
function Final({ progress, replay }) {
  return (
    <main className="final">
      <div className="rays" />
      <div className="machine">
        ◷<i>⚙</i>
      </div>
      <span className="eyebrow">MISSION COMPLETE</span>
      <h1>
        Time Machine
        <br />
        <em>Restored!</em>
      </h1>
      <p>
        Amazing work, {progress.name}! You mastered the past and saved the
        future.
      </p>
      <div className="finalStats">
        <span>
          <b>{progress.stars}</b> Stars
        </span>
        <span>
          <b>{progress.coins}</b> Coins
        </span>
        <span>
          <b>3</b> Parts
        </span>
      </div>
      <div>
        <button onClick={() => print()}>Print Certificate</button>
        <button onClick={replay}>Play Again</button>
      </div>
    </main>
  );
}