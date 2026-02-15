import { useEffect, useState } from "react";
import {
  getIncoming,
  getOutgoing,
} from "../../services/exchangeService";

const ExchangeWidget = () => {
  const [exchanges, setExchanges] = useState([]);

  const loadExchanges = async () => {
    try {
      const incoming = await getIncoming();
      const outgoing = await getOutgoing();

      // combine both
      const combined = [
        ...incoming.map((ex) => ({
          ...ex,
          type: "incoming",
        })),
        ...outgoing.map((ex) => ({
          ...ex,
          type: "outgoing",
        })),
      ];

      setExchanges(combined.slice(0, 3)); // show only top 3
    } catch (err) {
      console.error("Failed to load exchanges", err);
    }
  };

  useEffect(() => {
    loadExchanges();
  }, []);

  return (
    <div className="border-2 border-black/70 bg-[#FFF8EC] rounded-2xl p-4">
      <h3 className="text-sm font-bold text-black mb-3">
        Active Exchanges
      </h3>

      <div className="flex flex-col divide-y divide-black/20">
        {exchanges.length === 0 && (
          <p className="text-xs text-black/60 py-3">
            No active exchanges
          </p>
        )}

        {exchanges.map((ex) => (
          <div
            key={ex._id}
            className="py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-black">
                {ex.post?.caption}
              </p>

              <p className="text-xs text-black/60">
                {ex.type === "incoming"
                  ? `Requested by ${ex.requester?.name}`
                  : "Awaiting response"}
              </p>
            </div>

            <span
              className={`px-2 py-1 text-[10px] font-semibold rounded-full border border-black/20
              ${
                ex.status === "pending"
                  ? "bg-[#FFD9A0]/70"
                  : ex.status === "accepted"
                  ? "bg-green-200"
                  : "bg-red-200"
              }`}
            >
              {ex.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeWidget;
