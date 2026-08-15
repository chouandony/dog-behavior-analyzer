'use client'

import { useState } from 'react'
import {
  problems,
  antecedents,
  behaviors,
  consequences,
  analyzeFunction,
  strategyDB,
  type FunctionType,
} from '../data/strategies'

type Step = 1 | 2 | 3 | 4 | 5

export default function Home() {
  const [step, setStep] = useState<Step>(1)
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)
  const [selectedC, setSelectedC] = useState<string | null>(null)
  const [result, setResult] = useState<FunctionType | null>(null)

  const toggleProblem = (key: string) => {
    setSelectedProblems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const canProceed = {
    1: selectedProblems.length > 0,
    2: !!selectedA,
    3: !!selectedB,
    4: !!selectedC,
  }

  const handleAnalyze = () => {
    if (!selectedA || !selectedB || !selectedC) return
    const func = analyzeFunction(selectedA, selectedB, selectedC)
    setResult(func)
    setStep(5)
  }

  const reset = () => {
    setStep(1)
    setSelectedProblems([])
    setSelectedA(null)
    setSelectedB(null)
    setSelectedC(null)
    setResult(null)
  }

  const getLabel = (key: string, type: 'a' | 'b' | 'c') => {
    const list = type === 'a' ? antecedents : type === 'b' ? behaviors : consequences
    return list.find((i) => i.key === key)?.label || key
  }

  return (
    <main className="min-h-screen bg-paw-cream">
      <div className="max-w-md mx-auto pb-8">
        {/* 頂部 Header */}
        <div className="bg-gradient-to-br from-paw-orange to-paw-amber p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🐕</span>
            <h1 className="font-extrabold text-lg">PawBehavior 狗狗行為分析</h1>
          </div>
          <p className="text-xs opacity-90">基於ABC行為分析 · 科學訓練對策</p>
        </div>

        {/* 步驟指示器 */}


<div className="flex gap-2 px-5 py-4">
  {[1, 2, 3, 4].map((s) => (
    <div
      key={s}
      className={`flex-1 h-1 rounded-full transition-colors ${
        s <= step ? 'bg-paw-orange' : 'bg-gray-200'
      }`}
    />
  ))}
</div>

        {/* ====== 步驟 1: 問題選擇 ====== */}
        {step === 1 && (
          <div className="px-5">
            <h2 className="text-xl font-bold text-paw-teal mb-1">你的狗狗有什麼困擾？</h2>
            <p className="text-sm text-paw-brown mb-5">可多選，我們會為你分析根本原因</p>

            <div className="grid grid-cols-2 gap-3">
              {problems.map((p) => {
                const active = selectedProblems.includes(p.key)
                return (
                  <button
                    key={p.key}
                    onClick={() => toggleProblem(p.key)}
                    className={`rounded-xl p-4 text-center border-2 transition-all ${
                      active
                        ? 'border-paw-orange bg-orange-50'
                        : 'border-paw-border bg-white hover:border-paw-amber'
                    }`}
                  >
                    <div className="text-2xl mb-1">{p.emoji}</div>
                    <div className="font-bold text-sm text-paw-teal">{p.label}</div>
                    <div className="text-[10px] text-paw-sand mt-0.5">{p.sub}</div>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceed[1]}
              className={`w-full mt-6 py-3.5 rounded-xl font-bold text-white transition-all ${
                canProceed[1]
                  ? 'bg-gradient-to-r from-paw-orange to-paw-amber hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {canProceed[1]
                ? `下一步：ABC分析 (${selectedProblems.length}) →`
                : '請選擇至少一項問題 →'}
            </button>
          </div>
        )}

        {/* ====== 步驟 2: A 前事 ====== */}
        {step === 2 && (
          <div className="px-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-paw-green text-white flex items-center justify-center text-xs font-bold">A</div>
              <h2 className="text-xl font-bold text-paw-teal">前事分析 Antecedent</h2>
            </div>
            <p className="text-sm text-paw-brown mb-4 ml-8">行為發生「之前」，出現了什麼？</p>

            <div className="flex flex-col gap-2">
              {antecedents.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedA(item.key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    selectedA === item.key
                      ? 'border-paw-green bg-teal-50'
                      : 'border-paw-border bg-white hover:border-paw-amber'
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm text-paw-teal">{item.label}</div>
                    <div className="text-[11px] text-paw-sand">{item.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border-2 border-paw-orange text-paw-orange font-semibold hover:bg-orange-50"
              >
                ← 返回
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceed[2]}
                className={`flex-[2] py-3 rounded-xl font-bold text-white transition-all ${
                  canProceed[2]
                    ? 'bg-gradient-to-r from-paw-orange to-paw-amber'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                下一步：行為描述 →
              </button>
            </div>
          </div>
        )}

        {/* ====== 步驟 3: B 行為 ====== */}
        {step === 3 && (
          <div className="px-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-paw-yellow text-paw-teal flex items-center justify-center text-xs font-bold">B</div>
              <h2 className="text-xl font-bold text-paw-teal">行為描述 Behavior</h2>
            </div>
            <p className="text-sm text-paw-brown mb-4 ml-8">狗狗具體「做了什麼」？</p>

            <div className="flex flex-col gap-2">
              {behaviors.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedB(item.key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    selectedB === item.key
                      ? 'border-paw-yellow bg-yellow-50'
                      : 'border-paw-border bg-white hover:border-paw-amber'
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm text-paw-teal">{item.label}</div>
                    <div className="text-[11px] text-paw-sand">{item.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border-2 border-paw-orange text-paw-orange font-semibold hover:bg-orange-50"
              >
                ← 返回
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!canProceed[3]}
                className={`flex-[2] py-3 rounded-xl font-bold text-white transition-all ${
                  canProceed[3]
                    ? 'bg-gradient-to-r from-paw-orange to-paw-amber'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                下一步：後果分析 →
              </button>
            </div>
          </div>
        )}

        {/* ====== 步驟 4: C 後果 ====== */}
        {step === 4 && (
          <div className="px-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-paw-orange text-white flex items-center justify-center text-xs font-bold">C</div>
              <h2 className="text-xl font-bold text-paw-teal">後果分析 Consequence</h2>
            </div>
            <p className="text-sm text-paw-brown mb-4 ml-8">行為發生「之後」，發生了什麼？</p>

            <div className="flex flex-col gap-2">
              {consequences.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedC(item.key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    selectedC === item.key
                      ? 'border-paw-orange bg-orange-50'
                      : 'border-paw-border bg-white hover:border-paw-amber'
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm text-paw-teal">{item.label}</div>
                    <div className="text-[11px] text-paw-sand">{item.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl border-2 border-paw-orange text-paw-orange font-semibold hover:bg-orange-50"
              >
                ← 返回
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!canProceed[4]}
                className={`flex-[2] py-3 rounded-xl font-bold text-white transition-all ${
                  canProceed[4]
                    ? 'bg-gradient-to-r from-paw-orange to-paw-amber'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                🔍 分析並取得對策
              </button>
            </div>
          </div>
        )}

        {/* ====== 步驟 5: 結果 ====== */}
        {step === 5 && result && (
          <div className="px-5">
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">📋</div>
              <h2 className="text-2xl font-extrabold text-paw-teal">分析結果</h2>
              <p className="text-sm text-paw-brown mt-1">基於ABC行為功能分析</p>
            </div>

            {/* 行為功能 */}
            <div className="bg-gradient-to-br from-paw-green to-paw-teal rounded-xl p-5 text-white mb-4">
              <div className="text-xs opacity-80 mb-1">行為功能判斷</div>
              <div className="text-xl font-extrabold mb-2">{strategyDB[result].title}</div>
              <div className="text-sm opacity-90 leading-relaxed">{strategyDB[result].desc}</div>
            </div>

            {/* ABC 摘要 */}
            <div className="bg-white rounded-xl p-4 mb-4 border-2 border-paw-border">
              <div className="text-xs font-bold text-paw-brown uppercase tracking-wider mb-3">你的ABC記錄</div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-sm">
                  <span className="bg-paw-green text-white px-2 py-0.5 rounded font-bold text-xs">A</span>
                  <span className="text-paw-teal">{getLabel(selectedA!, 'a')}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="bg-paw-yellow text-paw-teal px-2 py-0.5 rounded font-bold text-xs">B</span>
                  <span className="text-paw-teal">{getLabel(selectedB!, 'b')}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="bg-paw-orange text-white px-2 py-0.5 rounded font-bold text-xs">C</span>
                  <span className="text-paw-teal">{getLabel(selectedC!, 'c')}</span>
                </div>
              </div>
            </div>

            {/* 對策推薦 */}
            <div className="text-sm font-bold text-paw-teal mb-3">🎯 推薦訓練對策組合</div>
            <div className="flex flex-col gap-3">
              {strategyDB[result].strategies.map((s, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border-2 border-paw-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-paw-teal">{s.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* 提醒 */}
            <div className="mt-5 p-4 bg-orange-50 rounded-xl border-l-4 border-paw-amber">
              <div className="text-sm font-bold text-paw-orange mb-1">⚠️ 重要提醒</div>
              <div className="text-xs text-paw-brown leading-relaxed">
                如果狗狗有咬傷紀錄、攻擊兒童或無預警攻擊，請先尋求獸醫行為醫學或合格行為專業人員協助。身體不舒服的狗，不是壞狗，是需要先被檢查的狗。
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full mt-5 py-3 rounded-xl border-2 border-paw-green text-paw-green font-bold hover:bg-teal-50 transition-all"
            >
              🔄 重新分析
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
