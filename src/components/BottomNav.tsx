import { CompassIcon, CreateIcon, HomeIcon, ReelsIcon } from "./Icons";
import type { Story } from "../data/mockData";

type Props = { stories: Story[] };

export function BottomNav({ stories }: Props) {
  const me = stories[0]?.avatar;

  return (
    <nav className="bottomNav" aria-label="Mobile primary">
      <a className="bottomNav__item bottomNav__item--active" href="#">
        <HomeIcon size={26} />
      </a>
      <a className="bottomNav__item" href="#">
        <CompassIcon size={26} />
      </a>
      <a className="bottomNav__item" href="#">
        <CreateIcon size={26} />
      </a>
      <a className="bottomNav__item" href="#">
        <ReelsIcon size={26} />
      </a>
      <a className="bottomNav__item" href="#" title="Profile">
        {me ? <img src={me} alt="" width={26} height={26} className="bottomNav__avatar" /> : null}
      </a>
    </nav>
  );
}
