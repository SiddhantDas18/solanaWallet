#  Gullak Wallet

A minimal and secure Solana wallet manager built with Next.js and TypeScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Solana](https://img.shields.io/badge/Solana-000000?style=flat&logo=solana&logoColor=white)

##  Features

-  Secure mnemonic phrase management
-  Multiple wallet support
-  Responsive design for all devices
-  Real-time balance updates
-  Private key protection
-  Fast and efficient


### Prerequisites

- [Node.js](https://nodejs.org/en/download) (v18 or higher)
- [TypeScript](https://www.typescriptlang.org/download) (if not installed globally)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddhantdas18/gullakwallet.git
   cd gullakwallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:3000`

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t gullak_wallet .
   ```

2. **Run the container**
   ```bash
   # Using default port (3000)
   docker run -p 3000:3000 gullak_wallet

   # Or using a custom port
   docker run -p [your_port]:3000 gullak_wallet
   ```

##  Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Styling**: Tailwind CSS
- **Deployment**: Docker

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Author

- **Siddhant Das**
  - GitHub: [siddhantdas18](https://github.com/siddhantdas18)
  - Portfolio: [siddhant.space](https://siddhant.space)

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  Security

Please report any security issues to the repository maintainers.

---

Made with ❤️ by [Siddhant Das](https://github.com/siddhantdas18)


