import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type CreateLeadInput } from "@shared/routes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useCreateLead } from "@/hooks/use-leads";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function nowIsoDateString() {
  return new Date().toISOString();
}

export function LeadCaptureModal({
  open,
  onOpenChange,
  onSuccessScrollToOffers,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccessScrollToOffers: () => void;
}) {
  const { toast } = useToast();
  const createLead = useCreateLead();

  const form = useForm<CreateLeadInput>({
    resolver: zodResolver(api.leads.create.input),
    defaultValues: {
      name: "",
      phone: "",
      createdAt: nowIsoDateString(),
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (open) {
      form.setValue("createdAt", nowIsoDateString(), { shouldDirty: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createLead.mutateAsync(values);
      toast({
        title: "Perfeito! Já recebemos seu WhatsApp",
        description: "Agora escolha a melhor opção pra você. Se quiser, você pode pagar na entrega.",
      });
      onOpenChange(false);
      setTimeout(() => onSuccessScrollToOffers(), 250);
      form.reset({ name: "", phone: "", createdAt: nowIsoDateString() });
    } catch (e) {
      toast({
        title: "Não foi possível enviar",
        description: e instanceof Error ? e.message : "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-lg overflow-hidden rounded-3xl border-card-border bg-card/75 p-0 shadow-luxe",
          "backdrop-blur-xl",
        )}
        data-testid="lead-modal"
      >
        <div className="relative p-6 sm:p-7">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_20%_0%,hsl(var(--primary)/0.22),transparent_55%),radial-gradient(900px_420px_at_90%_10%,hsl(var(--secondary)/0.42),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-20 grain opacity-70" aria-hidden="true" />

          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl" data-testid="lead-modal-title">
              Me diz seu nome e WhatsApp
            </DialogTitle>
            <DialogDescription className="text-muted-foreground" data-testid="lead-modal-desc">
              Vou te orientar com a melhor combinação. Lembre: <span className="font-semibold">Você NÃO precisa comprar os 3 produtos</span>.{" "}
              <span className="font-semibold">Com APENAS 1 produto, já é possível ver resultado</span> — e{" "}
              <span className="font-semibold">com os 3, potencializa e acelera</span>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="mt-6 space-y-4" data-testid="lead-form">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm" data-testid="lead-name-label">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Seu nome"
                autoComplete="name"
                {...form.register("name")}
                className="h-12 rounded-2xl bg-background/70 border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
                data-testid="lead-name-input"
              />
              {form.formState.errors.name ? (
                <p className="text-xs text-destructive" data-testid="lead-name-error">
                  {form.formState.errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm" data-testid="lead-phone-label">
                WhatsApp
              </Label>
              <Input
                id="phone"
                inputMode="tel"
                placeholder="(DDD) 9 9999-9999"
                autoComplete="tel"
                {...form.register("phone")}
                className="h-12 rounded-2xl bg-background/70 border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
                data-testid="lead-phone-input"
              />
              {form.formState.errors.phone ? (
                <p className="text-xs text-destructive" data-testid="lead-phone-error">
                  {form.formState.errors.phone.message}
                </p>
              ) : null}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <PrimaryButton
                type="button"
                variant="outline"
                className="sm:flex-1"
                onClick={() => onOpenChange(false)}
                data-testid="lead-cancel"
              >
                Agora não
              </PrimaryButton>
              <PrimaryButton
                type="submit"
                variant="primary"
                className="sm:flex-1"
                loading={createLead.isPending}
                disabled={!form.formState.isValid || createLead.isPending}
                data-testid="lead-submit"
              >
                {createLead.isPending ? "Enviando..." : "Ver ofertas agora"}
              </PrimaryButton>
            </div>

            <p className="text-[12px] leading-relaxed text-muted-foreground" data-testid="lead-modal-footnote">
              Compra segura. Entrega em todo o Brasil. Postagem rápida (até 1 dia útil). Pagamento via Pix ou Cartão de crédito.{" "}
              <span className="font-semibold">Pague somente na entrega</span> — ou, se preferir, pode pagar antecipadamente.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
