let idleSheet, walkSheet, jumpSheet, attackSheet, projectileSheet;
let idleAnim = [];
let walkAnim = [];
let jumpAnim = [];
let attackAnim = [];
let projectileAnim = [];
let projectiles = []; // 用於存放所有投射物

// 角色位置與狀態
let characterX, characterY;
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

function preload() {
  // 預先載入站立與走路的圖片精靈檔案
  idleSheet = loadImage('1/stop/stop_all_1.png');
  walkSheet = loadImage('1/walk/walk__all_1.png');
  jumpSheet = loadImage('1/jump/jump_all_1.png');
  attackSheet = loadImage('1/發瘋/發瘋_all_1.png');
  projectileSheet = loadImage('1/特效/特效_all_1.png');
}

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 初始化角色位置在畫面中央
  characterX = windowWidth / 2;
  characterY = windowHeight / 2;

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
}

function draw() {
  // 設定背景顏色
  background('#fcddf2');

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
      characterY = windowHeight / 2; // 重設回地面位置
    }

    // 確保角色不會掉到地面以下
    if (characterY > windowHeight / 2) {
        characterY = windowHeight / 2;
    }
  } else {
    // --- 處理地面邏輯 (走路/站立) ---
    if (keyIsDown(32)) { // 32 是空白鍵的 key code
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

function windowResized() {
  // 當視窗大小改變時，自動調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  // 如果您希望角色在視窗改變大小後能保持在中間，可以取消註解以下兩行
  // characterX = windowWidth / 2;
  // characterY = windowHeight / 2;
}
