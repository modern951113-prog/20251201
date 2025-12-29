let idleSheet, walkSheet, jumpSheet, attackSheet, projectileSheet, partnerSheet, partner2Sheet, partner2TouchSheet, partnerSmileSheet, partnerFallSheet;
let loginInput, loginButton; // 登入介面元件
let startButton; // 開始畫面按鈕
let userName = ''; // 使用者名稱
let bgImages = []; // 背景圖片陣列
let restartButton; // 回到過去按鈕
let lastScene = 'scene1'; // 記錄死亡時的場景
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
let partner14Sheet; // 角色14圖片
let partner14Anim = []; // 角色14動畫
let partner14Message = ''; // 角色14對話
let partner4Sheet, partner4WalkSheet, partner4FallSheet; // 角色4圖片
let partner4WalkAnim = []; // 角色4行走動畫
let partner4FallAnim = []; // 角色4倒地動畫
let partner4FallCurrentFrame = 0;
let partner4FallenStartFrame = 0; // 角色4倒地開始時間
let partner4X, partner4Y; // 角色4位置
let partner4State = 'hidden'; // 角色4狀態：'hidden', 'appearing', 'walking'
let partner4AppearFrame = 0; // 角色4出現時間點
let partner4Direction = 'right'; // 角色4行走方向
let projectiles = []; // 用於存放所有投射物
let partnerMessage = "需要我解答嗎?";
let partner2Message = ""; // 角色三的對話內容
let partner14MessageTimeout = null; // 角色14對話計時器
let inputField;
let quizTableScene1; // 第一關題庫 (數學)
let quizTableScene2; // 第二關題庫 (國文)
let quizTableScene3; // 第三關題庫 (教育科技)
let currentQuestionRow = null; // 當前題目資料
let gameState = 'loading'; // 遊戲狀態控制：'loading', 'login', 'start', 'scene1'~'scene6', 'settlement', 'gameover'
let introStartFrame = 0; // 用於計算開場白字幕的時間
let loadingStartFrame = 0; // 用於計算 Loading 畫面的時間
let fadeAlpha = 0; // 轉場遮罩透明度
let fadeState = 'none'; // 轉場狀態：'none', 'out', 'in'
let playerHealth = 3; // 玩家血量
let nextGameState = null; // 下一個遊戲狀態 (用於轉場)
let score = 0; // 遊戲分數
let correctAnswerCount = 0; // 累積答對題數
let showPortal = false; // 是否顯示傳送門

// 角色位置與狀態
let characterX, characterY;
let partnerState = 'normal'; // 'normal', 'falling', 'fallen'
let partnerFallCurrentFrame = 0;
let partnerX, partnerY; // 新角色的獨立位置變數
let partner2X, partner2Y; // 右邊新角色的獨立位置變數
let partner7X, partner7Y; // 第二關右邊角色的位置
let partner9X, partner9Y; // 第三關右邊角色的位置
let isPartner2Active = false; // 角色三是否處於互動狀態
let speed = 5;
let direction = 'idle'; // 'idle', 'walk'
let facing = 'right';   // 'left', 'right'
let isJumping = false;
let isAttacking = false;
let jumpFrame = 0;
let attackTriggered = false; // 攻擊觸發旗標
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

// 角色4動畫設定
const partner4WalkFrameCount = 4;
const partner4WalkSheetWidth = 311;
const partner4WalkSheetHeight = 104;
let partner4WalkFrameWidth;

const partner4FallFrameCount = 4;
const partner4FallSheetWidth = 455;
const partner4FallSheetHeight = 94;
let partner4FallFrameWidth;

// 角色14動畫設定
const partner14FrameCount = 12;
const partner14SheetWidth = 547;
const partner14SheetHeight = 39;
let partner14FrameWidth;

// 角色7動畫設定 (第二關)
const partner7FrameCount = 24;
const partner7SheetWidth = 1363;
const partner7SheetHeight = 106;
let partner7FrameWidth;
let partner7Sheet;
let partner7Anim = [];
let partner7AttackSheet; // 角色7攻擊圖片
let partner7AttackAnim = []; // 角色7攻擊動畫
let partner7IsAttacking = false; // 角色7是否正在攻擊
let partner7AttackCurrentFrame = 0;
let partner7ProjectileSheet; // 角色7.5 (暗刃) 圖片
let partner7ProjectileAnim = []; // 角色7.5 動畫
let partner7Projectiles = []; // 存放暗刃投射物
let characterHurtTimer = 0; // 主角受傷閃爍計時器

// 角色7勝利動畫設定
const partner7VictoryFrameCount = 20;
const partner7VictorySheetWidth = 1615;
const partner7VictorySheetHeight = 107;
let partner7VictoryFrameWidth;
let partner7VictorySheet;
let partner7VictoryAnim = [];

// 角色7攻擊動畫設定
const partner7AttackFrameCount = 17;
const partner7AttackSheetWidth = 1729;
const partner7AttackSheetHeight = 118;
let partner7AttackFrameWidth;

// 角色7.5 (暗刃) 動畫設定
const partner7ProjectileFrameCount = 11;
let partner7ProjectileFrameWidth;
let partner7ProjectileSheetHeight;

// 角色9動畫設定 (第三關)
const partner9FrameCount = 12;
const partner9SheetWidth = 487;
const partner9SheetHeight = 102;
let partner9FrameWidth;
let partner9Sheet;
let partner9Anim = [];

// 角色9攻擊動畫設定
const partner9AttackFrameCount = 12;
const partner9AttackSheetWidth = 1027;
const partner9AttackSheetHeight = 142;
let partner9AttackFrameWidth;
let partner9AttackSheet;
let partner9AttackAnim = [];
let partner9IsAttacking = false;
let partner9AttackCurrentFrame = 0;

// 角色9.5 (特效) 動畫設定
const partner9ProjectileFrameCount = 6;
let partner9ProjectileFrameWidth;
let partner9ProjectileSheetHeight;
let partner9ProjectileSheet;
let partner9ProjectileAnim = [];
let partner9Projectiles = []; // 存放角色9特效投射物

// 角色5 (愛心) 動畫設定
const partner5FrameCount = 2;
const partner5SheetWidth = 87;
const partner5SheetHeight = 35;
let partner5FrameWidth;
let partner5Sheet;
let partner5Anim = [];
let partner5X, partner5Y;
let partner5Active = false;

// 角色6 (Scene 2 跑酷敵人) 動畫設定
const partner6FrameCount = 10;
const partner6SheetWidth = 1425;
const partner6SheetHeightConst = 138;
let partner6Sheet;
let partner6Anim = [];
let partner6X, partner6Y;
let partner6State = 'hidden'; // 'hidden', 'running'
let partner6Direction = 'left'; // 'left' (從右往左跑), 'right' (從左往右跑)
let partner6NextSpawnTime = 0;
let partner6FrameWidth;
let partner6SheetHeight;

