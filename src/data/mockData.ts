export type Story = { id: string; username: string; avatar: string; hasNew: boolean };
export type Post = {
  id: string;
  username: string;
  avatar: string;
  location?: string;
  image: string;
  likes: number;
  caption: string;
  commentsPreview: string;
  timeAgo: string;
};

export const currentUser = {
  username: "you",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
};

export const stories: Story[] = [
  { id: "1", username: "Your story", avatar: currentUser.avatar, hasNew: false },
  { id: "2", username: "alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", hasNew: true },
  { id: "3", username: "maya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya", hasNew: true },
  { id: "4", username: "dev_team", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev", hasNew: false },
  { id: "5", username: "launchpad", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Launch", hasNew: true },
];

export const posts: Post[] = [
  {
    id: "p1",
    username: "launchpad",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Launch",
    location: "San Francisco, CA",
    image: "https://picsum.photos/seed/feed1/1080/1350",
    likes: 1284,
    caption: "Shipping the first slice of the feed UI. Mock data only — backend hooks next.",
    commentsPreview: "View all 42 comments",
    timeAgo: "2 hours ago",
  },
  {
    id: "p2",
    username: "maya",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    image: "https://picsum.photos/seed/feed2/1080/1080",
    likes: 892,
    caption: "Golden hour walk ☀️ #design #prototype",
    commentsPreview: "View all 18 comments",
    timeAgo: "5 hours ago",
  },
  {
    id: "p3",
    username: "alex",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    location: "Remote",
    image: "https://picsum.photos/seed/feed3/1080/1200",
    likes: 2103,
    caption: "One dashboard to preview the experience. Keep it simple.",
    commentsPreview: "View all 56 comments",
    timeAgo: "1 day ago",
  },
];

export const suggestions = [
  { username: "product", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Product", reason: "New to Launchpad" },
  { username: "design_ops", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ops", reason: "Followed by maya" },
  { username: "infra", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Infra", reason: "Suggested for you" },
];

export type ChatMessage = { id: string; from: "me" | "them"; text: string; timeLabel: string };

export type MessageThread = {
  id: string;
  username: string;
  avatar: string;
  lastPreview: string;
  timeLabel: string;
  unread: number;
  messages: ChatMessage[];
};

export const messageThreads: MessageThread[] = [
  {
    id: "t1",
    username: "maya",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    lastPreview: "Sounds good — ship it tomorrow?",
    timeLabel: "2m",
    unread: 2,
    messages: [
      { id: "m1", from: "them", text: "Hey! Did you see the new feed layout?", timeLabel: "Yesterday" },
      { id: "m2", from: "me", text: "Yes — looks clean. Stories row is smooth.", timeLabel: "Yesterday" },
      { id: "m3", from: "them", text: "Sounds good — ship it tomorrow?", timeLabel: "2m" },
    ],
  },
  {
    id: "t2",
    username: "alex",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastPreview: "Pushed a fix for the avatar overflow",
    timeLabel: "1h",
    unread: 0,
    messages: [
      { id: "m4", from: "them", text: "Pushed a fix for the avatar overflow", timeLabel: "1h" },
      { id: "m5", from: "me", text: "Nice — pulling now.", timeLabel: "50m" },
    ],
  },
  {
    id: "t3",
    username: "launchpad",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Launch",
    lastPreview: "Welcome to Launchpad — mock data only for now.",
    timeLabel: "3h",
    unread: 0,
    messages: [
      { id: "m6", from: "them", text: "Welcome to Launchpad — mock data only for now.", timeLabel: "3h" },
    ],
  },
];
