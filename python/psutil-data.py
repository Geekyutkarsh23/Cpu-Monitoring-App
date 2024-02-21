import psutil
import requests
import time



while True:
 def get_cpu_data():
    cpu_percent = psutil.cpu_percent()
    cpu_times = psutil.cpu_times()
    memory_percent = psutil.virtual_memory().percent
    memory_info = psutil.virtual_memory()

    data = {
        'cpu_percent': cpu_percent,
        'cpu_times': {
            'user': cpu_times.user,
            'system': cpu_times.system,
            'idle': cpu_times.idle,
        },
        'memory_percent': memory_percent,
        'memory_info': {
            'total': memory_info.total,
            'available': memory_info.available,
            'percent': memory_info.percent,
            'used': memory_info.used,
            'free': memory_info.free,
        },
    }

    return data

 def send_data_to_api(data):
    response = requests.post('http://localhost:3000/api/cpu', json=data)
    print(response.status_code, response.text)

 if __name__ == '__main__':
    cpu_data = get_cpu_data()
    send_data_to_api(cpu_data)
    time.sleep(20)











