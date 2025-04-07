import json
import os
from PyQt5.QtCore import QObject, pyqtSignal, pyqtSlot

class Comunicador(QObject):
    sinalLogar = pyqtSignal(bool)  # Signal para mensagens em português
    sinalNavegar = pyqtSignal(str) # Signal para alterar de pagina

    def __init__(self):
        super().__init__()
        print("Comunicador inicializado!")
    
    @pyqtSlot(str, str, result=bool)
    def Logar(self, usuario, senha):
        print(f"tentativa de login usuario:{usuario} senha:{senha}")
        
        arquivo = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.json")
        with open(arquivo, "r", encoding="utf-8") as arquivo:
            ArqLoad = json.load(arquivo)
        user = ArqLoad['User']
            
        
        if usuario == user["usuario"] and senha == user["senha"]:
            print("oxi")
            self.sinalLogar.emit(True)
            return True
        else:
            self.sinalLogar.emit(False)
            return False

    @pyqtSlot(str)
    def navegarPara(self, pagina):
        self.sinalNavegar.emit(pagina) 
    