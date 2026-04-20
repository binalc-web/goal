import { CompassIcon, CreateIcon, HeartIcon, HomeIcon, MessengerIcon, ReelsIcon, SearchIcon } from "./Icons";
import type { AppView } from "../hooks/useHashView";
import type { Story } from "../data/mockData";

type Props = { stories: Story[]; activeView: AppView };

export function LeftNav({ stories, activeView }: Props) {
  const logo = stories[0]?.avatar;
  const homeActive = activeView === "home";
  const messagesActive = activeView === "messages";

  return (
    <aside className="leftNav" aria-label="Main">
      <div className="leftNav__inner">
        <a className="leftNav__brand" href="#">
          Launchpad
        </a>
        <nav className="leftNav__links">
          <a className={`leftNav__link${homeActive ? " leftNav__link--active" : ""}`} href="#" aria-current={homeActive ? "page" : undefined}>
            <HomeIcon size={26} />
            <span>Home</span>
          </a>
          <a className="leftNav__link" href="#">
            <SearchIcon size={26} />
            <span>Search</span>
          </a>
          <a className="leftNav__link" href="#">
            <CompassIcon size={26} />
            <span>Explore</span>
          </a>
          <a className="leftNav__link" href="#">
            <ReelsIcon size={26} />
            <span>Reels</span>
          </a>
          <a
            className={`leftNav__link${messagesActive ? " leftNav__link--active" : ""}`}
            href="#messages"
            aria-current={messagesActive ? "page" : undefined}
          >
            <MessengerIcon size={26} />
            <span>Messages</span>
          </a>
          <a className="leftNav__link" href="#">
            <HeartIcon size={26} />
            <span>Notifications</span>
          </a>
          <a className="leftNav__link" href="#">
            <CreateIcon size={26} />
            <span>Create</span>
          </a>
          <a className="leftNav__link leftNav__profile" href="#" title="Profile">
            {logo ? <img src={logo} alt="" className="leftNav__avatar" width={28} height={28} /> : null}
            <span>Profile</span>
          </a>
        </nav>
        <a className="leftNav__more" href="#">
          <span className="leftNav__moreIcon" aria-hidden>
            ☰
          </span>
          <span>More</span>
        </a>
      </div>
    </aside>
  );
}
