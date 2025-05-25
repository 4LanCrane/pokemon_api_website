import { Progress } from "@/components/ui/progressBar";

function StatsCard({ stats }: { stats: any[] }) {
  return (
    <div className="p-4 rounded-lg col-start-2 col-span-2 row-start-3 outline-solid">
      <div className="space-y-2">
        {stats.map((stat: any) => (
          <div key={stat.stat.name} className="flex items-center gap-4">
            <span className="capitalize font-medium w-32 text-right">
              {stat.stat.name.replace("-", " ")}
            </span>
            <Progress value={stat.base_stat} className="flex-1 h-3" />
            <span className="font-mono w-10 text-right">{stat.base_stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export { StatsCard };
