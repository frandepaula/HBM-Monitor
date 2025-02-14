# HBM Monitor

Simulador de monitoramento sinais de batimentos cardíacos em tempo real.

### **Frontend**
- **React**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **Recharts**

### **Backend**
- **FastAPI**
- **Uvicorn**
- **Requests**

### **Outras**
- **Random**

## Como Executar o Projeto

### **Frontend**

O frontend está hospedado na **Vercel** e pode ser acessado diretamente através do link fornecido.

### **Backend e Simulador**

Para executar o backend e o simulador localmente, siga os passos abaixo:

```bash
# 1. Clone o repositório:
git clone https://github.com/frandepaula/HBM-Monitor.git
cd HBM-Monitor

# 2. Executar a API Backend:
cd API
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# 3. Simulador (Segundo terminal):
cd simulador
python3 simulador.py
