# Translate README

README.md 파일의 변경사항을 한국어(README.ko.md)와 일본어(README.ja.md)에 반영합니다.

## 모드

### 1. 전체 번역 (Full Translation)
README.md 전체를 새로 번역합니다. 구조가 크게 변경되었을 때 사용합니다.

### 2. 부분 동기화 (Incremental Sync) - 기본값
README.md에 추가/수정/삭제된 항목만 찾아서 한국어/일본어 파일의 동일한 위치에 반영합니다.

## 번역 지침

### 공통 규칙
- 기술 용어, 제품명, 코드, URL은 영문 유지
- 마크다운 형식, 링크, 코드 블록 그대로 유지
- 테이블 구조 정확히 유지

### 한국어 (README.ko.md)
- 첫 줄: `# Awesome Vibe Coding (한국어)`
- 언어 선택 링크 유지: `*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*`
- **굵은 글씨** 뒤에 한글이 올 경우 공백 추가 (예: `**텍스트** 다음`)

### 일본어 (README.ja.md)
- 첫 줄: `# Awesome Vibe Coding (日本語)`
- 언어 선택 링크 유지

## 실행

Task 도구를 사용하여 두 개의 번역 에이전트를 병렬로 실행하세요:

- 에이전트 1: README.md → README.ko.md (한국어)
- 에이전트 2: README.md → README.ja.md (일본어)

### 부분 동기화 프로세스 (기본)

각 에이전트는:
1. README.md와 해당 언어 파일(README.ko.md 또는 README.ja.md)을 모두 읽습니다
2. README.md에서 새로 추가되거나 수정된 항목을 식별합니다
3. 해당 언어 파일에서 동일한 섹션/위치를 찾습니다
4. 새 항목을 번역하여 정확히 같은 위치에 삽입합니다
5. 삭제된 항목이 있다면 해당 언어 파일에서도 삭제합니다

### 전체 번역 프로세스

각 에이전트는:
1. README.md 파일을 읽습니다
2. 전체를 해당 언어로 번역합니다
3. 번역된 파일을 저장합니다

## 위치 동기화 예시

README.md에 새 항목 추가 시:
```markdown
### Cloud & Platform Integrations
| **Lovable** | Full-stack app generation with Supabase | [Website](https://lovable.dev/) |
| **NewTool** | New AI tool description | [Website](https://newtool.com/) |  ← 새 항목
| **Duet AI** | Google Workspace AI integration | [Website](https://workspace.google.com/solutions/ai/) |
```

→ README.ko.md와 README.ja.md에서 동일한 위치(Lovable과 Duet AI 사이)에 번역된 항목 삽입

번역 완료 후 결과를 사용자에게 보고합니다.
