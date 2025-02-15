# News Search Application

This application allows users to search for news articles.  It consists of a frontend built with React and a backend built with Go.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (or yarn)
- Go

### Installation

1. Clone the repository:
   ```bash
   git clone [repository_url]
   ```
2. Navigate to the `articleUi` directory:
   ```bash
   cd articleUi
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Navigate to the `server` directory:
   ```bash
   cd ../server
   ```
5. Build the backend:
   ```bash
   go build
   ```
6. Run the backend:
   ```bash
   ./article-server.exe
   ```
7. Run the frontend:
   ```bash
   cd ../articleUi
   npm run dev
   ```

### Usage

Open your web browser and navigate to `http://localhost:5173`.

## Deployment

To deploy this project run:

```bash
npm run build
```

This will create a production build in the `dist` folder.
