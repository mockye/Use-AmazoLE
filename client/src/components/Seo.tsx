import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  urlPath?: string;
  ogImage?: string;
};

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, urlPath = "/", ogImage }: SeoProps) {
  useEffect(() => {
    document.title = title;

    upsertMetaByName("description", description);

    const origin =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : "";
    const url = origin ? `${origin}${urlPath}` : urlPath;

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", url);

    upsertMetaByProperty("twitter:card", "summary_large_image");
    upsertMetaByProperty("twitter:title", title);
    upsertMetaByProperty("twitter:description", description);

    if (ogImage) {
      const absolute = ogImage.startsWith("http") ? ogImage : origin ? `${origin}${ogImage}` : ogImage;
      upsertMetaByProperty("og:image", absolute);
      upsertMetaByProperty("twitter:image", absolute);
    }
  }, [title, description, urlPath, ogImage]);

  return null;
}