// 角色10動畫設定
const partner10FrameCount = 9;
const partner10SheetWidth = 454;
const partner10SheetHeight = 62;
let partner10FrameWidth;
let partner10Sheet;
let partner10Anim = [];
let partner10X, partner10Y;
let partner10AttackImg;
let partner10ProjectileSheet;
let partner10ProjectileAnim = [];
let partner10Projectiles = [];
let partner10State = 'idle'; // 'idle', 'attacking'
let partner10Active = false;
let partner10Timer = 0;
const partner10ProjectileFrameCount = 6;
const partner10ProjectileSheetWidth = 301;
const partner10ProjectileSheetHeight = 22;
let partner10ProjectileFrameWidth;

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
  partner4Sheet = loadImage('4/stop/0.png');
  // 修正路徑：將 work 改為 walk，並加入讀取確認
  partner4WalkSheet = loadImage('4/walk/walk_4.png', 
    () => console.log("角色4行走圖讀取成功"), 
    () => console.log("角色4行走圖讀取失敗，請檢查路徑是否為 4/walk/walk_4.png")
  );
  partner4FallSheet = loadImage('4/fall_down/fall_down_4.png');
  partner14Sheet = loadImage('14/stop/stop_14.png');
  bgImages[1] = loadImage('背景/background_1.png');
  bgImages[2] = loadImage('背景2/background_2.png',
    () => console.log("背景2讀取成功"),
    () => console.log("背景2讀取失敗，請檢查路徑是否為 背景2/background_2.png")
  );
  bgImages[3] = loadImage('背景3/background_3.png',
    () => console.log("背景3讀取成功"),
    () => console.log("背景3讀取失敗，請檢查路徑是否為 背景3/background_3.png")
  );
  partner7Sheet = loadImage('7/stop/stop_7.png');
  partner7VictorySheet = loadImage('7/勝利/勝利_7.png');
  partner7AttackSheet = loadImage('7/attack/attack_7.png');
  partner7ProjectileSheet = loadImage('7/暗刃/暗刃_7.png',
    () => console.log("暗刃圖片讀取成功"),
    () => console.log("暗刃圖片讀取失敗，請檢查路徑")
  );
  partner9Sheet = loadImage('9/stop/stop_9.png');
  partner9AttackSheet = loadImage('9/attack/attack_9.png');
  partner9ProjectileSheet = loadImage('9/特效/特效_9.png');
  partner5Sheet = loadImage('5/heart/heart_5.png');
  partner6Sheet = loadImage('6/run/run_6.png');
  partner10Sheet = loadImage('10/stop/stop_10.png');
  partner10AttackImg = loadImage('10/attack/attack_10.png');
  partner10ProjectileSheet = loadImage('10/飛盤/飛盤_10.png');
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

  // 初始化角色4 Y軸位置 (與主角相同高度)
  partner4Y = windowHeight - 130;

  // 初始化角色7位置 (第二關右邊)
  partner7X = windowWidth - 350; // 往左移一點
  partner7Y = windowHeight - 130;

  // 初始化角色9位置 (第三關右邊)
  partner9X = windowWidth - 550; // 再往左移一點
  partner9Y = windowHeight - 130;

  // 初始化角色6 Y軸位置 (與主角相同高度)
  partner6Y = windowHeight - 130;

  // 初始化角色10位置 (第三關中間)
  partner10X = windowWidth / 2;
  partner10Y = windowHeight - 130;

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

  // --- 切割角色4行走動畫 ---
  partner4WalkFrameWidth = partner4WalkSheetWidth / partner4WalkFrameCount;
  for (let i = 0; i < partner4WalkFrameCount; i++) {
    let frame = partner4WalkSheet.get(i * partner4WalkFrameWidth, 0, partner4WalkFrameWidth, partner4WalkSheetHeight);
    partner4WalkAnim.push(frame);
  }

  // --- 切割角色4倒地動畫 ---
  partner4FallFrameWidth = partner4FallSheetWidth / partner4FallFrameCount;
  for (let i = 0; i < partner4FallFrameCount; i++) {
    let frame = partner4FallSheet.get(i * partner4FallFrameWidth, 0, partner4FallFrameWidth, partner4FallSheetHeight);
    partner4FallAnim.push(frame);
  }

  // --- 切割角色14動畫 ---
  partner14FrameWidth = partner14SheetWidth / partner14FrameCount;
  for (let i = 0; i < partner14FrameCount; i++) {
    let frame = partner14Sheet.get(i * partner14FrameWidth, 0, partner14FrameWidth, partner14SheetHeight);
    partner14Anim.push(frame);
  }

  // --- 切割角色7動畫 ---
  partner7FrameWidth = partner7SheetWidth / partner7FrameCount;
  for (let i = 0; i < partner7FrameCount; i++) {
    let frame = partner7Sheet.get(i * partner7FrameWidth, 0, partner7FrameWidth, partner7SheetHeight);
    partner7Anim.push(frame);
  }

  // --- 切割角色7勝利動畫 ---
  partner7VictoryFrameWidth = partner7VictorySheetWidth / partner7VictoryFrameCount;
  for (let i = 0; i < partner7VictoryFrameCount; i++) {
    let frame = partner7VictorySheet.get(i * partner7VictoryFrameWidth, 0, partner7VictoryFrameWidth, partner7VictorySheetHeight);
    partner7VictoryAnim.push(frame);
  }

  // --- 切割角色7攻擊動畫 ---
  partner7AttackFrameWidth = partner7AttackSheetWidth / partner7AttackFrameCount;
  for (let i = 0; i < partner7AttackFrameCount; i++) {
    let frame = partner7AttackSheet.get(i * partner7AttackFrameWidth, 0, partner7AttackFrameWidth, partner7AttackSheetHeight);
    partner7AttackAnim.push(frame);
  }

  // --- 切割角色7.5 (暗刃) 動畫 ---
  // 假設暗刃圖片也是水平排列的精靈圖，寬度需從圖片物件獲取
  if (partner7ProjectileSheet.width > 0) {
    partner7ProjectileFrameWidth = partner7ProjectileSheet.width / partner7ProjectileFrameCount;
    partner7ProjectileSheetHeight = partner7ProjectileSheet.height;
    for (let i = 0; i < partner7ProjectileFrameCount; i++) {
      let frame = partner7ProjectileSheet.get(i * partner7ProjectileFrameWidth, 0, partner7ProjectileFrameWidth, partner7ProjectileSheetHeight);
      partner7ProjectileAnim.push(frame);
    }
  }

  // --- 切割角色9動畫 ---
  partner9FrameWidth = partner9SheetWidth / partner9FrameCount;
  for (let i = 0; i < partner9FrameCount; i++) {
    let frame = partner9Sheet.get(i * partner9FrameWidth, 0, partner9FrameWidth, partner9SheetHeight);
    partner9Anim.push(frame);
  }

  // --- 切割角色9攻擊動畫 ---
  partner9AttackFrameWidth = partner9AttackSheetWidth / partner9AttackFrameCount;
  for (let i = 0; i < partner9AttackFrameCount; i++) {
    let frame = partner9AttackSheet.get(i * partner9AttackFrameWidth, 0, partner9AttackFrameWidth, partner9AttackSheetHeight);
    partner9AttackAnim.push(frame);
  }

  // --- 切割角色9.5 (特效) 動畫 ---
  if (partner9ProjectileSheet.width > 0) {
    partner9ProjectileFrameWidth = partner9ProjectileSheet.width / partner9ProjectileFrameCount;
    partner9ProjectileSheetHeight = partner9ProjectileSheet.height;
    for (let i = 0; i < partner9ProjectileFrameCount; i++) {
      let frame = partner9ProjectileSheet.get(i * partner9ProjectileFrameWidth, 0, partner9ProjectileFrameWidth, partner9ProjectileSheetHeight);
      partner9ProjectileAnim.push(frame);
    }
  }

  // --- 產生 Scene 1 測驗卷資料 (數學) ---
  quizTableScene1 = new p5.Table();
  quizTableScene1.addColumn('Question');
  quizTableScene1.addColumn('Answer');
  quizTableScene1.addColumn('CorrectFeedback');
  quizTableScene1.addColumn('IncorrectFeedback');
  quizTableScene1.addColumn('Hint');

  for (let i = 0; i < 10; i++) {
    let r = quizTableScene1.addRow();
    let a = floor(random(0, 10)); // 0-9
    let b = floor(random(0, 10)); // 0-9
    r.setString('Question', `${a} + ${b} = ?`);
    r.setString('Answer', String(a + b));
    r.setString('CorrectFeedback', '答對了！你好棒！');
    r.setString('IncorrectFeedback', '答錯囉，再試試看！');
    r.setString('Hint', '這是個位數加法');
  }

  // --- 產生 Scene 2 測驗卷資料 (國文) ---
  quizTableScene2 = new p5.Table();
  quizTableScene2.addColumn('Question');
  quizTableScene2.addColumn('Answer');
  quizTableScene2.addColumn('CorrectFeedback');
  quizTableScene2.addColumn('IncorrectFeedback');
  quizTableScene2.addColumn('Hint');

  // 加入國文題目
  let chineseQuestions = [
    { q: '"日"的部首是?', a: '日', h: '部首就是它自己' },
    { q: '"林"有多少個木?', a: '2', h: '雙木成林' },
    { q: '"森"有多少個木?', a: '3', h: '三木成森' },
    { q: '"品"有多少個口?', a: '3', h: '三個口' },
    { q: '"水"的筆畫數?', a: '4', h: '中間一鉤，左右各一撇一捺' },
    { q: '"人"的筆畫數?', a: '2', h: '一撇一捺' },
    { q: '"一"的筆畫數?', a: '1', h: '最簡單的字' },
    { q: '"明"的部首是?', a: '日', h: '左邊那個字' },
    { q: '"晶"有多少個日?', a: '3', h: '三個太陽' },
    { q: '"回"有多少個口?', a: '2', h: '大口包小口' }
  ];

  for (let qData of chineseQuestions) {
    let r = quizTableScene2.addRow();
    r.setString('Question', qData.q);
    r.setString('Answer', qData.a);
    r.setString('CorrectFeedback', '答對了！國文造詣不錯！');
    r.setString('IncorrectFeedback', '再想想看喔！');
    r.setString('Hint', qData.h);
  }

  // --- 產生 Scene 3 測驗卷資料 (教育科技系常識) ---
  quizTableScene3 = new p5.Table();
  quizTableScene3.addColumn('Question');
  quizTableScene3.addColumn('Answer');
  quizTableScene3.addColumn('CorrectFeedback');
  quizTableScene3.addColumn('IncorrectFeedback');
  quizTableScene3.addColumn('Hint');

  let edTechQuestions = [
    { q: '擴增實境的縮寫?', a: 'AR', h: 'Pokemon GO' },
    { q: '虛擬實境的縮寫?', a: 'VR', h: '戴頭盔' },
    { q: '人工智慧的縮寫?', a: 'AI', h: '機器人' },
    { q: '簡報軟體簡稱?', a: 'PPT', h: 'PowerPoint' },
    { q: '無線網路的縮寫?', a: 'Wifi', h: '上網需要' },
    { q: '手機應用程式?', a: 'App', h: 'Application' },
    { q: '視訊上課軟體?', a: 'Zoom', h: '藍色圖示' },
    { q: '可攜式文件格式?', a: 'PDF', h: '不易跑版的文件' },
    { q: '電子書的英文?', a: 'Ebook', h: 'E開頭' },
    { q: '全球資訊網?', a: 'WWW', h: '網址開頭' }
  ];

  for (let qData of edTechQuestions) {
    let r = quizTableScene3.addRow();
    r.setString('Question', qData.q);
    r.setString('Answer', qData.a);
    r.setString('CorrectFeedback', '答對了！專業喔！');
    r.setString('IncorrectFeedback', '再想想看，這是常識喔！');
    r.setString('Hint', qData.h);
  }
}

