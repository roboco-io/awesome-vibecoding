# Scripts Documentation

This directory contains utility scripts used in the awesome-vibecoding project.

## translate_readme.py

A robust script that automatically translates the main README.md file to Korean and Japanese using the OpenAI API.

### Features

- **Incremental Translation**: Only translates parts of the document that have changed since the last translation, significantly reducing API token usage
- **Model Fallback**: Tries multiple OpenAI models in order of preference (gpt-4o, gpt-4o-mini, gpt-3.5-turbo) to handle API quota limits
- **Error Handling**: Implements retry logic with exponential backoff for rate limit errors
- **Translation Caching**: Maintains a cache of previous translations to avoid re-translating unchanged content
- **Language Selection Links**: Automatically adds language selection links at the top of translated documents

### Usage

```bash
# Set your OpenAI API key
export OPENAI_KEY=your_api_key_here

# Run the translation script
python scripts/translate_readme.py
```

### How It Works

1. **Diff Detection**: The script compares the current README.md with the previously cached version to identify changes
2. **Chunk Translation**: Only changed chunks are sent to the OpenAI API for translation
3. **Content Integration**: Translated chunks are integrated back into the existing translated document
4. **Fallback Mechanism**: If a model encounters rate limits or other errors, the script automatically tries alternative models
5. **Cache Management**: The script maintains cache files in the `.cache` directory for future incremental translations

### Cache Files

The script creates and maintains the following cache files in the `.cache` directory:

- `readme_source_korean.txt`: Cached version of the source README for Korean translation
- `readme_source_japanese.txt`: Cached version of the source README for Japanese translation
- `translation_map_korean.json`: Mapping between source chunks and their Korean translations
- `translation_map_japanese.json`: Mapping between source chunks and their Japanese translations

### GitHub Actions Integration

This script is integrated with GitHub Actions to automatically translate the README.md file when changes are pushed to the repository. See the workflow configuration in `.github/workflows/translate-readme.yml`.

### Requirements

The script requires the following Python packages:
- openai
- requests
- difflib
- json
- re

These dependencies are listed in the project's `requirements.txt` file.
