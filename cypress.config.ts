import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3010',
    video: false,
    supportFile: false,
    specPattern: 'cypress/integration/**/*.e2e.{js,jsx,ts,tsx}',
  },
});
