import { useState, useMemo } from "react";
import {
  tools as rawTools,
  sortTools,
  filterByUseCase,
  filterByOrigin,
  type UseCase,
  type SortField,
  type SortDirection,
  type AITool,
  type Origin,
} from "@/lib/data";
import { useI18n, type Locale } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  ArrowUp,
  ArrowDown,
  Check,
  X,
  ExternalLink,
  Sun,
  Moon,
  Briefcase,
  GraduationCap,
  Coffee,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Globe,
  MapPin,
} from "lucide-react";

function ThemeToggle() {
  const { t } = useI18n();
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? t.switchToLight : t.switchToDark}
      data-testid="theme-toggle"
      className="h-9 w-9"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  function toggle() {
    setLocale(locale === "en" ? "zh" : "en");
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      data-testid="lang-toggle"
      className="h-9 gap-1.5 text-xs font-medium px-2.5"
      aria-label={locale === "en" ? "切换为中文" : "Switch to English"}
    >
      <Globe className="h-3.5 w-3.5" />
      {locale === "en" ? "中文" : "EN"}
    </Button>
  );
}

const useCaseIcons: Record<UseCase, typeof Briefcase> = {
  work: Briefcase,
  study: GraduationCap,
  daily: Coffee,
};

type OriginOption = Origin | "all";

function OriginFilter({
  active,
  onChange,
}: {
  active: OriginOption;
  onChange: (o: OriginOption) => void;
}) {
  const { t } = useI18n();
  const options: { value: OriginOption; label: string }[] = [
    { value: "all", label: t.originAll },
    { value: "global", label: t.originGlobal },
    { value: "china", label: t.originChina },
  ];

  return (
    <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden" data-testid="origin-filter">
      {options.map((o) => (
        <Button
          key={o.value}
          variant={active === o.value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onChange(o.value)}
          data-testid={`origin-${o.value}`}
          className="rounded-none text-xs h-8 px-2.5 font-medium"
        >
          {o.value === "all" ? (
            <Globe className="h-3.5 w-3.5 mr-1" />
          ) : o.value === "china" ? (
            <MapPin className="h-3.5 w-3.5 mr-1" />
          ) : null}
          {o.label}
        </Button>
      ))}
    </div>
  );
}

function UseCaseFilter({
  active,
  onToggle,
}: {
  active: UseCase[];
  onToggle: (uc: UseCase) => void;
}) {
  const { t } = useI18n();
  const cases: UseCase[] = ["work", "study", "daily"];
  const labels: Record<UseCase, string> = {
    work: t.work,
    study: t.study,
    daily: t.daily,
  };

  return (
    <div className="flex items-center gap-2 flex-wrap" data-testid="use-case-filters">
      {cases.map((uc) => {
        const Icon = useCaseIcons[uc];
        const isActive = active.includes(uc);
        return (
          <Button
            key={uc}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onToggle(uc)}
            data-testid={`filter-${uc}`}
            className="gap-1.5 text-xs font-medium"
          >
            <Icon className="h-3.5 w-3.5" />
            {labels[uc]}
          </Button>
        );
      })}
    </div>
  );
}

