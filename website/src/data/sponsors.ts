export interface Sponsor {
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export const sponsors: Sponsor[] = [
  { name: 'Sponsor 1', tier: 'platinum' },
  { name: 'Sponsor 2', tier: 'gold' },
  { name: 'Sponsor 3', tier: 'gold' },
  { name: 'Sponsor 4', tier: 'silver' },
  { name: 'Sponsor 5', tier: 'silver' },
  { name: 'Sponsor 6', tier: 'bronze' },
];
