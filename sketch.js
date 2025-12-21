let idleSheet, walkSheet, jumpSheet, attackSheet, projectileSheet, partnerSheet, partner2Sheet, partner2TouchSheet, partnerSmileSheet, partnerFallSheet;
let bgImage;
let idleAnim = [];
let walkAnim = [];
let jumpAnim = [];
let attackAnim = [];
let projectileAnim = [];
let partnerAnim = [];
let partnerSmileAnim = [];
let partner2Anim = [];
let partnerFallAnim = [];
let partner2TouchAnim = [];
let projectiles = []; // 用於存放所有投射物
let partnerMessage = "需要我解答嗎?";
let inputField;
let quizTable; // 存放測驗卷資料
let currentQuestionRow = null; // 當前題目資料

// 角色位置與狀態
let characterX, characterY;
let partnerState = 'normal'; // 'normal', 'falling', 'fallen'
let partnerFallCurrentFrame = 0;
let partnerX, partnerY; // 新角色的獨立位置變數
let partner2X, partner2Y; // 右邊新角色的獨立位置變數
let speed = 5;
let direction = 'idle'; // 'idle', 'walk'
let facing = 'right';   // 'left', 'right'
let isJumping = false;
let isAttacking = false;
let jumpFrame = 0;
let jumpVelocity = 0;
let gravity = 0.6; // 新增重力變數

// 站立動畫的設定
const idleFrameCount = 7;
const idleSheetWidth = 345;
const idleSheetHeight = 94;
let idleFrameWidth;

// 走路動畫的設定
const walkFrameCount = 12;
const walkSheetWidth = 1279;
const walkSheetHeight = 92;
let walkFrameWidth;

// 跳躍動畫的設定
const jumpFrameCount = 9;
const jumpSheetWidth = 787; // 根據使用者提供的正確圖片總寬度
const jumpSheetHeight = 150;
let jumpFrameWidth;

// 攻擊動畫的設定
const attackFrameCount = 11;
const attackSheetWidth = 1623;
const attackSheetHeight = 141;
let attackFrameWidth;

// 投射物動畫的設定
const projectileFrameCount = 4;
const projectileSheetWidth = 291;
const projectileSheetHeight = 102;
let projectileFrameWidth;

// 新角色動畫的設定
const partnerFrameCount = 7;
const partnerSheetWidth = 450;
const partnerSheetHeight = 84;
let partnerFrameWidth;

// 新角色(左邊) Smile 動畫的設定
const partnerSmileFrameCount = 8;
const partnerSmileSheetWidth = 435;
const partnerSmileSheetHeight = 84;
let partnerSmileFrameWidth;

// 新角色(左邊) Fall Down 動畫的設定
const partnerFallFrameCount = 7;
const partnerFallSheetWidth = 667;
const partnerFallSheetHeight = 69;
let partnerFallFrameWidth;

// 右邊新角色動畫的設定
const partner2FrameCount = 8;
const partner2SheetWidth = 491;
const partner2SheetHeight = 70;
let partner2FrameWidth;

