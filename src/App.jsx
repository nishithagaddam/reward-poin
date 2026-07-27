import React, { useEffect, useMemo, useState } from "react"

const transactionsData = [
  {
    customerId: 1,
    customerName: "Ava Lee",
    transactions: [
      { date: "2026-04-05", amount: 120 },
      { date: "2026-04-18", amount: 75 },
      { date: "2026-05-02", amount: 200 },
      { date: "2026-06-10", amount: 45 },
    ],
  },
  {
    customerId: 2,
    customerName: "Noah Kim",
    transactions: [
      { date: "2026-04-12", amount: 95 },
      { date: "2026-05-14", amount: 150 },
      { date: "2026-05-21", amount: 110 },
      { date: "2026-06-01", amount: 60 },
    ],
  },
  {
    customerId: 3,
    customerName: "Mia Patel",
    transactions: [
      { date: "2026-04-09", amount: 130 },
      { date: "2026-05-19", amount: 55 },
      { date: "2026-05-25", amount: 85 },
      { date: "2026-06-18", amount: 140 },
    ],
  },
]

const monthName = (dateString) => {
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const date = new Date(dateString + "T00:00:00")
  return monthLabels[date.getMonth()]
}

const calculatePoints = (amount) => {
  const over100 = Math.max(0, amount - 100)
  const between50And100 = Math.max(0, Math.min(amount, 100) - 50)
  return over100 * 2 + between50And100 * 1
}

const simulateFetchRewards = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactionsData)
    }, 900)
  })
}

const getRewardsSummary = (customers) => {
  return customers.map((customer) => {
    const monthly = {}
    let total = 0

    customer.transactions.forEach((transaction) => {
      const month = monthName(transaction.date)
      const points = calculatePoints(transaction.amount)
      monthly[month] = (monthly[month] || 0) + points
      total += points
    })

    return {
      customerId: customer.customerId,
      customerName: customer.customerName,
      monthly,
      total,
    }
  })
}

const App = () => {
  const [rewardData, setRewardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    simulateFetchRewards().then((data) => {
      setRewardData(getRewardsSummary(data))
      setIsLoading(false)
    })
  }, [])

  const monthColumns = useMemo(() => {
    if (!rewardData) return []
    const months = new Set()
    rewardData.forEach((customer) => {
      Object.keys(customer.monthly).forEach((month) => months.add(month))
    })
    return Array.from(months).sort((a, b) => {
      const order = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
      return order.indexOf(a) - order.indexOf(b)
    })
  }, [rewardData])

  return (
    <div className='app-shell'>
      <header className='hero'>
        <h1>Rewards Points Dashboard</h1>
        <p>
          Customer reward points for each month in a three-month period,
          calculated from transaction history.
        </p>
      </header>

      <main>
        {isLoading ? (
          <div className='loader'>Loading transaction records...</div>
        ) : (
          <section className='table-card'>
            <div className='table-overflow'>
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    {monthColumns.map((month) => (
                      <th key={month}>{month}</th>
                    ))}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardData.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>{customer.customerName}</td>
                      {monthColumns.map((month) => (
                        <td key={month}>{customer.monthly[month] || 0}</td>
                      ))}
                      <td>{customer.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {!isLoading && (
          <section className='details-grid'>
            {rewardData.map((customer) => (
              <article className='detail-card' key={customer.customerId}>
                <h2>{customer.customerName}</h2>
                <div className='card-row'>
                  <span>Monthly points</span>
                  <span>{customer.total}</span>
                </div>
                <ul>
                  {monthColumns.map((month) => (
                    <li key={month}>
                      <strong>{month}</strong> - {customer.monthly[month] || 0}{" "}
                      points
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
