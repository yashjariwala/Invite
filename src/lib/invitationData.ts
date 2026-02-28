export type EventInfo = {
  title: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  mapUrl: string;
};

export const invitationData = {
  couple: {
    groom: "Dhruvi",
    bride: "Yash",
    shortMonogram: "Y & D",
    date: "July 4th & 5th, 2026",
    time: "10:30 AM",
  },
  weddingDateLabel: "Saturday, July 4, 2026",
  invocation: "॥ श्री गणेशाय नमः ॥",
  heroSubtitle: "Together with our families, we invite you to celebrate our wedding.",
  cityLabel: "Navi Mumbai, Maharashtra",
  rsvpDeadlineLabel: "June 1, 2026",
  events: [
    {
      title: "Wedding Ceremony (Lagna)",
      dateLabel: "Saturday, July 4, 2026",
      timeLabel: "4:30 PM onwards",
      venue: "Marriott Hotel",
      address: "Navi Mumbai, Maharashtra, India",
      mapUrl: "https://maps.app.goo.gl/search/Marriott+Hotel+Navi+Mumbai",
    },
    {
      title: "Reception",
      dateLabel: ", July 5, 2026",
      timeLabel: "7:00 PM onwards",
      venue: "Marriott Hotel",
      address: "Navi Mumbai, Maharashtra, India",
      mapUrl: "https://maps.app.goo.gl/search/Marriott+Hotel+Navi+Mumbai",
    },
  ] as EventInfo[],
  storyMoments: [
    {
      title: "How We Met",
      text: "Our paths first crossed in 2018 while we were studying together in engineering college.",
      year: "2018",
    },
    {
      title: "Falling in Love",
      text: "After years of friendship, we officially started dating and building a beautiful life together.",
      year: "2022",
    },
    {
      title: "The Proposal",
      text: "A magical moment as we got engaged and decided to spend the rest of our lives by each other's side.",
      year: "Dec 2025",
    },
    {
      title: "Forever Begins",
      text: "We are finally tying the knot and can't wait to celebrate our wedding with all of you.",
      year: "July 2026",
    },
  ],
  travel: {
    airports: [
      { name: "Navi Mumbai International Airport (NMIA)", note: "Closer" },
      { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", note: "" },
    ],
    nearestStation: "Turbhe Railway Station",
  },
  gifts: "Please, no gifts. Your presence at our wedding and your loving blessings are the greatest gifts we could ask for.",
  faqs: [
    {
      q: "Are kids welcome?",
      a: "Yes, we would love to celebrate with your little ones. Please let us know if they need any special accommodations.",
    },
    {
      q: "What time should I arrive?",
      a: "We recommend arriving 30 minutes prior to the start of the ceremonies so you can comfortably find a seat.",
    },
  ],
} as const;
