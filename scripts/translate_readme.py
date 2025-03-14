import os
import openai
import re
import sys

def translate_readme(source_file, target_language, target_file, user_request):
    """
    Translate README.md to target language using OpenAI API
    """
    # Read the source README
    with open(source_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Set OpenAI API key
    openai.api_key = os.environ.get("OPENAI_KEY")
    
    # Prepare system and user messages
    system_message = """You are a professional technical translator who specializes in translating technical documentation and README files for programming projects.

Follow these translation guidelines:
- The target audience is tech professionals.
- Since this is a translated document, you should avoid excessive translation that deviates from the original.
- For quotes, use the English expression, but add the translation next to it.
- If a language translation is not standardized, use the English equivalent.
- Maintain all markdown formatting, links, and code blocks exactly as they appear in the original.
- Keep technical terms, product names, and code snippets in English.
- Please consider the user's request: """ + user_request
    
    if target_language == "Korean":
        user_message = f"""Translate the following README.md content from English to Korean:

Important formatting note: When using bold markdown formatting (**) in Korean text, please add a space after the closing ** and before the next Korean character. For example, use '**볼드 텍스트** 다음 텍스트' instead of '**볼드 텍스트**다음 텍스트'. This ensures proper rendering in markdown.

Content to translate:
{content}"""
    elif target_language == "Japanese":
        user_message = f"Translate the following README.md content from English to Japanese:\n\n{content}"
    else:
        raise ValueError(f"Unsupported target language: {target_language}")
    
    # Call OpenAI API
    response = openai.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        temperature=0.1,
        max_tokens=4000
    )
    
    # Get the translated content
    translated_content = response.choices[0].message.content
    
    # Add language notice at the top
    if target_language == "Korean":
        notice = "# Awesome Vibe Coding (한국어)\n\n"
    elif target_language == "Japanese":
        notice = "# Awesome Vibe Coding (日本語)\n\n"
    
    # Replace the first heading and any existing language selection links
    pattern = r'^# .*?$\n\n\*Language:.*?\*\n\n'
    if re.search(pattern, translated_content, re.MULTILINE | re.DOTALL):
        # If language selection links already exist, just replace the heading
        translated_content = re.sub(pattern, notice + "*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*\n\n", translated_content, count=1, flags=re.MULTILINE | re.DOTALL)
    else:
        # If no language selection links exist, add them
        pattern = r'^# .*?$'
        translated_content = re.sub(pattern, notice + "*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*\n\n", translated_content, count=1, flags=re.MULTILINE)
    
    # Write the translated content to the target file
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(translated_content)
    
    print(f"Successfully translated README to {target_language}")

if __name__ == "__main__":
    # Translate to Korean
    translate_readme("README.md", "Korean", "README.ko.md", "Please translate the content accurately and maintain the original formatting.")
    
    # Translate to Japanese
    translate_readme("README.md", "Japanese", "README.ja.md", "Please translate the content accurately and maintain the original formatting.")
