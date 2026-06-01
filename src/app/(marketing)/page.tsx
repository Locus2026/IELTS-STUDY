import Link from 'next/link';

const features = [
  { icon: '🧭', title: '智能定级测试', desc: '20分钟精准定位你的英语水平，生成 CEFR 等级评估和个性化学习路径，告别「不知道该从哪里开始」的迷茫。' },
  { icon: '📚', title: '三级递进课程', desc: '入门→基础→雅思衔接，200+微课由浅入深。每节课5-15分钟，碎片时间也能系统提升。' },
  { icon: '🤖', title: 'AI 即时批改', desc: '写作和口语不再需要等老师。AI 按雅思四项评分标准给出详细反馈，24小时随时可用。' },
  { icon: '📊', title: '进度可视化', desc: '连续打卡、技能雷达图、学习时长统计——你的每一点进步都看得见。' },
  { icon: '📝', title: '全真模考系统', desc: '严格计时、真实界面、自动算分。考前模拟实战，真正上考场不慌张。' },
  { icon: '📱', title: '手机随时学', desc: '移动端完美适配。通勤路上、午休间隙，打开浏览器就能学，无需下载APP。' },
];

const steps = [
  { step: 1, title: '20分钟定级测试', desc: '完成词汇、语法、听力三个维度的自适应测试，立即获得你的英语水平报告和 CEFR 等级。' },
  { step: 2, title: '跟着专属路径学习', desc: '系统根据你的水平和目标分数，自动生成每日学习计划。只需按部就班完成即可。' },
  { step: 3, title: '模考检验，冲刺出分', desc: '全真模考环境下检验成果，AI批改找出薄弱环节，考前针对性补强。' },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            从零基础到雅思 6.5 分
            <br />
            <span className="text-brand-200">一站就够了</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-100 max-w-2xl mx-auto">
            专为零基础学习者设计的雅思备考平台。智能定级、AI 批改、全真模考——
            从「雅思是什么」到「拿到目标分」，每一步都有我们陪你走。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl text-lg hover:bg-brand-50 transition-colors shadow-lg"
            >
              免费开始学习 →
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-3.5 border border-white/30 text-white rounded-xl text-lg hover:bg-white/10 transition-colors"
            >
              了解学习流程
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-brand-200">
            <div><span className="font-bold text-white">200+</span> 微课</div>
            <div><span className="font-bold text-white">1000+</span> 练习题</div>
            <div><span className="font-bold text-white">3</span> 级课程体系</div>
            <div><span className="font-bold text-white">24/7</span> AI 批改</div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">你需要的一切，都在这里</h2>
          <p className="mt-4 text-gray-500 text-center max-w-xl mx-auto">
            市面上没有一个产品同时做到这些——所以我们自己做了
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">三步走向目标分数</h2>
          <p className="mt-4 text-gray-500 text-center">从零开始，按部就班</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  {s.step}
                </div>
                <h3 className="mt-6 font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold">准备好开始你的雅思之旅了吗？</h2>
          <p className="mt-4 text-brand-100 text-lg">免费定级测试，无需注册，5分钟看到你的起点。</p>
          <Link
            href="/onboarding"
            className="mt-8 inline-block px-10 py-4 bg-white text-brand-700 font-bold rounded-xl text-lg hover:bg-brand-50 transition-colors shadow-lg"
          >
            开始免费定级测试 →
          </Link>
        </div>
      </section>
    </>
  );
}
