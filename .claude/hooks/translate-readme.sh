#!/bin/bash

# Claude Code Hook: Notify when README.md is modified
# Triggers reminder to run /translate command

# Read hook input from stdin
INPUT=$(cat)

# Extract the file path from the hook input
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# Only proceed if README.md was modified (not README.ko.md or README.ja.md)
if [[ "$FILE_PATH" != *"/README.md" ]] && [[ "$FILE_PATH" != "README.md" ]]; then
  exit 0
fi

# Avoid triggering on translated files
if [[ "$FILE_PATH" == *".ko.md" ]] || [[ "$FILE_PATH" == *".ja.md" ]]; then
  exit 0
fi

# Output reminder message
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 README.md가 수정되었습니다."
echo "   번역을 업데이트하려면 /translate 명령을 실행하세요."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exit 0
