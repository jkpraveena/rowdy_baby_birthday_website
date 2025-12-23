import { Song, Mood } from './types';

export const ASSETS = {
  // Using the image saved in the root folder as requested
  CHIBI_MAIN: '/1.jpg',
  CHIBI1_MAIN: '/2.jpg'
};

export const COLORS = {
  morning: 'from-rose-50 via-orange-50/30 to-white',
  dusk: 'from-rose-50 via-purple-50/30 to-white',
  midnight: 'from-purple-50 via-slate-50 to-white'
};

export const SONGS: Song[] = [
  {
    id: '2LLZkWMReCWhgTrHuRh6dV',
    title: "Ullaallaa",
    artist: "Pure Joy ",
    mood: Mood.Morning,
    emoji: "🌈",
    quoteEn: "Happiness flows easily when life is seen with an open heart and fearless joy",
    quoteTa: "மனசை திறந்தா, சந்தோஷம் தானா வந்து நிறையும்",
    description: "A reminder that joy isn’t rare — it’s everywhere, waiting to be noticed and celebrated"
  },
  {
    id: '7IO5iU84tFIZ4kfvhrg4oZ',
    title: "Kadhal Ara Onnu",
    artist: "Emotional Rush",
    mood: Mood.Morning,
    emoji: "⚡",
    quoteEn: "That unstoppable surge when life suddenly feels faster, louder, and full of possibilities",
    quoteTa: "மனசு தானா வேகமா துடிக்குது, ஏதோ நல்லது நடக்கப் போகுது போல",
    description: "A moment where excitement takes over — heart racing, thoughts overflowing, and the future feeling electric"
  },
  {
    id: '0joXv5niso2T8YXWOlIe1X',
    title: "Titli",
    artist: "Universe Whisper",
    mood: Mood.Dusk,
    emoji: "✨",
    quoteEn: "When nothing was expected, the universe still chose to surprise her gently",
    quoteTa: "எதிர்பார்க்காத தருணங்களில் தான் வாழ்க்கை அழகான பரிசுகளை தருது",
    description: "A reminder that life has its own way of gifting joy, quietly and unexpectedly."
  },
  {
    id: '6oDHJCgEVvPTtyFcl7jKqQ',
    title: "Malargal Kaettaen",
    artist: "Abundance",
    mood: Mood.Dusk,
    emoji: "💜",
    quoteEn: "She asked life for little, but life gave her far more than she ever imagined",
    quoteTa: "கேட்டதைவிட அதிகமாக வாழ்க்கை கொடுத்ததுக்கு மனசு நிறைய நன்றி",
    description: "A quiet pause to acknowledge how every fall was guided, every loss was softened, and every need was met in unexpected ways"
  },
  {
    id: '2A0JZsrJ1Nor5wtoOr9OOR',
    title: "Eppadi Vandhayo",
    artist: "Deeply Held",
    mood: Mood.Midnight,
    emoji: "💗",
    quoteEn: "She realizes she is loved in ways that quietly change how she sees herself",
    quoteTa: "அவள் இருப்பது மட்டும் போதும் — அவளுக்காக யாரோ மனசார இருக்கிறார்கள்",
    description: "That gentle feeling of being valued, understood, and cared for — without needing to ask or explain"
  },
  {
    id: '0JgrGAiNpua9aR0banRGH7',
    title: "Cheeni Kallu",
    artist: "Soft Memories",
    mood: Mood.Midnight,
    emoji: "🎧",
    quoteEn: "She looks back at where she began, holding onto memories that still feel warm and safe",
    quoteTa: "சின்ன வயசு நினைவுகள் இன்னும் மனசுக்குள்ள மெதுவா பேசிக்கிட்டே இருக்கு",
    description: "A quiet return to lullabies, familiar voices, and moments that shaped who she is — gentle reminders that some feelings never grow old"
  }
];
