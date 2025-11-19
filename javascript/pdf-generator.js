// Gerador de PDF do Cardápio - Hapuque's Doces

// Dados do cardápio completo
const cardapioCompleto = {
  brigadeiros: [
    { nome: 'Brigadeiro Tradicional', descricao: 'Chocolate ao leite com granulado', preco: 'R$ 3,50' },
    { nome: 'Brigadeiro Gourmet', descricao: 'Chocolate belga com granulado artesanal', preco: 'R$ 5,00' },
    { nome: 'Brigadeiro Branco', descricao: 'Chocolate branco com coco ralado', preco: 'R$ 4,50' },
    { nome: 'Brigadeiro de Morango', descricao: 'Chocolate branco com morango desidratado', preco: 'R$ 5,00' },
    { nome: 'Brigadeiro Pistache', descricao: 'Chocolate branco com pistache triturado', preco: 'R$ 6,00' },
  ],
  bolos: [
    { nome: 'Bolo de Chocolate', descricao: 'Massa de chocolate com ganache', preco: 'R$ 85,00' },
    { nome: 'Bolo de Cenoura', descricao: 'Tradicional com cobertura de chocolate', preco: 'R$ 75,00' },
    { nome: 'Bolo de Fubá', descricao: 'Fofinho com erva-doce', preco: 'R$ 65,00' },
    { nome: 'Bolo Red Velvet', descricao: 'Massa vermelha com cream cheese', preco: 'R$ 95,00' },
    { nome: 'Bolo de Limão', descricao: 'Massa leve com cobertura de limão siciliano', preco: 'R$ 80,00' },
  ],
  tortas: [
    { nome: 'Torta de Morango', descricao: 'Creme fresco e morangos selecionados', preco: 'R$ 120,00' },
    { nome: 'Torta de Limão', descricao: 'Merengue suíço e base crocante', preco: 'R$ 110,00' },
    { nome: 'Torta de Maracujá', descricao: 'Creme azedinho e base de biscoito', preco: 'R$ 115,00' },
    { nome: 'Cheesecake', descricao: 'Tradicional com calda de frutas vermelhas', preco: 'R$ 130,00' },
  ],
  brownies: [
    { nome: 'Brownie Tradicional', descricao: 'Chocolate meio amargo', preco: 'R$ 35,00' },
    { nome: 'Brownie com Nozes', descricao: 'Chocolate meio amargo com nozes caramelizadas', preco: 'R$ 40,00' },
    { nome: 'Brownie de Doce de Leite', descricao: 'Recheado com doce de leite argentino', preco: 'R$ 42,00' },
  ],
  cookies: [
    { nome: 'Cookie Chocolate Chips', descricao: 'Gotas de chocolate ao leite e meio amargo', preco: 'R$ 8,00' },
    { nome: 'Cookie Red Velvet', descricao: 'Massa vermelha com gotas de chocolate branco', preco: 'R$ 9,00' },
    { nome: 'Cookie de Aveia', descricao: 'Integral com passas e canela', preco: 'R$ 7,00' },
    { nome: 'Cookie Nutella', descricao: 'Recheado com Nutella', preco: 'R$ 10,00' },
  ],
  outros: [
    { nome: 'Pudim de Leite', descricao: 'Tradicional com calda de caramelo', preco: 'R$ 50,00' },
    { nome: 'Pavê de Chocolate', descricao: 'Camadas de biscoito e creme', preco: 'R$ 60,00' },
    { nome: 'Quindim', descricao: 'Tradicional com coco', preco: 'R$ 5,00/un' },
    { nome: 'Pão de Mel', descricao: 'Coberto com chocolate ao leite', preco: 'R$ 6,00/un' },
    { nome: 'Doce de Leite Caseiro', descricao: 'Pote de 300g', preco: 'R$ 25,00' },
  ]
};

