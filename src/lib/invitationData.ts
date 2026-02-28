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
    bride: "Dhruvi",
    groom: "Yash",
    shortMonogram: "D & Y",
  },
  weddingDateIso: "2026-07-04T00:00:00+05:30",
  weddingDateLabel: "Saturday, July 4, 2026",
  heroSubtitle: "Together with our families, we invite you to celebrate our wedding.",
  cityLabel: "Navi Mumbai, Maharashtra",
  rsvpDeadlineLabel: "June 1, 2026",
  events: [
    {
      title: "Wedding Ceremony",
      dateLabel: "Saturday, July 4, 2026",
      timeLabel: "4:30 PM onwards",
      venue: "Marriott Hotel",
      address: "Navi Mumbai, Maharashtra, India",
      mapUrl: "https://maps.app.goo.gl/search/Marriott+Hotel+Navi+Mumbai",
    },
    {
      title: "Reception",
      dateLabel: "Monday, July 6, 2026",
      timeLabel: "7:00 PM onwards",
      venue: "Marriott Hotel",
      address: "Navi Mumbai, Maharashtra, India",
      mapUrl: "https://maps.app.goo.gl/search/Marriott+Hotel+Navi+Mumbai",
    },
  ] as EventInfo[],
  storyMoments: [
    {
      title: "First Hello",
      text: "A simple conversation turned into something we never wanted to end.",
      year: "2021",
    },
    {
      title: "Growing Together",
      text: "From long calls to shared plans, we built a life around care and laughter.",
      year: "2023",
    },
    {
      title: "Forever Begins",
      text: "Now we begin our next chapter, and we would love to celebrate it with you.",
      year: "2026",
    },
  ],
  travel: {
    nearestAirport: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    nearestStation: "Navi Mumbai Railway Station",
    suggestedStay: "Marriott Hotel, Navi Mumbai",
  },
  dressCode: {
    title: "Classic Indian Formal",
    notes:
      "Pastels, gold accents, and elegant festive wear are encouraged. Please avoid all-white outfits.",
  },
  gifts:
    "Your presence is the greatest gift. If you wish to bless us further, a contribution towards our new journey together would be deeply appreciated.",
  faqs: [
    {
      q: "Can I bring a plus one?",
      a: "Please refer to your invitation. If additional guests are included, you can confirm them in RSVP.",
    },
    {
      q: "When should I RSVP by?",
      a: "Please submit your RSVP by June 1, 2026 so we can plan all arrangements smoothly.",
    },
    {
      q: "Will parking be available?",
      a: "Yes, valet and self-parking details will be shared closer to the date.",
    },
  ],
} as const;
