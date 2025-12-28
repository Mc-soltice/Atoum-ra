export default function CategoryBannerSkeleton() {
  return (
    <div
      className="
        w-full
        flex
        items-center
        justify-between
        px-4
        py-3
        mb-6
        rounded-md
        bg-gray-200
        animate-pulse
      "
    >
      {/* Partie gauche */}
      <div className="flex items-center space-x-4">
        <div className="h-8 w-1 bg-gray-300 rounded-full" />
        <div className="h-6 w-48 bg-gray-300 rounded-full" />
        <div className="h-5 w-24 bg-gray-300 rounded-full" />
      </div>

      {/* Bouton "Voir tout" */}
      <div className="h-5 w-20 bg-gray-300 rounded-full" />
    </div>
  );
}
