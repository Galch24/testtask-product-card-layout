#!/usr/bin/env bash

#!/usr/bin/env bash
# set -e

echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps --frozen-lockfile

echo "Building project..."
npm run build

echo "Starting application on port 3016..."
npm run preview
