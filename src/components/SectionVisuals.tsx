import { motion } from 'framer-motion';
import { GitBranch, GitMerge, CheckCircle2, XCircle, Loader2, Package, TestTube, FileCheck, Bell, Rocket, ShieldCheck, Building2, Zap, Trophy, ArrowRight, Repeat, Users, GitCommitVertical as GitCommit } from 'lucide-react';

/* Each visual is a self-contained animated scene that
   matches the topic of its parent theory section.
   All scenes are pure CSS/SVG + framer-motion — no images. */

/* ── CI: "What is Continuous Integration?" ── */
export function CIIntegrationScene() {
  const branches = [0, 1, 2];
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-center pb-4">
        {/* Central trunk */}
        <div className="w-1.5 h-24 bg-white/70 rounded-t-full" />
      </div>
      {branches.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${25 + i * 25}%`, bottom: '20px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 }}
        >
          <motion.div
            animate={{ pathOffset: [0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            className="w-1 h-16 bg-white/50 origin-bottom"
            style={{ transform: `rotate(${(i - 1) * 25}deg)` }}
          />
          <div className="absolute -top-1 -translate-x-1/2 left-1/2">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      ))}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute top-3 left-1/2 -translate-x-1/2"
      >
        <GitMerge className="w-6 h-6 text-white" />
      </motion.div>
      <div className="absolute bottom-2 left-3 text-white/90 text-xs font-bold">frequent merges</div>
    </div>
  );
}

/* ── CI: "How CI Works in Practice" — pipeline flow ── */
export function CIPipelineScene() {
  const steps = [
    { icon: GitCommit, label: 'Push', color: 'from-blue-400 to-blue-600' },
    { icon: Package, label: 'Build', color: 'from-cyan-400 to-cyan-600' },
    { icon: TestTube, label: 'Test', color: 'from-teal-400 to-teal-600' },
    { icon: FileCheck, label: 'Report', color: 'from-emerald-400 to-emerald-600' },
  ];
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex items-center justify-center px-4">
      <div className="flex items-center gap-1">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.4, type: 'spring', stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/70 text-[10px] font-bold mt-1">{s.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.4 }}
                >
                  <ArrowRight className="w-3 h-3 text-white/50 mx-0.5" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      {/* Animated dot traveling along the pipeline */}
      <motion.div
        className="absolute top-[38px] w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]"
        animate={{ left: ['12%', '88%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ── CI: "Why CI Matters" — integration hell vs smooth ── */
export function CIHellVsSmoothScene() {
  return (
    <div className="relative h-32 rounded-2xl overflow-hidden flex">
      {/* Left: integration hell */}
      <div className="flex-1 bg-gradient-to-br from-red-900 to-rose-800 flex flex-col items-center justify-center relative">
        <motion.div
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <XCircle className="w-8 h-8 text-red-300" />
        </motion.div>
        <span className="text-red-200/80 text-[10px] font-bold mt-1">integration hell</span>
        <motion.div
          className="absolute top-2 left-2 text-red-400/40 text-xs font-mono"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          merge conflict!
        </motion.div>
      </div>
      {/* Right: smooth CI */}
      <div className="flex-1 bg-gradient-to-br from-emerald-600 to-teal-700 flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-200" />
        </motion.div>
        <span className="text-emerald-200/80 text-[10px] font-bold mt-1">smooth CI</span>
        <motion.div
          className="absolute bottom-2 right-2"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <GitMerge className="w-4 h-4 text-emerald-300/60" />
        </motion.div>
      </div>
    </div>
  );
}

/* ── CI: "CI and Agile" — two complementary gears ── */
export function CIAndAgileScene() {
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 overflow-hidden flex items-center justify-center">
      {/* Left gear (Agile) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <div className="w-14 h-14 rounded-full border-4 border-amber-300/80 flex items-center justify-center">
          <Repeat className="w-5 h-5 text-amber-200" />
        </div>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-amber-200/70 text-[10px] font-bold whitespace-nowrap">Agile</span>
      </motion.div>
      {/* Right gear (CI) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="relative ml-[-4px]"
      >
        <div className="w-14 h-14 rounded-full border-4 border-sky-300/80 flex items-center justify-center">
          <Zap className="w-5 h-5 text-sky-200" />
        </div>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-sky-200/70 text-[10px] font-bold whitespace-nowrap">CI</span>
      </motion.div>
    </div>
  );
}

/* ── CI: "When to Use CI" — timeline ramp ── */
export function CITimelineScene() {
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-800 overflow-hidden p-4">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 120">
        <motion.path
          d="M 10 100 Q 80 80 150 50 T 290 15"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
      </svg>
      <div className="relative flex items-end justify-between h-full pb-2">
        {['Start', 'Growth', 'Mature'].map((label, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.4 }}
            className="flex flex-col items-center"
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-orange-400' : 'bg-emerald-400'
            }`}>
              <span className="text-[9px] font-bold text-white">{i + 1}</span>
            </div>
            <span className="text-white/70 text-[10px] font-bold mt-1">{label}</span>
          </motion.div>
        ))}
      </div>
      <div className="absolute top-3 left-4 text-white/90 text-xs font-bold flex items-center gap-1">
        <Trophy className="w-3 h-3" />
        Adopt early = more value
      </div>
    </div>
  );
}

