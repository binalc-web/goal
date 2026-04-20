import { useCallback, useEffect, useMemo, useState } from "react";
import type { MessageThread } from "../data/mockData";
import { ChevronLeftIcon } from "./Icons";

type Props = { initialThreads: MessageThread[] };

function formatNowLabel(): string {
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date());
}

export function MessagesView({ initialThreads }: Props) {
  const [threads, setThreads] = useState<MessageThread[]>(() =>
    initialThreads.map((t) => ({ ...t, messages: t.messages.map((m) => ({ ...m })) })),
  );
  const [activeId, setActiveId] = useState(initialThreads[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const active = useMemo(() => threads.find((t) => t.id === activeId), [threads, activeId]);

  const openThread = useCallback((id: string) => {
    setActiveId(id);
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: 0 } : t)),
    );
    if (window.matchMedia("(max-width: 768px)").matches) {
      setMobileThreadOpen(true);
    }
  }, []);

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text || !activeId) return;
    const timeLabel = formatNowLabel();
    const newMsg = { id: `local-${Date.now()}`, from: "me" as const, text, timeLabel };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? {
              ...t,
              unread: 0,
              lastPreview: text,
              timeLabel: "now",
              messages: [...t.messages, newMsg],
            }
          : t,
      ),
    );
    setDraft("");
  }, [draft, activeId]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const onChange = () => {
      if (mq.matches) setMobileThreadOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!threads.length) {
    return (
      <div className="messages messages--empty">
        <p className="messages__empty">No conversations yet.</p>
      </div>
    );
  }

  return (
    <div
      className={
        "messages" + (mobileThreadOpen ? " messages--mobileThread" : "")
      }
    >
      <aside className="messages__inbox" aria-label="Conversations">
        <div className="messages__inboxHeader">
          <h1 className="messages__title">Messages</h1>
        </div>
        <ul className="messages__threadList">
          {threads.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                className={
                  "messages__threadRow" + (t.id === activeId ? " messages__threadRow--active" : "")
                }
                onClick={() => openThread(t.id)}
              >
                <img src={t.avatar} alt="" className="messages__avatar" width={56} height={56} />
                <span className="messages__threadMeta">
                  <span className="messages__threadTop">
                    <span className="messages__threadName">{t.username}</span>
                    <span className="messages__threadTime">{t.timeLabel}</span>
                  </span>
                  <span className="messages__threadPreview">
                    {t.lastPreview}
                    {t.unread > 0 ? <span className="messages__unread">{t.unread}</span> : null}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="messages__chat" aria-label={active ? `Chat with ${active.username}` : "Chat"}>
        {active ? (
          <>
            <header className="messages__chatHeader">
              <button
                type="button"
                className="messages__back iconBtn"
                aria-label="Back to inbox"
                onClick={() => setMobileThreadOpen(false)}
              >
                <ChevronLeftIcon size={24} />
              </button>
              <img src={active.avatar} alt="" className="messages__chatAvatar" width={32} height={32} />
              <span className="messages__chatName">{active.username}</span>
            </header>
            <div className="messages__bubbleScroll" role="log" aria-live="polite">
              {active.messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    "messages__bubbleRow" + (m.from === "me" ? " messages__bubbleRow--me" : "")
                  }
                >
                  <div className="messages__bubble">
                    <p className="messages__bubbleText">{m.text}</p>
                    <span className="messages__bubbleTime">{m.timeLabel}</span>
                  </div>
                </div>
              ))}
            </div>
            <footer className="messages__composer">
              <label className="messages__composerLabel" htmlFor="message-draft">
                <span className="visuallyHidden">Message</span>
              </label>
              <input
                id="message-draft"
                className="messages__input"
                placeholder="Message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <button type="button" className="messages__send" onClick={send} disabled={!draft.trim()}>
                Send
              </button>
            </footer>
          </>
        ) : null}
      </section>
    </div>
  );
}
