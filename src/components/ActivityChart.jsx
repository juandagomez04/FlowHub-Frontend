export default function ActivityChart({ data }) {
  const width = 320
  const height = 96
  const padding = 6

  const values = data.map((point) => point.runs)
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const stepX = (width - padding * 2) / (data.length - 1)

  const points = data.map((point, index) => {
    const x = padding + index * stepX
    const y = padding + (1 - (point.runs - min) / range) * (height - padding * 2)
    return [x, y]
  })

  const linePath = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const [lastX] = points[points.length - 1]
  const [firstX] = points[0]
  const areaPath = `${linePath} L ${lastX.toFixed(1)} ${height - padding} L ${firstX.toFixed(1)} ${height - padding} Z`

  const summary = data.map((point) => `${point.label} ${point.runs}`).join(', ')

  return (
    <svg
      className="dash-chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Ejecuciones por día: ${summary}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="dashChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(79,148,209,0.32)" />
          <stop offset="100%" stopColor="rgba(79,148,209,0)" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#dashChartFill)" />
      <path d={linePath} fill="none" stroke="#3572a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], index) => (
        <circle
          key={data[index].label}
          cx={x}
          cy={y}
          r={index === points.length - 1 ? 4 : 2.25}
          fill={index === points.length - 1 ? '#3572a8' : 'rgba(53,114,168,0.55)'}
        />
      ))}
    </svg>
  )
}
