import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ExchangeCard from "../../components/exchange/ExchangeCard";
import {
  getIncoming,
  getOutgoing,
} from "../../services/exchangeService";
import { Inbox, Send } from "lucide-react";

const Exchange = () => {
  const [tab, setTab] = useState("incoming");
  const [exchanges, setExchanges] = useState([]);
  const [counts, setCounts] = useState({ incoming: 0, outgoing: 0 });

  const loadExchanges = async () => {
    try {
      const incoming = await getIncoming();
      const outgoing = await getOutgoing();

      setCounts({
        incoming: incoming.length,
        outgoing: outgoing.length,
      });

      if (tab === "incoming") {
        setExchanges(incoming);
      } else {
        setExchanges(outgoing);
      }
    } catch (err) {
      console.error("Failed to load exchanges", err);
    }
  };

  useEffect(() => {
    loadExchanges();
  }, [tab]);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b-2 border-black/60 bg-[#F5EAD7]">
          <h1 className="text-2xl font-bold text-black">
            Exchange Requests
          </h1>
          <p className="text-sm text-black/60 mt-1">
            Manage your book swaps
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-5">
          <div className="inline-flex gap-2 bg-[#F5EAD7] border-2 border-black rounded-2xl p-1">
            {/* Incoming */}
            <button
              onClick={() => setTab("incoming")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl transition
                ${
                  tab === "incoming"
                    ? "bg-orange-400 text-black border-2 border-black"
                    : "text-black/70 hover:bg-black/5"
                }`}
            >
              <Inbox size={16} />
              Incoming
              <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-black">
                {counts.incoming}
              </span>
            </button>

            {/* Outgoing */}
            <button
              onClick={() => setTab("outgoing")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl transition
                ${
                  tab === "outgoing"
                    ? "bg-orange-400 text-black border-2 border-black"
                    : "text-black/70 hover:bg-black/5"
                }`}
            >
              <Send size={16} />
              Outgoing
              <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-black">
                {counts.outgoing}
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {exchanges.length === 0 ? (
            <div className="text-center mt-20 text-black/60">
              <p className="text-lg font-semibold">
                No exchange requests
              </p>
              <p className="text-sm mt-2">
                When someone wants your book, it will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {exchanges.map((ex) => (
                <ExchangeCard
                  key={ex._id}
                  exchange={ex}
                  onUpdate={loadExchanges}
                  tab={tab}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Exchange;
