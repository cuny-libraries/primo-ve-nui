#!/bin/sh
# Usage: ./run.sh <campus>
# Example: ./run.sh bx
#          ./run.sh network

if [ -z "$1" ]; then
  echo "Usage: ./run.sh <campus>"
  echo ""
  echo "Examples:"
  echo "  ./run.sh bx"
  echo "  ./run.sh network"
  echo ""
  echo "Available views:"
  ls primo-explore/custom/
  exit 1
fi

if [ "$1" = "central" ]; then
  CAMPUS="network"
  VIEW_CODE="CENTRAL_PACKAGE"
else
  CAMPUS="$1"
  VIEW_CODE="CUNY_$(echo "$1" | tr '[:lower:]' '[:upper:]')"
fi

CAMPUS="$CAMPUS" VIEW_CODE="$VIEW_CODE" docker compose up
