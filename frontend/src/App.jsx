import { useEffect, useState } from "react";

function App() {
	const [health, setHealth] = useState(null);
	const [error, setError] = useState("");

	const loadHealth = async () => {
		setError("");
		setHealth(null);
		try {
			const response = await fetch("/api/health");
			if (!response.ok) {
				throw new Error(`Backend error: ${response.status}`);
			}
			const data = await response.json();
			setHealth(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Backend is unavailable");
		}
	};

	useEffect(() => {
		loadHealth();
	}, []);

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16">
				<h1 className="text-3xl font-semibold tracking-tight">
					Campus Nexus
				</h1>
				<p className="max-w-2xl text-base text-slate-600">
					Frontend is wired to a simple backend health endpoint. Start the
					backend on port 8080 and the frontend will show a live status.
				</p>
				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div>
							<p className="text-sm uppercase tracking-wide text-slate-500">
								Backend status
							</p>
							<p className="mt-2 text-lg font-semibold">
								{health?.status ?? (error ? "Error" : "Checking...")}
							</p>
							<p className="mt-1 text-sm text-slate-500">
								{health?.message ?? (error || "Waiting for backend")}
							</p>
						</div>
						<button
							onClick={loadHealth}
							className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
						>
							Re-check
						</button>
					</div>
				</div>
				<div className="flex flex-wrap gap-3">
					<span className="rounded-full bg-white px-3 py-1 text-sm shadow">
						React 18
					</span>
					<span className="rounded-full bg-white px-3 py-1 text-sm shadow">
						Vite
					</span>
					<span className="rounded-full bg-white px-3 py-1 text-sm shadow">
						Tailwind CSS
					</span>
				</div>
			</div>
		</div>
	);
}

export default App;
