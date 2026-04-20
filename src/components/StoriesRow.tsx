import type { Story } from "../data/mockData";

type Props = { stories: Story[] };

export function StoriesRow({ stories }: Props) {
  return (
    <section className="stories" aria-label="Stories">
      <div className="stories__track">
        {stories.map((s) => (
          <button key={s.id} type="button" className="storyChip">
            <span className={s.hasNew ? "storyChip__ring storyChip__ring--new" : "storyChip__ring"}>
              <img src={s.avatar} alt="" width={56} height={56} className="storyChip__img" />
            </span>
            <span className="storyChip__name">{s.username}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
