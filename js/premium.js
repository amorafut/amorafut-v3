/* Amora Fut — melhoria visual e controle de estoque da página de produto */
(function(){
  const css=`
  .af-premium .mainImg{box-shadow:0 18px 55px rgba(0,0,0,.09)}
  .af-photo-label{position:absolute;top:14px;left:14px;z-index:3;background:#111;color:#fff;padding:7px 10px;border-radius:999px;font:900 9px/1 Arial;letter-spacing:.6px}
  .af-last{margin:15px 0;background:#fff3f7;border:1px solid #ffd0e0;color:#b4004d;border-radius:12px;padding:12px 14px;font:900 12px/1.3 Arial}
  .size.af-off{opacity:.35!important;text-decoration:line-through;cursor:not-allowed!important;background:#f1f1f3!important}
  .af-size-note{margin-top:8px;color:#888;font-size:10px}
  .af-trust{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:18px}
  .af-trust div{background:#fff;border:1px solid #e9e9ee;border-radius:12px;padding:12px;font-size:10px;line-height:1.35}
  .af-trust b{display:block;font-size:10px;margin-bottom:4px;color:#17171a}.af-trust span{color:#777}
  .af-secure{margin-top:10px;color:#777;font-size:10px}
  @media(max-width:560px){.af-trust{grid-template-columns:1fr}.af-photo-label{font-size:8px}}
  `;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  function enhance(){
    const m=location.hash.match(/^#produto\/(.+)/); if(!m)return;
    const id=decodeURIComponent(m[1]), p=(window.PRODUCTS||[]).find(x=>x.id===id); if(!p)return;
    const root=document.querySelector('.product'); if(!root)return;
    root.classList.add('af-premium');
    const main=document.querySelector('.mainImg');
    if(main&&!main.querySelector('.af-photo-label')){const x=document.createElement('span');x.className='af-photo-label';x.textContent='FOTOS REAIS DO PRODUTO';main.appendChild(x)}
    const sizes=[...document.querySelectorAll('.size')];
    sizes.forEach(b=>{const s=b.textContent.trim().split(/\s/)[0], n=p.stock&&p.stock[s]||0;if(!n){b.disabled=true;b.classList.add('af-off')}});
    let available=p.sizes.filter(s=>(p.stock&&p.stock[s]||0)>0);
    let active=sizes.find(b=>b.classList.contains('active')&&!b.disabled);
    if(!active && available.length){const b=sizes.find(x=>x.textContent.trim().startsWith(available[0]));if(b)b.click();return}
    const current=active?active.textContent.trim().split(/\s/)[0]:'';
    const qty=document.getElementById('qty'); if(qty){const n=p.stock&&p.stock[current]||0;qty.max=Math.max(1,n);if(n===1)qty.value=1;}
    const buy=document.getElementById('buyBtn'); if(buy&&!available.length)buy.disabled=true;
    if(current && (p.stock&&p.stock[current]||0)===1 && !root.querySelector('.af-last')){const x=document.createElement('div');x.className='af-last';x.textContent='🔥 Última unidade disponível no tamanho '+current;document.querySelector('.details')?.appendChild(x)}
    if(!document.querySelector('.af-size-note')){const x=document.createElement('div');x.className='af-size-note';x.textContent='Tamanhos sem estoque ficam indisponíveis para compra.';document.querySelector('.sizes')?.after(x)}
    if(!document.querySelector('.af-trust')){const x=document.createElement('div');x.className='af-trust';x.innerHTML='<div><b>🚚 Envio</b><span>Todo o Brasil</span></div><div><b>💳 Pix</b><span>5% de desconto</span></div><div><b>⚡ Atendimento</b><span>Pedido direto pelo WhatsApp</span></div>';document.querySelector('.benefits')?.replaceWith(x)}
    if(!document.querySelector('.af-secure')){const x=document.createElement('div');x.className='af-secure';x.textContent='✓ Compra simples e atendimento direto da Amora Fut';document.querySelector('.details')?.appendChild(x)}
  }
  const mo=new MutationObserver(()=>enhance()); mo.observe(document.body,{childList:true,subtree:true});
  addEventListener('hashchange',()=>setTimeout(enhance,30)); setTimeout(enhance,80);
})();
