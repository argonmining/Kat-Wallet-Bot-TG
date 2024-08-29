module.exports = {
  apps: [{
    name: "kat-wallet-bot-tg",
    script: "dist/index.js",
    watch: false,
    env: {
      NODE_ENV: "production",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
