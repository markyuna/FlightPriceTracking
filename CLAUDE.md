# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

FlightPriceTracking is a two-part app: an Expo/React Native frontend (repo root) and a Node/Express scraping backend (`FlightPricesBackend/`). The frontend lets a user enter a route and dates, and displays flight price options scraped live from Skyscanner via the backend.

## Commands

### Frontend (repo root)
```
npm start          # expo start — launches Metro bundler, choose platform from the CLI menu
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run web        # expo start --web
```
No test or lint scripts are configured.

### Backend (`FlightPricesBackend/`)
```
npm run dev        # node --watch index.js — runs the Express server on port 3000, restarts on change
```
No test script is configured (`npm test` is a placeholder that exits with an error). No lint script.

Both `npm install` steps are independent — root and `FlightPricesBackend/` each have their own `package.json`/`node_modules`.

## Architecture

**Frontend → backend → Skyscanner, via a residential proxy browser.**

1. `App.js` holds the top-level search state (`items`, `loading`) and renders `SearchForm` and a `FlatList` of `FlightOptionItem`.
2. `src/components/SearchForm.js` collects `from`, `to`, `departDate`, `returnDate` and calls the `onSearch` callback passed from `App.js`.
3. `src/services/api.js` (`searchFlights`) formats dates with `dayjs` (`YYMMDD`) and calls `GET http://localhost:3000/search` on the backend. The backend URL is hardcoded — there's no env-based config, so the backend must be running locally on port 3000 for the frontend to get real data.
4. `FlightPricesBackend/index.js` is the Express entrypoint. `GET /search` validates `from`/`to`/`departDate`/`returnDate` query params and delegates to `scrapeFlights`.
5. `FlightPricesBackend/scraper.js` connects to a remote **Bright Data Scraping Browser** over the `puppeteer-core` WebSocket endpoint (not a local Chromium), navigates to the Skyscanner search URL for the given route/dates, dismisses the cookie banner, and scrapes flight ticket cards via CSS selectors scoped to Skyscanner's generated class names (`FlightsTicket_link`, `LegInfo_*`, `Price_mainPriceContainer`, etc.). Each ticket is parsed into `{ price, to: {...}, from: {...} }` where `to`/`from` each hold `{ airline, departAt, arriveAt, duration }`.
6. `FlightPricesBackend/util.js` has an `openDevtools` helper (currently unused/commented out in `scraper.js`) for opening a local Chrome DevTools window against the remote scraping session — useful when debugging selector breakage.

**Fragility note:** the scraper depends entirely on Skyscanner's current DOM structure and CSS class prefixes. If scraping starts failing or returning empty results, the first thing to check is whether Skyscanner's markup/class names (in `parseRoute`/`parseFlight` in `scraper.js`) have changed, not the app logic.

`data.json` at the repo root is sample/dummy flight data (imported in `App.js` as `dummyData` but not currently wired into the render path — the live path always calls the backend).

There is no environment-based configuration (no `.env` usage) — the Bright Data WebSocket endpoint in `scraper.js` and the backend URL in `api.js` are both hardcoded.
