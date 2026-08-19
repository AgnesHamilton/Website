const tattooImage = "https://static.wixstatic.com/media/41554d_52523d5f8e434c489339670dec6c1122~mv2_d_1936_1936_s_2.jpg";
const headshotImage = "https://static.wixstatic.com/media/41554d_14a8d227c6ab4d32acf52d95dd24817d~mv2.jpg";
const paintingImage = "https://static.wixstatic.com/media/41554d_8f054e167f084fbb8560424cd13dec60~mv2.jpg";

const sharedHero = {
  src: tattooImage,
  alt: "Color tattoo work by Agnes Hamilton",
};

export const pages = [
  {
    path: "/",
    nav: "Home",
    title: "Agnes Hamilton Tattoos & Fine Art | Portland, Oregon",
    description: "Bright, bold custom tattoos by female tattoo artist Agnes Hamilton, based in Portland, Oregon.",
    h1: "Tattoos by Agnes Hamilton",
    lede: "Bright, bold custom tattooing and fine art in Portland, Oregon.",
    heroImage: sharedHero,
    sections: [
      {
        heading: "Custom Tattooing in Portland",
        body: [
          "Agnes Hamilton creates custom tattoos that mix bold lines, rich color, and detailed realism.",
          "She currently tattoos full time out of Anatomy Tattoo at 3032 NE Broadway, Portland, OR 97232.",
        ],
        actions: [
          { label: "Start a Booking Request", href: "/booking/", primary: true },
          { label: "Read the FAQ", href: "/faq/" },
        ],
      },
    ],
  },
  {
    path: "/tattoos",
    nav: "Tattoos",
    title: "Tattoos | Agnes Hamilton Tattoos & Fine Art",
    description: "View tattoo work by Agnes Hamilton, a Portland tattoo artist specializing in bold custom designs.",
    h1: "Tattoo Portfolio",
    lede: "Colorful custom tattoos, detailed pieces, cover-ups, and reworks.",
    heroImage: sharedHero,
    sections: [
      {
        heading: "Portfolio",
        body: [
          "This page is ready for the final tattoo image set exported from Wix or selected from Agnes's portfolio.",
          "Keep descriptive alt text on every image so the new site carries over the search value of the existing gallery.",
        ],
        gallery: [
          { src: tattooImage, alt: "Custom tattoo portfolio image", caption: "Custom tattoo work" },
        ],
      },
    ],
  },
  {
    path: "/cover-ups",
    nav: "Cover-Ups",
    title: "Cover-Ups | Agnes Hamilton Tattoos & Fine Art",
    description: "Cover-up and rework tattoos by Agnes Hamilton in Portland, Oregon.",
    h1: "Cover-Ups and Reworks",
    lede: "Thoughtful cover-up tattoos and refreshed older pieces.",
    heroImage: sharedHero,
    sections: [
      {
        heading: "Planning a Cover-Up",
        body: [
          "Agnes enjoys cover-ups and reworking older tattoos, with an emphasis on designs that solve the existing tattoo while still looking intentional.",
          "Use the booking form to share clear photos, placement, size, and notes about what you want changed.",
        ],
        actions: [
          { label: "Book a Cover-Up", href: "/booking/", primary: true },
        ],
      },
    ],
  },
  {
    path: "/booking",
    nav: "Booking",
    title: "Booking | Agnes Hamilton Tattoos & Fine Art",
    description: "Book your next tattoo with Agnes Hamilton in Portland, Oregon.",
    h1: "Book a Tattoo",
    lede: "Send the details Agnes needs to review your tattoo idea and next steps.",
    heroImage: sharedHero,
    sections: [
      {
        kind: "booking-panel",
        heading: "Booking Request",
        body: [
          "This page should connect to the affordable booking tool you choose. Until then, the contact path should stay simple and reliable.",
          "Recommended fields: name, email, phone, tattoo idea, placement, approximate size, preferred dates, budget, reference images, and cover-up photos if relevant.",
        ],
        actions: [
          { label: "Email Agnes", href: "mailto:info@agneshamilton.com?subject=Tattoo%20booking%20request", primary: true },
        ],
      },
    ],
  },
  {
    path: "/shop",
    nav: "Shop",
    title: "Shop | Agnes Hamilton Tattoos & Fine Art",
    description: "Shop artwork, prints, and merchandise from Agnes Hamilton.",
    h1: "Shop",
    lede: "Artwork, prints, and limited pieces from Agnes Hamilton.",
    heroImage: { src: paintingImage, alt: "Artwork by Agnes Hamilton" },
    sections: [
      {
        heading: "Storefront",
        body: [
          "Connect this page to the final shop platform, or keep it as a simple inquiry page if inventory is limited.",
          "The old Wix `/oldshop` URL is included in the redirect plan so returning visitors land here.",
        ],
      },
    ],
  },
  {
    path: "/about",
    nav: "About",
    title: "About | Agnes Hamilton Tattoos & Fine Art",
    description: "Learn about Agnes Hamilton, a Portland, Oregon tattoo artist and fine artist.",
    h1: "About Agnes",
    lede: "A Portland-based tattoo artist and fine artist with a background in formal fine art training.",
    heroImage: { src: headshotImage, alt: "Agnes Hamilton" },
    sections: [
      {
        heading: "Artist Bio",
        body: [
          "Agnes began her formal apprenticeship one year after earning her Bachelor's degree in Fine Art.",
          "She appreciates many styles of art and tattooing, from bright, bold neotraditional work to fine, detailed portraiture.",
          "For tattoo inquiries, use the booking page. For fine art inquiries, email info@agneshamilton.com.",
        ],
      },
    ],
  },
  {
    path: "/upcoming-events",
    nav: "Events",
    title: "Upcoming Events | Agnes Hamilton Tattoos & Fine Art",
    description: "Upcoming events, guest spots, tattoo expos, and announcements from Agnes Hamilton.",
    h1: "Upcoming Events",
    lede: "Guest spots, conventions, flash days, and current announcements.",
    heroImage: sharedHero,
    sections: [
      {
        heading: "Events and Updates",
        body: [
          "Add current events here before launch. Older Wix blog posts can redirect to this page or be rebuilt individually if they still receive search traffic.",
        ],
      },
    ],
  },
  {
    path: "/faq",
    nav: "FAQ",
    title: "FAQ | Agnes Hamilton Tattoos & Fine Art",
    description: "Frequently asked questions about booking, tattoo appointments, cover-ups, and consultations with Agnes Hamilton.",
    h1: "FAQ",
    lede: "Answers for booking, consults, deposits, appointments, and tattoo prep.",
    heroImage: sharedHero,
    sections: [
      {
        heading: "Before You Book",
        body: [
          "Use this page to preserve the existing Wix FAQ content. Exact copy should be moved over before launch.",
          "Common questions should cover booking, deposits, design process, consultations, cover-ups, preparation, aftercare, and cancellation policies.",
        ],
      },
    ],
  },
  {
    path: "/paintings",
    nav: "Paintings",
    title: "Paintings | Agnes Hamilton Tattoos & Fine Art",
    description: "Paintings, illustration, and fine art by Agnes Hamilton.",
    h1: "Paintings",
    lede: "Fine art, paintings, and illustration work by Agnes Hamilton.",
    heroImage: { src: paintingImage, alt: "Painting by Agnes Hamilton" },
    sections: [
      {
        heading: "Fine Art",
        body: [
          "Contact Agnes for custom paintings, illustration, or fine art inquiries.",
          "The final migration should include the full painting gallery exported from Wix Media Manager.",
        ],
        gallery: [
          { src: paintingImage, alt: "Painting portfolio image", caption: "Fine art portfolio" },
        ],
      },
    ],
  },
];

export const redirects = [
  { from: "/oldshop", to: "/shop", status: 301 },
  { from: "/updates", to: "/upcoming-events", status: 301 },
  { from: "/forms", to: "/booking", status: 301 },
  { from: "/book-a-consultation", to: "/booking", status: 301 },
  { from: "/book-a-coverup-tattoo", to: "/cover-ups", status: 301 },
  { from: "/tattoo-release-form", to: "/booking", status: 301 },
  { from: "/covid-19-questionnaire", to: "/booking", status: 301 },
  { from: "/raffle", to: "/", status: 301 },
  { from: "/winter-raffle", to: "/", status: 301 },
  { from: "/illustration", to: "/paintings", status: 301 },
  { from: "/single-post/*", to: "/upcoming-events", status: 301 },
];