/* ── CD: "What is Continuous Delivery?" — deploy button ── */
export function CDDeployButtonScene() {
  const [pressed] = [false];
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-800 overflow-hidden flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl border-4 border-white/20">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-300"
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 text-xs font-bold">
        Ready to deploy — push the button
      </div>
      {pressed && null}
    </div>
  );
}

/* ── CD: "What is Continuous Deployment?" — auto-deploy flow ── */
export function CDAutoDeployScene() {
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-gray-900 overflow-hidden flex items-center justify-center">
      <div className="flex items-center gap-2">
        {[
          { icon: CheckCircle2, label: 'Tests pass', color: 'bg-emerald-500' },
          { icon: Rocket, label: 'Auto deploy', color: 'bg-sky-500' },
          { icon: ShieldCheck, label: 'Live', color: 'bg-indigo-500' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.5, type: 'spring' }}
                className="flex flex-col items-center"
              >
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/60 text-[9px] font-bold mt-1">{s.label}</span>
              </motion.div>
              {i < 2 && (
                <motion.div
                  animate={{ x: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.5 }}
                >
                  <ArrowRight className="w-3 h-3 text-white/50 mx-1" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      <div className="absolute top-3 left-3 text-white/90 text-xs font-bold">No human needed</div>
    </div>
  );
}

/* ── CD: "The Deployment Workflow" — Slack + TestFlight ── */
export function CDDeployWorkflowScene() {
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-purple-700 to-pink-800 overflow-hidden">
      <div className="flex items-center justify-center h-full gap-3 px-4">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/60 text-[9px] mt-1">Build</span>
        </motion.div>
        <ArrowRight className="w-3 h-3 text-white/40" />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/60 text-[9px] mt-1">TestFlight</span>
        </motion.div>
        <ArrowRight className="w-3 h-3 text-white/40" />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400/30 flex items-center justify-center backdrop-blur">
            <Bell className="w-4 h-4 text-amber-200" />
          </div>
          <span className="text-white/60 text-[9px] mt-1">Slack</span>
        </motion.div>
        <ArrowRight className="w-3 h-3 text-white/40" />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/60 text-[9px] mt-1">QC team</span>
        </motion.div>
      </div>
      <div className="absolute bottom-2 left-3 text-white/80 text-xs font-bold">Merge → Build → Notify → Test</div>
    </div>
  );
}

/* ── CD: "Benefits of CD" — dev commits, machine does rest ── */
export function CDBenefitsScene() {
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 overflow-hidden flex items-center justify-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center z-10"
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
          <GitCommit className="w-5 h-5 text-white" />
        </div>
        <span className="text-white/70 text-[10px] font-bold mt-1">Dev commits</span>
      </motion.div>
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {[Package, TestTube, Rocket].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
            className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"
          >
            <Icon className="w-3.5 h-3.5 text-white/70" />
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute top-3 right-3 text-white/80 text-xs font-bold">automated</div>
    </div>
  );
}

/* ── CD: "Choosing a CI/CD Service" — tool comparison ── */
export function CDToolCompareScene() {
  const tools = ['CircleCI', 'App Center', 'Bitrise'];
  const states = ['slow', 'limited', 'best!'];
  const colors = ['text-red-300', 'text-amber-300', 'text-emerald-300'];
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-orange-700 to-red-800 overflow-hidden flex items-center justify-center gap-3 px-4">
      {tools.map((tool, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.3, type: 'spring' }}
          className={`flex flex-col items-center ${i === 2 ? 'scale-110' : 'opacity-70'}`}
        >
          <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center ${
            i === 2 ? 'bg-emerald-400/30 border-emerald-300' : 'bg-white/10 border-white/20'
          }`}>
            <Building2 className={`w-5 h-5 ${i === 2 ? 'text-emerald-200' : 'text-white/60'}`} />
          </div>
          <span className="text-white/80 text-[10px] font-bold mt-1.5">{tool}</span>
          <span className={`text-[9px] font-bold ${colors[i]}`}>{states[i]}</span>
          {i === 2 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-0.5"
            >
              <Trophy className="w-3 h-3 text-emerald-300" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Dispatcher: maps section heading to its visual ── */
export function SectionVisual({ heading }: { heading: string }) {
  const h = heading.toLowerCase();

  if (h.includes('what is continuous integration')) return <CIIntegrationScene />;
  if (h.includes('how ci works')) return <CIPipelineScene />;
  if (h.includes('why ci matters')) return <CIHellVsSmoothScene />;
  if (h.includes('ci and agile')) return <CIAndAgileScene />;
  if (h.includes('when to use ci')) return <CITimelineScene />;
  if (h.includes('what is continuous delivery') && !h.includes('deployment')) return <CDDeployButtonScene />;
  if (h.includes('what is continuous deployment')) return <CDAutoDeployScene />;
  if (h.includes('deployment workflow')) return <CDDeployWorkflowScene />;
  if (h.includes('benefits of cd')) return <CDBenefitsScene />;
  if (h.includes('choosing a ci/cd')) return <CDToolCompareScene />;

  // Generic fallback
  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-800 overflow-hidden flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="w-8 h-8 text-white/60" />
      </motion.div>
    </div>
  );
}
