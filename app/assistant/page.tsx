import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

export default function AssistantPage() {
  return (
    <main className="flex bg-zinc-950 min-h-screen">

      <Sidebar />

      <section className="flex-1">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold text-white mb-6">
            AI Assistant
          </h1>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">
              AI financial assistant will appear here.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}