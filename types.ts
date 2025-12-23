// Fix: Added missing React import to resolve "Cannot find namespace 'React'" error.
import React from 'react';

export enum Mood {
  Morning = 'morning',
  Dusk = 'dusk',
  Midnight = 'midnight'
}

export interface Song {
  id: string; // Spotify Track ID
  title: string;
  artist: string;
  mood: Mood;
  emoji?: string;
  quoteEn: string;
  quoteTa: string;
  description: string;
  accent?: 'gif' | 'sticker' | 'none';
  accentUrl?: string;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}