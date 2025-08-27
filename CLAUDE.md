# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Russian web development course landing page ("Профессиональная Web-разработка") built with vanilla HTML, CSS, and JavaScript. The project uses a modular approach with organized file structure and follows modern web development practices.

## Project Requirements

1. **Adaptive Design**: Must be responsive down to 320px width
2. **HTML5 Validity**: All markup must be valid HTML5
3. **Interactive Elements**: Buttons and links must have hover effects
4. **File Organization**:
   - Images: `images/proweb/` (main) or `images/freeproweb/` (subscription version)
   - Styles: `styles/proweb/` (main) or `styles/freeproweb/` (subscription version)
   - JavaScript: `js/proweb.min.js` (main) or `js/freeproweb.min.js` (subscription)
   - Fonts: `styles/proweb/fonts/` or `styles/freeproweb/fonts/`
5. **Sticky Navigation**: Top navigation must always stay at the top of the screen
6. **Accordion Functionality**: "^" symbols in FAQ and program sections toggle content visibility (closed by default)
7. **Dual Block System**: Form and order button blocks are mutually exclusive - easy to hide/show either
8. **Variant System**: Two versions (proweb/freeproweb) with separate asset paths

## Architecture

### File Structure
```
project/
├── index.html                     # Main HTML file
├── styles/
│   ├── proweb/
│   │   ├── main.css              # Main styles with CSS imports
│   │   ├── media-queries.css     # Responsive breakpoints
│   │   ├── fonts/                # Font files
│   │   └── components/           # Component-specific styles
│   │       ├── accordion.css
│   │       ├── buttons.css
│   │       └── card.css
│   └── freeproweb/               # Alternative version styles
├── js/
│   ├── proweb.min.js            # Main JavaScript (ES6 modules)
│   ├── freeproweb.min.js        # Alternative version JS
│   ├── components/              # JavaScript components
│   └── utils/                   # Utility functions
├── images/
│   ├── proweb/                  # Main version images
│   ├── freeproweb/             # Subscription version images
│   ├── covers/                 # Course covers
│   ├── hero/                   # Hero section images
│   └── icons/                  # Icon assets
└── fonts/                      # Legacy font directory
```

### CSS Architecture
- **Design System**: Uses CSS custom properties (CSS variables) for consistent theming
- **Import Structure**: Main CSS file imports component stylesheets
- **Methodology**: Component-based organization with BEM-like naming
- **Color Scheme**: Indigo/violet primary colors (#4f46e5, #7c3aed)
- **Typography**: Inter font family with clamp() for responsive sizing
- **Responsive**: Mobile-first approach with breakpoints at 768px and 1024px

### JavaScript Architecture
- **ES6 Modules**: Modern module system
- **Component Structure**: Modular JavaScript components
- **Key Features**:
  - Countdown timer functionality
  - Accordion component for FAQ/program sections
  - Mobile menu toggle
  - Sticky navigation and action bars
  - Form handling

### Key Components

1. **Sticky Header** (`site-header`)
   - Fixed navigation with blur backdrop
   - Mobile hamburger menu
   - Responsive CTA button

2. **Hero Section** (`hero-section`)
   - Two-column layout (content + video/form)
   - Countdown timer
   - Statistics display
   - Dual block system (order vs subscribe)

3. **Accordion** (`accordion`)
   - Collapsible content sections
   - Used in program and FAQ sections
   - JavaScript-powered expand/collapse

4. **Action Bars** (`action-bar`)
   - Desktop: Vertical floating buttons
   - Mobile: Bottom sticky bar
   - Appears on scroll

### Data Attributes
- `data-variant="order"` or `data-variant="subscribe"` on body controls which blocks are visible
- `data-accordion` on accordion containers
- `data-open="false"` on accordion items (default closed)
- `data-target` on countdown timer

## Development Commands

Since this is a vanilla HTML/CSS/JavaScript project, no build commands are necessary. Simply:

1. **Development**: Open `project/index.html` in a browser or use a local server
2. **Testing**: Test responsiveness using browser dev tools
3. **Validation**: Use W3C HTML validator to ensure HTML5 compliance

## Styling Guidelines

- Follow the existing CSS custom property system in `:root`
- Use the established color palette (indigo/violet theme)
- Maintain responsive design with `clamp()` for typography
- Add hover effects to all interactive elements
- Follow the component-based CSS organization

## Content Management

The landing page has extensive Russian text content for a web development course. When editing content:
- Maintain the professional, educational tone
- Keep technical terms consistent
- Preserve the course structure and module organization
- Maintain proper Russian typography (em dashes, proper spacing)

## Browser Support

Target modern browsers with support for:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6 Modules
- Backdrop-filter (for header blur effect)