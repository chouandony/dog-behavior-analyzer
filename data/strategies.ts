// ==================== ABC 選項 ====================
export const antecedents = [
  { key: 'doorbell', label: '門鈴響 / 陌生人靠近', sub: '有人按門鈴、郵差、訪客', emoji: '🚪' },
  { key: 'leaving', label: '主人準備出門', sub: '拿鑰匙、穿鞋子、拿包包', emoji: '🎒' },
  { key: 'seesdog', label: '看到其他狗 / 動物', sub: '散步時遇到、窗戶外看到', emoji: '🐕‍🦺' },
  { key: 'moving', label: '看到移動目標', sub: '腳踏車、跑步的人、車子', emoji: '🚲' },
  { key: 'ignore', label: '主人不理牠 / 在忙', sub: '滑手機、看電視、工作', emoji: '📱' },
  { key: 'food', label: '吃飯 / 有食物時', sub: '餵食、吃零食、有人靠近碗', emoji: '🍖' },
  { key: 'alone', label: '獨處時', sub: '家裡沒人、關在籠子/房間', emoji: '🏠' },
]

export const behaviors = [
  { key: 'bark', label: '連續吠叫', sub: '對特定目標大叫不止', emoji: '🔊' },
  { key: 'growl', label: '低吼 / 露齒 / 空咬', sub: '發出警告聲、露出牙齒', emoji: '😤' },
  { key: 'lunge', label: '爆衝 / 拉扯牽繩', sub: '突然往前衝、拉著人跑', emoji: '🦮' },
  { key: 'jump', label: '撲人 / 扒手', sub: '站起來撲、用爪子扒', emoji: '🙋' },
  { key: 'pacing', label: '抓門 / 踱步 / 嚎叫', sub: '來回走動、抓門板、哀嚎', emoji: '🚶' },
  { key: 'destroy', label: '拆咬家具 / 亂尿', sub: '咬沙發、鞋子、隨地大小便', emoji: '🛋️' },
  { key: 'chase', label: '追逐移動目標', sub: '追車、追人、追腳踏車', emoji: '🏃' },
]

export const consequences = [
  { key: 'leave', label: '對方離開了', sub: '陌生人走掉、其他狗離開', emoji: '🏃' },
  { key: 'attention', label: '主人給予關注', sub: '看牠、摸牠、跟牠說話（即使是責罵）', emoji: '👀' },
  { key: 'return', label: '主人回來了', sub: '獨處結束，主人出現在門口', emoji: '🏠' },
  { key: 'catch', label: '成功追到目標', sub: '追到車子/人，或差點追到', emoji: '🎯' },
  { key: 'release', label: '釋放了壓力/能量', sub: '吠完/追完後變冷靜或很累', emoji: '😮‍💨' },
  { key: 'reward', label: '得到了食物/玩具', sub: '主人給零食、丟玩具安撫', emoji: '🦴' },
]

// ==================== 問題類型 ====================
export const problems = [
  { key: 'barking', label: '吠叫過度', sub: '對人/狗/門鈴吠叫', emoji: '🔊' },
  { key: 'aggression', label: '咬人/護食', sub: '低吼/露齒/攻擊', emoji: '😠' },
  { key: 'pulling', label: '爆衝/拉扯', sub: '散步失控/往前衝', emoji: '🦮' },
  { key: 'destructive', label: '亂尿/拆家', sub: '破壞家具/隨地排泄', emoji: '🛋️' },
  { key: 'separation', label: '分離焦慮', sub: '獨處時嚎叫/破壞', emoji: '😢' },
  { key: 'excited', label: '過度興奮', sub: '撲人/停不下來', emoji: '🤪' },
  { key: 'chasing', label: '追車/追人', sub: '追逐移動目標', emoji: '🏃' },
  { key: 'anxious', label: '膽小/害怕', sub: '退縮/顫抖/逃避', emoji: '😰' },
]

// ==================== 行為功能判斷邏輯 ====================
export type FunctionType = 'escape' | 'attention' | 'selfReinforce' | 'anxiety'

export function analyzeFunction(a: string, b: string, c: string): FunctionType {
  // 優先判斷邏輯
  if (a === 'alone') return 'anxiety'
  if (a === 'moving' || a === 'seesdog') return 'selfReinforce'
  if (a === 'ignore' && (b === 'bark' || b === 'jump')) return 'attention'
  if ((a === 'doorbell' || a === 'seesdog') && c === 'leave') return 'escape'
  
  // 基於後果判斷
  if (c === 'leave') return 'escape'
  if (c === 'attention' || c === 'reward') return 'attention'
  if (c === 'catch') return 'selfReinforce'
  if (c === 'return' || c === 'release') return 'anxiety'
  
  return 'escape' // 預設
}