function preload() {
  // 預先載入站立與走路的圖片精靈檔案
  idleSheet = loadImage('1/stop/stop_all_1.png');
  walkSheet = loadImage('1/walk/walk__all_1.png');
  jumpSheet = loadImage('1/jump/jump_all_1.png');
  attackSheet = loadImage('1/發瘋/發瘋_all_1.png');
  projectileSheet = loadImage('1/特效/特效_all_1.png');
  partnerSheet = loadImage('2/stop/stop_2.png');
  partner2Sheet = loadImage('3/stop/stop_3.png');
  partner2TouchSheet = loadImage('3/touch/touch_3.png');
  partnerSmileSheet = loadImage('2/smile/smile_2.png');
  partnerFallSheet = loadImage('2/fall_down/fall_down_2.png');
  bgImage = loadImage('背景/background_1.png');
}

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 初始化角色位置在畫面中央
  characterX = windowWidth / 2;
  characterY = windowHeight - 130;

  // 初始化新角色位置 (固定在初始畫面的左方，不受主角後續移動影響)
  partnerX = characterX - 250;
  partnerY = characterY;

  // 初始化右邊新角色位置 (固定在初始畫面的右方，不受主角後續移動影響)
  partner2X = characterX + 250;
  partner2Y = characterY;

  // --- 切割站立動畫 ---
  idleFrameWidth = idleSheetWidth / idleFrameCount;
  for (let i = 0; i < idleFrameCount; i++) {
    let frame = idleSheet.get(i * idleFrameWidth, 0, idleFrameWidth, idleSheetHeight);
    idleAnim.push(frame);
  }

  // --- 切割走路動畫 ---
  walkFrameWidth = walkSheetWidth / walkFrameCount;
  for (let i = 0; i < walkFrameCount; i++) {
    let frame = walkSheet.get(i * walkFrameWidth, 0, walkFrameWidth, walkSheetHeight);
    walkAnim.push(frame);
  }

  // --- 切割跳躍動畫 ---
  jumpFrameWidth = jumpSheetWidth / jumpFrameCount; // 計算單一畫格寬度
  for (let i = 0; i < jumpFrameCount; i++) {
    let frame = jumpSheet.get(i * jumpFrameWidth, 0, jumpFrameWidth, jumpSheetHeight);
    jumpAnim.push(frame);
  }

  // --- 切割攻擊動畫 ---
  attackFrameWidth = attackSheetWidth / attackFrameCount;
  for (let i = 0; i < attackFrameCount; i++) {
    let frame = attackSheet.get(i * attackFrameWidth, 0, attackFrameWidth, attackSheetHeight);
    attackAnim.push(frame);
  }

  // --- 切割投射物動畫 ---
  projectileFrameWidth = projectileSheetWidth / projectileFrameCount;
  for (let i = 0; i < projectileFrameCount; i++) {
    let frame = projectileSheet.get(i * projectileFrameWidth, 0, projectileFrameWidth, projectileSheetHeight);
    projectileAnim.push(frame);
  }

  // --- 切割新角色動畫 ---
  partnerFrameWidth = partnerSheetWidth / partnerFrameCount;
  for (let i = 0; i < partnerFrameCount; i++) {
    let frame = partnerSheet.get(i * partnerFrameWidth, 0, partnerFrameWidth, partnerSheetHeight);
    partnerAnim.push(frame);
  }

  // --- 切割新角色(左邊) Smile 動畫 ---
  partnerSmileFrameWidth = partnerSmileSheetWidth / partnerSmileFrameCount;
  for (let i = 0; i < partnerSmileFrameCount; i++) {
    let frame = partnerSmileSheet.get(i * partnerSmileFrameWidth, 0, partnerSmileFrameWidth, partnerSmileSheetHeight);
    partnerSmileAnim.push(frame);
  }

  // --- 切割新角色(左邊) Fall Down 動畫 ---
  partnerFallFrameWidth = partnerFallSheetWidth / partnerFallFrameCount;
  for (let i = 0; i < partnerFallFrameCount; i++) {
    let frame = partnerFallSheet.get(i * partnerFallFrameWidth, 0, partnerFallFrameWidth, partnerFallSheetHeight);
    partnerFallAnim.push(frame);
  }

  // --- 切割右邊新角色動畫 ---
  partner2FrameWidth = partner2SheetWidth / partner2FrameCount;
  for (let i = 0; i < partner2FrameCount; i++) {
    let frame = partner2Sheet.get(i * partner2FrameWidth, 0, partner2FrameWidth, partner2SheetHeight);
    partner2Anim.push(frame);
  }

  // --- 切割右邊新角色 Touch 動畫 ---
  // 圖片規格與 partner2Sheet 相同 (491x70, 8 frames)
  for (let i = 0; i < partner2FrameCount; i++) {
    let frame = partner2TouchSheet.get(i * partner2FrameWidth, 0, partner2FrameWidth, partner2SheetHeight);
    partner2TouchAnim.push(frame);
  }

  // --- 產生 CSV 測驗卷資料 ---
  quizTable = new p5.Table();
  quizTable.addColumn('Question');
  quizTable.addColumn('Answer');
  quizTable.addColumn('CorrectFeedback');
  quizTable.addColumn('IncorrectFeedback');
  quizTable.addColumn('Hint');

  for (let i = 0; i < 10; i++) {
    let r = quizTable.addRow();
    let a = floor(random(0, 10)); // 0-9
    let b = floor(random(0, 10)); // 0-9
    r.setString('Question', `${a} + ${b} = ?`);
    r.setString('Answer', String(a + b));
    r.setString('CorrectFeedback', '答對了！你好棒！');
    r.setString('IncorrectFeedback', '答錯囉，再試試看！');
    r.setString('Hint', '這是個位數加法');
  }
  // 下載 CSV 檔案 (模擬產生測驗卷)
  saveTable(quizTable, 'math_quiz.csv');
}

