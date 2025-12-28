export default function ProductCardSkeleton() {
  return (
    <div
      className="
        relative
        h-[390px]
        w-[280px]
        overflow-hidden
        rounded-xl
        bg-white/80
        backdrop-blur-xl
        shadow-lg
        animate-pulse
        flex
        flex-col
      "
    >
      {/* IMAGE (60%) */}
      <div className="h-[60%] w-full bg-gray-200" />

      {/* CONTENU */}
      <div className="flex flex-col flex-1 min-h-0 p-4">
        {/* Texte */}
        <div className="flex-1 space-y-2">
          <div className=" skeleton h-3 w-3/4 bg-gray-200 rounded-xl" />
          <div className=" skeleton h-2 w-full bg-gray-200 rounded-xl" />
          <div className=" skeleton h-2 w-5/6 bg-gray-200 rounded-xl" />

          {/* Prix */}
          <div className=" skeleton h-5 w-1/3 bg-gray-200 rounded-full mt-3" />
        </div>

        {/* Bouton */}
        <div className="mt-4">
          <div className=" skeleton h-10 w-full bg-gray-300 rounded-xl mb-5" />
        </div>
      </div>
    </div>
  );
}
