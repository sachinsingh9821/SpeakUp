import { useState } from "react";

// All practice modes in one place. "planned" modes are shown but can't be started.
const PRACTICE_MODES = [
  {
    id: "conversation",
    label: "Conversation",
    emoji: "💬",
    description: "Practice natural conversations.",
    status: "active",
  },
  {
    id: "storytelling",
    label: "Storytelling",
    emoji: "📖",
    description: "Learn to tell better stories.",
    status: "active",
  },
  {
    id: "confidence",
    label: "Confidence",
    emoji: "🎤",
    description: "Speak with more confidence.",
    status: "active",
  },
  {
    id: "interview",
    label: "Interview",
    emoji: "💼",
    description: "Prepare for placement interviews.",
    status: "active",
  },
  {
    id: "humor",
    label: "Humor",
    emoji: "😎",
    description: "Make your conversations more engaging.",
    status: "planned",
  },
];

function App() {
  const [screen, setScreen] = useState("home");
  const [practiceType, setPracticeType] = useState("Conversation");

  const startSession = (type = "Conversation") => {
    setPracticeType(type);
    setScreen("session");
  };

  if (screen === "session") {
    return (
      <div className="app">
        <header className="navbar">
          <div className="logo">SpeakUp</div>

          <button
            className="profile-button"
            onClick={() => setScreen("home")}
          >
            SK
          </button>
        </header>

        <main className="main-content">
          <section className="welcome-section">
            <button
              className="primary-button"
              onClick={() => setScreen("home")}
            >
              ← Back
            </button>

            <p className="eyebrow">PRACTICE SESSION</p>

            <h1>
              Let's <span>speak up.</span>
            </h1>

            <p className="subtitle">
              You're practicing <strong>{practiceType}</strong> with Mr. Combs.
            </p>
          </section>

          <section className="coach-card">
            <div className="coach-avatar">MC</div>

            <div className="coach-content">
              <p className="card-label">MR. COMBS SAYS</p>

              <h2>Alright, let's warm up.</h2>

              <p>
                Tell me about yourself in around 30 seconds. Don't worry about
                being perfect. Just speak naturally.
              </p>

              <button className="primary-button">
                🎙️ Start Speaking
              </button>
            </div>
          </section>

          <section className="progress-section">
            <div className="progress-header">
              <div>
                <p className="eyebrow">SESSION PROGRESS</p>
                <h2>Warm-up</h2>
              </div>

              <strong>20%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "20%" }}
              ></div>
            </div>

            <p className="progress-text">
              Take your time. The goal is to communicate, not to be perfect.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">SpeakUp</div>

        <button className="profile-button">
          SK
        </button>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <p className="eyebrow">YOUR COMMUNICATION COACH</p>

          <h1>
            Ready to <span>speak up?</span>
          </h1>

          <p className="subtitle">
            Build confidence, improve your communication,
            and become a better storyteller.
          </p>
        </section>

        <section className="coach-card">
          <div className="coach-avatar">MC</div>

          <div className="coach-content">
            <p className="card-label">MEET YOUR AI COACH</p>

            <h2>Mr. Combs</h2>

            <p>
              Your personal communication coach. Practice conversations,
              storytelling, confidence, and interviews in a judgment-free space.
            </p>

            <button
              className="primary-button"
              onClick={() => startSession("Conversation")}
            >
              Start a Session →
            </button>
          </div>
        </section>

        <section className="practice-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PRACTICE</p>
              <h2>What do you want to improve?</h2>
            </div>
          </div>

          <div className="practice-grid">
            {PRACTICE_MODES.map((mode) => {
              const isPlanned = mode.status === "planned";

              return (
                <button
                  key={mode.id}
                  className="practice-card"
                  disabled={isPlanned}
                  onClick={() => startSession(mode.label)}
                >
                  <div className="practice-icon">{mode.emoji}</div>
                  <h3>{mode.label}</h3>
                  <p>{mode.description}</p>
                  {isPlanned && <p className="coming-soon">Coming soon</p>}
                </button>
              );
            })}
          </div>
        </section>

        <section className="progress-section">
          <div className="progress-header">
            <div>
              <p className="eyebrow">YOUR PROGRESS</p>
              <h2>Keep showing up.</h2>
            </div>

            <strong>72%</strong>
          </div>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <p className="progress-text">
            You're building a stronger communication habit.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;