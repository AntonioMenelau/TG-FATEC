import sys
import os
import json
from datetime import date 
from PyQt5.QtCore import QUrl
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QHBoxLayout, QLabel, QPushButton
from PyQt5.QtWebEngineWidgets import QWebEngineView
from comunicationHandler import Comunicador
from PyQt5.QtWebChannel import QWebChannel


class Application(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Lite PDV")
        self.setMinimumSize(1200, 800)
        
        self.centralWidget = QWidget()
        self.setCentralWidget(self.centralWidget)
        self.layout = QVBoxLayout(self.centralWidget)
        self.layout.setContentsMargins(0, 0, 0, 0)
        self.layout.setSpacing(0)
        
        self.layout.addWidget(RenderizarWebInterface())
        self.layout.addWidget(SetupFooter())


class SetupFooter(QWidget):
    def __init__(self):
        super().__init__()
        try:
            with open("config.json", "r", encoding="utf-8") as arquivo:
                config = json.load(arquivo)
        except FileNotFoundError:
            config = {"Caixa": "Erro ao carregar caixa"}
        
        self.setObjectName("footer")
        self.setStyleSheet("""
            #footer {
                background-color: #F1F5F9;
                border-top: 1px solid #E2E8F0;
            }
            QPushButton {
                background-color: #EF4444;
                color: white;
                border: none;
                border-radius: 3px;
                padding: 2px 10px;
                font-size: 12px;
            }
            QPushButton:hover {
                background-color: #DC2626;
            }
        """)
        self.setFixedHeight(30)
        footerLayout = QHBoxLayout(self)
        footerLayout.setContentsMargins(10, 0, 10, 0)
        statusLabel = QLabel(f"Pronto para vender! • Caixa: {config['Caixa']} • Data: {date.today()}")
        statusLabel.setStyleSheet("color: #64748B; font-size: 12px;")
        versionLabel = QLabel("v1.0.0")
        versionLabel.setStyleSheet("color: #94A3B8; font-size: 12px;")
        exitButton = QPushButton("Sair")
        exitButton.setFixedSize(60, 20)
        exitButton.clicked.connect(self.sairAplicacao)
        footerLayout.addWidget(statusLabel)
        footerLayout.addStretch()
        footerLayout.addWidget(versionLabel)
        footerLayout.addSpacing(10)
        footerLayout.addWidget(exitButton)
    
    def sairAplicacao(self):
        QApplication.quit()


class RenderizarWebInterface(QWebEngineView):
    def __init__(self):
        super().__init__()
        self.canal = QWebChannel()
        self.comunicador = Comunicador()
        self.canal.registerObject('comunicador', self.comunicador)
        self.page().setWebChannel(self.canal)

        self.comunicador.sinalNavegar.connect(self.carregarPagina)

        self.carregarPagina('template/login.html')
    
    def carregarPagina(self, caminho):
        try:
            caminho_completo = os.path.join(os.path.dirname(os.path.abspath(__file__)), caminho)
            print(f"Carregando página: {caminho_completo}")
            self.load(QUrl.fromLocalFile(caminho_completo))
        except Exception as e:
            print(f"Erro ao carregar página: {str(e)}")
            self.setHtml(f"<html><body><h1>Erro ao carregar: {str(e)}</h1></body></html>", QUrl("file:///"))


class Logar():
    def __init__(self):
        self.user
        self.password
        

if __name__ == "__main__":
    Qapp = QApplication(sys.argv)
    application = Application()
    application.showFullScreen()
    sys.exit(Qapp.exec_())