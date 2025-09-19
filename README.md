# Playwright Testing Project

This project is set up for end-to-end testing using Playwright.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

- Run all tests:
```bash
npm test
```

- Run tests with browser visible:
```bash
npm run test:headed
```

- Run tests in UI mode:
```bash
npm run test:ui
```

- View test report:
```bash
npm run report
```

## Project Structure

- `/tests` - Test files
- `/playwright.config.ts` - Playwright configuration
- `/.vscode` - VS Code specific settings

## Writing Tests

Tests are written in TypeScript and located in the `/tests` directory. See `example.spec.ts` for a basic test example.