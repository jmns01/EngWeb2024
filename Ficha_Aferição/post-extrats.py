import json
import requests

def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to post data to server
def post_data_to_server(data, url):
    response = requests.post(url, json=data)
    return response

def main():
    file_paths = ['./dataset-extra1.json', './dataset-extra2.json', './dataset-extra1.json'] 
    url = 'http://localhost:7777/pessoas'
    
    for file in file_paths:
        data = read_json_file(file)
        for entry in data:
            r = post_data_to_server(entry, url)
            print(f'Status Code: {r.status_code}')
            print(f'Response Body: {r.json()}')
   

if __name__ == "__main__":
    main()
