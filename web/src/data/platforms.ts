export type PlatformStatus = 'full' | 'partial' | 'coming-soon'

export interface Platform {
  id: string
  name: string
  icon: string
  description: string
  status: PlatformStatus
  configFile: string
  installPath: string
  features: string[]
  steps: string[]
  setup: string[]
}

export const platforms: Platform[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '⚡',
    description: 'Full integration with Cursor IDE through .cursorrules and custom rules.',
    status: 'full',
    configFile: '.cursor/rules/boomopen-workflow-kit.mdc',
    installPath: '~/.cursor/skills/boomopen-workflow-kit/',
    features: [
      'Custom agent rules',
      'Skill auto-discovery',
      'Command workflows',
      'Sub-agent orchestration',
    ],
    steps: [
      'Install BoomOpen Workflow Kit globally',
      'Restart Cursor IDE',
      'BoomOpen Workflow Kit auto-discovers from global path',
      'Start using /cook, /fix, /test commands',
    ],
    setup: [
      'boomopen-workflow-kit install cursor',
      'boomopen-workflow-kit uninstall cursor',
    ]
  },
  {
    id: 'claude',
    name: 'Claude Code',
    icon: '🤖',
    description: 'Native support through CLAUDE.md for seamless Claude integration.',
    status: 'full',
    configFile: 'CLAUDE.md',
    installPath: '~/.claude/skills/boomopen-workflow-kit/',
    features: [
      'Native Claude support',
      'CLAUDE.md configuration',
      'Full skill library',
      'Orchestration laws',
    ],
    steps: [
      'Install BoomOpen Workflow Kit globally',
      'CLAUDE.md is auto-detected in projects',
      'Global config applies to all projects',
      'Use slash commands in any project',
    ],
    setup: [
      'boomopen-workflow-kit install claude',
      'boomopen-workflow-kit uninstall claude',
    ]
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    icon: '🐙',
    description: 'Works with GitHub Copilot through boomopen-workflow-kit.agent.md files.',
    status: 'full',
    configFile: 'boomopen-workflow-kit.agent.md',
    installPath: '~/.copilot/skills/boomopen-workflow-kit/',
    features: [
      'Copilot agents',
      'Workspace integration',
      'Custom instructions',
      'Skill injection',
    ],
    steps: [
      'Install BoomOpen Workflow Kit globally',
      'Agent files are auto-detected',
      'Works with Copilot Chat',
      'Full orchestration support',
    ],
    setup: [
      'boomopen-workflow-kit install copilot',
      'boomopen-workflow-kit uninstall copilot',
    ]
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '🚀',
    description: 'Full support for Antigravity through GEMINI.md configuration.',
    status: 'full',
    configFile: 'GEMINI.md',
    installPath: '~/.antigravity/skills/boomopen-workflow-kit/',
    features: [
      'Gemini integration',
      'Global configuration',
      'Agent workflows',
      'Matrix skills',
    ],
    steps: [
      'Install BoomOpen Workflow Kit globally',
      'GEMINI.md is auto-detected',
      'Global configuration applies',
      'Use all commands and workflows',
    ],
    setup: [
      'boomopen-workflow-kit install antigravity',
      'boomopen-workflow-kit uninstall antigravity',
    ]
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: '💻',
    description: 'Full support for OpenAI Codex through AGENTS.md (primary) and CODEX.md compatibility.',
    status: 'full',
    configFile: 'AGENTS.md + CODEX.md',
    installPath: '~/.codex/skills/boomopen-workflow-kit/',
    features: [
      'Codex integration',
      'CODEX.md configuration',
      'Full skill library',
      'Orchestration laws',
    ],
    steps: [
      'Install BoomOpen Workflow Kit globally',
      'CODEX.md is auto-detected in projects',
      'Global config applies to all projects',
      'Use slash commands in any project',
    ],
    setup: [
      'boomopen-workflow-kit install codex',
      'boomopen-workflow-kit uninstall codex',
    ]
  },
]

// Platform comparison features
export const platformComparisonFeatures = [
  { feature: 'Agent Orchestration', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Skill Injection', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Command Workflows', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Quality Gates', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Global Config', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
  { feature: 'Sub-agent Invocation', cursor: true, claude: true, copilot: true, antigravity: true, codex: true },
]

// Simplified platform data for badges
export const platformBadges = platforms.map(p => ({
  name: p.name,
  emoji: p.icon,
  status: p.status,
}))

// Get platform by ID
export const getPlatformById = (id: string) => platforms.find(p => p.id === id)

// Total platforms count
export const totalPlatforms = platforms.length
