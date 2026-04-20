import { CompassIcon, CreateIcon, HeartIcon, HomeIcon, MessengerIcon, ReelsIcon, SearchIcon } from "./Icons";
import type { Story } from "../data/mockData";

type Props = { stories: Story[]; activeView: "home" | "messages" };

export function LeftNav({ stories, activeView }: Props) {
  const logo = stories[0]?.avatar;

  return (
    <aside className="leftNav" aria-label="Main">
      <div className="leftNav__inner">
        <div className="leftNav__brand">Launchpad</div>
        <nav className="leftNav__links">
          <a
            className={"leftNav__link" + (activeView === "home" ? " leftNav__link--active" : "")}
            href="#"
          >
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
            className={"leftNav__link" + (activeView === "messages" ? " leftNav__link--active" : "")}
            href="#messages"
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
