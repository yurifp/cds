<script>
  const canvas = document.getElementById('my-canvas');
 
  const range = document.getElementById('jsRange');
  const modeBtn = document.getElementById('fillBtn');
  const clearBtn = document.getElementById('clearBtn');
  const saveBtn = document.getElementById('saveBtn');
  
  const ctx = canvas.getContext('2d');
  
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  
  ctx.lineCap = 'round'
  
  let painting = false;
  let filling = false;
   
  function startPainting(){
    painting = true;
  }
  
  function stopPainting(){
    painting = false;
  }
  
  function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if( !painting ) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
  
 
  
  function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
  }
  
  function handleModeClick(e){
    if( filling ){
      filling = false;
      modeBtn.innerText = 'preencher'
    } else {
      filling = true;
      modeBtn.innerText = 'Pincel'
    }
  }
  
  function handleFillMode(e){
    if( filling ) {
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
  
  function handleClearBtn(e){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  function handleSaveBtn(e){
    const art = canvas.toDataURL('image🎈');
    const link = document.createElement('a');
    link.href = art;
    link.download = 'Desenho';
    link.click();
  }
  
  if( canvas ) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleFillMode)
    canvas.addEventListener('touchstart', startPainting);
    canvas.addEventListener('touchend', stopPainting);
  }

  const colors = document.getElementsByClassName('control_color');

  function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }
  
  Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
  
  if( range ) {
    range.addEventListener('input', handleRangeChange)
  }
  
  if( modeBtn ) {
    modeBtn.addEventListener('click', handleModeClick)
  }
  
  if( clearBtn ) {
    clearBtn.addEventListener('click', handleClearBtn)
  }
  
  if( saveBtn ){
    saveBtn.addEventListener('click', handleSaveBtn)
  }</script>
  
  <script>
    window.onload = function() {
      document.ontouchmove = function(e) { e.preventDefault(); }
  
      var canvas = document.getElementById('main');
      var canvastop = canvas.offsetTop;
  
      var context = canvas.getContext("2d");
  
      var lastx;
      var lasty;
  
      context.strokeStyle = "#000000";
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 5;
  
      function salvar(){
        const art = canvas.toDataURL('image/png'); // Corrigir a extensão para 'png'
        const link = document.createElement('a');
        link.href = art;
        link.download = 'Desenho.png'; // Corrigir a extensão para 'png'
        link.click();
      }
  
      function limpar() {
        context.fillStyle = "#ffffff";
        context.rect(0, 0, 800, 800);
        context.fill();
      }
  
      function ponto(x, y) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(x, y, 1, 0, Math.PI * 2, true);
        context.fill();
        context.stroke();
        context.closePath();
      }
  
      function linha(fromx, fromy, tox, toy) {
        context.beginPath();
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.stroke();
        context.closePath();
      }
  
      function isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      }
  
      if (isSafari()) {
        canvas.ontouchstart = function(event) {
          event.preventDefault();
          lastx = event.touches[0].clientX - 30;
          lasty = event.touches[0].clientY - canvastop - 130;
          ponto(lastx, lasty);
        }
        canvas.ontouchmove = function(event) {
          event.preventDefault();
          var newx = event.touches[0].clientX - 30;
          var newy = event.touches[0].clientY - canvastop - 130;
          linha(lastx, lasty, newx, newy);
          lastx = newx;
          lasty = newy;
        }
      } else { // Google Chrome ou outros navegadores
        canvas.ontouchstart = function(event) {
          event.preventDefault();
          lastx = event.touches[0].clientX - 130;
          lasty = event.touches[0].clientY - canvastop - 340;
          ponto(lastx, lasty);
        }
        canvas.ontouchmove = function(event) {
          event.preventDefault();
          var newx = event.touches[0].clientX - 130;
          var newy = event.touches[0].clientY - canvastop - 340;
          linha(lastx, lasty, newx, newy);
          lastx = newx;
          lasty = newy;
        }
      }
  
      // Função para trocar a cor do pincel
      const colors = document.getElementsByClassName('control_color');
  
      function handleColorClick(e){
        const color = e.target.style.backgroundColor;
        context.strokeStyle = color;
        context.fillStyle = color;
      }
  
      Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
  
      var botaoLimpar = document.getElementById('clear');
      botaoLimpar.onclick = limpar;
  
      var botaoSalvar = document.getElementById('salvar'); // Corrigir o ID do botão
      botaoSalvar.onclick = salvar;
  
      limpar();
    }
  </script>
  