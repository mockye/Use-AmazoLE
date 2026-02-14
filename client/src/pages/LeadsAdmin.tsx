import Seo from "@/components/Seo";
import { Section } from "@/components/Section";
import { GlowCard } from "@/components/GlowCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useLeads } from "@/hooks/use-leads";
import { Input } from "@/components/ui/input";
import { Search, RefreshCcw, Users, Phone, Calendar } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export default function LeadsAdmin() {
  const { data, isLoading, error, refetch, isFetching } = useLeads();
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    const list = data ?? [];
    const query = q.trim().toLowerCase();
    if (!query) return list;
    return list.filter((l) => {
      return (
        l.name.toLowerCase().includes(query) ||
        l.phone.toLowerCase().includes(query) ||
        l.createdAt.toLowerCase().includes(query)
      );
    });
  }, [data, q]);

  return (
    <div className="min-h-screen" data-testid="leads-admin">
      <Seo
        title="Amazolé — Admin de Leads"
        description="Painel para visualizar leads capturados no formulário."
        urlPath="/admin/leads"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-xs font-semibold text-muted-foreground shadow-soft">
              <Users className="h-4 w-4 text-accent" />
              <span data-testid="leads-admin-pill">Admin</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl leading-tight" data-testid="leads-admin-title">
              Leads capturados
            </h1>
            <p className="mt-2 text-sm text-muted-foreground" data-testid="leads-admin-subtitle">
              Lista do endpoint <span className="font-semibold">GET /api/leads</span>. Use busca e exporte manualmente se quiser.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                "rounded-2xl border border-card-border bg-card/60 px-4 py-2.5 text-sm font-semibold shadow-soft",
                "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-luxe",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:border-ring/60",
              )}
              data-testid="leads-admin-back-home"
            >
              Voltar para página
            </Link>

            <PrimaryButton
              variant="outline"
              size="md"
              onClick={() => refetch()}
              loading={isFetching}
              data-testid="leads-admin-refresh"
            >
              <RefreshCcw className="h-4 w-4" />
              Atualizar
            </PrimaryButton>
          </div>
        </div>

        <Section
          title="Buscar e visualizar"
          subtitle="Dica: se o backend ainda não estiver pronto, esta página vai acusar erro (e isso é esperado)."
          className="py-10"
          data-testid="leads-admin-section"
        >
          <GlowCard className="p-5 sm:p-6" data-testid="leads-admin-controls">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por nome, WhatsApp ou data..."
                  className="h-12 pl-11 rounded-2xl bg-background/70 border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
                  data-testid="leads-admin-search"
                />
              </div>

              <div className="rounded-2xl border border-card-border bg-background/60 px-4 py-3 text-sm shadow-soft" data-testid="leads-admin-count">
                {isLoading ? "Carregando..." : `${filtered.length} lead(s)`}
              </div>
            </div>
          </GlowCard>

          <div className="mt-5">
            {isLoading ? (
              <GlowCard className="p-6" data-testid="leads-admin-loading">
                <div className="text-lg">Carregando leads…</div>
                <div className="mt-2 text-sm text-muted-foreground">Aguarde um instante.</div>
              </GlowCard>
            ) : error ? (
              <GlowCard className="p-6 border-destructive/30" data-testid="leads-admin-error">
                <div className="text-lg">Erro ao carregar</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {error instanceof Error ? error.message : "Erro desconhecido"}
                </div>
              </GlowCard>
            ) : filtered.length === 0 ? (
              <GlowCard className="p-6" data-testid="leads-admin-empty">
                <div className="text-lg">Nenhum lead encontrado</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Tente ajustar a busca.
                </div>
              </GlowCard>
            ) : (
              <div className="grid grid-cols-1 gap-3" data-testid="leads-admin-list">
                {filtered
                  .slice()
                  .sort((a, b) => (a.id < b.id ? 1 : -1))
                  .map((l) => (
                    <GlowCard key={l.id} className="p-5 sm:p-6" data-testid={`lead-row-${l.id}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="min-w-0">
                          <div className="display-font text-xl leading-tight truncate" data-testid={`lead-name-${l.id}`}>
                            {l.name}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5">
                              <Phone className="h-3.5 w-3.5 text-accent" />
                              <span data-testid={`lead-phone-${l.id}`}>{l.phone}</span>
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5">
                              <Calendar className="h-3.5 w-3.5 text-accent" />
                              <span data-testid={`lead-createdAt-${l.id}`}>{l.createdAt}</span>
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5">
                              <Users className="h-3.5 w-3.5 text-primary" />
                              <span data-testid={`lead-id-${l.id}`}>#{l.id}</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <PrimaryButton
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard?.writeText(l.phone);
                            }}
                            data-testid={`lead-copy-phone-${l.id}`}
                          >
                            Copiar WhatsApp
                          </PrimaryButton>

                          <PrimaryButton
                            variant="trust"
                            size="sm"
                            onClick={() => {
                              const digits = l.phone.replace(/[^\d]/g, "");
                              const url = `https://wa.me/55${digits}`;
                              window.open(url, "_blank", "noopener,noreferrer");
                            }}
                            data-testid={`lead-open-whatsapp-${l.id}`}
                          >
                            Abrir WhatsApp
                          </PrimaryButton>
                        </div>
                      </div>
                    </GlowCard>
                  ))}
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