function draw() {
  if (characterHurtTimer > 0) characterHurtTimer--;

  if (gameState === 'loading') {
    drawLoading();
  } else if (gameState === 'intro') {
    drawIntro();
  } else if (gameState === 'intro2') {
    drawIntro2();
  } else if (gameState === 'login') {
    drawLogin();
  } else if (gameState === 'outro') {
    drawOutro();
  } else if (gameState === 'start') {
    drawStartScreen();
  } else if (gameState === 'settlement') {
    drawSettlement();
  } else if (gameState === 'gameover') {
    drawGameOver();
  } else if (gameState.startsWith('scene')) {
    drawGameScene();
  }

  handleFadeEffect(); // 處理轉場淡入淡出效果
}

function drawLoading() {
  background(255); // 白底
  
  // 繪製旋轉的 Loading 圖示
  push();
  translate(width / 2, height / 2 - 50);
  
  // --- 程式化繪製 Loading 動畫 (模仿向量圖示) ---
  let numDots = 12; // 圓點數量
  let radius = 40;  // 圓圈半徑
  
  for (let i = 0; i < numDots; i++) {
    let angle = TWO_PI / numDots * i;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    
    // 產生波浪效果：讓圓點的大小和透明度隨時間變化，產生旋轉感
    // frameCount * 0.15 控制旋轉速度
    // i * 0.5 控制波浪的相位差
    let wave = sin(frameCount * 0.15 + i * 0.5);
    
    // 根據波浪值計算大小 (3px ~ 12px)
    let dotSize = map(wave, -1, 1, 3, 12);
    // 根據波浪值計算透明度 (讓小的點變淡)
    let alpha = map(wave, -1, 1, 50, 255);
    
    noStroke();
    fill(0, alpha); // 黑色圓點
    ellipse(x, y, dotSize, dotSize);
  }
  pop();

  // 繪製 Loading 文字
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Loading...", width / 2, height / 2 + 50);

  // 模擬讀取時間，3秒後進入登入畫面
  if (frameCount - loadingStartFrame > 180) {
    gameState = 'intro';
    introStartFrame = frameCount; // 記錄進入開場白的時間點
  }
}

function drawIntro() {
  background(0); // 全黑背景
  textSize(32);
  textAlign(CENTER, CENTER);

  let elapsed = frameCount - introStartFrame;
  let duration = 180; // 每句話停留 3 秒 (60fps * 3)
  let fadeTime = 60; // 消失淡出時間 (最後 1 秒)

  let sentences = [
    "時間不知道過去多久",
    "頭很暈，骨頭感覺要散了",
    "但機會總是不等人的"
  ];

  let index = floor(elapsed / duration);
  
  if (index < sentences.length) {
    let localTime = elapsed % duration;
    let alpha = 255;
    
    // 如果進入最後 fadeTime 幀，開始淡出
    if (localTime > duration - fadeTime) {
      alpha = map(localTime, duration - fadeTime, duration, 255, 0);
    }
    
    fill(255, alpha); // 設定文字透明度
    text(sentences[index], width / 2, height / 2);
  } else {
    // 播放完畢，進入登入畫面顯示最後一句
    gameState = 'login';
  }
}

function drawOutro() {
  background(0); // 全黑背景
  textSize(32);
  textAlign(CENTER, CENTER);

  let elapsed = frameCount - introStartFrame; // 重用 introStartFrame 作為計時起點
  let duration = 180; // 每句話停留 3 秒
  let fadeTime = 60; // 淡入淡出時間

  let sentences = [
    "恭喜你，你做到了",
    "沒想到進展會如此的順利，但這不過是剛開始",
    "惡夢還在繼續進行",
    "你...逃...不...了"
  ];

  let index = floor(elapsed / duration);
  
  if (index < sentences.length) {
    let localTime = elapsed % duration;
    let alpha = 0;

    // 淡入 (前 1 秒)
    if (localTime < fadeTime) {
      alpha = map(localTime, 0, fadeTime, 0, 255);
    } 
    // 淡出 (後 1 秒)
    else if (localTime > duration - fadeTime) {
      alpha = map(localTime, duration - fadeTime, duration, 255, 0);
    } else {
      alpha = 255;
    }
    
    if (index === 3) {
      fill(255, 0, 0, alpha); // 最後一句用紅色
    } else {
      fill(255, alpha);
    }
    text(sentences[index], width / 2, height / 2);
  } else {
    gameState = 'settlement';
  }
}

function drawIntro2() {
  background(0); // 全黑背景
  textSize(32);
  textAlign(CENTER, CENTER);

  let elapsed = frameCount - introStartFrame;
  let duration = 180; // 每句話停留 3 秒
  let fadeTime = 60; // 消失淡出時間 (最後 1 秒)

  let sentences = [
    `${userName}嗎？有趣`,
    "希望你不會讓我失望",
    "好好享受這個世界吧，如果你準備好了的話……"
  ];

  let index = floor(elapsed / duration);
  
  // 修改邏輯：前兩句播放完淡出，最後一句停留並顯示按鈕
  if (index < sentences.length - 1) {
    let localTime = elapsed % duration;
    let alpha = 255;
    
    if (localTime > duration - fadeTime) {
      alpha = map(localTime, duration - fadeTime, duration, 255, 0);
    }
    
    fill(255, alpha);
    text(sentences[index], width / 2, height / 2);
  } else {
    // 顯示最後一句 (不淡出，持續顯示)
    fill(255);
    text(sentences[sentences.length - 1], width / 2, height / 2);

    // 計算最後一句開始後經過的時間
    let lastSentenceStartTime = (sentences.length - 1) * duration;
    let timeInLastSentence = elapsed - lastSentenceStartTime;

    // 2秒 (120 frames) 後顯示按鈕
    if (timeInLastSentence > 120 && fadeState === 'none') {
      if (!startButton) {
        startButton = createButton('開始遊戲');
        startButton.position(width / 2 - 60, height / 2 + 60); // 按鈕位置在文字下方
        startButton.size(120, 50);
        startButton.style('font-size', '20px');
        startButton.style('background-color', '#e63946');
        startButton.style('color', 'white');
        startButton.style('border', 'none');
        startButton.style('border-radius', '10px');
        startButton.mousePressed(() => {
          // 開始淡出轉場
          fadeState = 'out';
          fadeAlpha = 0;
          nextGameState = 'scene1'; // 設定轉場目標
          startButton.remove();
          startButton = null;
        });
      }
    }
  }
}

function handleFadeEffect() {
  if (fadeState === 'none') return;

  if (fadeState === 'out') {
    fadeAlpha += 3; // 淡出速度 (數字越小越慢)
    if (fadeAlpha >= 255) {
      fadeAlpha = 255;
      
      // 轉場邏輯：根據 nextGameState 決定下一步
      if (nextGameState === 'restart') {
        resetLevel();
      } else if (nextGameState === 'next_level') {
        switchScene();
      } else if (nextGameState === 'outro') {
        gameState = 'outro';
        introStartFrame = frameCount; // 重置計時器
      } else if (nextGameState === 'reset_game') {
        resetGame();
      } else if (nextGameState) {
        gameState = nextGameState;
      }
      
      nextGameState = null; // 重置目標
      fadeState = 'in'; // 開始淡入
    }
  } else if (fadeState === 'in') {
    fadeAlpha -= 3; // 淡入速度
    if (fadeAlpha <= 0) {
      fadeAlpha = 0;
      fadeState = 'none';
    }
  }

  // 繪製全螢幕黑色遮罩
  push();
  fill(0, fadeAlpha);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();
}

function drawLogin() {
  background(0); // 延續開場白的黑色背景
  fill(255); // 白色文字
  textSize(32);
  textAlign(CENTER, CENTER);
  // 第四句台詞，停留在畫面上
  text("無法猶豫，趕快想起自己是誰", width / 2, height / 2 - 80);

  // 建立輸入框 (只建立一次)
  if (!loginInput) {
    loginInput = createInput();
    loginInput.position(width / 2 - 100, height / 2 - 20);
    loginInput.size(200, 30);
    loginInput.style('font-size', '16px');
  }

  // 建立確認按鈕 (只建立一次)
  if (!loginButton) {
    loginButton = createButton('確認');
    loginButton.position(width / 2 - 50, height / 2 + 40);
    loginButton.size(100, 40);
    loginButton.style('font-size', '16px');
    loginButton.mousePressed(enterStartScreen);
  }
}

