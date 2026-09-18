'use client';

export default function ActivityLogPage() {
  return (
    <div>
      <header className="mb-8">
        <p className="eyebrow mb-1">System</p>
        <h1 className="text-3xl font-serif font-medium text-ink">Activity Log</h1>
      </header>

      <div className="bg-bone-light border border-ink/10 rounded-editorial p-12 text-center">
        <p className="text-ink-muted text-lg">Activity tracking has been disabled.</p>
      </div>
    </div>
  );
}
