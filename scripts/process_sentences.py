import json

def process_sentences(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    processed_data = []
    for item in data:
        processed_item = {
            "sentence": item["sentence"],
            "tones": item["tones"]
        }
        processed_data.append(processed_item)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    input_path = "src/data/sentences.json"
    output_path = "src/data/sentences.json"
    process_sentences(input_path, output_path)
    print(f"Successfully processed {input_path} and saved to {output_path}")
