export interface TeamMember {
  name: string;
  role: string;
  type: 'student' | 'mentor';
  featured?: boolean;
}

export const team: TeamMember[] = [
  { name: 'Team Captain', role: 'Captain / Strategy Lead', type: 'student', featured: true },
  { name: 'Lead Mentor', role: 'Head Mentor / Engineering', type: 'mentor', featured: true },
  { name: 'Member 1', role: 'Mechanical Lead', type: 'student' },
  { name: 'Member 2', role: 'Programming Lead', type: 'student' },
  { name: 'Member 3', role: 'Electrical Lead', type: 'student' },
  { name: 'Member 4', role: 'Business Lead', type: 'student' },
  { name: 'Mentor 2', role: 'Mentor / CAD', type: 'mentor' },
  { name: 'Member 5', role: 'Media / Outreach', type: 'student' },
];
