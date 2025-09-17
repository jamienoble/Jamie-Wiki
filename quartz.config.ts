import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Jamie's Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Mono",
        body: "IBM Plex Mono",
        code: "IBM Plex Mono",
      },
      colors: {
        // Earthy Palette mapped to Quartz keys and usage rules
        lightMode: {
          // Sunlit Earth for backgrounds
          light: "#F5E9D4",        // Sand (background)
          lightgray: "#E9DCC3",    // Clay (border, menu backgrounds)
          gray: "#F3F0E7",         // Linen (secondary backgrounds)
          darkgray: "#1B2B22",     // Forest Night (Deep Earth for text)
          dark: "#233024",         // Moss (Deep Earth for headings, strong text)
          // Canopy for UI highlights
          secondary: "#4C7A5D",    // Fern (links, highlights)
          tertiary: "#6C8A7B",     // Riverstone (hover, selection)
          highlight: "rgba(108,138,123,0.15)", // Riverstone (highlight bg)
          textHighlight: "#E9DCC388", // Clay (markdown highlight bg)
          // Underbrush for accents (add if needed)
          // accent: "#C97D60",    // Terracotta (warnings, errors, accents)
        },
        darkMode: {
          // Deep Earth for backgrounds
          light: "#1B2B22",        // Forest Night (background)
          lightgray: "#233024",    // Moss (border, menu backgrounds)
          gray: "#3A3A32",         // Charcoal (secondary backgrounds)
          darkgray: "#F5E9D4",     // Sand (Sunlit Earth for text)
          dark: "#E9DCC3",         // Clay (Sunlit Earth for headings, strong text)
          // Canopy for UI highlights
          secondary: "#A3B18A",    // Sage (links, highlights)
          tertiary: "#4C7A5D",     // Fern (hover, selection)
          highlight: "rgba(108,138,123,0.15)", // Riverstone (highlight bg)
          textHighlight: "#23302488", // Moss (markdown highlight bg)
          // Underbrush for accents (add if needed)
          // accent: "#C97D60",    // Terracotta (warnings, errors, accents)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
