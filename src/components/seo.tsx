import React from "react"

import { Helmet } from "react-helmet"
import {
  type Graph,
  type Organization,
  type Thing,
  type WebSite,
} from "schema-dts"

import useSiteMetadata from "~/src/hooks/useSiteMetadata"

import defaultOpenGraphImage from "../images/og-thumbnail.png"

const DEFAULT_LANG = "en-US"

type Meta = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[]

interface SEOProperties {
  title?: Queries.Maybe<string>
  desc?: Queries.Maybe<string>
  image?: Queries.Maybe<string>
  meta?: Meta
  jsonLds?: Thing[]
}

const SEO: React.FC<SEOProperties> = ({
  title = "",
  desc = "",
  image,
  jsonLds = [],
}) => {
  const site = useSiteMetadata()
  const description = (desc || site.description || "").slice(0, 160)
  const ogImageUrl = image || (defaultOpenGraphImage as string)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...jsonLds,
      {
        "@type": "Organization",
        "@id": `${site.siteUrl}/#organization`,
        name: "", // TODO: add your name
        url: site.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${site.siteUrl}${defaultOpenGraphImage}`,
        },
        sameAs: [],
      } as Organization,
      {
        "@type": "WebSite",
        "@id": `${site.siteUrl}/#website`,
        name: "", // TODO: add your name
        alternateName: "", // TODO: add your name
        url: site.siteUrl,
        description: site.description,
        inLanguage: ["ko", "en"],
      } as WebSite,
    ],
  } as Graph

  return (
    <Helmet
      htmlAttributes={{ lang: site.lang ?? DEFAULT_LANG }}
      title={title || site.title!}
      titleTemplate={title || site.title!}
      meta={
        [
          {
            name: "description",
            content: description,
          },
          {
            property: "og:title",
            content: title,
          },
          {
            property: "og:description",
            content: description,
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            name: "twitter:card",
            content: "summary",
          },
          {
            name: "twitter:creator",
            content: site.author,
          },
          {
            name: "twitter:title",
            content: title,
          },
          {
            name: "twitter:description",
            content: description,
          },
          {
            property: "image",
            content: ogImageUrl,
          },
          {
            property: "og:image",
            content: ogImageUrl,
          },
          {
            property: "twitter:image",
            content: ogImageUrl,
          },
        ] as Meta
      }
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export default SEO
