const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:15550';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Budget/AddBudget",
      "/api/Budget/GetBudget",
      "/api/Budget/GetBudgetByCQ"
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
