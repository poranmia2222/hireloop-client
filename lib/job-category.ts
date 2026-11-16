import type { ElementType } from "react";
import {
    Briefcase,
    Code,
    Megaphone,
    PenTool,
    ServerCog,
    Settings,
    TrendingUp,
} from "lucide-react";

type CategoryStyle = {
    icon: ElementType;
    classes: string;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
    Engineering: { icon: Code, classes: "bg-sky-500/15 text-sky-400" },
    Design: { icon: PenTool, classes: "bg-orange-500/15 text-orange-400" },
    Infrastructure: { icon: ServerCog, classes: "bg-cyan-500/15 text-cyan-400" },
    Marketing: { icon: Megaphone, classes: "bg-violet-500/15 text-violet-400" },
    Sales: { icon: TrendingUp, classes: "bg-amber-500/15 text-amber-400" },
    Quality: { icon: Settings, classes: "bg-rose-500/15 text-rose-400" },
};

const FALLBACK_STYLE: CategoryStyle = {
    icon: Briefcase,
    classes: "bg-zinc-500/15 text-zinc-400",
};

export function getCategoryStyle(category: string): CategoryStyle {
    return CATEGORY_STYLES[category] ?? FALLBACK_STYLE;
}
