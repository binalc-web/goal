export type ChatMessage = {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
}

export type ChatThread = {
  id: string
  name: string
  initials: string
  avatarHue: number
  lastPreview: string
  lastTime: string
  unread?: number
  messages: ChatMessage[]
}

export const CHATS: ChatThread[] = [
  {
    id: '1',
    name: 'Family group',
    initials: 'FG',
    avatarHue: 142,
    lastPreview: 'Mom: See you at dinner',
    lastTime: '10:42',
    unread: 3,
    messages: [
      { id: 'm1', from: 'them', text: 'Are we still on for Sunday?', time: '10:38' },
      { id: 'm2', from: 'me', text: 'Yes — I will bring dessert.', time: '10:39' },
      { id: 'm3', from: 'them', text: 'Perfect. See you at dinner.', time: '10:42' },
    ],
  },
  {
    id: '2',
    name: 'Alex Rivera',
    initials: 'AR',
    avatarHue: 204,
    lastPreview: 'Sounds good, thanks!',
    lastTime: 'Yesterday',
    messages: [
      { id: 'm1', from: 'them', text: 'Can you share the deck?', time: '18:12' },
      { id: 'm2', from: 'me', text: 'Sent via email just now.', time: '18:14' },
      { id: 'm3', from: 'them', text: 'Sounds good, thanks!', time: '18:15' },
    ],
  },
  {
    id: '3',
    name: 'Work — Design',
    initials: 'WD',
    avatarHue: 28,
    lastPreview: 'You: Let me sync with the team',
    lastTime: 'Mon',
    unread: 1,
    messages: [
      { id: 'm1', from: 'them', text: 'Final mockups are in Figma.', time: '09:02' },
      { id: 'm2', from: 'me', text: 'Let me sync with the team and circle back.', time: '09:18' },
    ],
  },
  {
    id: '4',
    name: 'Sam Chen',
    initials: 'SC',
    avatarHue: 320,
    lastPreview: 'Photo',
    lastTime: 'Sun',
    messages: [
      { id: 'm1', from: 'them', text: 'Check this out.', time: '14:01' },
      { id: 'm2', from: 'me', text: 'Wow — where was this taken?', time: '14:05' },
    ],
  },
  {
    id: '5',
    name: 'Cafe orders',
    initials: 'CO',
    avatarHue: 88,
    lastPreview: 'Priya: Oat latte for me',
    lastTime: 'Sat',
    messages: [
      { id: 'm1', from: 'them', text: 'Oat latte for me please.', time: '08:41' },
      { id: 'm2', from: 'me', text: 'Got it — grabbing now.', time: '08:42' },
    ],
  },
]
