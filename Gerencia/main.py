import sys
import os
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl, Qt, QSize

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        
        # Configuração da janela principal
        self.setWindowTitle("Aplicação Moderna com PyQt e Tailwind")
        self.setMinimumSize(1000, 700)
        
        # Widget central
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # Layout principal
        layout = QVBoxLayout(central_widget)
        layout.setContentsMargins(0, 0, 0, 0)
        
        # Componente WebEngine para renderizar HTML/CSS
        self.web_view = QWebEngineView()
        layout.addWidget(self.web_view)
        
        # Carrega o arquivo HTML da interface
        current_dir = os.path.dirname(os.path.abspath(__file__))
        html_path = os.path.join(current_dir, "index.html")
        
        # Verifica se o arquivo existe
        if os.path.exists(html_path):
            self.web_view.load(QUrl.fromLocalFile(html_path))
        else:
            print(f"Erro: Arquivo HTML não encontrado em: {html_path}")
            self.web_view.setHtml("<html><body><h1>Erro: Arquivo HTML não encontrado</h1></body></html>")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.showFullScreen()
    sys.exit(app.exec_())