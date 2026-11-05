#!/usr/bin/env bash
# Check Vercel's *remote* deployment state. A successful prebuilt upload is not
# sufficient: Vercel may subsequently BLOCK the deployment for authorization.
set -euo pipefail

deployment_url="${1:?Usage: verify-vercel-deployment.sh DEPLOYMENT_URL}"
: "${VERCEL_TOKEN:?VERCEL_TOKEN must be supplied in the environment}"

scope="${VERCEL_SCOPE:-leo0331s-projects}"
max_attempts="${VERCEL_VERIFY_ATTEMPTS:-20}"
interval_seconds="${VERCEL_VERIFY_INTERVAL_SECONDS:-15}"

for ((attempt = 1; attempt <= max_attempts; attempt++)); do
  if ! details="$(timeout 60s npx vercel@latest inspect "$deployment_url" --no-color --scope="$scope" --token="$VERCEL_TOKEN" 2>&1)"; then
    printf '%s\n' "$details"
    echo "::error::Unable to inspect the submitted Vercel deployment: $deployment_url"
    exit 1
  fi

  # 'status    ● Blocked' and 'status    ● Ready' are Vercel CLI formats.
  state="$(printf '%s\n' "$details" | awk '$1 == "status" { print toupper($NF); exit }')"
  echo "Vercel deployment check $attempt/$max_attempts: ${state:-UNKNOWN}"

  case "$state" in
    READY)
      echo "Vercel production deployment is READY: $deployment_url"
      exit 0
      ;;
    BLOCKED)
      printf '%s\n' "$details"
      echo "::error::Vercel BLOCKED this deployment. The commit author may lack permission for the project. Check the Vercel team's GitHub connection and commit-author membership, then redeploy."
      exit 1
      ;;
    ERROR|CANCELED|CANCELLED)
      printf '%s\n' "$details"
      echo "::error::Vercel deployment finished with status $state: $deployment_url"
      npx vercel@latest inspect "$deployment_url" --logs --scope="$scope" --token="$VERCEL_TOKEN" || true
      exit 1
      ;;
    BUILDING|QUEUED|INITIALIZING|PENDING|DEPLOYING)
      ;;
    *)
      printf '%s\n' "$details"
      echo "::error::Unexpected or missing Vercel deployment state for $deployment_url"
      exit 1
      ;;
  esac

  if ((attempt < max_attempts)); then
    sleep "$interval_seconds"
  fi
done

echo "::error::Vercel did not reach READY within the verification window: $deployment_url"
exit 1
