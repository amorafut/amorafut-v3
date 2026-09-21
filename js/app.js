(function(){
const C=window.AMORA_CONFIG||{};
const P=window.PRODUCTS||[];
let cart=JSON.parse(localStorage.getItem('amora_cart')||'[]');
let selectedSize='M';
const app=document.getElementById('app');
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const find=id=>P.find(p=>p.id===id);

function save(){localStorage.setItem('amora_cart',JSON.stringify(cart));updateCartCount();renderCart();}
function updateCartCount(){document.getElementById('cartCount').textContent=cart.reduce((s,i)=>s+i.qty,0)}
function path(){return location.hash.replace(/^#/,'')||'home'}
function nav(){document.querySelectorAll('[data-route]').forEach(a=>a.onclick=e=>{e.preventDefault();location.hash=a.getAttribute('href').slice(1)})}

function home(){
  const heroProduct=P[0];
  const heroImage=heroProduct?.images?.[0]||'';
  app.innerHTML=`
  <div class="home-v4">
    <section class="homeHero container">
      <div class="heroV4Copy">
        <span class="eyebrow">AMORA FUT STREETWEAR</span>
        <h1>Seu time.<br><em>Seu estilo.</em></h1>
        <p>Camisas de futebol selecionadas para quem transforma paixão, identidade e estilo em uma só camisa.</p>
        <div class="heroActions">
          <button class="primary" onclick="location.hash='catalogo'">VER CATÁLOGO</button>
          <button class="heroLink" onclick="document.getElementById('homeDestaques').scrollIntoView({behavior:'smooth'})">EXPLORAR DESTAQUES ↓</button>
        </div>
        <div class="heroTrust">
          <span>✓ Envio para todo o Brasil</span>
          <span>✓ 5% OFF no Pix</span>
        </div>
      </div>
      <div class="heroV4Image">
        ${heroImage?`<img src="${heroImage}" alt="${heroProduct?.name||'Camisa de futebol'}">`:''}
        <div class="heroImageTag">LANÇAMENTO</div>
      </div>
    </section>

    <section class="quickCategories container">
      <div class="sectionIntro center">
        <span class="eyebrow">ENCONTRE SUA CAMISA</span>
        <h2>Escolha por categoria</h2>
      </div>
      <div class="categoryGrid">
        <button class="categoryTile" onclick="location.hash='catalogo'"><span>BR</span><b>Brasileiras</b><small>Clubes do Brasil</small></button>
        <button class="categoryTile" onclick="location.hash='catalogo'"><span>INT</span><b>Internacionais</b><small>Grandes clubes</small></button>
        <button class="categoryTile" onclick="location.hash='catalogo'"><span>SEL</span><b>Seleções</b><small>Paixão mundial</small></button>
        <button class="categoryTile" onclick="location.hash='catalogo'"><span>JOG</span><b>Versão Jogador</b><small>Performance & estilo</small></button>
        <button class="categoryTile" onclick="location.hash='catalogo'"><span>TOR</span><b>Versão Torcedor</b><small>Para vestir a paixão</small></button>
        <button class="categoryTile dark" onclick="location.hash='catalogo'"><span>SALE</span><b>Ofertas</b><small>Confira as oportunidades</small></button>
      </div>
    </section>

    <section id="homeDestaques" class="homeProducts container">
      <div class="sectionTitle">
        <div><span class="eyebrow">CURADORIA AMORA FUT</span><h2>Mais vendidos</h2><p>Produtos em destaque na loja.</p></div>
        <a class="secondary" href="#catalogo">Ver catálogo</a>
      </div>
      <div class="grid">${P.slice(0,4).map(card).join('') || '<div class="empty">Em breve novos produtos.</div>'}</div>
    </section>

    <section class="promoBand container">
      <div>
        <span class="eyebrow">OFERTA PROGRESSIVA</span>
        <h2>Leve mais.<br><em>Economize mais.</em></h2>
        <p>Monte seu kit de camisas e aproveite nossos descontos progressivos.</p>
      </div>
      <div class="promoDeals">
        <div><strong>2 CAMISAS</strong><b>R$ 10 OFF</b><small>em cada camisa</small></div>
        <div><strong>3 CAMISAS</strong><b>R$ 15 OFF</b><small>em cada camisa</small></div>
      </div>
    </section>

    <section class="homeProducts container">
      <div class="sectionTitle">
        <div><span class="eyebrow">NOVIDADES</span><h2>Lançamentos</h2><p>Chegaram para completar sua coleção.</p></div>
        <a class="secondary" href="#catalogo">Ver todos</a>
      </div>
      <div class="grid">${P.slice(0,4).map(card).join('') || '<div class="empty">Novidades em breve.</div>'}</div>
    </section>

    <section class="benefitsV4 container">
      <div class="sectionIntro center"><span class="eyebrow">POR QUE AMORA FUT?</span><h2>Compra simples. Estilo de verdade.</h2></div>
      <div class="benefitGridV4">
        <article><span>01</span><h3>Envio nacional</h3><p>Enviamos para todo o Brasil.</p></article>
        <article><span>02</span><h3>Desconto no Pix</h3><p>5% de desconto no pagamento via Pix.</p></article>
        <article><span>03</span><h3>Atendimento direto</h3><p>Fale com a Amora Fut pelo WhatsApp.</p></article>
        <article><span>04</span><h3>Catálogo selecionado</h3><p>Camisas escolhidas para futebol e streetwear.</p></article>
      </div>
    </section>

    <section class="instagramV4 container">
      <div><span class="eyebrow">SIGA A AMORA FUT</span><h2>@amorafutcamisas</h2><p>Acompanhe lançamentos, novidades e campanhas da loja.</p></div>
      <a class="primary" href="${C.instagram||'#'}" target="_blank" rel="noopener">ABRIR INSTAGRAM</a>
    </section>

    <section class="aboutV4 container" id="sobre">
      <div><span class="eyebrow">SOBRE A MARCA</span><h2>Futebol como estilo.</h2><p>A Amora Fut Streetwear une cultura do futebol e estética premium em uma experiência de compra visual, simples e direta. Nosso catálogo pode receber clubes, seleções, versões jogador e torcedor, além de lançamentos e promoções.</p><button class="secondary" onclick="location.hash='sobre'">CONHEÇA A AMORA FUT</button></div>
    </section>
  </div>`;
}

function card(p){
  return `<article class="card"><a href="#produto/${p.id}"><div class="cardImg"><img src="${p.images[0]}" alt="${p.name}">${p.badge?`<span class="badge">${p.badge}</span>`:''}</div><div class="cardBody"><h3>${p.name}</h3><div class="meta">${p.version} • ${p.category}</div><div class="price">${money(p.price)}</div><div class="pix">${money(p.price*(1-C.pixDiscount))} no Pix</div></div></a></article>`
}

function catalog(){
  app.innerHTML=`<div class="container"><div class="sectionTitle"><div><h2>Catálogo</h2><p>Encontre sua próxima camisa.</p></div><input id="search" class="search" placeholder="Buscar camisa..."></div><div class="filters"><button class="filter active" data-filter="Todos">Todos</button><button class="filter" data-filter="Brasileiros">Brasileiros</button><button class="filter" data-filter="Internacionais">Internacionais</button><button class="filter" data-filter="Seleções">Seleções</button></div><div id="productGrid" class="grid">${P.map(card).join('')}</div></div>`;
  let f='Todos';
  const render=()=>{const q=(document.getElementById('search').value||'').toLowerCase();document.getElementById('productGrid').innerHTML=P.filter(p=>(f==='Todos'||p.category===f)&&p.name.toLowerCase().includes(q)).map(card).join('')||'<div class="empty">Nenhum produto encontrado.</div>'};
  document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');f=b.dataset.filter;render()});
  document.getElementById('search').oninput=render
}

function product(id){
  const p=find(id);if(!p){location.hash='catalogo';return}selectedSize=p.sizes[0];
  app.innerHTML=`<div class="container"><div class="product"><div class="gallery"><div class="thumbs" id="thumbs">${p.images.map((im,i)=>`<button class="thumb ${i===0?'active':''}" data-i="${i}"><img src="${im}" alt="Detalhe ${i+1}"></button>`).join('')}</div><div class="mainImg"><img id="mainProductImg" src="${p.images[0]}" alt="${p.name}"></div></div><div class="details"><span class="tag">${p.badge||'DESTAQUE'} • VERSÃO ${p.version.toUpperCase()}</span><h1>${p.name}</h1><p class="subtitle">${p.description}</p><div class="bigPrice">${money(p.price)}</div><div class="pixPrice">ou ${money(p.price*(1-C.pixDiscount))} no Pix</div><div class="divider"></div><div class="label">Tamanho</div><div class="sizes">${p.sizes.map(s=>`<button class="size ${s===selectedSize?'active':''}" data-size="${s}">${s}</button>`).join('')}</div><div class="buyRow"><input id="qty" class="qty" type="number" min="1" max="10" value="1"><button class="primary" id="add">ADICIONAR AO CARRINHO</button></div><button class="secondary full" id="buyNow">COMPRAR AGORA</button><div class="benefits"><div class="benefit"><b>🚚 Envio nacional</b><br>Enviamos para todo o Brasil.</div><div class="benefit"><b>💳 Pix</b><br>5% de desconto no Pix.</div><div class="benefit"><b>📏 Tamanhos</b><br>${p.sizes.join(' • ')}</div><div class="benefit"><b>⚽ Versão ${p.version}</b><br>Detalhes apresentados nas fotos reais.</div></div></div></div><div class="detailSections"><section class="panel"><h2>Detalhes da camisa</h2><p class="notice">${p.description}</p><p class="notice">A aparência, cores e elementos apresentados nesta página são baseados nas fotos fornecidas para o produto.</p></section><section class="panel"><h2>Especificações</h2>${p.specs.map(s=>`<div class="spec"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</section></div></div>`;
  document.querySelectorAll('.thumb').forEach(b=>b.onclick=()=>{document.getElementById('mainProductImg').src=p.images[b.dataset.i];document.querySelectorAll('.thumb').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
  document.querySelectorAll('.size').forEach(b=>b.onclick=()=>{document.querySelectorAll('.size').forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedSize=b.dataset.size});
  document.getElementById('add').onclick=()=>add(p.id,selectedSize,parseInt(document.getElementById('qty').value||1));
  document.getElementById('buyNow').onclick=()=>{add(p.id,selectedSize,parseInt(document.getElementById('qty').value||1),false);location.hash='checkout';}
}

function add(id,size,qty,open=true){qty=Math.max(1,Math.min(10,qty));const p=find(id);const key=id+'_'+size;const item=cart.find(x=>x.key===key);if(item)item.qty+=qty;else cart.push({key,id,size,qty});save();if(open)openCart()}
function renderCart(){const box=document.getElementById('cartItems'),empty=document.getElementById('cartEmpty');if(!box)return;if(!cart.length){box.innerHTML='';empty.style.display='block'}else{empty.style.display='none';box.innerHTML=cart.map(i=>{const p=find(i.id);return `<div class="cartItem"><img src="${p.images[0]}" alt=""><div><h4>${p.name}</h4><p>Tamanho ${i.size} • ${i.qty} un.</p><p>${money(p.price*i.qty)}</p></div><button class="remove" data-key="${i.key}">Remover</button></div>`}).join('');box.querySelectorAll('.remove').forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.key!==b.dataset.key);save()})}const sub=cart.reduce((s,i)=>s+find(i.id).price*i.qty,0);document.getElementById('subtotal').textContent=money(sub);document.getElementById('pixTotal').textContent=money(sub*(1-C.pixDiscount));document.getElementById('checkoutBtn').disabled=!cart.length}
function openCart(){document.getElementById('cartDrawer').classList.add('open');renderCart()}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open')}

function checkout(){
  if(!cart.length){openCart();return}
  const sub=cart.reduce((s,i)=>s+find(i.id).price*i.qty,0);
  app.innerHTML=`<div class="container checkout"><div class="sectionTitle"><div><h2>Finalizar pedido</h2><p>Preencha seus dados para gerar o pedido.</p></div></div><div class="checkoutGrid"><section class="formPanel"><h1>Seus dados</h1><div class="field"><label>Nome completo</label><input id="name" required></div><div class="field"><label>WhatsApp</label><input id="phone" placeholder="(85) 99999-9999"></div><div class="field"><label>E-mail</label><input id="email" type="email"></div><div class="two"><div class="field"><label>CEP</label><input id="cep"></div><div class="field"><label>Cidade / UF</label><input id="city"></div></div><div class="field"><label>Endereço e número</label><input id="address"></div><div class="field"><label>Forma de pagamento</label><select id="payment"><option>Pix — 5% de desconto</option><option>Cartão de crédito</option><option>Pagamento a combinar</option></select></div><div class="payment">Nesta versão, o checkout gera o pedido e encaminha os dados para o WhatsApp da loja. Para cobrança automática, conecte um gateway de pagamento e um backend seguro.</div><button class="primary full" id="finish">GERAR PEDIDO</button></section><aside class="summaryPanel"><h2>Resumo</h2>${cart.map(i=>{const p=find(i.id);return `<div class="summaryItem"><span>${p.name}<br><small>${i.size} × ${i.qty}</small></span><b>${money(p.price*i.qty)}</b></div>`}).join('')}<div class="summaryTotal"><span>Subtotal</span><span>${money(sub)}</span></div><div class="pixPrice">No Pix: ${money(sub*(1-C.pixDiscount))}</div></aside></div></div>`;
  document.getElementById('finish').onclick=()=>finish(sub)
}
function finish(sub){const name=document.getElementById('name').value.trim();if(!name){alert('Informe seu nome.');return}const lines=cart.map(i=>{const p=find(i.id);return `• ${p.name} | tam. ${i.size} | qtd. ${i.qty} | ${money(p.price*i.qty)}`}).join('\n');const pay=document.getElementById('payment').value;const msg=`Olá, Amora Fut! Quero finalizar um pedido.\n\nCliente: ${name}\nWhatsApp: ${document.getElementById('phone').value}\nE-mail: ${document.getElementById('email').value}\nEndereço: ${document.getElementById('address').value}\nCEP: ${document.getElementById('cep').value}\nCidade/UF: ${document.getElementById('city').value}\nPagamento: ${pay}\n\nProdutos:\n${lines}\n\nSubtotal: ${money(sub)}${pay.startsWith('Pix')?'\nTotal Pix: '+money(sub*(1-C.pixDiscount)):''}`;const n=(C.whatsappNumber||'').replace(/\D/g,'');if(!n){alert('Configure o número do WhatsApp em js/config.js antes de finalizar o pedido.');return}window.open('https://wa.me/'+n+'?text='+encodeURIComponent(msg),'_blank')}
function about(){app.innerHTML='<div class="container"><section class="about"><div class="eyebrow">AMORA FUT STREETWEAR</div><h1>Futebol como estilo.</h1><p>A Amora Fut foi pensada para unir paixão por camisas de futebol, estética streetwear e uma experiência de compra direta. Nosso catálogo pode receber clubes, seleções, versões jogador e torcedor, além de lançamentos e promoções.</p><p><b>Envio para todo o Brasil.</b></p></section></div>'}
function policy(){app.innerHTML='<div class="container"><section class="policy"><h1>Políticas da loja</h1><h2>Envio</h2><p>Os prazos e valores de frete devem ser confirmados conforme o endereço do cliente e a modalidade escolhida.</p><h2>Trocas</h2><p>Defina aqui sua política oficial de troca e devolução antes da publicação da loja.</p><h2>Pagamento</h2><p>O site está preparado para Pix, cartão e atendimento por WhatsApp. A cobrança automática deve ser integrada a um gateway de pagamento seguro.</p></section></div>'}
function router(){const p=path();if(p==='home')home();else if(p==='catalogo')catalog();else if(p.startsWith('produto/'))product(p.split('/')[1]);else if(p==='checkout')checkout();else if(p==='sobre')about();else if(p==='politica')policy();else home();nav();renderCart();updateCartCount()}
document.getElementById('openCart').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
document.getElementById('continueBtn').onclick=closeCart;
document.getElementById('checkoutBtn').onclick=()=>{closeCart();location.hash='checkout'};
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('instagramLink').href=C.instagram||'#';
document.getElementById('whatsappLink').href=C.whatsappNumber?'https://wa.me/'+C.whatsappNumber:'#';
window.addEventListener('hashchange',router);
router();
}
