const BookCard = ({ book }) => {
  return (
    <div className="border-2 border-black rounded-2xl overflow-hidden bg-[#FFF7E6]">
      <img
        src={book.image}
        alt={book.caption}
        className="w-full h-56 object-cover"
      />

      <div className="p-3">
        <h3 className="font-bold text-sm">
          {book.caption}
        </h3>

        <p className="text-xs text-black/60">
          {book.user?.name}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
