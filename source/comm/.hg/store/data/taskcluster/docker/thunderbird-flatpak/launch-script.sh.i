         i   h      �����������蝑��SE�����^            u#!/bin/bash
export TMPDIR="$XDG_RUNTIME_DIR/app/$FLATPAK_ID"
exec /app/lib/thunderbird/thunderbird "$@"
