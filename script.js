let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];  
  let currentPlayer = 'circle';  
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
    [0, 4, 8], [2, 4, 6] // Diagonale Linien
  ];
  function init() {
    render();
  }  

  function render() {
    const contentDiv = document.getElementById('content');
  
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        let symbol = fields[index] ? fields[index] : '';
        tableHtml += `<td onclick="placeSymbol(${index})">${symbol}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
  } 

  function placeSymbol(index) {
    if (fields[index] === null) {
      fields[index] = currentPlayer;
      const tdElement = document.getElementsByTagName('td')[index];
      tdElement.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
      tdElement.onclick = null;
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
      
      if (isGameFinished()) {
        const winCombination = getWinningCombination();
        drawWinningLine(winCombination);
    }
    }
  } 

  function isGameFinished() {
    return fields.every((field) => field !== null) ||  getWinningCombination() !== null;
}

  function generateCircleSVG() {
    const animationDuration = 250; 
    const svgCode = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 5}" fill="transparent" stroke="#00B0EF" stroke-width="3">
          <animate attributeName="r" from="0" to="${width / 2 - 5}" dur="${animationDuration}ms" begin="0s" fill="freeze" />
          <animate attributeName="stroke-dasharray" from="0 188" to="188 188" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </circle>
      </svg>
    `;
    return generateAnimatedCircle(width, height);
  }  
  function generateCrossSVG() {
    const animationDuration = 250; 
    const svgCode = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 5}" fill="transparent" stroke="#00B0EF" stroke-width="3">
          <animate attributeName="r" from="0" to="${width / 2 - 5}" dur="${animationDuration}ms" begin="0s" fill="freeze" />
          <animate attributeName="stroke-dasharray" from="0 188" to="188 188" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </circle>
      </svg>
    `;
    return generateAnimatedCross(width, height);
  }  
  function generateAnimatedCircle(width, height) {
    const animationDuration = 250; 
    const svgCode = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 5}" fill="transparent" stroke="#00B0EF" stroke-width="3">
          <animate attributeName="r" from="0" to="${width / 2 - 5}" dur="${animationDuration}ms" begin="0s" fill="freeze" />
          <animate attributeName="stroke-dasharray" from="0 188" to="188 188" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </circle>
      </svg>
    `;
    return svgCode;
  }  
  const width = 70; // Breite
  const height = 70; // Höhe
  const svgContainer = document.getElementById("svg-container"); 

  function generateAnimatedCross(width, height) {
    const animationDuration = 225;
    const svgCode = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#FFC000" stroke-width="5">
          <animate attributeName="x2" from="0" to="${width}" dur="${animationDuration}ms" begin="0s" fill="freeze" />
          <animate attributeName="y2" from="0" to="${height}" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="#FFC000" stroke-width="5">
          <animate attributeName="x2" from="${width}" to="0" dur="${animationDuration}ms" begin="0s" fill="freeze" />
          <animate attributeName="y2" from="0" to="${height}" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </line>
      </svg>
    `;
    return svgCode;
  }


  function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
        return WINNING_COMBINATIONS[i];
      }
    }
    return null;
  }
  
  function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;
  
    const startCell = document.querySelectorAll('td')[combination[0]];
    const endCell = document.querySelectorAll('td')[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
  
    const lineLength = Math.sqrt(
      Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
  
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2}px`;
    line.style.left = `${startRect.left + startRect.width / 2}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    document.getElementById('content').appendChild(line);
  }