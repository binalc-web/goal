import { BottomNav } from "./components/BottomNav";
import { LeftNav } from "./components/LeftNav";
import { MessagesView } from "./components/MessagesView";
import { MobileTopBar } from "./components/MobileTopBar";
import { PostCard } from "./components/PostCard";
import { RightSidebar } from "./components/RightSidebar";
import { StoriesRow } from "./components/StoriesRow";
import { messageThreads, posts, stories } from "./data/mockData";
import { useHashView } from "./hooks/useHashView";

export default function App() {
  const view = useHashView();
  const isMessages = view === "messages";

  return (
    <div className="shell">
      <LeftNav stories={stories} activeView={view} />
      <div className="shell__main">
        <MobileTopBar activeView={view} />
        <main className={`feedColumn${isMessages ? " feedColumn--messages" : ""}`}>
          {isMessages ? (
            <MessagesView threads={messageThreads} />
          ) : (
            <>
              <StoriesRow stories={stories} />
              <div className="feedList">
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </>
          )}
        </main>
        {!isMessages ? <RightSidebar stories={stories} /> : null}
      </div>
      <BottomNav stories={stories} />
    </div>
  );
}
