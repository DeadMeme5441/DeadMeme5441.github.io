#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")"/.. && pwd)"
CFG_FILE="${ROOT_DIR}/config/docs-sources.txt"
SRC_DIR="${ROOT_DIR}/_sources"
OUT_DIR="${ROOT_DIR}/public/docs"

echo "[docs] reading repos from ${CFG_FILE}"
mkdir -p "${SRC_DIR}" "${OUT_DIR}"

# Create an isolated virtualenv for mkdocs to avoid polluting global Python
VENV_DIR="${ROOT_DIR}/.venv-docs"
if [[ ! -d "${VENV_DIR}" ]]; then
  python3 -m venv "${VENV_DIR}"
fi
source "${VENV_DIR}/bin/activate"
python -m pip install -U pip >/dev/null

while IFS= read -r repo || [[ -n "$repo" ]]; do
  [[ -z "$repo" || "$repo" =~ ^# ]] && continue || true
  echo "[docs] building $repo"
  if [[ ! -d "${SRC_DIR}/${repo}" ]]; then
    git clone --depth 1 "https://github.com/DeadMeme5441/${repo}.git" "${SRC_DIR}/${repo}" >/dev/null
  fi
  pushd "${SRC_DIR}/${repo}" >/dev/null
  if [[ -f mkdocs.yml ]]; then
    # Try project-provided docs extras if available; fallback to mkdocs + material
    if grep -q "\[project.optional-dependencies\]" pyproject.toml 2>/dev/null && grep -qi "^docs\s*=" pyproject.toml 2>/dev/null; then
      python -m pip install -e .[docs] || true
    fi
    python -m pip install -q mkdocs mkdocs-material
    SITE_URL="https://deadmeme.dev/docs/${repo}/"
    if grep -q "^site_url:" mkdocs.yml; then
      sed -i.bak -E "s|^site_url:.*$|site_url: ${SITE_URL}|g" mkdocs.yml
    else
      printf "\nsite_url: %s\n" "${SITE_URL}" >> mkdocs.yml
    fi
    mkdocs build --strict --site-dir "${OUT_DIR}/${repo}"
  else
    echo "[docs] mkdocs.yml not found for ${repo}, skipping"
  fi
  popd >/dev/null
done <"${CFG_FILE}"

echo "[docs] complete → ${OUT_DIR}"
