import { useMemo, useState } from 'react'
import { CHATS, type ChatThread } from './mockData'
import './App.css'

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
      />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      />
    </svg>
  )
}

function IconAttach() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"
      />
    </svg>
  )
}

function IconMic() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      />
    </svg>
  )
}

function IconEmoji() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
      />
    </svg>
  )
}

function Avatar({ chat }: { chat: ChatThread }) {
  return (
    <div
      className="avatar"
      style={{ background: `hsl(${chat.avatarHue} 42% 42%)` }}
      aria-hidden
    >
      {chat.initials}
    </div>
  )
}

function ChatListItem({
  chat,
  active,
  onSelect,
}: {
  chat: ChatThread
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`chat-row${active ? ' chat-row--active' : ''}`}
      onClick={onSelect}
    >
      <Avatar chat={chat} />
      <div className="chat-row__body">
        <div className="chat-row__top">
          <span className="chat-row__name">{chat.name}</span>
          <span className="chat-row__time">{chat.lastTime}</span>
        </div>
        <div className="chat-row__bottom">
          <span className="chat-row__preview">{chat.lastPreview}</span>
          {chat.unread ? (
            <span className="chat-row__badge">{chat.unread}</span>
          ) : null}
        </div>
      </div>
    </button>
  )
}

function EmptyMain() {
  return (
    <div className="main-empty">
      <div className="main-empty__art" aria-hidden>
        <div className="main-empty__circle" />
      </div>
      <h2 className="main-empty__title">WhatsApp Web</h2>
      <p className="main-empty__sub">
        Send and receive messages without keeping your phone online.
      </p>
      <p className="main-empty__hint">
        <span className="main-empty__lock" aria-hidden>
          🔒
        </span>{' '}
        End-to-end encrypted (demo UI only)
      </p>
    </div>
  )
}

function ChatMain({ chat }: { chat: ChatThread }) {
  return (
    <>
      <header className="chat-header">
        <Avatar chat={chat} />
        <div className="chat-header__meta">
          <span className="chat-header__name">{chat.name}</span>
          <span className="chat-header__status">last seen today at {chat.lastTime}</span>
        </div>
        <div className="chat-header__actions">
          <button type="button" className="icon-btn" aria-label="Search in chat">
            <IconSearch />
          </button>
          <button type="button" className="icon-btn" aria-label="Menu">
            <IconMenu />
          </button>
        </div>
      </header>

      <div className="chat-messages">
        <div className="chat-messages__inner">
          {chat.messages.map((m) => (
            <div
              key={m.id}
              className={`bubble bubble--${m.from === 'me' ? 'out' : 'in'}`}
            >
              <p className="bubble__text">{m.text}</p>
              <span className="bubble__time">{m.time}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="composer" aria-label="Message composer (read-only demo)">
        <button type="button" className="icon-btn composer__attach" disabled title="Demo">
          <IconAttach />
        </button>
        <div className="composer__field">
          <span className="composer__placeholder">Type a message</span>
        </div>
        <button type="button" className="icon-btn" disabled title="Demo">
          <IconEmoji />
        </button>
        <button type="button" className="composer__mic icon-btn" disabled title="Demo">
          <IconMic />
        </button>
      </footer>
    </>
  )
}

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(CHATS[0]?.id ?? null)
  const selected = useMemo(
    () => CHATS.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  )

  return (
    <div className="wa-shell">
      <aside className="wa-rail" aria-label="Shortcuts">
        <div className="wa-rail__brand" title="WhatsApp (demo)">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
        </div>
        <nav className="wa-rail__nav">
          <button type="button" className="wa-rail__item wa-rail__item--active" title="Chats">
            💬
          </button>
          <button type="button" className="wa-rail__item" title="Status (demo)">
            ⭕
          </button>
          <button type="button" className="wa-rail__item" title="Channels (demo)">
            📢
          </button>
        </nav>
        <div className="wa-rail__footer">
          <button type="button" className="wa-rail__item" title="Settings (demo)">
            ⚙️
          </button>
        </div>
      </aside>

      <div className="wa-panels">
        <section className="panel panel--list" aria-label="Chats">
          <header className="list-header">
            <h1 className="list-header__title">Chats</h1>
            <div className="list-header__actions">
              <button type="button" className="icon-btn" aria-label="New chat (demo)">
                ✏️
              </button>
              <button type="button" className="icon-btn" aria-label="Menu">
                <IconMenu />
              </button>
            </div>
          </header>

          <div className="search-wrap">
            <label className="search">
              <span className="search__icon">
                <IconSearch />
              </span>
              <input
                type="search"
                className="search__input"
                placeholder="Search or start new chat"
                readOnly
              />
            </label>
          </div>

          <div className="chat-list">
            {CHATS.map((c) => (
              <ChatListItem
                key={c.id}
                chat={c}
                active={c.id === selectedId}
                onSelect={() => setSelectedId(c.id)}
              />
            ))}
          </div>
        </section>

        <section className="panel panel--main" aria-label="Conversation">
          {selected ? <ChatMain chat={selected} /> : <EmptyMain />}
        </section>
      </div>
    </div>
  )
}

export default App
