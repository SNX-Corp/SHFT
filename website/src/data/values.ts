export interface Value {
  number: string;
  name: string;
  description: string;
  icon: string;
}

export const values: Value[] = [
  {
    number: '01',
    name: 'FOCUS',
    description: 'We stay mission-driven. Every decision, every sprint, every build session pushes toward a single goal. No distractions, no half-measures.',
    icon: '&#9678;',
  },
  {
    number: '02',
    name: 'ELEVATE',
    description: 'We push each other higher. Mentors lift students, veterans lift rookies, and the team lifts the community around it.',
    icon: '&#9650;',
  },
  {
    number: '03',
    name: 'INNOVATE',
    description: 'We build what\'s next. Not satisfied with the obvious solution — we prototype, test, break, and rebuild until the design is right.',
    icon: '&lt;/&gt;',
  },
  {
    number: '04',
    name: 'TOGETHER',
    description: 'We win as one team. Mechanical, electrical, programming, business, media — every subteam is essential. No one ships alone.',
    icon: '&#9733;',
  },
];
