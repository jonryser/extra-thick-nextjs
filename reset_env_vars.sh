#!/bin/bash

# Defined some useful colors for echo outputs.
# Use BLUE for informational.
BLUE="\033[1;34m"
# Use Green for a successful action.
GREEN="\033[0;32m"
# No Color (used to stop or reset a color).
NC='\033[0m'

# By default, set this variable to false.
clean=false

# Checks if a specific param has been passed to the script.
has_param() {
    local term="$1"
    shift
    for arg; do
        if [[ $arg == "$term" ]]; then
            return 0
        fi
    done
    return 1
}

# If the `-c or --clean` flag is passed, set clean to true.
if has_param '-c' "$@" || has_param '--clean' "$@"
then
    >&2 echo -e "${BLUE}Clean requested${NC}"
    clean=true
fi

# The project directory.
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Unset any previously set environment variables.
unset API_ROOT
unset DOT_ENV_FILE
unset SERVER_DOMAIN
unset SERVER_PORT
unset SERVER_PROTOCAL

>&2 echo -e "${GREEN}* Environment variables unset.${NC}"

# Only execute if clean flags were NOT passed.
if [ "${clean}" = false ]
then
    # Set the environment variables.
    source ${PROJECT_DIR}/set_env_vars.sh
fi