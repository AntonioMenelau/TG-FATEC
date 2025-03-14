from PyQt5.QtCore import QObject, pyqtSignal, pyqtSlot

class Comunicador(QObject):
    sinalLogar = pyqtSignal(str)  # Signal para mensagens em português
    sinalNavegar = pyqtSignal(str) # Signal para alterar de pagina

    def __init__(self):
        super().__init__()
        print("Comunicador inicializado!")
    
    @pyqtSlot(str, result=str)
    def Logar(self, usuario, senha):
        print(f"tentativa de login usuario:{usuario} senha:{senha}")
        self.sinalLogar.emit("Olá do Python!")

    @pyqtSlot(str)
    def navegarPara(self, pagina):
        self.sinalNavegar.emit(pagina) 
    