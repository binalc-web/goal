import { BottomNav } from "./components/BottomNav";
import { LeftNav } from "./components/LeftNav";
import { MobileTopBar } from "./components/MobileTopBar";
import { PostCard } from "./components/PostCard";
import { RightSidebar } from "./components/RightSidebar";
import { StoriesRow } from "./components/StoriesRow";
import { posts, stories } from "./data/mockData";

export default function App() {
  return (
    <div className="shell">
      <LeftNav stories={stories} />
      <div className="shell__main">
        <MobileTopBar />
        <main className="feedColumn">
          <StoriesRow stories={stories} />
          <div className="feedList">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </main>
        <RightSidebar stories={stories} />
      </div>
      <BottomNav stories={stories} />
    </div>
  );
}
