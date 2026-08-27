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
    title: "Portland Tattoo Artist | Agnes Hamilton Tattoos & Fine Art",
    description: "Bright, bold custom tattoos by Portland tattoo artist Agnes Hamilton. View tattoo work, cover-ups, paintings, events, and request an appointment.",
    h1: "Tattoos by Agnes Hamilton",
    lede: "Bright, bold custom tattooing and fine art in Portland, Oregon.",
    heroImage: sharedHero,
    sections: [
      {
        heading: "Custom Tattooing in Portland",
        body: [
          "Agnes Hamilton creates custom tattoos that mix bold lines, rich color, and detailed realism.",
          "She currently tattoos full time out of Anatomy Tattoo at 3021 NE Broadway, Portland, OR 97232.",
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
    title: "Custom Tattoos in Portland | Agnes Hamilton",
    description: "View bright, bold custom tattoos by Portland tattoo artist Agnes Hamilton, including colorful neotraditional work, realism, and detailed designs.",
    h1: "Tattoos",
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
    title: "Cover-Up Tattoos in Portland | Agnes Hamilton",
    description: "Transform an old tattoo with thoughtful cover-up and rework tattoos by Portland tattoo artist Agnes Hamilton.",
    h1: "Cover-Ups & Reworks",
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
    title: "About Portland Tattoo Artist Agnes Hamilton",
    description: "Meet Agnes Hamilton, a Portland tattoo artist and fine artist creating bold custom tattoos, detailed realism, cover-ups, paintings, and illustration.",
    h1: "About Agnes",
    lede: "A Portland-based tattoo artist and fine artist with a background in formal fine art training.",
    heroImage: { src: headshotImage, alt: "Agnes Hamilton" },
    sections: [
      {
        heading: "Artist Bio",
        body: [
          "Originally from New York, I have been basing my creative work out of Portland, Oregon since 2007 and have been a licensed, full-time working tattoo artist since 2014.",
          "A lifelong love of art drove me to attend art school, and then fate drove me to tattooing! I began my formal apprenticeship just one year after earning my Bachelor's degree in Fine Art.",
          "I appreciate all styles of art and all styles of tattooing, which allows me to adapt my skills to meet almost any need. From bright, bold neotraditional to fine, detailed portraiture and everything in between.",
          "I also enjoy and excel at cover-ups and reworking older tattoos. Although I most enjoy making custom tattoos that mix the bold lines and colors of neotraditional with the soft details of realism.",
          "I currently tattoo full time out of <a href=\"https://www.anatomytattoo.com/\">Anatomy Tattoo</a>, located at 3021 NE Broadway, Portland, OR 97232.",
          "Outside of tattooing, I enjoy painting, crafting, being outdoors and spending time with my family and two sweet rescue pups.",
          "For tattoo inquiries, fill out the form on the <a href=\"/booking/\">Booking page</a>.",
          "For fine art inquiries, email me directly at <a href=\"mailto:info@agneshamilton.com\">info@agneshamilton.com</a>.",
        ],
      },
    ],
  },
  {
    path: "/upcoming-events",
    nav: "Upcoming Events",
    title: "Upcoming Tattoo Events | Agnes Hamilton",
    description: "Find upcoming tattoo events, flash days, conventions, guest spots, fundraisers, and announcements from Portland tattoo artist Agnes Hamilton.",
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
    title: "Tattoo FAQ | Agnes Hamilton Tattoos & Fine Art",
    description: "Frequently asked questions about booking, consultations, deposits, appointments, preparation, cover-ups, pricing, and tattoo aftercare.",
    h1: "Frequently Asked Questions",
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
    title: "Paintings & Fine Art | Agnes Hamilton",
    description: "View commissioned paintings, illustration, and fine art by Agnes Hamilton. Contact Agnes about a custom painting or creative project.",
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