// ==================== 對策資料庫 ====================
export interface Strategy {
  name: string
  icon: string
  desc: string
}

export interface FunctionResult {
  title: string
  desc: string
  strategies: Strategy[]
}

export const strategyDB: Record<FunctionType, FunctionResult> = {
  escape: {
    title: '逃離 / 拉開距離',
    desc: '狗狗透過吠叫/低吼讓害怕的刺激離開，屬於「距離增加」功能。牠不是壞，是害怕。',
    strategies: [
      { name: '安全管理', icon: '🛡️', desc: '先阻止問題行為繼續演練。使用圍欄、門欄、改變散步路線，保持安全距離。管理不是逃避，而是讓狗狗不要一直練習錯誤行為。' },
      { name: '系統減敏感', icon: '📉', desc: '從很遠的距離、很小的音量開始，讓狗狗逐步習慣原本害怕的刺激。關鍵：狗狗必須低於閾值（還能吃零食、能回頭）。' },
      { name: '反制約', icon: '🍖', desc: '讓「壞事預告」變成「好事預告」。陌生人出現=好吃零食出現；門鈴響=好事發生。' },
      { name: 'LAT「看看那個」', icon: '👀', desc: '看到刺激後，狗狗回頭看主人，立刻標記獎勵。建立「看到刺激→回頭溝通」的新連結。' },
      { name: '放鬆訓練', icon: '😌', desc: '捕捉並獎勵放鬆姿勢（趴下、下巴著地、身體柔軟），建立自我調節能力。' },
    ]
  },
  attention: {
    title: '取得關注',
    desc: '狗狗發現吠叫/撲人能有效讓主人理牠，即使是責罵也是一種「獎勵」。',
    strategies: [
      { name: '消弱 Extinction', icon: '🙉', desc: '確定行為功能是「求關注」後，所有人一致不再給予任何反應（不看、不說、不摸）。注意：初期可能出現「消弱爆發」（叫得更大聲）。' },
      { name: 'DRA 替代行為', icon: '🔄', desc: '教狗狗用更好的行為達到同樣目的：「坐下」取代「撲人」、「安靜」取代「吠叫」。' },
      { name: '捕捉 Capturing', icon: '📸', desc: '狗狗自然安靜或自動坐下時，立刻標記獎勵。強化「不吵也能得到關注」的認知。' },
      { name: '環境管理', icon: '🚪', desc: '在訓練初期，預防勝於治療。出門前讓狗狗去墊子、進籠子，減少撲人機會。' },
    ]
  },
  selfReinforce: {
    title: '自我增強 / 追逐本能',
    desc: '追逐本身帶來強烈的快感，狗狗不需要外部獎勵就會上癮。這是最難改的行為之一。',
    strategies: [
      { name: '環境管理', icon: '🛡️', desc: '使用長牽繩、避開高刺激區域、圍欄院子。物理限制是第一步，因為「每次追到」都在強化行為。' },
      { name: '替代追逐遊戲', icon: '🎾', desc: '提供合法的追逐出口：丟球、拔河、嗅聞遊戲。讓追逐需求有安全出口。' },
      { name: 'LAT + 召回', icon: '👀', desc: '遠距離看到移動目標時，回頭看主人=高價值獎勵。逐步建立「看到刺激→回頭」的反射。' },
      { name: 'Premack原則', icon: '🔄', desc: '「先看主人」才能「去嗅聞」。用狗狗想做的事，獎勵牠先做冷靜的事。' },
      { name: '衝動控制遊戲', icon: '⏳', desc: '練習等待、延遲滿足。從簡單誘惑開始，成功等待就獲得獎勵。' },
    ]
  },
  anxiety: {
    title: '焦慮釋放',
    desc: '行為發生後狗狗感受到壓力釋放，或獨處時的焦慮透過破壞/嚎叫抒發。',
    strategies: [
      { name: '醫療排查', icon: '🏥', desc: '先排除甲狀腺、疼痛、認知障礙等生理因素。焦慮可能是身體不舒服的表現。' },
      { name: '減敏感 + 反制約', icon: '📉', desc: '對「出門線索」（拿鑰匙、穿鞋）進行減敏感。反覆做這些動作但不真的出門，讓線索失去意義。' },
      { name: '獨處梯度訓練', icon: '📶', desc: '從「離開1秒鐘」開始，逐步拉長時間。每次回來都平靜對待，不誇張道別或歡迎。' },
      { name: '安全區建立', icon: '🏠', desc: '去墊子/籠子訓練，讓這個空間代表安全與好事。不是處罰區，是避風港。' },
      { name: '放鬆訓練', icon: '😌', desc: '教導深呼吸、下巴放下、身體柔軟。焦慮的狗需要先學會「如何冷靜」。' },
    ]
  },
}