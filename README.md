# Wedding Invitation (Next.js)

A premium single-page wedding invitation website built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

- `src/app/page.tsx`: Main page composition
- `src/lib/invitationData.ts`: Central content/configuration for names, dates, events, FAQs, etc.
- `src/components/EnvelopeReveal.tsx`: Cinematic invitation opening animation
- `src/components/Hero.tsx`: Hero section with names/date/CTAs
- `src/components/CountdownTimer.tsx`: Live countdown
- `src/components/EventDetails.tsx`: Wedding + reception cards
- `src/components/StoryTimeline.tsx`: Story timeline section
- `src/components/Gallery.tsx`: Horizontal gallery
- `src/components/GuideSection.tsx`: Travel, dress code, gifts, FAQs
- `src/components/RSVPForm.tsx`: RSVP UI with localStorage fallback
- `src/components/QuickNav.tsx`: Sticky top section navigation

## Customize content

Update `src/lib/invitationData.ts` to change:

- Couple names
- Wedding date/time and RSVP deadline
- Event schedule and locations
- Story moments
- Travel, dress code, gifts, and FAQs

## Notes

- RSVP currently stores submissions in browser `localStorage` (`invite-rsvp`) for demo behavior.
- For production guest management, replace this with a real backend/API.
