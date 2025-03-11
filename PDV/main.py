import sys
import os
from PyQt5.QtCore import QUrl, Qt
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QHBoxLayout, QLabel
from PyQt5.QtWebEngineWidgets import QWebEngineView


class PDVApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PDV Moderno")
        self.setMinimumSize(1200, 800)
        
        # Configuração da janela principal
        self.centralWidget = QWidget()
        self.setCentralWidget(self.centralWidget)
        self.layout = QVBoxLayout(self.centralWidget)
        self.layout.setContentsMargins(0, 0, 0, 0)
        self.layout.setSpacing(0)
        
        # Conteúdo principal (WebView com Tailwind)
        self.setupWebView()
        
        # Barra de status/rodapé
        self.setupFooter()


    def setupWebView(self):
        self.webView = QWebEngineView()
        self.layout.addWidget(self.webView)
        current_dir = os.path.dirname(os.path.abspath(__file__))
        index_path = os.path.join(current_dir, "login.html")
        self.webView.load(QUrl.fromLocalFile(index_path))

    def setupFooter(self):
        footer = QWidget()
        footer.setObjectName("footer")
        footer.setStyleSheet("""
            #footer {
                background-color: #F1F5F9;
                border-top: 1px solid #E2E8F0;
            }
        """)
        footer.setFixedHeight(30)
        
        footerLayout = QHBoxLayout(footer)
        footerLayout.setContentsMargins(10, 0, 10, 0)
        
        statusLabel = QLabel(f"Pronto para vender! • Caixa: {''} • Operador: {''} • Data: {''}")
        statusLabel.setStyleSheet("color: #64748B; font-size: 12px;")
        
        versionLabel = QLabel("v1.0.0")
        versionLabel.setStyleSheet("color: #94A3B8; font-size: 12px;")
        
        footerLayout.addWidget(statusLabel)
        footerLayout.addStretch()
        footerLayout.addWidget(versionLabel)
        
        self.layout.addWidget(footer)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    main = PDVApp()
    main.showFullScreen()
    sys.exit(app.exec_())