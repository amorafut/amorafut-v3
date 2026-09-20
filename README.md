# Amora Fut Streetwear — Loja Base

Estrutura estática pronta para publicação: home, catálogo, produto, carrinho, checkout demonstrativo, pedido via WhatsApp e área administrativa local para cadastro de produtos.

## Antes de publicar
1. Abra `js/config.js` e coloque o número do WhatsApp da loja no formato internacional, sem `+`, espaços ou símbolos.
2. Edite produtos em `js/products.js` ou use `admin/index.html` para gerar um JSON de catálogo local.
3. Publique a pasta inteira em uma hospedagem estática.
4. Aponte `amorafut.com.br` para a hospedagem e ative HTTPS.

## Pagamentos reais
O checkout atual organiza o pedido e pode enviar o resumo para WhatsApp. Para cobrança automática de Pix/cartão é necessário integrar um gateway (por exemplo, Mercado Pago, PagBank ou Stripe) com backend/serverless e credenciais privadas. Nunca coloque token secreto no JavaScript do navegador.

## Frete e estoque
Para cálculo automático de frete e estoque real, conecte uma API de frete/ERP ou uma plataforma de e-commerce. A estrutura visual já está preparada para isso.
