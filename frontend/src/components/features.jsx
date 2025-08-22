import { cn } from "@/lib/utils";


export default function  FeaturesSectionDemo() {
  const features = [
  {
    title: "Seamless GitHub OAuth",
    description:
      "Connect with GitHub in one click. No tokens, no hassle – just secure OAuth login.",
  },
  {
    title: "Pull Request Insights",
    description:
      "Get detailed summaries of your open and merged PRs, including status, comments, and activity trends.",
  },
  {
    title: "Repository Analytics",
    description:
      "Track repo activity, contributors, commits, and productivity metrics all in one place.",
  },
  {
  title: "Contributor Stats",
  description:
    "See individual contributor activity with commit counts, PRs merged, and code reviews.",
},
{
  title: "Activity Timeline",
  description:
    "Visualize repository events like commits, PRs, and issues in a chronological view.",
},

  {
    title: "Smart Notifications",
    description:
      "Stay on top of code reviews and PR updates with timely alerts and reminders.",
  },

  {
    title: "Custom Dashboards",
    description:
      "Personalize your dashboard with widgets for PRs, issues, pipelines, and repo insights.",
  },
  {
    title: "Open Source Friendly",
    description:
      "Designed with open source workflows in mind – lightweight, transparent, and community-driven.",
  },
];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-blue- dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-blue-50 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
