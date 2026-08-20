export const DEFAULT_EMAIL_SUBJECT = 'Prueba de FlowHub'
export const DEFAULT_EMAIL_BODY = 'Este correo fue enviado automáticamente'

export function buildActionPayload(form) {
  if (form.service === 'gmail') {
    return {
      type: 'send_email',
      provider: 'gmail',
      configuration: { to: form.emailTo, subject: form.emailSubject, body: form.emailBody },
    }
  }

  if (form.actionType === 'create_issue') {
    return {
      type: 'create_issue',
      provider: 'github',
      configuration: { owner: form.githubOwner, repo: form.githubRepo, title: form.issueTitle, body: form.issueBody },
    }
  }

  return {
    type: 'send_message',
    provider: 'github',
    configuration: { owner: form.githubOwner, repo: form.githubRepo, issueNumber: form.issueNumber, comment: form.issueComment },
  }
}

export function parseActionIntoForm(action) {
  const configuration = action?.configuration || {}

  if (action?.provider === 'github' && action?.type === 'send_message') {
    return {
      service: 'github',
      actionType: 'send_message',
      githubOwner: configuration.owner || '',
      githubRepo: configuration.repo || '',
      issueTitle: '',
      issueBody: '',
      issueNumber: configuration.issueNumber || '',
      issueComment: configuration.comment || '',
      emailTo: '',
      emailSubject: DEFAULT_EMAIL_SUBJECT,
      emailBody: DEFAULT_EMAIL_BODY,
    }
  }

  if (action?.provider === 'github' && action?.type === 'create_issue') {
    return {
      service: 'github',
      actionType: 'create_issue',
      githubOwner: configuration.owner || '',
      githubRepo: configuration.repo || '',
      issueTitle: configuration.title || '',
      issueBody: configuration.body || '',
      issueNumber: '',
      issueComment: '',
      emailTo: '',
      emailSubject: DEFAULT_EMAIL_SUBJECT,
      emailBody: DEFAULT_EMAIL_BODY,
    }
  }

  return {
    service: 'gmail',
    actionType: 'send_email',
    githubOwner: '',
    githubRepo: '',
    issueTitle: '',
    issueBody: '',
    issueNumber: '',
    issueComment: '',
    emailTo: configuration.to || '',
    emailSubject: configuration.subject || DEFAULT_EMAIL_SUBJECT,
    emailBody: configuration.body || DEFAULT_EMAIL_BODY,
  }
}