function draw() {
  // 設定背景顏色
  image(bgImage, 0, 0, width, height);

  // --- 狀態更新與輸入處理 ---
  if (isAttacking) {
    // --- 處理攻擊邏輯 ---
    // 攻擊動畫播放速度
    let attackFrame = floor(frameCount / 4) % attackFrameCount;

    // 在動畫的最後一幀觸發投射物
    if (attackFrame === attackFrameCount - 1) {
      // 避免重複觸發，只在狀態切換時觸發一次
      if (!this.attackTriggered) {
        createProjectile();
        this.attackTriggered = true;
      }
    }

    // 攻擊動畫播放完畢後，重置狀態
    // 這裡用一個稍微延遲的計數來判斷結束
    if (floor((frameCount + 4) / 4) % attackFrameCount === 0 && this.attackTriggered) {
      isAttacking = false;
      this.attackTriggered = false; // 重置觸發器
    }

  } else if (isJumping) {
    // --- 處理跳躍邏輯 ---
    characterY += jumpVelocity;
    jumpVelocity += gravity; // 讓重力持續影響速度

    // 播放跳躍動畫
    jumpFrame += 0.2; // 控制跳躍動畫播放速度，數值越小越慢
    if (jumpFrame >= jumpFrameCount) {
      isJumping = false;
      characterY = windowHeight - 130; // 重設回地面位置
    }

    // 確保角色不會掉到地面以下
    if (characterY > windowHeight - 130) {
        characterY = windowHeight - 130;
    }
  } else {
    // --- 處理地面邏輯 (走路/站立) ---
    if (keyIsDown(DOWN_ARROW)) { // 改為按下往下鍵觸發攻擊
      isAttacking = true;
      direction = 'idle'; // 攻擊時站立
    } else if (keyIsDown(UP_ARROW)) {
      isJumping = true;
      jumpFrame = 0;
      jumpVelocity = -15; // 向上移動的初速度，負數值越大，跳得越高
    } else if (keyIsDown(RIGHT_ARROW)) {
      direction = 'walk';
      facing = 'right';
      characterX += speed;
    } else if (keyIsDown(LEFT_ARROW)) {
      direction = 'walk';
      facing = 'left';
      characterX -= speed;
    } else {
      direction = 'idle';
    }
  }

  // --- 繪製新角色 (在原角色左邊) ---
  push();
  translate(partnerX, partnerY); // 使用獨立的座標，不受鍵盤控制
  if (characterX < partnerX) {
    scale(-1, 1); // 如果主角在左邊，則面向左邊
  }

  // --- 檢查是否復活 (當主角靠近倒地的角色2時) ---
  if (partnerState !== 'normal' && dist(characterX, characterY, partnerX, partnerY) < 100) {
    partnerState = 'normal';
    partnerFallCurrentFrame = 0;
  }

  if (partnerState === 'normal') {
    // --- 正常狀態邏輯 (包含距離判斷與對話框) ---
    let dPartner = dist(characterX, characterY, partnerX, partnerY);
    let currentPartnerAnim = partnerAnim;
    let currentPartnerFrameCount = partnerFrameCount;
    let currentPartnerFrameWidth = partnerFrameWidth;

    if (dPartner < 100) {
      currentPartnerAnim = partnerSmileAnim;
      currentPartnerFrameCount = partnerSmileFrameCount;
      currentPartnerFrameWidth = partnerSmileFrameWidth;

      // 如果目前顯示預設訊息，則開始抽題
      if (partnerMessage === "需要我解答嗎?") {
        pickQuestion();
      }

      // --- 顯示角色2上方的文字 ---
      push();
      if (characterX < partnerX) {
        scale(-1, 1); // 修正文字方向，避免被角色翻轉影響文字顯示
      }
      textSize(20);
      let txtWidth = textWidth(partnerMessage);
      fill('#a8dadc');
      rectMode(CENTER);
      rect(0, -partnerSheetHeight / 2 - 40, txtWidth + 20, 40, 5); // 繪製文字背景方框，涵蓋文字
      fill(0);
      textAlign(CENTER, CENTER);
      text(partnerMessage, 0, -partnerSheetHeight / 2 - 40);
      pop();

      // --- 顯示角色1上方的輸入框 ---
      let labelText = "請作答";
      textSize(20);
      let labelW = textWidth(labelText);
      let inputW = 150;
      let padding = 10;
      
      // 計算版面配置：[黃色標籤] [輸入框]
      let labelBoxW = labelW + 20; // 標籤背景寬度
      let totalW = labelBoxW + padding + inputW;
      let startX = characterX - totalW / 2;
      let boxH = 40;
      let boxY = characterY - 150;

      push();
      resetMatrix(); // 重置矩陣，確保 UI 繪製在正確的螢幕座標上，不受角色變形影響
      rectMode(CORNER);
      fill('yellow');
      rect(startX, boxY - boxH / 2, labelBoxW, boxH, 5); // 繪製標籤背景
      fill(0);
      textAlign(CENTER, CENTER);
      text(labelText, startX + labelBoxW / 2, boxY); // 繪製標籤文字
      pop();

      if (!inputField) {
        inputField = createInput();
        inputField.size(inputW);
        inputField.changed(handleInput); // 設定按下 Enter 後的處理函式
      }
      inputField.position(startX + labelBoxW + padding, boxY - 12); // 讓輸入框跟隨角色1，位於標籤右側
    } else {
      // --- 當角色遠離時，移除輸入框並重置訊息 ---
      if (inputField) {
        inputField.remove();
        inputField = null;
        partnerMessage = "需要我解答嗎?";
        currentQuestionRow = null;
      }
    }

    let partnerFrameIndex = floor(frameCount / 12) % currentPartnerFrameCount;
    image(currentPartnerAnim[partnerFrameIndex], -currentPartnerFrameWidth / 2, -partnerSheetHeight / 2);
  } else {
    // --- 倒地狀態邏輯 ---
    // 確保輸入框被移除
    if (inputField) {
      inputField.remove();
      inputField = null;
      partnerMessage = "需要我解答嗎?";
    }

    if (partnerState === 'falling') {
      if (frameCount % 10 === 0) partnerFallCurrentFrame++;
      if (partnerFallCurrentFrame >= partnerFallFrameCount) {
        partnerFallCurrentFrame = partnerFallFrameCount - 1; // 停在最後一幀
        partnerState = 'fallen';
      }
    }
    image(partnerFallAnim[partnerFallCurrentFrame], -partnerFallFrameWidth / 2, -partnerFallSheetHeight / 2);
  }
  pop();

  // --- 繪製右邊新角色 ---
  push();
  translate(partner2X, partner2Y); // 使用獨立的座標
  if (characterX > partner2X) {
    scale(-1, 1); // 如果主角在右邊，則面向右邊
  }

  // 計算主角與角色3的距離
  let d = dist(characterX, characterY, partner2X, partner2Y);
  let currentPartner2Anim = partner2Anim;
  let partner2Speed = 12; // 預設速度

  // 當距離小於 100 時切換為 Touch 動畫 (初始距離為 100，需靠近才會觸發)
  if (d < 100) {
    currentPartner2Anim = partner2TouchAnim;
    partner2Speed = 24; // 放慢 touch 動畫速度 (數字越大越慢)
  }

  let partner2FrameIndex = floor(frameCount / partner2Speed) % partner2FrameCount;
  image(currentPartner2Anim[partner2FrameIndex], -partner2FrameWidth / 2, -partner2SheetHeight / 2);
  pop();

  // --- 根據方向繪製角色 ---
  push(); // 保存當前的繪圖設定
  translate(characterX, characterY); // 將原點移動到角色位置

  if (facing === 'left') {
    scale(-1, 1); // 水平翻轉
  }

  // --- 根據狀態選擇動畫 ---
  if (isAttacking) {
    let currentFrameIndex = floor(frameCount / 4) % attackFrameCount;
    image(attackAnim[currentFrameIndex], -attackFrameWidth / 2, -attackSheetHeight / 2);
  } else if (isJumping) {
    let currentFrameIndex = floor(jumpFrame);
    image(jumpAnim[currentFrameIndex], -jumpFrameWidth / 2, -jumpSheetHeight / 2);
  } else {
    // 地面狀態 (走路或站立)
    if (direction === 'walk') {
      let currentFrameIndex = floor(frameCount / 4) % walkFrameCount;
      image(walkAnim[currentFrameIndex], -walkFrameWidth / 2, -walkSheetHeight / 2);
    } else {
      let currentFrameIndex = floor(frameCount / 5) % idleFrameCount;
      image(idleAnim[currentFrameIndex], -idleFrameWidth / 2, -idleSheetHeight / 2);
    }
  }

  pop(); // 恢復原本的繪圖設定

  // 更新並繪製所有投射物
  updateAndDrawProjectiles();
}

