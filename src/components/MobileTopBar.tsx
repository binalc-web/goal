import { HeartIcon, MessengerIcon } from "./Icons";
import type { AppView } from "../hooks/useHashView";

type Props = { activeView: AppView };

export function MobileTopBar({ activeView }: Props) {
  const isMessages = activeView === "messages";

  return (
    <header className={`mobileTopBar${isMessages ? " mobileTopBar--messages" : ""}`}>
      {isMessages ? (
        <>
          <a className="mobileTopBar__back" href="#">
            ← Home
          </a>
          <span className="mobileTopBar__title">Messages</span>
          <span className="mobileTopBar__edgeSpacer" aria-hidden />
        </>
      ) : (
        <>
          <a className="mobileTopBar__logo" href="#">
            Launchpad
          </a>
          <div className="mobileTopBar__actions">
            <button type="button" className="iconBtn" aria-label="Activity">
              <HeartIcon size={26} />
            </button>
            <a className="iconBtn" href="#messages" aria-label="Messages">
              <MessengerIcon size={26} />
            </a>
          </div>
        </>
      )}
    </header>
  );
}
