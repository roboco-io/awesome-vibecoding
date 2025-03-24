import os
import openai
import re
import sys
import difflib
import tempfile
import json

def get_diff_chunks(source_content, previous_source_content):
    """
    Get chunks of text that have changed between previous and current source content.
    Returns a list of tuples (chunk_text, start_line, end_line) for each changed chunk.
    """
    # Split content into lines
    source_lines = source_content.splitlines()
    previous_lines = previous_source_content.splitlines()
    
    # Get diff
    differ = difflib.Differ()
    diff = list(differ.compare(previous_lines, source_lines))
    
    # Extract changed chunks
    chunks = []
    current_chunk = []
    chunk_start_line = None
    chunk_end_line = None
    
    source_line_index = 0
    
    for line in diff:
        if line.startswith('+ '):  # Added line
            if chunk_start_line is None:
                chunk_start_line = source_line_index
            current_chunk.append(line[2:])
            chunk_end_line = source_line_index
            source_line_index += 1
        elif line.startswith('- '):  # Removed line
            # We don't increment source_line_index for removed lines
            # If we have a current chunk, we should keep it
            if current_chunk:
                chunk_end_line = max(chunk_end_line, source_line_index - 1)
        elif line.startswith('  '):  # Unchanged line
            # If we have a current chunk, add some context lines
            if current_chunk:
                # Add a few context lines after the chunk
                current_chunk.append(line[2:])
                chunk_end_line = source_line_index
                
                # If we've accumulated enough context lines, save the chunk
                if len(current_chunk) >= 3 and line[2:].strip() == "":
                    chunks.append(('\n'.join(current_chunk), chunk_start_line, chunk_end_line))
                    current_chunk = []
                    chunk_start_line = None
                    chunk_end_line = None
            source_line_index += 1
    
    # Add the last chunk if there is one
    if current_chunk:
        chunks.append(('\n'.join(current_chunk), chunk_start_line, chunk_end_line))
    
    # If no chunks were found, the changes might be too small or scattered
    # In this case, return the entire content as one chunk
    if not chunks:
        return [(source_content, 0, len(source_lines) - 1)]
    
    return chunks

