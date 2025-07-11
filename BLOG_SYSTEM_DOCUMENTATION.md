# Blog System Documentation

## Overview

The blog system provides a flexible and modular approach to creating rich blog posts with various content sections. Each section type is a reusable component that can be mixed and matched to create engaging content.

## Blog Structure

### Main Files
- `src/app/blog/page.js` - Blog listing page
- `src/app/blog/[slug]/page.js` - Individual blog post page
- `src/components/BlogSections/index.js` - Reusable section components

## Available Section Components

### 1. Hero Section (`hero`)
**Purpose**: Main introduction section with title, subtitle, and hero image

**Props**:
- `title` (string) - Main heading
- `subtitle` (string) - Subtitle text
- `image` (string) - Image URL
- `imageAlt` (string) - Image alt text
- `titleFont` (string) - Font for title: "cocosharp-bold", "cocosharp-light", "cocosharp-normal", "ptSans-normal", "ptSans-bold"
- `subtitleFont` (string) - Font for subtitle

**Example**:
```javascript
{
  type: "hero",
  title: "Historia pizzy w Polsce",
  subtitle: "Od włoskiej tradycji do polskiego smaku",
  image: "/assets/pizza.png",
  titleFont: "cocosharp-bold",
  subtitleFont: "ptSans-normal"
}
```

### 2. Text Section (`text`)
**Purpose**: Simple text content

**Props**:
- `content` (string) - Text content
- `fontType` (string) - Font type: "cocosharp-bold", "cocosharp-light", "cocosharp-normal", "ptSans-normal", "ptSans-bold"
- `textSize` (string) - Text size: "text-sm", "text-base", "text-lg", "text-xl", "text-2xl"
- `textColor` (string) - Text color: "text-gray-700", "text-gray-600", "text-primary-600", etc.

**Example**:
```javascript
{
  type: "text",
  content: "Pizza w Polsce ma bogatą i fascynującą historię...",
  fontType: "ptSans-normal",
  textSize: "text-lg",
  textColor: "text-gray-700"
}
```

### 3. Image Section (`image`)
**Purpose**: Image with optional caption

**Props**:
- `src` (string) - Image URL
- `alt` (string) - Image alt text
- `caption` (string, optional) - Image caption

**Example**:
```javascript
{
  type: "image",
  src: "/assets/pizza.png",
  alt: "Tradycyjna włoska pizza",
  caption: "Tradycyjna włoska pizza - źródło inspiracji"
}
```

### 4. Quote Section (`quote`)
**Purpose**: Highlighted quote with author attribution

**Props**:
- `quote` (string) - Quote text
- `author` (string) - Author name
- `quoteFont` (string) - Font for quote text
- `authorFont` (string) - Font for author name
- `backgroundColor` (string) - Background color class
- `borderColor` (string) - Border color class

**Example**:
```javascript
{
  type: "quote",
  quote: "Pizza to nie tylko jedzenie, to sposób na życie.",
  author: "Marek Kowalski, szef kuchni",
  quoteFont: "cocosharp-normal",
  authorFont: "ptSans-normal",
  backgroundColor: "bg-gradient-to-r from-primary-50 to-yellow-50",
  borderColor: "border-primary-500"
}
```

### 5. Ranking Section (`ranking`)
**Purpose**: Display ranked items (e.g., top pizzerias)

**Props**:
- `title` (string, optional) - Section title
- `items` (array) - Array of ranking items

**Example**:
```javascript
{
  type: "ranking",
  title: "Ranking",
  items: [
    {
      position: 1,
      name: "Pizzeria Da Grasso",
      description: "Tradycyjna włoska pizza",
      rating: 4.8,
      address: "ul. Marszałkowska 123"
    }
  ]
}
```

### 6. Gallery Section (`gallery`)
**Purpose**: Display multiple images in a grid

**Props**:
- `title` (string, optional) - Section title
- `images` (array) - Array of image objects

**Example**:
```javascript
{
  type: "gallery",
  title: "Galeria zdjęć",
  images: [
    { src: "/assets/pizza1.png", alt: "Pizza 1" },
    { src: "/assets/pizza2.png", alt: "Pizza 2" }
  ]
}
```

### 7. Video Section (`video`)
**Purpose**: Embed video content

**Props**:
- `videoUrl` (string) - Video URL
- `title` (string, optional) - Section title
- `description` (string, optional) - Video description

**Example**:
```javascript
{
  type: "video",
  videoUrl: "https://youtube.com/watch?v=example",
  title: "Jak przygotować pizzę",
  description: "Instrukcja krok po kroku"
}
```

### 8. Call to Action Section (`cta`)
**Purpose**: Encourage user action

**Props**:
- `title` (string) - CTA title
- `description` (string) - CTA description
- `buttonText` (string) - Button text
- `buttonLink` (string) - Button link

