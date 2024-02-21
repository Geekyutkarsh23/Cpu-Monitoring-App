import psutil
import requests
import time
import json

def get_process_info():
    process_list = []
    for proc in psutil.process_iter():
        try:
            process_info = {
                "processId": proc.pid,
                "processName": proc.name(),
                "cpuPercent": proc.cpu_percent(),
                "memoryPercent": proc.memory_percent(),
            }
            process_list.append(process_info)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return process_list

def send_data_to_api(data):
    api_url = "http://localhost:3000/api/process-info"
    response = requests.post(api_url, json=data)
    if response.status_code != 201:
        print(f"Error sending data to API: {response.text}")

if __name__ == "__main__":
    while True:
        data = get_process_info()
        send_data_to_api(data)
        time.sleep(30)