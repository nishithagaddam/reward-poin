<img width="1600" height="967" alt="image" src="https://github.com/user-attachments/assets/5ac72840-4cb5-4df5-aa36-c69d42f078ee" />

# Rewards Program React Demo

A simple React JS demo app that calculates customer reward points from purchase transactions.

## Features

- Simulated asynchronous API call to fetch transaction data
- Rewards calculation:
  - 2 points for every dollar spent over $100
  - 1 point for every dollar spent between $50 and $100
- Monthly and total customer points breakdown
- Responsive table and summary cards

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

- `index.html` - main HTML page
- `src/main.jsx` - React entrypoint
- `src/App.jsx` - main app component with reward calculation logic
- `src/index.css` - styles

## Notes

This project uses React and Vite, with no Redux or TypeScript.