function SortControl({
  field,
  direction,
  onChange,
}: {
  field: SortField;
  direction: SortDirection;
  onChange: (f: SortField, d: SortDirection) => void;
}) {
  const { t } = useI18n();

  function handleFieldChange(val: string) {
    onChange(val as SortField, direction);
  }
  function toggleDirection() {
    onChange(field, direction === "asc" ? "desc" : "asc");
  }

  return (
    <div className="flex items-center gap-2" data-testid="sort-controls">
      <Select value={field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-[170px] h-9 text-xs" data-testid="sort-select">
          <SelectValue placeholder={t.sortName} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">{t.sortName}</SelectItem>
          <SelectItem value="lowestPaid">{t.sortPrice}</SelectItem>
          <SelectItem value="workScore">{t.sortWork}</SelectItem>
          <SelectItem value="studyScore">{t.sortStudy}</SelectItem>
          <SelectItem value="dailyScore">{t.sortDaily}</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={toggleDirection}
        data-testid="sort-direction"
      >
        {direction === "asc" ? (
          <ArrowUp className="h-3.5 w-3.5" />
        ) : (
          <ArrowDown className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  );
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-12 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums w-6 text-right">{score}</span>
    </div>
  );
}

function ToolCard({ tool, expanded, onToggle }: { tool: AITool; expanded: boolean; onToggle: () => void }) {
  const { t } = useI18n();
  const toolT = t.tools[tool.id];

  return (
    <Card
      className="overflow-hidden transition-all duration-200"
      data-testid={`card-${tool.id}`}
    >
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: tool.brandColor }}
            >
              {tool.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold leading-tight">{tool.name}</h2>
                <Badge variant="secondary" className="text-[10px] font-medium px-1.5 py-0">
                  {toolT?.category || tool.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {toolT?.tagline || tool.tagline}
              </p>
            </div>
          </div>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors shrink-0"
            aria-label={`Visit ${tool.name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Pricing */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {tool.freeTier && (
            <Badge variant="outline" className="text-[10px] font-medium border-primary/30 text-primary">
              {t.freeTier}
            </Badge>
          )}
          {tool.pricing.filter(p => p.price !== "$0").map((p) => (
            <span key={p.name} className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{p.price}</span>
              <span>{p.period}</span>
              <span className="text-muted-foreground/60 ml-0.5">({p.name})</span>
            </span>
          ))}
        </div>

        {/* Scores */}
        <div className="mt-4 space-y-1.5">
          <ScoreBar score={tool.workScore} label={t.work} />
          <ScoreBar score={tool.studyScore} label={t.study} />
          <ScoreBar score={tool.dailyScore} label={t.daily} />
        </div>

        {/* Best For */}
        <p className="mt-3 text-xs text-muted-foreground italic">
          {t.bestFor}：{toolT?.bestFor || tool.bestFor}
        </p>

        {/* Expand */}
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground gap-1"
          onClick={onToggle}
          data-testid={`expand-${tool.id}`}
        >
          {expanded ? (
            <><ChevronUp className="h-3.5 w-3.5" /> {t.hideDetails}</>
          ) : (
            <><ChevronDown className="h-3.5 w-3.5" /> {t.showProscons}</>
          )}
        </Button>
      </div>

      {expanded && (
        <div className="border-t border-border px-5 py-4 bg-muted/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> {t.pros}
              </h3>
              <ul className="space-y-1.5">
                {(toolT?.pros || tool.pros).map((p, i) => (
                  <li key={i} className="text-xs text-foreground/80 leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5 shrink-0">+</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-destructive mb-2 flex items-center gap-1">
                <X className="h-3.5 w-3.5" /> {t.cons}
              </h3>
              <ul className="space-y-1.5">
                {(toolT?.cons || tool.cons).map((c, i) => (
                  <li key={i} className="text-xs text-foreground/80 leading-relaxed flex gap-2">
                    <span className="text-destructive mt-0.5 shrink-0">–</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function ComparisonTable({ items }: { items: AITool[] }) {
  const { t } = useI18n();
  return (
    <div className="overflow-x-auto -mx-4 px-4" data-testid="comparison-table">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colTool}</th>
            <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colCategory}</th>
            <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colFree}</th>
            <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colLowestPaid}</th>
            <th className="text-center py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colWork}</th>
            <th className="text-center py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colStudy}</th>
            <th className="text-center py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colDaily}</th>
            <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground whitespace-nowrap">{t.colBestFor}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((tool) => {
            const toolT = t.tools[tool.id];
            return (
              <tr key={tool.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                      style={{ backgroundColor: tool.brandColor }}
                    >
                      {tool.logo}
                    </div>
                    <span className="font-medium">{tool.name}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">{toolT?.category || tool.category}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  {tool.freeTier ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-muted-foreground/40" />
                  )}
                </td>
                <td className="py-2.5 px-3 font-semibold whitespace-nowrap">${tool.lowestPaid}/mo</td>
                <td className="py-2.5 px-3 text-center font-semibold tabular-nums">{tool.workScore}</td>
                <td className="py-2.5 px-3 text-center font-semibold tabular-nums">{tool.studyScore}</td>
                <td className="py-2.5 px-3 text-center font-semibold tabular-nums">{tool.dailyScore}</td>
                <td className="py-2.5 px-3 text-muted-foreground max-w-[200px] truncate">{toolT?.bestFor || tool.bestFor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type ViewMode = "cards" | "table";

export default function Dashboard() {
  const { t } = useI18n();
  const [useCaseFilters, setUseCaseFilters] = useState<UseCase[]>([]);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [originFilter, setOriginFilter] = useState<OriginOption>("all");

  function toggleFilter(uc: UseCase) {
    setUseCaseFilters((prev) =>
      prev.includes(uc) ? prev.filter((x) => x !== uc) : [...prev, uc]
    );
  }

  function handleSort(f: SortField, d: SortDirection) {
    setSortField(f);
    setSortDirection(d);
  }

  function toggleExpanded(id: string) {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = useMemo(
    () => sortTools(filterByOrigin(filterByUseCase(rawTools, useCaseFilters), originFilter), sortField, sortDirection),
    [useCaseFilters, originFilter, sortField, sortDirection]
  );

  function expandAll() {
    setExpandedCards(new Set(filtered.map((t) => t.id)));
  }
  function collapseAll() {
    setExpandedCards(new Set());
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight">{t.title}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t.subtitle(filtered.length, rawTools.length)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <UseCaseFilter active={useCaseFilters} onToggle={toggleFilter} />
              <div className="hidden sm:block w-px h-6 bg-border" />
              <OriginFilter active={originFilter} onChange={setOriginFilter} />
            </div>
            <div className="flex items-center gap-2">
              <SortControl
                field={sortField}
                direction={sortDirection}
                onChange={handleSort}
              />
              <div className="flex border border-border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "cards" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none text-xs h-9 px-3"
                  onClick={() => setViewMode("cards")}
                  data-testid="view-cards"
                >
                  {t.cards}
                </Button>
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none text-xs h-9 px-3"
                  onClick={() => setViewMode("table")}
                  data-testid="view-table"
                >
                  {t.table}
                </Button>
              </div>
            </div>
          </div>

          {viewMode === "cards" && (
            <div className="flex gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={expandAll}
                data-testid="expand-all"
              >
                {t.expandAll}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={collapseAll}
                data-testid="collapse-all"
              >
                {t.collapseAll}
              </Button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <SlidersHorizontal className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">{t.emptyTitle}</p>
              <p className="text-xs mt-1">{t.emptyHint}</p>
            </div>
          ) : viewMode === "cards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="cards-grid">
              {filtered.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  expanded={expandedCards.has(tool.id)}
                  onToggle={() => toggleExpanded(tool.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="overflow-hidden">
              <ComparisonTable items={filtered} />
            </Card>
          )}

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-border/40 text-center">
            <p className="text-xs text-muted-foreground">{t.footer}</p>
          </footer>
        </main>
      </div>
    </TooltipProvider>
  );
}