function enterStartScreen() {
  const name = loginInput.value().trim();
  if (name !== "") {
    userName = name;
    gameState = 'intro2'; // 進入第二段開場白
    introStartFrame = frameCount; // 重置計時器
    
    // 移除登入介面元件，避免殘留在畫面上
    loginInput.remove();
    loginButton.remove();
    loginInput = null;
    loginButton = null;
  } else {
    alert("趕快想起自己是誰！");
  }
}

function drawStartScreen() {
  background('#f1faee');
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`歡迎, ${userName}!`, width / 2, height / 2 - 50);
  textSize(24);
  text("點擊畫面開始遊戲", width / 2, height / 2 + 50);
  text("準備好開始冒險了嗎?", width / 2, height / 2 + 20);

  // 點擊畫面進入第一關
  // 建立開始遊戲按鈕
  if (!startButton) {
    startButton = createButton('開始遊戲');
    startButton.position(width / 2 - 60, height / 2 + 60);
    startButton.size(120, 50);
    startButton.style('font-size', '20px');
    startButton.style('background-color', '#e63946');
    startButton.style('color', 'white');
    startButton.style('border', 'none');
    startButton.style('border-radius', '10px');
    startButton.mousePressed(() => {
      gameState = 'scene1';
      startButton.remove();
      startButton = null;
    });
  }
}

