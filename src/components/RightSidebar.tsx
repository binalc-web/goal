import { suggestions, type Story } from "../data/mockData";

type Props = { stories: Story[] };

export function RightSidebar({ stories }: Props) {
  const me = stories[0];

  return (
    <aside className="rightAside" aria-label="Account and suggestions">
      <div className="rightAside__me">
        {me ? (
          <>
            <img src={me.avatar} alt="" width={44} height={44} className="rightAside__avatar" />
            <div className="rightAside__meText">
              <span className="rightAside__username">{me.username}</span>
              <span className="rightAside__sub">Launchpad</span>
            </div>
          </>
        ) : null}
        <button type="button" className="linkBtn">
          Switch
        </button>
      </div>
      <div className="rightAside__block">
        <div className="rightAside__row">
          <span className="rightAside__muted">Suggested for you</span>
          <button type="button" className="linkBtn linkBtn--dense">
            See all
          </button>
        </div>
        <ul className="suggestList">
          {suggestions.map((s) => (
            <li key={s.username} className="suggestList__item">
              <img src={s.avatar} alt="" width={32} height={32} className="suggestList__avatar" />
              <div className="suggestList__text">
                <span className="suggestList__name">{s.username}</span>
                <span className="suggestList__reason">{s.reason}</span>
              </div>
              <button type="button" className="followBtn">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="rightAside__footer">UI preview · mock data</p>
    </aside>
  );
}
