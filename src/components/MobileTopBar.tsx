import { HeartIcon, MessengerIcon } from "./Icons";

export function MobileTopBar() {
  return (
    <header className="mobileTopBar">
      <span className="mobileTopBar__logo">Launchpad</span>
      <div className="mobileTopBar__actions">
        <button type="button" className="iconBtn" aria-label="Activity">
          <HeartIcon size={26} />
        </button>
        <button type="button" className="iconBtn" aria-label="Messages">
          <MessengerIcon size={26} />
        </button>
      </div>
    </header>
  );
}