def translate_chunk(chunk, target_language, user_request):
    """
    Translate a chunk of text using OpenAI API
    """
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
{chunk}"""
    elif target_language == "Japanese":
        user_message = f"Translate the following README.md content from English to Japanese:\n\n{chunk}"
    else:
        raise ValueError(f"Unsupported target language: {target_language}")
    
    # Call OpenAI API
    response = openai.chat.completions.create(
        model="gpt-4-mini",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        temperature=0.1,
        max_tokens=4000
    )
    
    # Get the translated content
    translated_chunk = response.choices[0].message.content
    return translated_chunk

def save_source_content(source_content, target_language):
    """
    Save the current source content to a temporary file for future diff comparison
    """
    cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".cache")
    os.makedirs(cache_dir, exist_ok=True)
    
    cache_file = os.path.join(cache_dir, f"readme_source_{target_language.lower()}.txt")
    with open(cache_file, 'w', encoding='utf-8') as f:
        f.write(source_content)

def get_previous_source_content(target_language):
    """
    Get the previous source content from the cache file
    """
    cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".cache")
    cache_file = os.path.join(cache_dir, f"readme_source_{target_language.lower()}.txt")
    
    if not os.path.exists(cache_file):
        return None
    
    with open(cache_file, 'r', encoding='utf-8') as f:
        return f.read()

def save_translation_map(translation_map, target_language):
    """
    Save the mapping between source chunks and their translations
    """
    cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".cache")
    os.makedirs(cache_dir, exist_ok=True)
    
    map_file = os.path.join(cache_dir, f"translation_map_{target_language.lower()}.json")
    with open(map_file, 'w', encoding='utf-8') as f:
        json.dump(translation_map, f, ensure_ascii=False, indent=2)

def get_translation_map(target_language):
    """
    Get the previous translation map from the cache file
    """
    cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".cache")
    map_file = os.path.join(cache_dir, f"translation_map_{target_language.lower()}.json")
    
    if not os.path.exists(map_file):
        return {}
    
    with open(map_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def translate_readme(source_file, target_language, target_file, user_request):
    """
    Translate README.md to target language using OpenAI API
    Only translates the parts that have changed since the last translation
    """
    # Read the source README
    with open(source_file, 'r', encoding='utf-8') as f:
        source_content = f.read()
    
    # Check if the target file exists
    target_exists = os.path.exists(target_file)
    
    # Get the previous source content for diff
    previous_source_content = get_previous_source_content(target_language)
    
    # If this is the first translation or no previous source content exists,
    # translate the entire document
    if not target_exists or not previous_source_content:
        print(f"No previous translation found for {target_language}. Translating the entire document.")
        
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
{source_content}"""
        elif target_language == "Japanese":
            user_message = f"Translate the following README.md content from English to Japanese:\n\n{source_content}"
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
        
        # Save the current source content for future diff
        save_source_content(source_content, target_language)
        
        # Create an initial translation map
        translation_map = {}
        save_translation_map(translation_map, target_language)
        
        # Write the translated content to the target file
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(translated_content)
        
        print(f"Successfully translated README to {target_language}")
        return
    
    # Get the diff chunks between the previous and current source content
    diff_chunks = get_diff_chunks(source_content, previous_source_content)
    
    if not diff_chunks:
        print(f"No changes detected for {target_language} translation. Skipping.")
        return
    
    # Read the current translated file
    with open(target_file, 'r', encoding='utf-8') as f:
        translated_content = f.read()
    
    # Get the previous translation map
    translation_map = get_translation_map(target_language)
    
    # Translate each chunk and update the translated content
    for chunk_text, start_line, end_line in diff_chunks:
        print(f"Translating chunk from line {start_line} to {end_line} for {target_language}")
        
        # Translate the chunk
        translated_chunk = translate_chunk(chunk_text, target_language, user_request)
        
        # Create a key for this chunk in the translation map
        chunk_key = f"line_{start_line}_{end_line}"
        translation_map[chunk_key] = {
            "source": chunk_text,
            "translation": translated_chunk
        }
        
        # Now we need to find where to insert this chunk in the translated content
        # This is tricky because we need to map the source line numbers to the translated line numbers
        # For simplicity, we'll use a heuristic approach:
        # 1. Split both source and translated content into lines
        source_lines = source_content.splitlines()
        translated_lines = translated_content.splitlines()
        
        # 2. Find some context before and after the chunk in the source
        context_before = source_lines[max(0, start_line-5):start_line]
        context_after = source_lines[end_line+1:min(len(source_lines), end_line+6)]
        
        # 3. Try to find similar context in the translated content
        # This is a simplified approach and might not work perfectly in all cases
        translated_start_line = None
        translated_end_line = None
        
        # Look for context before
        if context_before:
            for i in range(len(translated_lines) - len(context_before) + 1):
                match = True
                for j, line in enumerate(context_before):
                    # Check if the line content is similar (ignoring language differences)
                    # We'll check for URLs, code blocks, and other non-translatable elements
                    if any(marker in line for marker in ['http', '```', '- [', '## ']):
                        if not any(marker in translated_lines[i+j] for marker in ['http', '```', '- [', '## ']):
                            match = False
                            break
                if match:
                    translated_start_line = i + len(context_before)
                    break
        
        # Look for context after
        if context_after:
            for i in range(len(translated_lines) - len(context_after) + 1):
                match = True
                for j, line in enumerate(context_after):
                    # Check if the line content is similar (ignoring language differences)
                    if any(marker in line for marker in ['http', '```', '- [', '## ']):
                        if not any(marker in translated_lines[i+j] for marker in ['http', '```', '- [', '## ']):
                            match = False
                            break
                if match:
                    translated_end_line = i - 1
                    break
        
        # If we couldn't find the exact location, we'll use a more conservative approach
        # and just replace the entire translated content
        if translated_start_line is None or translated_end_line is None or translated_start_line > translated_end_line:
            print(f"Warning: Could not locate exact position for chunk in {target_language} translation. Using full translation.")
            
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
{source_content}"""
            elif target_language == "Japanese":
                user_message = f"Translate the following README.md content from English to Japanese:\n\n{source_content}"
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
        else:
            # Replace the chunk in the translated content
            translated_lines_before = translated_lines[:translated_start_line]
            translated_lines_after = translated_lines[translated_end_line+1:]
            translated_chunk_lines = translated_chunk.splitlines()
            
            # Combine the lines
            translated_lines = translated_lines_before + translated_chunk_lines + translated_lines_after
            translated_content = '\n'.join(translated_lines)
    
    # Save the updated translation map
    save_translation_map(translation_map, target_language)
    
    # Save the current source content for future diff
    save_source_content(source_content, target_language)
    
    # Write the updated translated content to the target file
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(translated_content)
    
    print(f"Successfully updated {target_language} translation with changes")

if __name__ == "__main__":
    # Translate to Korean
    translate_readme("README.md", "Korean", "README.ko.md", "Please translate the content accurately and maintain the original formatting.")
    
    # Translate to Japanese
    translate_readme("README.md", "Japanese", "README.ja.md", "Please translate the content accurately and maintain the original formatting.")
