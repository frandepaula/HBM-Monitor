from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import time


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class Medicao(BaseModel):
    timestamp: float
    valor: float

historico_medicoes: List[Medicao] = []
irregularidades = 0
bip_enviado = False

def baseline(x):
    """Função de referência para um batimento cardíaco saudável."""
    return 1.0  

@app.get("/medicoes")
async def obter_medicoes():
    return historico_medicoes[-10:] 


@app.post("/medicao")
async def receber_medicao(medicao: Medicao):
    global irregularidades, bip_enviado
    
    historico_medicoes.append(medicao)
    if len(historico_medicoes) > 60:
        historico_medicoes.pop(0)
    
    x = len(historico_medicoes) * 10  
    referencia = baseline(x)
    diferenca = abs(medicao.valor - referencia)
    
    if diferenca > referencia * 0.2:
        irregularidades += 1
    
    if irregularidades >= 5:
        bip_enviado = True
        return {"alerta": "bip"}
    
    if bip_enviado and irregularidades == 0:
        bip_enviado = False
        return {"alerta": "bipbip"}
    
    return {"status": "ok"}
