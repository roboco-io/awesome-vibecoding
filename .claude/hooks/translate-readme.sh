#!/bin/bash

# Claude Code Hook: Auto-trigger translation when README.md is modified
# Uses stopBehavior to instruct Claude to run /translate automatically

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

# Output instruction for Claude to auto-execute translation
cat << 'EOF'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 README.md가 수정되었습니다.
🔄 자동으로 번역을 실행합니다.

[AUTO-TRANSLATE] README.md 변경사항을 감지했습니다.
README.ko.md와 README.ja.md에 변경사항을 동기화하세요.
/translate 명령의 "부분 동기화" 프로세스를 따르세요.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EOF

exit 0
