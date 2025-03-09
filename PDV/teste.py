import sys
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl

class PDVWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Sistema PDV")
        self.setGeometry(100, 100, 1024, 768)
        
        self.browser = QWebEngineView()
        self.setCentralWidget(self.browser)
        
        # Carrega o HTML diretamente
        html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PDV Moderno</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 h-screen">
            <div class="container mx-auto p-4 h-full">
                <div class="flex h-full gap-4">
                    <!-- Lista de Produtos -->
                    <div class="w-2/3 bg-white rounded-lg shadow-lg p-4">
                        <h1 class="text-2xl font-bold mb-4">Produtos</h1>
                        <div class="grid grid-cols-3 gap-4">
                            <!-- Produto -->
                            <div class="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                                <h3 class="font-bold">Produto 1</h3>
                                <p class="text-gray-600">R$ 10,00</p>
                                <button class="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                                    Adicionar
                                </button>
                            </div>
                            <!-- Repetir outros produtos... -->
                        </div>
                    </div>

                    <!-- Carrinho -->
                    <div class="w-1/3 bg-white rounded-lg shadow-lg p-4">
                        <h1 class="text-2xl font-bold mb-4">Carrinho</h1>
                        <div class="space-y-2">
                            <!-- Item do Carrinho -->
                            <div class="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <div>
                                    <h4 class="font-semibold">Produto 1</h4>
                                    <p class="text-sm text-gray-500">1x R$ 10,00</p>
                                </div>
                                <button class="text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Total -->
                        <div class="mt-6 pt-4 border-t">
                            <div class="flex justify-between font-bold text-xl">
                                <span>Total:</span>
                                <span>R$ 10,00</span>
                            </div>
                            <button class="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                                Finalizar Venda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        self.browser.setHtml(html_content, QUrl("about:blank"))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = PDVWindow()
    window.show()
    sys.exit(app.exec_())