import { useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { LeftNav } from "./components/LeftNav";
import { MessagesView } from "./components/MessagesView";
import { MobileTopBar } from "./components/MobileTopBar";
import { PostCard } from "./components/PostCard";
import { RightSidebar } from "./components/RightSidebar";
import { StoriesRow } from "./components/StoriesRow";
import { messageThreads, posts, stories } from "./data/mockData";

function viewFromHash(): "home" | "messages" {
  return window.location.hash.replace(/^#\/?/, "") === "messages" ? "messages" : "home";
}

export default function App() {
  const [activeView, setActiveView] = useState<"home" | "messages">(viewFromHash);

  useEffect(() => {
    const onHash = () => setActiveView(viewFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="shell">
      <LeftNav stories={stories} activeView={activeView} />
      <div className={"shell__main" + (activeView === "messages" ? " shell__main--messages" : "")}>
        <MobileTopBar activeView={activeView} />
        {activeView === "home" ? (
          <>
            <main className="feedColumn">
              <StoriesRow stories={stories} />
              <div className="feedList">
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </main>
            <RightSidebar stories={stories} />
          </>
        ) : (
          <main className="messagesColumn">
            <MessagesView initialThreads={messageThreads} />
          </main>
        )}
      </div>
      <BottomNav stories={stories} />
    </div>
  );
}
