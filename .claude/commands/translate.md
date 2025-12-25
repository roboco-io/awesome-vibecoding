# Translate README

README.md 파일을 한국어(README.ko.md)와 일본어(README.ja.md)로 번역합니다.

## 번역 지침

1. **README.md 파일을 읽습니다**

2. **한국어 번역 (README.ko.md)**:
   - 기술 용어, 제품명, 코드는 영문 유지
   - 마크다운 형식, 링크, 코드 블록 그대로 유지
   - 첫 줄은 `# Awesome Vibe Coding (한국어)`로 시작
   - 언어 선택 링크 유지: `*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*`
   - **굵은 글씨** 뒤에 한글이 올 경우 공백 추가 (예: `**텍스트** 다음`)

3. **일본어 번역 (README.ja.md)**:
   - 기술 용어, 제품명, 코드는 영문 유지
   - 마크다운 형식, 링크, 코드 블록 그대로 유지
   - 첫 줄은 `# Awesome Vibe Coding (日本語)`로 시작
   - 언어 선택 링크 유지

4. **두 번역을 병렬로 실행**하여 효율성을 높입니다.

## 실행

Task 도구를 사용하여 두 개의 번역 에이전트를 병렬로 실행하세요:

- 에이전트 1: README.md → README.ko.md (한국어)
- 에이전트 2: README.md → README.ja.md (일본어)

각 에이전트는:
1. README.md 파일을 읽고
2. 해당 언어로 번역하고
3. 번역된 파일을 저장합니다

번역 완료 후 결과를 사용자에게 보고합니다.
