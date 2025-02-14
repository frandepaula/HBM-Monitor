import time
import requests
import random

def gerar_medicao():
    """Simula uma medição do ECG."""
    timestamp = time.time()
    valor = 1.0 + (random.uniform(-0.3, 0.3))  # Pequena variação simulada
    return {"timestamp": timestamp, "valor": valor}

def enviar_medicao():
    """Envia a medição para a API."""
    url = "http://localhost:8000/medicao"
    while True:
        medicao = gerar_medicao()
        response = requests.post(url, json=medicao)
        print(f"Medição enviada: {medicao}, Resposta: {response.json()}")
        time.sleep(0.1)  # Enviar a cada 100ms

if __name__ == "__main__":
    enviar_medicao()
