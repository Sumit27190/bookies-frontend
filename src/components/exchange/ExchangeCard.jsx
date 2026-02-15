import {
  acceptExchange,
  rejectExchange,
} from "../../services/exchangeService";

const getStatusStyle = (status) => {
  if (status === "accepted") {
    return "bg-green-200 border-green-700 text-green-900";
  }
  if (status === "rejected") {
    return "bg-red-200 border-red-700 text-red-900";
  }
  return "bg-yellow-200 border-yellow-700 text-yellow-900";
};

const ExchangeCard = ({ exchange, tab, onUpdate }) => {
  const handleAccept = async () => {
    await acceptExchange(exchange._id);
    onUpdate();
  };

  const handleReject = async () => {
    await rejectExchange(exchange._id);
    onUpdate();
  };

  return (
    <div className="border-2 border-black rounded-2xl p-4 bg-[#FFF7E6] flex gap-4 items-center">
      {/* Book Image */}
      <div className="w-20 h-24 border-2 border-black rounded-lg overflow-hidden bg-[#F3DFC8] flex-shrink-0">
        <img
          src={exchange.post?.image}
          alt="Book"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-bold text-black text-sm">
          {exchange.post?.caption}
        </p>

        <p className="text-xs text-black/70 mt-1">
          From:{" "}
          <span className="font-semibold">
            {exchange.requester?.name}
          </span>
        </p>

        {/* Status badge */}
        <span
          className={`inline-block mt-2 text-[10px] px-3 py-1 rounded-full border-2 font-semibold ${getStatusStyle(
            exchange.status
          )}`}
        >
          {exchange.status?.toUpperCase()}
        </span>
      </div>

      {/* Actions */}
      {tab === "incoming" && exchange.status === "pending" && (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleAccept}
            className="px-4 py-1 text-xs font-bold border-2 border-black rounded-xl bg-green-300 hover:bg-green-400 transition"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-1 text-xs font-bold border-2 border-black rounded-xl bg-red-300 hover:bg-red-400 transition"
          >
            Reject
          </button>
        </div>
      )}

      {tab === "outgoing" && (
        <p className="text-xs font-semibold text-black/60">
          Waiting…
        </p>
      )}
    </div>
  );
};

export default ExchangeCard;