function drawGameScene() {
  // 檢查是否 Game Over
  if (playerHealth <= 0) {
    if (fadeState === 'none') {
      lastScene = gameState;
      // 死亡時立刻移除輸入框，避免殘留在 Game Over 畫面
      if (inputField) {
        inputField.remove();
        inputField = null;
        partnerMessage = "需要我解答嗎?";
        currentQuestionRow = null;
      }
      fadeState = 'out';
      fadeAlpha = 0;
      nextGameState = 'gameover'; // 設定轉場目標為 Game Over
    }
    // 繼續繪製場景以便顯示淡出效果，但不進行後續互動邏輯
  }

  let currentSceneNum = parseInt(gameState.replace('scene', ''));
  // 設定背景顏色
  if (bgImages[currentSceneNum]) {
    image(bgImages[currentSceneNum], 0, 0, width, height);
  }

  // 繪製傳送門 (如果條件達成)
  drawPortal();

  // --- 角色4 邏輯 ---
  // 當答對 3 題後，觸發角色4出現
  // 限制只在第一關出現
  if (currentSceneNum === 1 && correctAnswerCount >= 3) {
    if (partner4State === 'hidden') {
      partner4State = 'appearing';
      partner4AppearFrame = frameCount;
      partner4X = 50; // 從畫面左邊出現
    }
  }
  // 繪製角色4 (只在第一關)
  if (currentSceneNum === 1 && partner4State !== 'hidden' && partner4State !== 'defeated') {
    push();
    translate(partner4X, partner4Y);
    scale(1.5); // 放大角色4
    
    // 統一處理方向翻轉 (包含行走與倒地)
    if (partner4Direction === 'left') {
      scale(-1, 1); // 面向左邊時翻轉
    }

    if (partner4State === 'appearing') {
      // 靜止 3 秒 (180 frames)
      imageMode(CENTER);
      // 確保圖片已載入
      if (partner4Sheet.width > 1) {
         image(partner4Sheet, 0, 0);
      }
      
      if (frameCount - partner4AppearFrame > 180) {
        partner4State = 'walking';
      }
    } else if (partner4State === 'walking') {
      // 行走邏輯
      let p4Speed = 3;
      if (partner4Direction === 'right') {
        partner4X += p4Speed;
        // 走到最右邊轉向
        if (partner4X > width - 50) {
          partner4Direction = 'left';
        }
      } else {
        partner4X -= p4Speed;
        // 走到最左邊轉向
        if (partner4X < 50) {
          partner4Direction = 'right';
        }
      }
      
      let p4FrameIndex = floor(frameCount / 10) % partner4WalkFrameCount;
      image(partner4WalkAnim[p4FrameIndex], -partner4WalkFrameWidth/2, -partner4WalkSheetHeight/2);
    } else if (partner4State === 'falling') {
      if (frameCount % 10 === 0) partner4FallCurrentFrame++;
      if (partner4FallCurrentFrame >= partner4FallFrameCount) {
        partner4FallCurrentFrame = partner4FallFrameCount - 1;
        partner4State = 'fallen';
        partner4FallenStartFrame = frameCount; // 記錄倒地開始時間
      }
      image(partner4FallAnim[partner4FallCurrentFrame], -partner4FallFrameWidth/2, -partner4FallSheetHeight/2);
    } else if (partner4State === 'fallen') {
      // 倒地後閃爍消失邏輯
      let elapsed = frameCount - partner4FallenStartFrame;
      
      if (elapsed > 120) { // 2秒後消失 (狀態改為 defeated)
        partner4State = 'defeated';
      } else {
        // 如果超過 60 frames (1秒)，且處於閃爍的 "關" 週期，則不繪製 (產生閃爍效果)
        let isBlinking = elapsed > 60 && floor(elapsed / 5) % 2 === 0;
        if (!isBlinking) {
          image(partner4FallAnim[partner4FallFrameCount - 1], -partner4FallFrameWidth/2, -partner4FallSheetHeight/2);
        }
      }
    }
    pop();
  }

  // --- 狀態更新與輸入處理 ---
  // 檢查是否過關 (走到最右邊 且 傳送門已開啟)
  if (characterX > width - 50 && showPortal) {
    // 觸發淡出轉場，而不是直接切換場景
    if (fadeState === 'none') {
      fadeState = 'out';
      fadeAlpha = 0;
      
      if (currentSceneNum === 3) {
        nextGameState = 'outro'; // 第三關結束進入結局
      } else {
        nextGameState = 'next_level'; // 其他關卡進入下一關
      }
    }
  }

  if (isAttacking) {
    // --- 處理攻擊邏輯 ---
    // 攻擊動畫播放速度
    let attackFrame = floor(frameCount / 4) % attackFrameCount;

    // 在動畫的最後一幀觸發投射物
    if (attackFrame === attackFrameCount - 1) {
      // 避免重複觸發，只在狀態切換時觸發一次
      if (!attackTriggered) {
        createProjectile();
        attackTriggered = true;
      }
    }

    // 攻擊動畫播放完畢後，重置狀態
    // 這裡用一個稍微延遲的計數來判斷結束
    if (floor((frameCount + 4) / 4) % attackFrameCount === 0 && attackTriggered) {
      isAttacking = false;
      attackTriggered = false; // 重置觸發器
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
  // 只有在第一關才繪製角色2 (Partner)
  if (currentSceneNum === 1) {
  push();
  translate(partnerX, partnerY); // 使用獨立的座標，不受鍵盤控制
  scale(1.5); // 放大角色2
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

    if (dPartner < 100 && playerHealth > 0) {
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
      let boxY = characterY - 250;

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
  }

  // --- 繪製右邊新角色 ---
  // 只有在第一關才繪製角色3 (Partner2)
  if (currentSceneNum === 1) {
  push();
  translate(partner2X, partner2Y); // 使用獨立的座標
  scale(1.5); // 放大角色3
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

    // --- 角色三對話邏輯 ---
    if (!isPartner2Active) {
      let msgs = ["看我幹嘛，我才不會告訴你答案", "這麼簡單也不會嗎？", "我臉上才不會有答案，用腦袋好好想想"];
      partner2Message = random(msgs);
      isPartner2Active = true;
    }

    // 繪製對話框
    push();
    if (characterX > partner2X) {
      scale(-1, 1); // 修正文字方向
    }
    textSize(20);
    let txtWidth = textWidth(partner2Message);
    fill('#a8dadc');
    rectMode(CENTER);
    rect(0, -partner2SheetHeight / 2 - 40, txtWidth + 20, 40, 5); // 對話框背景
    fill(0);
    textAlign(CENTER, CENTER);
    text(partner2Message, 0, -partner2SheetHeight / 2 - 40);
    pop();
  } else {
    isPartner2Active = false; // 離開範圍後重置，下次靠近會換一句話
  }

  let partner2FrameIndex = floor(frameCount / partner2Speed) % partner2FrameCount;
  image(currentPartner2Anim[partner2FrameIndex], -partner2FrameWidth / 2, -partner2SheetHeight / 2);
  pop();
  }

  // --- 繪製第二關右邊新角色 (角色7) ---
  if (currentSceneNum === 2) {
    push();
    translate(partner7X, partner7Y);
    scale(1.5); // 放大角色7
    // 角色7預設面朝左邊。如果主角在右邊(跳過去了)，則翻轉面朝右。
    // 修正：改為當主角在左邊時翻轉 (假設原圖朝右，需翻轉朝左看主角)
    if (characterX < partner7X) {
      scale(-1, 1); 
    }

    // 計算主角與角色7的距離
    let d7 = dist(characterX, characterY, partner7X, partner7Y);
    
    // 互動邏輯
    if (d7 < 200 && playerHealth > 0) {
      // 如果目前顯示預設訊息，則開始抽題
      if (partnerMessage === "需要我解答嗎?") {
        pickQuestion();
      }

      // --- 顯示角色7上方的文字 ---
      push();
      if (characterX < partner7X) {
        scale(-1, 1); // 修正文字方向 (因為角色被翻轉了，文字要翻回來)
      }
      textSize(20);
      let txtWidth = textWidth(partnerMessage);
      fill('#a8dadc');
      rectMode(CENTER);
      rect(0, -partner7SheetHeight / 2 - 40, txtWidth + 20, 40, 5);
      fill(0);
      textAlign(CENTER, CENTER);
      text(partnerMessage, 0, -partner7SheetHeight / 2 - 40);
      pop();

      // --- 顯示主角上方的輸入框 ---
      let labelText = "請作答";
      textSize(20);
      let labelW = textWidth(labelText);
      let inputW = 150;
      let padding = 10;
      let labelBoxW = labelW + 20;
      let totalW = labelBoxW + padding + inputW;
      let startX = characterX - totalW / 2;
      let boxH = 40;
      let boxY = characterY - 250;

      push();
      resetMatrix();
      rectMode(CORNER);
      fill('yellow');
      rect(startX, boxY - boxH / 2, labelBoxW, boxH, 5);
      fill(0);
      textAlign(CENTER, CENTER);
      text(labelText, startX + labelBoxW / 2, boxY);
      pop();

      if (!inputField) {
        inputField = createInput();
        inputField.size(inputW);
        inputField.changed(handleInput);
      }
      inputField.position(startX + labelBoxW + padding, boxY - 12);
    } else {
      // --- 當角色遠離時，移除輸入框並重置訊息 ---
      // 只有在第二關且沒有其他互動時才移除 (這裡簡化處理，假設同一時間只有一個互動)
      if (inputField && currentSceneNum === 2) {
        inputField.remove();
        inputField = null;
        partnerMessage = "需要我解答嗎?";
        currentQuestionRow = null;
      }
    }

    // 繪製角色7動畫 (速度設為 4)
    let currentAnim = partner7Anim;
    let currentFrameCount = partner7FrameCount;
    let currentFrameWidth = partner7FrameWidth;
    let currentSheetHeight = partner7SheetHeight;
    let currentFrameIndex = 0;

    if (partner7IsAttacking) {
      // --- 攻擊狀態 ---
      currentAnim = partner7AttackAnim;
      currentFrameCount = partner7AttackFrameCount;
      currentFrameWidth = partner7AttackFrameWidth;
      currentSheetHeight = partner7AttackSheetHeight;
      
      // 播放攻擊動畫
      partner7AttackCurrentFrame += 0.25; // 控制播放速度
      if (partner7AttackCurrentFrame >= partner7AttackFrameCount) {
        partner7IsAttacking = false; // 播放完畢，回復原狀
        partner7AttackCurrentFrame = 0;
      }
      currentFrameIndex = floor(partner7AttackCurrentFrame);
    } else if (correctAnswerCount >= 3) {
      currentAnim = partner7VictoryAnim;
      currentFrameCount = partner7VictoryFrameCount;
      currentFrameWidth = partner7VictoryFrameWidth;
      currentSheetHeight = partner7VictorySheetHeight;
      currentFrameIndex = floor(frameCount / 4) % currentFrameCount;
    } else {
      // --- 站立狀態 ---
      currentFrameIndex = floor(frameCount / 4) % currentFrameCount;
    }

    image(currentAnim[currentFrameIndex], -currentFrameWidth / 2, -currentSheetHeight / 2);
    pop();
  }

  // --- 繪製角色6 (Scene 2 跑酷敵人) ---
  if (currentSceneNum === 2) {
    // 延遲初始化動畫 (防止 setup 時圖片未載入)
    if (partner6Anim.length === 0 && partner6Sheet.width > 0) {
      partner6FrameWidth = partner6SheetWidth / partner6FrameCount;
      partner6SheetHeight = partner6SheetHeightConst;
      for (let i = 0; i < partner6FrameCount; i++) {
        partner6Anim.push(partner6Sheet.get(i * partner6FrameWidth, 0, partner6FrameWidth, partner6SheetHeight));
      }
    }

    // 生成邏輯：時間到且處於隱藏狀態時生成
    if (partner6State === 'hidden' && millis() > partner6NextSpawnTime) {
      partner6State = 'running';
      if (partner6Direction === 'left') {
        partner6X = width + 100; // 從右邊出現
      } else {
        partner6X = -100; // 從左邊出現
      }
    }

    // 移動與繪製
    if (partner6State === 'running') {
      let p6Speed = 12; // 奔跑速度
      if (partner6Direction === 'left') {
        partner6X -= p6Speed;
        // 跑出左邊視窗
        if (partner6X < -200) {
          partner6State = 'hidden';
          partner6Direction = 'right'; // 下次改為向右跑
          partner6NextSpawnTime = millis() + 15000; // 15秒後再生
        }
      } else {
        partner6X += p6Speed;
        // 跑出右邊視窗
        if (partner6X > width + 200) {
          partner6State = 'hidden';
          partner6Direction = 'left'; // 下次改為向左跑
          partner6NextSpawnTime = millis() + 15000; // 15秒後再生
        }
      }

      push();
      translate(partner6X, partner6Y);
      scale(1.5); // 放大角色6
      // 根據方向翻轉 (假設原圖朝右)
      if (partner6Direction === 'left') {
        scale(-1, 1); 
      } else {
        scale(1, 1);
      }
      
      if (partner6Anim.length > 0) {
        let idx = floor(frameCount / 4) % partner6Anim.length;
        image(partner6Anim[idx], -partner6FrameWidth/2, -partner6SheetHeight/2);
      }
      pop();

      // 碰撞偵測 (碰到主角)
      if (dist(characterX, characterY, partner6X, partner6Y) < 80) {
        if (characterHurtTimer === 0) {
          playerHealth = max(0, playerHealth - 1); // 扣血
          score = max(0, score - 30); // 扣分
          characterHurtTimer = 60; // 閃爍無敵時間
        }
      }
    }
  }

  // --- 繪製第三關右邊新角色 (角色9) ---
  if (currentSceneNum === 3) {
    push();
    translate(partner9X, partner9Y);
    scale(1.5); // 放大角色9
    // 角色9預設面朝左邊 (假設)。如果主角在左邊，則保持面朝左。
    // 如果原圖是朝右的，這裡需要根據實際圖片調整。假設原圖朝右，則需翻轉。
    if (characterX < partner9X) {
      scale(-1, 1); 
    }

    // 計算主角與角色9的距離
    let d9 = dist(characterX, characterY, partner9X, partner9Y);
    
    // 互動邏輯
    if (d9 < 200 && playerHealth > 0) {
      if (partnerMessage === "需要我解答嗎?") {
        pickQuestion();
      }

      // --- 顯示角色9上方的文字 ---
      push();
      if (characterX < partner9X) {
        scale(-1, 1); 
      }
      textSize(20);
      let txtWidth = textWidth(partnerMessage);
      fill('#a8dadc');
      rectMode(CENTER);
      rect(0, -partner9SheetHeight / 2 - 40, txtWidth + 20, 40, 5);
      fill(0);
      textAlign(CENTER, CENTER);
      text(partnerMessage, 0, -partner9SheetHeight / 2 - 40);
      pop();

      // --- 顯示主角上方的輸入框 ---
      let labelText = "請作答";
      textSize(20);
      let labelW = textWidth(labelText);
      let inputW = 150;
      let padding = 10;
      let labelBoxW = labelW + 20;
      let totalW = labelBoxW + padding + inputW;
      let startX = characterX - totalW / 2;
      let boxH = 40;
      let boxY = characterY - 250;

      push();
      resetMatrix();
      rectMode(CORNER);
      fill('yellow');
      rect(startX, boxY - boxH / 2, labelBoxW, boxH, 5);
      fill(0);
      textAlign(CENTER, CENTER);
      text(labelText, startX + labelBoxW / 2, boxY);
      pop();

      if (!inputField) {
        inputField = createInput();
        inputField.size(inputW);
        inputField.changed(handleInput);
      }
      inputField.position(startX + labelBoxW + padding, boxY - 12);
    } else {
      if (inputField && currentSceneNum === 3) {
        inputField.remove();
        inputField = null;
        partnerMessage = "需要我解答嗎?";
        currentQuestionRow = null;
      }
    }

    // 繪製角色9動畫 (包含攻擊狀態)
    let current9Anim = partner9Anim;
    let current9FrameCount = partner9FrameCount;
    let current9FrameWidth = partner9FrameWidth;
    let current9SheetHeight = partner9SheetHeight;
    let current9FrameIndex = 0;

    if (partner9IsAttacking) {
      current9Anim = partner9AttackAnim;
      current9FrameCount = partner9AttackFrameCount;
      current9FrameWidth = partner9AttackFrameWidth;
      current9SheetHeight = partner9AttackSheetHeight;

      partner9AttackCurrentFrame += 0.25;
      if (partner9AttackCurrentFrame >= partner9AttackFrameCount) {
        partner9IsAttacking = false;
        partner9AttackCurrentFrame = 0;
      }
      current9FrameIndex = floor(partner9AttackCurrentFrame);
    } else {
      current9FrameIndex = floor(frameCount / 4) % current9FrameCount;
    }

    image(current9Anim[current9FrameIndex], -current9FrameWidth / 2, -current9SheetHeight / 2);
    pop();
  }

  // --- 繪製第三關中間新角色 (角色10) ---
  if (currentSceneNum === 3) {
    // 延遲初始化動畫 (防止 setup 時圖片未載入)
    if (partner10Anim.length === 0 && partner10Sheet.width > 0) {
      partner10FrameWidth = partner10SheetWidth / partner10FrameCount;
      for (let i = 0; i < partner10FrameCount; i++) {
        let frame = partner10Sheet.get(i * partner10FrameWidth, 0, partner10FrameWidth, partner10SheetHeight);
        partner10Anim.push(frame);
      }
    }

    // --- 檢查角色10.5 (飛盤) 動畫是否已載入 ---
    // 防止 setup 時圖片未載入導致動畫陣列為空
    if (partner10ProjectileAnim.length === 0 && partner10ProjectileSheet.width > 0) {
      partner10ProjectileFrameWidth = partner10ProjectileSheet.width / partner10ProjectileFrameCount;
      for (let i = 0; i < partner10ProjectileFrameCount; i++) {
        partner10ProjectileAnim.push(partner10ProjectileSheet.get(i * partner10ProjectileFrameWidth, 0, partner10ProjectileFrameWidth, partner10ProjectileSheetHeight));
      }
    }

    // --- 角色10 邏輯 ---
    // 偵測玩家移動觸發
    if (!partner10Active && keyIsDown(RIGHT_ARROW)) {
      partner10Active = true;
      partner10State = 'attacking';
      partner10Timer = millis();
      // 發射飛盤
      partner10Projectiles.push({ x: partner10X - 50, y: partner10Y - 30, frame: 0, hasHit: false }); // y位置往上移30
    }

    // 狀態機循環
    if (partner10Active) {
      if (partner10State === 'attacking') {
        if (millis() - partner10Timer > 3000) { // 攻擊 3 秒
          partner10State = 'idle';
          partner10Timer = millis();
        }
      } else {
        if (millis() - partner10Timer > 5000) { // 休息 5 秒
          partner10State = 'attacking';
          partner10Timer = millis();
          // 發射飛盤
          partner10Projectiles.push({ x: partner10X - 50, y: partner10Y - 30, frame: 0, hasHit: false }); // y位置往上移30
        }
      }
    }

    push();
    translate(partner10X, partner10Y);
    scale(1.5); // 放大角色10
    scale(-1, 1); // 面朝左邊 (假設原圖朝右)
    
    if (partner10State === 'attacking') {
      // 顯示攻擊圖片 (64x66)
      image(partner10AttackImg, -32, -33);
    } else {
      // 顯示站立動畫
      if (partner10Anim.length > 0) {
        let idx = floor(frameCount / 10) % partner10FrameCount;
        image(partner10Anim[idx], -partner10FrameWidth/2, -partner10SheetHeight/2);
      }
    }
    pop();

    // --- 繪製角色10.5 (飛盤) ---
    for (let i = partner10Projectiles.length - 1; i >= 0; i--) {
      let p = partner10Projectiles[i];
      
      p.x -= 8; // 向左移動
      p.frame += 0.2; // 動畫播放速度
      
      push();
      translate(p.x, p.y);
      scale(1.5); // 放大角色10.5 (飛盤)
      let idx = floor(p.frame);
      if (idx < partner10ProjectileFrameCount && partner10ProjectileAnim.length > 0) {
        image(partner10ProjectileAnim[idx], -partner10ProjectileFrameWidth/2, -partner10ProjectileSheetHeight/2);
      }
      pop();

      // 碰撞偵測
      if (!p.hasHit && dist(p.x, p.y, characterX, characterY) < 60) {
        playerHealth = max(0, playerHealth - 1);
        characterHurtTimer = 60;
        p.hasHit = true; // 標記已擊中，但不移除
      }

      // 動畫播放完畢後移除
      if (p.frame >= partner10ProjectileFrameCount) {
        partner10Projectiles.splice(i, 1);
      }
    }
  }

  // --- 檢查角色9.5 (特效) 動畫是否已載入 ---
  if (partner9ProjectileAnim.length === 0 && partner9ProjectileSheet.width > 0) {
    partner9ProjectileFrameWidth = partner9ProjectileSheet.width / partner9ProjectileFrameCount;
    partner9ProjectileSheetHeight = partner9ProjectileSheet.height;
    for (let i = 0; i < partner9ProjectileFrameCount; i++) {
      let frame = partner9ProjectileSheet.get(i * partner9ProjectileFrameWidth, 0, partner9ProjectileFrameWidth, partner9ProjectileSheetHeight);
      partner9ProjectileAnim.push(frame);
    }
  }

  // --- 繪製角色9.5 (特效) ---
  for (let i = partner9Projectiles.length - 1; i >= 0; i--) {
    let p = partner9Projectiles[i];
    
    // 更新位置 (根據方向飛行)
    if (p.direction === 'left') {
      p.x -= 10;
    } else {
      p.x += 10;
    }
    
    p.frame += 0.15;
    
    push();
    translate(p.x, p.y);
    scale(1.5); // 放大角色9.5 (特效)
    if (p.direction === 'left') {
      scale(-1, 1);
    } else {
      scale(1, 1);
    }
    
    let idx = floor(p.frame);
    if (idx < partner9ProjectileFrameCount && partner9ProjectileAnim.length > 0) {
      image(partner9ProjectileAnim[idx], -partner9ProjectileFrameWidth/2, -partner9ProjectileSheetHeight/2);
    }
    pop();

    // 碰撞偵測
    if (!p.hasHit && dist(p.x, p.y, characterX, characterY) < 80) {
      playerHealth = max(0, playerHealth - 1);
      score = max(0, score - 30);
      characterHurtTimer = 60;
      p.hasHit = true;
    }

    // 動畫播放完畢後消失
    if (p.frame >= partner9ProjectileFrameCount) {
      partner9Projectiles.splice(i, 1);
    }
  }

  // --- 繪製角色5 (愛心) ---
  if ((currentSceneNum === 2 || currentSceneNum === 3) && partner5Active) {
    // 檢查動畫是否已載入 (延遲初始化)，防止 setup 未完成或圖片未載入導致的錯誤
    if (partner5Anim.length === 0 && partner5Sheet.width > 0) {
      partner5FrameWidth = partner5SheetWidth / partner5FrameCount;
      for (let i = 0; i < partner5FrameCount; i++) {
        let frame = partner5Sheet.get(i * partner5FrameWidth, 0, partner5FrameWidth, partner5SheetHeight);
        partner5Anim.push(frame);
      }
    }

    push();
    translate(partner5X, partner5Y);
    scale(1.5); // 放大角色5 (愛心)
    // 加入安全檢查：只有當動畫陣列有內容時才繪製
    if (partner5Anim.length > 0) {
      let p5FrameIndex = floor(frameCount / 10) % partner5FrameCount;
      image(partner5Anim[p5FrameIndex], -partner5FrameWidth / 2, -partner5SheetHeight / 2);
    }
    pop();

    // 碰撞偵測 (碰到主角)
    if (dist(characterX, characterY, partner5X, partner5Y) < 60) {
      if (playerHealth < 3) {
        playerHealth++; // 加血
        score += 25; // 加分
        partner5Active = false; // 愛心消失
      }
    }
  }

  // --- 檢查暗刃動畫是否已載入 (延遲初始化) ---
  // 如果 setup 時圖片還沒準備好導致陣列為空，這裡會補救
  if (partner7ProjectileAnim.length === 0 && partner7ProjectileSheet.width > 0) {
    partner7ProjectileFrameWidth = partner7ProjectileSheet.width / partner7ProjectileFrameCount;
    partner7ProjectileSheetHeight = partner7ProjectileSheet.height;
    for (let i = 0; i < partner7ProjectileFrameCount; i++) {
      let frame = partner7ProjectileSheet.get(i * partner7ProjectileFrameWidth, 0, partner7ProjectileFrameWidth, partner7ProjectileSheetHeight);
      partner7ProjectileAnim.push(frame);
    }
  }

  // --- 繪製角色7.5 (暗刃) ---
  for (let i = partner7Projectiles.length - 1; i >= 0; i--) {
    let p = partner7Projectiles[i];
    
    // 更新位置 (根據方向飛行)
    if (p.direction === 'left') {
      p.x -= 10;
    } else {
      p.x += 10;
    }
    
    // 更新動畫幀 (速度調慢，讓動畫更完整)
    p.frame += 0.15; 
    
    // 繪製
    push();
    translate(p.x, p.y);
    scale(1.5); // 放大角色7.5 (暗刃)
    // 根據方向翻轉 (假設原圖朝右)
    if (p.direction === 'left') {
      scale(-1, 1);
    } else {
      scale(1, 1);
    }

    let idx = floor(p.frame);
    if (idx < partner7ProjectileFrameCount && partner7ProjectileAnim.length > 0) {
      image(partner7ProjectileAnim[idx], -partner7ProjectileFrameWidth/2, -partner7ProjectileSheetHeight/2);
    }
    pop();

    // 碰撞偵測 (碰到主角)
    // 擴大判定範圍以確保擊中
    if (!p.hasHit && dist(p.x, p.y, characterX, characterY) < 80) {
      // 主角受傷
      playerHealth = max(0, playerHealth - 1); // 扣血
      score = max(0, score - 30); // 扣分
      characterHurtTimer = 60; // 閃爍 1 秒
      p.hasHit = true; // 標記為已擊中，避免重複扣血
    }

    // 動畫播放完畢後消失 (呈現一遍後消失)
    if (p.frame >= partner7ProjectileFrameCount) {
      partner7Projectiles.splice(i, 1);
    }
  }

  // --- 根據方向繪製角色 ---
  push(); // 保存當前的繪圖設定
  translate(characterX, characterY); // 將原點移動到角色位置
  scale(1.5); // 放大主角

  if (facing === 'left') {
    scale(-1, 1); // 水平翻轉
  }

  // --- 受傷閃爍效果 ---
  if (characterHurtTimer > 0 && floor(frameCount / 4) % 2 === 0) {
    // 閃爍期間，間歇性不繪製角色
  } else {
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
  }

  pop(); // 恢復原本的繪圖設定

  // --- 繪製角色14 (跟隨主角) ---
  drawPartner14();

  // 更新並繪製所有投射物
  updateAndDrawProjectiles();

  // 繪製 UI (血量)
  drawHealth();

  // 繪製 UI (分數)
  drawScore();
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

    // --- 檢查投射物是否擊中角色4 (只有在行走時可被攻擊) ---
    if (partner4State === 'walking' && dist(proj.x, proj.y, partner4X, partner4Y) < 60) {
      partner4State = 'falling';
      partner4FallCurrentFrame = 0;
      score += 50; // 增加分數
      projectiles.splice(i, 1); // 移除投射物
      continue;
    }

    // 繪製投射物
    push();
    translate(proj.x, proj.y);
    scale(1.5); // 放大主角投射物
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

// --- 繪製角色14 (跟隨主角) ---
function drawPartner14() {
  // 決定角色14的位置，它會跟隨主角並在主角的另一側
  let offsetX = (facing === 'right') ? -80 : 80;
  let partner14X = characterX + offsetX;
  let partner14Y = characterY;

  // 繪製角色14本身
  push();
  translate(partner14X, partner14Y);
  scale(1.5); // 放大角色14
  // 讓角色14永遠面向主角
  if (facing === 'right') {
    scale(-1, 1);
  }
  let frameIndex = floor(frameCount / 6) % partner14FrameCount;
  image(partner14Anim[frameIndex], -partner14FrameWidth / 2, -partner14SheetHeight / 2);
  pop();

  // 繪製提示對話框 (獨立繪製，不受角色翻轉影響)
  if (partner14Message) {
    let msgBoxY = partner14Y - partner14SheetHeight / 2 - 30;
    
    push();
    textSize(18);
    let txtWidth = textWidth(partner14Message);
    fill(255, 255, 200); // 淡黃色背景
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    rect(partner14X, msgBoxY, txtWidth + 20, 40, 10);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(partner14Message, partner14X, msgBoxY);
    pop();
  }
}

// --- 繪製血量 UI ---
function drawHealth() {
  push();
  resetMatrix(); // 確保 UI 固定在螢幕上，不受其他變換影響
  
  for (let i = 0; i < playerHealth; i++) {
    let x = 50 + i * 60; // 愛心起始位置與間距
    let y = 50;
    
    fill(255, 50, 50); // 紅色
    noStroke();
    
    push();
    translate(x, y);
    beginShape();
    // 繪製愛心形狀
    vertex(0, -5);
    bezierVertex(-10, -20, -25, -10, -25, 5);
    bezierVertex(-25, 20, 0, 35, 0, 35);
    bezierVertex(0, 35, 25, 20, 25, 5);
    bezierVertex(25, -10, 10, -20, 0, -5);
    endShape(CLOSE);
    pop();
  }
  pop();
}

// --- 繪製分數 UI ---
function drawScore() {
  push();
  resetMatrix(); // 確保 UI 固定在螢幕上
  textSize(32);
  textAlign(RIGHT, TOP);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text(`Score : ${score}`, width - 50, 50);
  pop();
}

// --- 繪製傳送門動畫 ---
function drawPortal() {
  if (!showPortal) return;
  
  let currentSceneNum = parseInt(gameState.replace('scene', ''));
  let isEndPortal = (currentSceneNum === 3); // 判斷是否為第三關的終點傳送門
  
  push();
  translate(width - 50, height - 180); // 傳送門位置 (往右貼近視窗邊緣)
  
  // 繪製旋轉光圈動畫
  noFill();
  strokeWeight(3);
  for (let i = 0; i < 3; i++) {
    push();
    rotate(frameCount * 0.02 * (i + 1)); // 讓圈圈旋轉
    if (isEndPortal) {
      stroke(255, 50, 50, 150 + sin(frameCount * 0.1) * 50); // 第三關顯示紅色光圈
    } else {
      stroke(100, 200, 255, 150 + sin(frameCount * 0.1) * 50); // 一般顯示藍色光圈
    }
    ellipse(0, 0, 60 + i * 20, 100 + i * 30); // 橢圓形狀
    pop();
  }
  
  // 內部光暈
  noStroke();
  if (isEndPortal) {
    fill(255, 100, 100, 100); // 紅色光暈
  } else {
    fill(200, 255, 255, 100); // 藍色光暈
  }
  ellipse(0, 0, 50, 90);
  
  // EXIT 文字
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(isEndPortal ? "Home" : "EXIT", 0, -80); // 第三關顯示 Home
  
  // 繪製往右箭頭
  stroke(255);
  strokeWeight(4);
  noFill();
  line(-10, -110, 10, -110); // 箭身
  line(0, -118, 10, -110);   // 上翼
  line(0, -102, 10, -110);   // 下翼
  
  pop();
}

// --- 場景切換邏輯 ---
function switchScene() {
  // 解析當前關卡編號 (例如 'scene1' -> 1)
  let currentSceneNum = parseInt(gameState.replace('scene', ''));
  
  if (currentSceneNum < 6) {
    // 進入下一關
    let nextSceneNum = currentSceneNum + 1;
    gameState = 'scene' + nextSceneNum;
    
    // 重置角色位置到左邊
    characterX = 50;
    correctAnswerCount = 0; // 重置答對題數
    showPortal = false; // 重置傳送門狀態
    partner4State = 'hidden'; // 重置角色4狀態
    partnerMessage = "需要我解答嗎?"; // 重置對話，確保新關卡能重新抽題

    // 在場景2和場景3生成愛心
    if (nextSceneNum === 2 || nextSceneNum === 3) {
      spawnPartner5(nextSceneNum);
    } else {
      partner5Active = false;
    }

    // 如果進入場景2，初始化角色6
    if (nextSceneNum === 2) {
      partner6State = 'running';
      partner6Direction = 'left'; // 第一次從右往左跑
      partner6X = width + 100;
      partner6Y = windowHeight - 130;
    } else {
      partner6State = 'hidden';
    }
    
    // 這裡可以加入更換背景或敵人的邏輯
    console.log(`Entering Scene ${nextSceneNum}`);
  } else {
    // 6關結束，進入結算畫面
    gameState = 'settlement';
  }
}

function drawSettlement() {
  background(10); // 陰暗風格：深色背景
  fill(200, 0, 0); // 紅色文字
  textSize(50);
  textAlign(CENTER, CENTER);
  text("恭喜通關", width / 2, height / 2 - 50);
  
  fill(150);
  textSize(20);
  text(`最終分數: ${score}`, width / 2, height / 2 + 10);

  if (!restartButton && fadeState === 'none') {
    restartButton = createButton('回到誕生之時');
    restartButton.position(width / 2 - 75, height / 2 + 60);
    restartButton.size(150, 50);
    restartButton.style('font-size', '20px');
    restartButton.style('background-color', '#333'); // 深灰色按鈕
    restartButton.style('color', '#fff');
    restartButton.style('border', '1px solid #555');
    restartButton.style('border-radius', '5px');
    restartButton.mousePressed(() => {
        fadeState = 'out';
        fadeAlpha = 0;
        nextGameState = 'reset_game';
        restartButton.remove();
        restartButton = null;
    });
  }
}

function drawGameOver() {
  if (inputField) {
    inputField.remove();
    inputField = null;
  }
  background(0);
  fill(255, 0, 0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 50);

  // 建立回到過去按鈕
  if (!restartButton && fadeState === 'none') {
    restartButton = createButton('回到過去');
    restartButton.position(width / 2 - 60, height / 2 + 20);
    restartButton.size(120, 50);
    restartButton.style('font-size', '20px');
    restartButton.style('background-color', '#e63946');
    restartButton.style('color', 'white');
    restartButton.style('border', 'none');
    restartButton.style('border-radius', '10px');
    restartButton.mousePressed(() => {
      fadeState = 'out';
      fadeAlpha = 0;
      nextGameState = 'restart'; // 設定轉場目標為復活
      restartButton.remove();
      restartButton = null;
    });
  }
}

function resetLevel() {
  gameState = lastScene; // 回到死亡時的場景
  playerHealth = 3; // 補滿血量
  characterX = 50; // 重置角色位置到左邊
  characterY = windowHeight - 130;
  correctAnswerCount = 0; // 重置答對題數
  showPortal = false; // 重置傳送門狀態
  partnerMessage = "需要我解答嗎?"; // 重置對話
  currentQuestionRow = null; // 重置當前題目
  
  // 清空場上的投射物
  projectiles = [];
  partner7Projectiles = [];
  partner9Projectiles = [];
  
  // 重置敵人攻擊狀態
  partner7IsAttacking = false;
  partner9IsAttacking = false;
  partner7AttackCurrentFrame = 0;
  partner9AttackCurrentFrame = 0;
  characterHurtTimer = 0;

  // 如果是在第一關，重置角色4的狀態
  if (lastScene === 'scene1') {
    partner4State = 'hidden';
    partner4X = 50;
    partner4FallCurrentFrame = 0;
  }
  
  // 如果是在第二或第三關，重置愛心
  let sceneNum = parseInt(lastScene.replace('scene', ''));
  if (sceneNum === 2 || sceneNum === 3) {
    spawnPartner5(sceneNum);
  } else {
    partner5Active = false;
  }

  // 如果是在第二關，重置角色6
  if (sceneNum === 2) {
    partner6State = 'running';
    partner6Direction = 'left';
    partner6X = width + 100;
    partner6Y = windowHeight - 130;
  } else {
    partner6State = 'hidden';
  }

  // 重置角色10狀態
  partner10Active = false;
  partner10State = 'idle';
  partner10Projectiles = [];

  // 移除按鈕
  if (restartButton) {
    restartButton.remove();
    restartButton = null;
  }
}

function resetGame() {
  gameState = 'loading';
  loadingStartFrame = frameCount; // 重置 Loading 計時
  playerHealth = 3;
  score = 0;
  userName = '';
  correctAnswerCount = 0;
  showPortal = false;
  
  // 重置角色位置
  characterX = windowWidth / 2;
  characterY = windowHeight - 130;
  
  // 重置敵人狀態
  partner4State = 'hidden';
  partner4X = 50;
  partner4FallCurrentFrame = 0;
  
  partner7IsAttacking = false;
  partner9IsAttacking = false;
  partner5Active = false;
  
  projectiles = [];
  partner7Projectiles = [];
  partner9Projectiles = [];
  partner10Projectiles = [];
  partner10Active = false;
  partner10State = 'idle';
  
  // 移除所有按鈕與輸入框
  if (inputField) { inputField.remove(); inputField = null; }
  if (loginInput) { loginInput.remove(); loginInput = null; }
  if (loginButton) { loginButton.remove(); loginButton = null; }
  if (startButton) { startButton.remove(); startButton = null; }
  if (restartButton) { restartButton.remove(); restartButton = null; }
}

function spawnPartner5(sceneNum) {
  partner5Active = true;
  partner5Y = windowHeight - 100; // 設定在視窗下方 (比主角略低一點，貼近地面)
  
  let enemyX = -9999;
  if (sceneNum === 2) enemyX = partner7X;
  if (sceneNum === 3) enemyX = partner9X;
  
  let valid = false;
  let attempts = 0;
  // 隨機生成位置，但避開敵人與畫面邊緣
  while (!valid && attempts < 100) {
    partner5X = random(150, windowWidth - 150);
    // 確保不與敵人重疊 (距離大於 150)
    if (abs(partner5X - enemyX) > 150) {
      valid = true;
    }
    attempts++;
  }
  if (!valid) partner5X = windowWidth / 2; // 如果找不到合適位置，就放在中間
}

function handleInput() {
  if (inputField) {
    let val = inputField.value();
    
    if (currentQuestionRow) {
      // 比對答案 (去除前後空白)
      if (val.trim() === currentQuestionRow.getString('Answer')) {
        // 只有在答對題數少於 3 題時才加分 (滿 3 題後分數定格)
        if (correctAnswerCount < 3) {
          score += 50;
        }
        correctAnswerCount++; // 增加答對題數
        
        // 如果答對滿 3 題，開啟傳送門
        if (correctAnswerCount >= 3) {
          showPortal = true;
        }

        // 隨機選取答對回覆
        let correctResponses = ["不錯喔，繼續保持", "唉呦，挺厲害的嘛"];
        partnerMessage = random(correctResponses);
        // 答對後延遲 2 秒出下一題
        setTimeout(pickQuestion, 2000);
      } else {
        // 隨機選取答錯回覆
        let incorrectResponses = ["嗯？再想想看喔", "確定嗎？要不要換個思考方式"];
        partnerMessage = random(incorrectResponses);

        // --- 第二關答錯觸發角色7攻擊 ---
        let currentSceneNum = parseInt(gameState.replace('scene', ''));
        if (currentSceneNum === 2) {
          partner7IsAttacking = true;
          partner7AttackCurrentFrame = 0;
          
          // 判斷投射物方向 (根據主角位置)
          let p7Dir = (characterX < partner7X) ? 'left' : 'right';
          let spawnX = (p7Dir === 'left') ? partner7X - 80 : partner7X + 80;

          // 產生角色7.5 (暗刃)
          // 從角色7的對應方向發射，高度調整以確保能擊中主角 (partner7Y 是腳底)
          partner7Projectiles.push({ x: spawnX, y: partner7Y - 60, frame: 0, direction: p7Dir, hasHit: false });
        }

        // --- 第三關答錯觸發角色9攻擊 ---
        if (currentSceneNum === 3) {
          partner9IsAttacking = true;
          partner9AttackCurrentFrame = 0;
          
          let p9Dir = (characterX < partner9X) ? 'left' : 'right';
          let spawnX = (p9Dir === 'left') ? partner9X - 80 : partner9X + 80;
          partner9Projectiles.push({ x: spawnX, y: partner9Y - 60, frame: 0, direction: p9Dir, hasHit: false });
        }

        // --- 角色14提示邏輯 ---
        if (currentQuestionRow && currentQuestionRow.getString('Hint')) {
          partner14Message = currentQuestionRow.getString('Hint');
          // 清除之前的計時器
          if (partner14MessageTimeout) {
            clearTimeout(partner14MessageTimeout);
          }
          // 設定5秒後消失
          partner14MessageTimeout = setTimeout(() => {
            partner14Message = '';
          }, 5000);
        }

        // 答錯後也要延遲 2 秒出下一題
        setTimeout(pickQuestion, 2000);
      }
    }
    inputField.value(''); // 清空輸入框
  }
}

function pickQuestion() {
  let currentSceneNum = parseInt(gameState.replace('scene', ''));
  let targetTable = null;

  if (currentSceneNum === 1) {
    targetTable = quizTableScene1;
  } else if (currentSceneNum === 2) {
    targetTable = quizTableScene2;
  } else if (currentSceneNum === 3) {
    targetTable = quizTableScene3;
  }

  if (targetTable && targetTable.getRowCount() > 0) {
    let r = floor(random(targetTable.getRowCount()));
    currentQuestionRow = targetTable.getRow(r);
    partnerMessage = currentQuestionRow.getString('Question');
  }
}

function mousePressed() {
  // 允許玩家點擊左鍵跳過開場動畫 (逐行跳過)
  if (mouseButton === LEFT) {
    let duration = 180; // 需與 drawIntro/drawIntro2 設定的時間一致

    if (gameState === 'intro') {
      let elapsed = frameCount - introStartFrame;
      let index = floor(elapsed / duration);

      // 總共 3 句 (index 0, 1, 2)
      if (index < 2) {
        // 跳至下一句開頭
        introStartFrame = frameCount - ((index + 1) * duration);
      } else {
        // 最後一句跳過 -> 進入登入畫面
        gameState = 'login';
      }
    } else if (gameState === 'intro2') {
      let elapsed = frameCount - introStartFrame;
      
      // 防止剛進入狀態時的點擊誤觸 (例如點擊確認按鈕時)
      if (elapsed < 10) return;

      let index = floor(elapsed / duration);

      // 總共 3 句 (index 0, 1, 2)
      if (index < 2) {
        // 跳至下一句開頭
        introStartFrame = frameCount - ((index + 1) * duration);
      } else {
        // 最後一句 (index >= 2)
        // 如果按鈕還沒出現，快轉到按鈕出現的時間點 (2 * duration + 120)
        if (!startButton) {
          introStartFrame = frameCount - (2 * duration + 125);
        }
      }
    } else if (gameState === 'outro') {
      let elapsed = frameCount - introStartFrame;
      let index = floor(elapsed / duration);

      // 總共 4 句 (index 0, 1, 2, 3)
      if (index < 3) {
        // 跳至下一句開頭
        introStartFrame = frameCount - ((index + 1) * duration);
      } else {
        // 最後一句跳過 -> 進入結算畫面
        gameState = 'settlement';
      }
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