**Example**:
```javascript
{
  type: "cta",
  title: "Sprawdź więcej pizzerii",
  description: "Odkryj setki innych pizzerii w Warszawie",
  buttonText: "Przeglądaj pizzerie",
  buttonLink: "/pizza/warszawa"
}
```

### 9. Info Box Section (`infobox`)
**Purpose**: Highlight important information

**Props**:
- `title` (string) - Info box title
- `content` (string) - Info box content
- `type` (string) - "info", "warning", or "error"

**Example**:
```javascript
{
  type: "infobox",
  title: "Jak ocenialiśmy?",
  content: "Nasz ranking opiera się na opiniach klientów...",
  infoType: "info"
}
```

### 10. Step by Step Section (`stepbystep`)
**Purpose**: Display numbered steps or instructions

**Props**:
- `title` (string, optional) - Section title
- `steps` (array) - Array of step objects

**Example**:
```javascript
{
  type: "stepbystep",
  title: "Przygotowanie ciasta",
  steps: [
    {
      title: "Przygotuj składniki",
      description: "Potrzebujesz: 500g mąki, 7g drożdży..."
    }
  ]
}
```

### 11. Comparison Table Section (`comparison`)
**Purpose**: Display comparison data in table format

**Props**:
- `title` (string, optional) - Section title
- `headers` (array) - Table headers
- `rows` (array) - Table rows

**Example**:
```javascript
{
  type: "comparison",
  title: "Porównanie metod pieczenia",
  headers: ["Metoda", "Czas", "Temperatura", "Wynik"],
  rows: [
    ["Piekarnik", "15-20 min", "250°C", "Dobry"],
    ["Kamień do pizzy", "8-12 min", "300°C", "Doskonały"]
  ]
}
```

### 12. FAQ Section (`faq`)
**Purpose**: Display frequently asked questions

**Props**:
- `title` (string, optional) - Section title
- `questions` (array) - Array of FAQ objects

**Example**:
```javascript
{
  type: "faq",
  title: "Często zadawane pytania",
  questions: [
    {
      question: "Czy mogę użyć mąki pszennej?",
      answer: "Tak, ale najlepsze rezultaty osiągniesz używając mąki typu 00..."
    }
  ]
}
```

### 13. Testimonial Section (`testimonial`)
**Purpose**: Display customer testimonials or reviews

**Props**:
- `title` (string, optional) - Section title
- `testimonials` (array) - Array of testimonial objects
- `titleFont` (string) - Font for title
- `layout` (string) - "grid" or "list"
- `showAvatar` (boolean) - Show/hide avatar
- `showRating` (boolean) - Show/hide rating stars

**Example**:
```javascript
{
  type: "testimonial",
  title: "Opinie naszych czytelników",
  titleFont: "cocosharp-bold",
  layout: "grid",
  showAvatar: true,
  showRating: true,
  testimonials: [
    {
      author: "Anna Kowalska",
      position: "Domowy kucharz",
      quote: "Ten przepis zmienił moje podejście do pizzy!",
      rating: 5
    }
  ]
}
```

### 14. Card Section (`card`)
**Purpose**: Display information cards with icons and links

**Props**:
- `title` (string, optional) - Section title
- `cards` (array) - Array of card objects
- `titleFont` (string) - Font for title
- `layout` (string) - "grid" or "horizontal"
- `cardStyle` (string) - "default", "glass", "gradient", "dark"

**Example**:
```javascript
{
  type: "card",
  title: "Różne style pizzy",
  titleFont: "cocosharp-bold",
  layout: "horizontal",
  cardStyle: "gradient",
  cards: [
    {
      title: "Pizza Neapolitańska",
      content: "Tradycyjna włoska pizza z cienkim ciastem",
      icon: "🍕",
      link: "/pizza/neapolitanska"
    }
  ]
}
```

### 15. Timeline Section (`timeline`)
**Purpose**: Display chronological events or history

**Props**:
- `title` (string, optional) - Section title
- `events` (array) - Array of event objects
- `titleFont` (string) - Font for title

**Example**:
```javascript
{
  type: "timeline",
  title: "Historia pizzy",
  titleFont: "cocosharp-bold",
  events: [
    {
      title: "Początki w Neapolu",
      date: "1889",
      description: "Pierwsza pizza Margherita została stworzona"
    }
  ]
}
```

### 16. Stats Section (`stats`)
**Purpose**: Display statistics or metrics

**Props**:
- `title` (string, optional) - Section title
- `stats` (array) - Array of stat objects
- `titleFont` (string) - Font for title
- `layout` (string) - "grid" or "horizontal"

**Example**:
```javascript
{
  type: "stats",
  title: "Kluczowe statystyki",
  titleFont: "cocosharp-bold",
  layout: "horizontal",
  stats: [
    {
      value: "2-3h",
      label: "Czas przygotowania",
      description: "Od startu do gotowego dania"
    }
  ]
}
```

