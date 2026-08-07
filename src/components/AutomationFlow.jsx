import { ArrowRightIcon, GitHubIcon, GmailIcon } from './icons/NavIcons'
import './css/AutomationFlow.css'

const PROVIDER_ICONS = { github: GitHubIcon, gmail: GmailIcon }

export default function AutomationFlow({ trigger, action, compact = false }) {
  const TriggerIcon = PROVIDER_ICONS[trigger.provider]
  const ActionIcon = PROVIDER_ICONS[action.provider]

  return (
    <div className={`automation-flow${compact ? ' automation-flow--compact' : ''}`}>
      <span className="automation-flow-step">
        <span className={`automation-flow-icon automation-flow-icon--${trigger.provider}`}>
          <TriggerIcon />
        </span>
        {!compact && <span className="automation-flow-label">{trigger.label}</span>}
      </span>
      <ArrowRightIcon className="automation-flow-arrow" />
      <span className="automation-flow-step">
        <span className={`automation-flow-icon automation-flow-icon--${action.provider}`}>
          <ActionIcon />
        </span>
        {!compact && <span className="automation-flow-label">{action.label}</span>}
      </span>
    </div>
  )
}
