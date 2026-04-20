export function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">Overview</p>
      </header>
      <main className="dashboard__grid">
        <section className="card">
          <h2 className="card__label">Active</h2>
          <p className="card__value">—</p>
        </section>
        <section className="card">
          <h2 className="card__label">Pending</h2>
          <p className="card__value">—</p>
        </section>
        <section className="card card--wide">
          <h2 className="card__label">Recent</h2>
          <p className="card__muted">Nothing to show yet.</p>
        </section>
      </main>
    </div>
  );
}
