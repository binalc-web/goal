import type { MessageThread } from "../data/mockData";

type Props = { threads: MessageThread[] };

export function MessagesView({ threads }: Props) {
  return (
    <div className="messages">
      <header className="messages__header">
        <h1 className="messages__title">Messages</h1>
        <p className="messages__sub">Direct messages (mock data)</p>
      </header>
      <ul className="messages__list">
        {threads.map((t) => (
          <li key={t.id}>
            <button type="button" className="messages__row">
              <img src={t.avatar} alt="" className="messages__avatar" width={56} height={56} />
              <div className="messages__body">
                <div className="messages__top">
                  <span className="messages__user">{t.username}</span>
                  <span className="messages__time">{t.timeLabel}</span>
                </div>
                <p className={`messages__preview${t.unread ? " messages__preview--unread" : ""}`}>{t.preview}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
