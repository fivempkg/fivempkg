# FiveMPkg

The official website and web interface for FiveMPkg - a powerful CLI and package manager for FiveM development.

FiveMPkg simplifies resource management, dependency handling, and deployment for FiveM servers and developers.

## Features

- 🚀 Browse and discover FiveM resources
- ⚡️ Manage your FiveM server dependencies
- 📦 Simplified package installation and updates
- 🔄 Version control for your resources
- 🔒 TypeScript-powered web interface
- 🎉 Modern UI with TailwindCSS
- 📖 Comprehensive documentation

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker-compose up -d
```

The containerized application can be deployed to any platform that supports Docker.

### Manual Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm run build`

## Related Projects

- [FiveMPkg CLI](https://github.com/fivempkg/cli) - Command-line interface for FiveMPkg
- [FiveMPkg Registry](https://github.com/fivempkg/registry) - Package registry for FiveM resources

---

Built with ❤️ for the FiveM community.
