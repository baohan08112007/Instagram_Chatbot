/**
 * Instagram DM Inbox — conversation list sidebar.
 * Desktop: 350px left panel. Mobile: full-screen.
 */
export default function ChatList({ conversations, activeId, onSelect, onNewChat }) {
  return (
    <div className="h-full flex flex-col bg-ig-canvas border-r border-ig-border">
      {/* Header */}
      <div className="h-ig-nav shrink-0 flex items-center justify-between px-4 border-b border-ig-border">
        <div className="flex items-center gap-3">
          <button
            className="hidden max-md:block text-ig-ink text-2xl leading-none"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-fs-ig-username text-ig-ink">Messages</h1>
        </div>
        <button
          onClick={onNewChat}
          className="w-8 h-8 flex items-center justify-center hover:bg-ig-canvas-soft rounded-ig-md transition-colors"
          aria-label="New message"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="shrink-0 px-4 py-3 border-b border-ig-border">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-fs-ig-body text-ig-body"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-ig-canvas-soft text-ig-ink text-fs-ig-body text-ig-body pl-9 pr-4 py-2 rounded-ig-md border-none input-ig"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto scroll-thin">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-fs-ig-body text-ig-body px-6 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-ig-mute">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-fs-ig-body text-ig-body">Chưa có tin nhắn nào</p>
            <p className="text-fs-ig-caption mt-1">Bắt đầu chat với shop ngay!</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-ig-canvas-soft transition-colors text-left ${
                activeId === conv.id ? 'bg-ig-canvas-soft' : ''
              }`}
            >
              {/* Avatar */}
              <div className="shrink-0 relative">
                <div className="w-12 h-12 rounded-ig-avatar bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px]">
                  <div className="w-full h-full rounded-ig-avatar bg-ig-canvas flex items-center justify-center overflow-hidden">
                    {conv.avatar ? (
                      <img src={conv.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-ig-ink text-fs-ig-body text-ig-body font-semibold">
                        {conv.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                {conv.unseen && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-ig-destructive rounded-ig-avatar border-2 border-ig-canvas" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-fs-ig-username text-ig-ink truncate">{conv.name}</span>
                  <span className="text-fs-ig-caption text-ig-body shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className={`text-fs-ig-body text-ig-body truncate mt-0.5 ${conv.unseen ? 'text-ig-ink font-semibold' : 'text-fs-ig-body text-ig-body'}`}>
                  {conv.lastMessage}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