// Função para gerar o PDF
function gerarCardapioPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Cores do tema
  const corPrincipal = [65, 45, 36]; // Marrom escuro
  const corSecundaria = [245, 224, 229]; // Rosa claro
  const corTexto = [51, 51, 51]; // Cinza escuro

  let yPosition = 20;

  // CABEÇALHO
  doc.setFillColor(...corPrincipal);
  doc.rect(0, 0, 210, 40, 'F');

  // Título
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text("HAPUQUE'S DOCES", 105, 20, { align: 'center' });

  // Subtítulo
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text('Feito à Mão, para tocar o coração.', 105, 28, { align: 'center' });

  // Informações de contato
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Rua Vinte e Dois de Agosto, 201 - Vila Bela Vista, SP', 105, 35, { align: 'center' });
  doc.text('Tel: (11) 2227-8700  |  Instagram: @hapuques_doces', 105, 39, { align: 'center' });

  yPosition = 50;

  // Função auxiliar para adicionar categoria
  function adicionarCategoria(titulo, itens) {
    // Verificar se precisa de nova página
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Título da categoria
    doc.setFillColor(...corSecundaria);
    doc.rect(15, yPosition - 5, 180, 10, 'F');
    
    doc.setTextColor(...corPrincipal);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(titulo.toUpperCase(), 20, yPosition + 2);
    
    yPosition += 12;

    // Itens da categoria
    doc.setTextColor(...corTexto);
    doc.setFontSize(10);

    itens.forEach((item, index) => {
      // Verificar espaço para novo item
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      // Nome do item (negrito)
      doc.setFont('helvetica', 'bold');
      doc.text(item.nome, 20, yPosition);

      // Preço (alinhado à direita)
      doc.setFont('helvetica', 'bold');
      const precoWidth = doc.getTextWidth(item.preco);
      doc.text(item.preco, 190 - precoWidth, yPosition);

      yPosition += 5;

      // Descrição (itálico)
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      const descricaoLinhas = doc.splitTextToSize(item.descricao, 160);
      doc.text(descricaoLinhas, 20, yPosition);

      yPosition += descricaoLinhas.length * 4 + 3;

      // Linha divisória (exceto último item)
      if (index < itens.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 3;
      }
    });

    yPosition += 8;
  }

  // Adicionar todas as categorias
  adicionarCategoria('BRIGADEIROS', cardapioCompleto.brigadeiros);
  adicionarCategoria('BOLOS', cardapioCompleto.bolos);
  adicionarCategoria('TORTAS', cardapioCompleto.tortas);
  adicionarCategoria('BROWNIES', cardapioCompleto.brownies);
  adicionarCategoria('COOKIES', cardapioCompleto.cookies);
  adicionarCategoria('OUTROS DOCES', cardapioCompleto.outros);

  // RODAPÉ em todas as páginas
  const totalPages = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Linha decorativa
    doc.setDrawColor(...corPrincipal);
    doc.setLineWidth(0.5);
    doc.line(15, 285, 195, 285);
    
    // Texto do rodapé
    doc.setFontSize(8);
    doc.setTextColor(...corTexto);
    doc.setFont('helvetica', 'italic');
    doc.text('Todos os doces são feitos artesanalmente com ingredientes selecionados.', 105, 290, { align: 'center' });
    doc.text('Encomendas: mínimo 48h de antecedência | Retirada no local ou delivery', 105, 294, { align: 'center' });
    
    // Número da página
    doc.setFont('helvetica', 'normal');
    doc.text(`Página ${i} de ${totalPages}`, 195, 294, { align: 'right' });
  }

  // Salvar o PDF
  const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  doc.save(`Cardapio_Hapuques_Doces_${dataAtual}.pdf`);
}

// Event listener para o botão
document.addEventListener('DOMContentLoaded', function() {
  const btnGerarPDF = document.getElementById('btnGerarPDF');
  
  if (btnGerarPDF) {
    btnGerarPDF.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Feedback visual
      const textoOriginal = this.innerHTML;
      this.innerHTML = '⏳ Gerando PDF...';
      this.disabled = true;
      
      // Pequeno delay para dar feedback visual
      setTimeout(() => {
        try {
          gerarCardapioPDF();
          
          // Feedback de sucesso
          this.innerHTML = '✅ PDF Gerado!';
          setTimeout(() => {
            this.innerHTML = textoOriginal;
            this.disabled = false;
          }, 2000);
        } catch (error) {
          console.error('Erro ao gerar PDF:', error);
          this.innerHTML = '❌ Erro ao gerar PDF';
          setTimeout(() => {
            this.innerHTML = textoOriginal;
            this.disabled = false;
          }, 2000);
        }
      }, 300);
    });
  }
});
