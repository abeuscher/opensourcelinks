# Social Media Migration Assistant

A privacy-focused tool to help users transition between social media platforms. Create shareable links to your alternative social media profiles without storing any personal data.

## Features

- Create shareable links containing your alternative social media profiles
- No data storage - all information is encoded in the URL
- No cookies or tracking
- Privacy-first approach
- Static site deployment
- Open source

## Tech Stack

- Next.js (Static Site Generation)
- TypeScript
- Material UI
- Jest for testing
- Markdown for content management

## Development

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Getting Started

1. Clone the repository:

```bash
git clone [your-repo-url]
cd social-media-transition
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
social-media-transition/
├── public/
├── src/
│   ├── components/
│   │   └── LinkGenerator/
│   ├── data/         # Markdown content
│   ├── pages/        # Next.js pages
│   ├── styles/       # Theme configuration
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── jest.config.ts
├── jest.setup.ts
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your chosen license]

## Privacy

This application is designed with privacy in mind:

- No data storage
- No cookies
- No analytics or tracking
- All data is stored in URL parameters only