## Creating a Blog Post

### 1. Add Blog Post Data
Add your blog post to the `blogPosts` object in `src/app/blog/[slug]/page.js`:

```javascript
const blogPosts = {
  "your-slug": {
    title: "Your Blog Post Title",
    excerpt: "Short description of the blog post",
    content: [
      // Array of section objects
    ],
    author: "Author Name",
    publishedAt: "2024-01-15",
    readTime: "5 min",
    category: "Category",
    tags: ["tag1", "tag2", "tag3"]
  }
};
```

### 2. Structure the Content
Create an array of section objects to define your blog post structure:

```javascript
content: [
  {
    type: "hero",
    title: "Main Title",
    subtitle: "Subtitle",
    image: "/path/to/image.png"
  },
  {
    type: "text",
    content: "Your text content here..."
  },
  {
    type: "image",
    src: "/path/to/image.png",
    alt: "Image description",
    caption: "Optional caption"
  }
  // Add more sections as needed
]
```

### 3. Blog Post Metadata
Each blog post should include:

- `title` - Main title
- `excerpt` - Short description
- `author` - Author name
- `publishedAt` - Publication date (YYYY-MM-DD)
- `readTime` - Estimated reading time
- `category` - Post category
- `tags` - Array of tags

## Image Placeholders

All image components currently use placeholders with commented Image components. To add real images:

1. Place images in the `public/assets/` directory
2. Uncomment the Image components in the section files
3. Update the image paths in your blog post data

Example:
```javascript
// In BlogSections/index.js
{/* <Image src={image} alt={imageAlt || title} width={800} height={400} className="rounded-lg" /> */}
```

## Best Practices

### 1. Content Organization
- Start with a hero section for introduction
- Use text sections for main content
- Break up long content with images, quotes, or info boxes
- End with a call-to-action when appropriate

### 2. Section Variety
- Mix different section types to keep content engaging
- Use appropriate sections for the content type (e.g., ranking for lists, FAQ for questions)
- Don't overuse any single section type

### 3. SEO Considerations
- Use descriptive alt text for images
- Include relevant keywords in titles and content
- Structure content with proper headings
- Add meta descriptions and tags

### 4. Mobile Responsiveness
All section components are designed to be mobile-responsive. Test your blog posts on different screen sizes.

## Future Enhancements

### Planned Features
- Rich text editor for easier content creation
- Image upload and management system
- SEO optimization tools
- Social media sharing integration
- Comment system
- Related posts algorithm
- Search functionality
- Category and tag filtering

### Admin Interface
The blog system is designed to support a future admin interface where content creators can:
- Drag and drop sections to reorder content
- Edit section content inline
- Preview posts before publishing
- Manage images and media
- Schedule posts for publication

## Technical Notes

### File Structure
```
src/
├── app/
│   └── blog/
│       ├── page.js (blog listing)
│       └── [slug]/
│           └── page.js (individual posts)
└── components/
    └── BlogSections/
        └── index.js (section components)
```

### Dependencies
- Next.js Image component for optimized images
- Tailwind CSS for styling
- React for component structure

### Performance
- Images are optimized using Next.js Image component
- Static generation for blog posts
- Lazy loading for images
- Minimal JavaScript bundle size

## Font System

The blog system supports custom fonts for enhanced typography:

### Available Fonts

- **Cocosharp Font Family**:
  - `cocosharp-bold` - Bold weight
  - `cocosharp-light` - Light weight  
  - `cocosharp-normal` - Normal weight

- **PT Sans Font Family**:
  - `ptSans-normal` - Normal weight
  - `ptSans-bold` - Bold weight

### Usage

Fonts can be specified in most section components using the `fontType` prop:

```javascript
{
  type: "text",
  content: "Example text",
  fontType: "cocosharp-bold"
}
```

### Font Hierarchy

- **Titles**: Use `cocosharp-bold` for main headings
- **Subtitles**: Use `ptSans-normal` for secondary text
- **Body Text**: Use `ptSans-normal` for readability
- **Quotes**: Use `cocosharp-normal` for emphasis
- **Captions**: Use `ptSans-normal` for small text

## Flexible Layout Options

### Layout Types

- **Grid Layout**: Default responsive grid
- **Horizontal Layout**: Side-by-side arrangement
- **List Layout**: Vertical stacking
- **Timeline Layout**: Chronological display

### Card Styles

- **Default**: Clean white background
- **Glass**: Translucent with backdrop blur
- **Gradient**: Colorful gradient background
- **Dark**: Dark theme with white text

### Customization Options

Most sections support:
- Custom fonts for titles and content
- Flexible layouts (grid, horizontal, list)
- Custom colors and backgrounds
- Optional elements (avatars, ratings, icons)
- Responsive design adjustments

## Support

For questions about the blog system or to request new section types, please refer to the development team or create an issue in the project repository. 