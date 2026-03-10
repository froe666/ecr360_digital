import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  // ✅ CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*"
      }
    });
  }

  try {
    const body = await req.json();
    const {
      prenom,
      nom,
      email,
      telephone,
      nom_entreprise,
      url_souhaitee,
      type_site,
      pack_choisi,
      services_marketing,
      services_ai,
      color_palette,
      description,
      deadline_souhaitee,
      message_supplementaire,
      logo_url,
      needs_logo_created,
    } = body;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const packLabels: Record<string, string> = {
      essentiel: "Pack Essentiel — 890.- + 19.90.-/mois",
      confort: "Pack Confort — 890.- + 39.90.-/mois",
      croissance: "Pack Croissance — 890.- + 99.90.-/mois",
    };

    const typeSiteLabels: Record<string, string> = {
      vitrine: "Site Vitrine",
      ecommerce: "E-Commerce",
      portfolio: "Portfolio",
      autre: "Autre",
    };

    const colorPaletteLabels: Record<string, string> = {
      bleu_professionnel: "Bleu Professionnel",
      vert_nature: "Vert Nature",
      rouge_energie: "Rouge Énergie",
      violet_creatif: "Violet Créatif",
      orange_chaleureux: "Orange Chaleureux",
      gris_moderne: "Gris Moderne",
      rose_elegant: "Rose Élégant",
      jaune_optimiste: "Jaune Optimiste",
      turquoise_frais: "Turquoise Frais",
      noir_luxe: "Noir Luxe",
      multicolore: "Multicolore / Vif",
      pas_de_preference: "Pas de préférence",
    };

    const marketingLabels: Record<string, string> = {
      google_ads: "Google Ads",
      seo: "SEO / Référencement",
      google_my_business: "Google My Business",
      reseaux_sociaux: "Réseaux Sociaux",
      meta_ads: "Meta / LinkedIn Ads",
      email_marketing: "Email Marketing",
    };

    const aiLabels: Record<string, string> = {
      chatbot: "Chatbot IA",
      automatisation: "Automatisation des tâches",
      analyse_donnees: "Analyse de données IA",
      generation_contenu: "Génération de contenu IA",
    };

    const formatList = (items: string[], labels: Record<string, string>) => {
      if (!items || items.length === 0) return "<em>Aucun</em>";
      return items.map((v) => `<span style="display:inline-block;background:#e0f7ff;color:#0369a1;padding:2px 10px;border-radius:20px;margin:2px 4px 2px 0;font-size:13px;">${labels[v] || v}</span>`).join(" ");
    };

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 16px;font-weight:600;color:#374151;background:#f9fafb;width:200px;border-bottom:1px solid #e5e7eb;">${label}</td>
        <td style="padding:10px 16px;color:#111827;border-bottom:1px solid #e5e7eb;">${value || "<em style='color:#9ca3af;'>Non renseigné</em>"}</td>
      </tr>
    `;

    const htmlBody = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a1628 0%,#0d2040 100%);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#00C2FF;font-size:24px;font-weight:800;letter-spacing:-0.5px;">ECR360 Digital</h1>
            <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">Nouvelle demande de projet reçue</p>
          </td>
        </tr>
        <!-- Alert banner -->
        <tr>
          <td style="background:#ecfdf5;padding:16px 40px;border-bottom:2px solid #00C2FF;">
            <p style="margin:0;color:#065f46;font-size:15px;font-weight:600;">🎉 Un client vient de soumettre une demande de projet !</p>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding:32px 40px;">
            <h2 style="margin:0 0 20px;color:#0a1628;font-size:18px;font-weight:700;border-left:4px solid #00C2FF;padding-left:12px;">Informations du client</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              ${row("Prénom", prenom)}
              ${row("Nom", nom)}
              ${row("Email", `<a href="mailto:${email}" style="color:#0369a1;">${email}</a>`)}
              ${row("Téléphone", telephone)}
              ${row("Entreprise", nom_entreprise)}
            </table>

            <h2 style="margin:28px 0 20px;color:#0a1628;font-size:18px;font-weight:700;border-left:4px solid #00C2FF;padding-left:12px;">Détails du projet</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              ${row("URL souhaitée", url_souhaitee)}
              ${row("Type de site", typeSiteLabels[type_site] || type_site)}
              ${row("Pack choisi", packLabels[pack_choisi] || pack_choisi)}
              ${row("Palette de couleurs", colorPaletteLabels[color_palette] || color_palette)}
              ${row("Délai souhaité", deadline_souhaitee)}
              ${row("Logo", needs_logo_created ?"<span style='background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:20px;font-size:13px;'>🎨 Logo à créer par ECR360</span>"
                : logo_url
                  ? `<a href="${logo_url}" target="_blank" style="color:#0369a1;text-decoration:underline;">📎 Voir le logo uploadé</a><br><img src="${logo_url}" alt="Logo client" style="max-width:200px;max-height:100px;margin-top:8px;border:1px solid #e5e7eb;border-radius:6px;padding:4px;" />`
                  : "<em style='color:#9ca3af;'>Aucun logo fourni</em>"
              )}
            </table>

            <h2 style="margin:28px 0 20px;color:#0a1628;font-size:18px;font-weight:700;border-left:4px solid #00C2FF;padding-left:12px;">Services sélectionnés</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              ${row("Services Marketing", formatList(services_marketing, marketingLabels))}
              ${row("Services IA", formatList(services_ai, aiLabels))}
            </table>

            <h2 style="margin:28px 0 20px;color:#0a1628;font-size:18px;font-weight:700;border-left:4px solid #00C2FF;padding-left:12px;">Description & Message</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              ${row("Description du projet", `<span style="white-space:pre-wrap;">${description || ""}</span>`)}
              ${row("Message supplémentaire", `<span style="white-space:pre-wrap;">${message_supplementaire || ""}</span>`)}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#6b7280;font-size:13px;">Cet email a été envoyé automatiquement par le système ECR360 Digital.</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;">Répondez directement à <a href="mailto:${email}" style="color:#0369a1;">${email}</a> pour contacter le client.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["info@ecr360.ch"],
        subject: `🆕 Nouvelle demande de projet — ${prenom} ${nom}${nom_entreprise ? ` (${nom_entreprise})` : ""}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(resendData?.message || "Resend API error");
    }

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
});
