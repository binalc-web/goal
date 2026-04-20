import { ChevronLeftIcon, HeartIcon, MessengerIcon } from "./Icons";

type Props = { activeView: "home" | "messages" };

export function MobileTopBar({ activeView }: Props) {
  if (activeView === "messages") {
    return (
      <header className="mobileTopBar">
        <a className="mobileTopBar__back iconBtn" href="#" aria-label="Back to home">
          <ChevronLeftIcon size={26} />
        </a>
        <span className="mobileTopBar__title">Messages</span>
        <span className="mobileTopBar__spacer" aria-hidden />
      </header>
    );
  }

  return (
    <header className="mobileTopBar">
      <span className="mobileTopBar__logo">Launchpad</span>
      <div className="mobileTopBar__actions">
        <button type="button" className="iconBtn" aria-label="Activity">
          <HeartIcon size={26} />
        </button>
        <a className="iconBtn" href="#messages" aria-label="Messages">
          <MessengerIcon size={26} />
        </a>
      </div>
    </header>
  );
}
