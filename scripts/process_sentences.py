import argparse
import json
import re
import sys

def get_pypinyin_tones(sentence):
    try:
        import pypinyin
    except ImportError:
        print("Error: pypinyin not installed. Run 'pdm add python-pinyin'")
        sys.exit(1)
        
    # TONE3 gives pinyin with tone numbers at the end (e.g., 'wo3')
    # neutral_tone_with_five=True ensures neutral tones have '5'
    pinyin_list = pypinyin.pinyin(sentence, style=pypinyin.Style.TONE3, neutral_tone_with_five=True)
    
    tones = []
    for char, p in zip(sentence, pinyin_list):
        p_str = p[0]
        # Check if the character is a Chinese character
        if '\u4e00' <= char <= '\u9fff':
            # Extract the tone number from the pinyin string
            match = re.search(r'([1-5])$', p_str)
            if match:
                tone = match.group(1)
                # Convention in this app: neutral tone is '0'
                if tone == '5':
                    tones.append('0')
                else:
                    tones.append(tone)
            else:
                # Fallback for Chinese characters without tone info
                tones.append('0')
        else:
            # For punctuation and other characters, use a space
            tones.append(' ')
            
    return "".join(tones)

def process_sentences(input_file, output_file):
    """Processes sentences from an input file, adds tone annotations, and saves to an output file."""
    with open(input_file, 'r', encoding='utf-8') as f:
        sentences = [line.strip() for line in f if line.strip()]

    processed_data = []
    for sentence in sentences:
        tones = get_pypinyin_tones(sentence)
            
        # Match the output format: [["sentence", "tones"], ...]
        processed_data.append([sentence, tones])

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Annotate Chinese sentences with tone numbers.")
    parser.add_argument("input_file", help="Path to the input text file with sentences.")
    parser.add_argument("output_file", help="Path to the output JSON file.")
    args = parser.parse_args()

    process_sentences(args.input_file, args.output_file)
    print(f"Successfully processed {args.input_file} and saved to {args.output_file}")
