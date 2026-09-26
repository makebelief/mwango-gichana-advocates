#!/usr/bin/env bash
set -euo pipefail
npm run check
vercel --prod --yes