function createProjectile() {
  let proj = {
    x: characterX,
    y: characterY,
    facing: facing, // 繼承角色當前的朝向
    speed: 15,
  };
  projectiles.push(proj);
}

function updateAndDrawProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let proj = projectiles[i];

    // 更新位置
    if (proj.facing === 'right') {
      proj.x += proj.speed;
    } else {
      proj.x -= proj.speed;
    }

    // --- 檢查投射物是否擊中角色2 ---
    if (partnerState === 'normal' && dist(proj.x, proj.y, partnerX, partnerY) < 60) {
      partnerState = 'falling';
      partnerFallCurrentFrame = 0;
      projectiles.splice(i, 1); // 移除投射物
      continue; // 跳過此投射物的後續繪製
    }

    // 繪製投射物
    push();
    translate(proj.x, proj.y);
    if (proj.facing === 'left') {
      scale(-1, 1); // 如果朝左，則翻轉
    }
    let currentFrameIndex = floor(frameCount / 4) % projectileFrameCount;
    image(projectileAnim[currentFrameIndex], -projectileFrameWidth / 2, -projectileSheetHeight / 2);
    pop();

    // 如果投射物超出畫面，則將其移除
    if (proj.x > windowWidth + projectileFrameWidth || proj.x < -projectileFrameWidth) {
      projectiles.splice(i, 1);
    }
  }
}

function handleInput() {
  if (inputField) {
    let val = inputField.value();
    
    if (currentQuestionRow) {
      // 比對答案 (去除前後空白)
      if (val.trim() === currentQuestionRow.getString('Answer')) {
        partnerMessage = currentQuestionRow.getString('CorrectFeedback');
        // 答對後延遲 2 秒出下一題
        setTimeout(pickQuestion, 2000);
      } else {
        partnerMessage = currentQuestionRow.getString('IncorrectFeedback');
      }
    }
    inputField.value(''); // 清空輸入框
  }
}

function pickQuestion() {
  if (quizTable && quizTable.getRowCount() > 0) {
    let r = floor(random(quizTable.getRowCount()));
    currentQuestionRow = quizTable.getRow(r);
    partnerMessage = currentQuestionRow.getString('Question');
  }
}

function windowResized() {
  // 當視窗大小改變時，自動調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  // 如果您希望角色在視窗改變大小後能保持在中間，可以取消註解以下兩行
  // characterX = windowWidth / 2;
  // characterY = windowHeight / 2;
}
