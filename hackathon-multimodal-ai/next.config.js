/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // https://oaidalleapiprodscus.blob.core.windows.net/private/org-rT3nzH1locg9KICHE1ddIkJ3/user-zAZQ74r07VDfWalPKTFuH1hI/img-OaWCCN6VUKYqwyRNjc8f7ZX7.png?st=2024-01-13T12%3A06%3A22Z&se=2024-01-13T14%3A06%3A22Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-12T19%3A53%3A57Z&ske=2024-01-13T19%3A53%3A57Z&sks=b&skv=2021-08-06&sig=eaxtH0QADNm/hUDOxWCDiosJX29lTycrQuRABRhis94%3D
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },
};

module.exports = nextConfig;
